import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import styles from "./styles.module.css";
import Modal from "../../components/Modal";
import { Button, useToast } from "@chakra-ui/react";
import { totalStaff } from "../../redux/action/staffAction";
import { BsBuilding } from "react-icons/bs";
import {
  editCourseId,
  getCoursebyId,
} from "../../redux/action/editCourseIdAction";
import { getCourse } from "../../redux/action/courseAction";
import { EDIT_COURSEBYID_RESET } from "../../redux/constants/editCourseIdConstant";
import { ImAddressBook } from "react-icons/im";

const ManageViewCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const [specialization, setSpecialization] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    dispatch(
      getCoursebyId(
        id,
        setSpecialization,
        setCourseName,
        setCourseCode,
        setDescription,
        setCoordinator,
        setIsActive,
        onChangeHandler
      )
    );
  }, [id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      specialization: specialization,
      name: courseName,
      code: courseCode,
      description: description,
      coordinator: coordinator,
      is_active: isActive,
    };
    dispatch(editCourseId(id, data));
    console.log(data);
  };
  console.log(id);

  const onChangeHandler = (e) => {
    setSpecialization(e.target.value);
    setCourseName(e.target.value);
    setDescription(e.target.value);
    setCoordinator(e.target.value);
    setIsActive(e.target.value);
  };

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const [courseInfo, setCourseInfo] = React.useState();

  const courseGet = useSelector((state) => state.courseGet);
  const { getCourseId = [], success: courses } = courseGet;
  const courseId = getCourseId && getCourseId.results;
  const data = courseId && courseId.filter((x) => x.id === parseInt(id));

  console.log(courseId);

  React.useEffect(() => {
    if (courses) {
      setCourseInfo(data && data);
    }
  }, [courses]);
  console.log(courseInfo && courseInfo[0].code);
  // console.log(departments && departments[0].faculty.name);

  const backHandler = () => {
    navigate("/admin/managecourse");
  };

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;

  const editCourse = useSelector((state) => state.editCourse);
  const { success, error, loading } = editCourse;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Update Successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_COURSEBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Updating",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_COURSEBYID_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="View Course" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <ImAddressBook />
                <h2>Course</h2>
              </div>
              <h1>|</h1>
              <h4>{getCourseId && getCourseId.count}</h4>
            </div>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.submitButton}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={backHandler}
              >
                <BiArrowBack />
                Back
              </button>
            </div>
          </div>
        </div>
        <div className={styles.profileBox}>
          <div className={styles.gridBox}>
            <div className={styles.eachGridBox}>
              <header>Spec. Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].specialization.name}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Course Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].name}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Course Code</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].code}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Description</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].description}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Coordinator</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].coordinator}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Active Faculty</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {courseInfo && courseInfo[0].is_active.toString()}
                </p>
              </span>
            </div>
          </div>
          <div className={styles.editModal}>
            <button
              className={styles.editBtn}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Edit Details
            </button>
          </div>
          {openModal && (
            <Modal
              onClose={() => setOpenModal(false)}
              isVisible={true}
              size="md"
              content={
                <div className={styles.noticeInputField}>
                  <span>Edit Department Details</span>
                  <div className={styles.inputBox}>
                    <label>Specialization Name</label>
                    <input
                      type="text"
                      onChange={(e) => setSpecialization(e.target.value)}
                      value={specialization}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Course Name</label>
                    <input
                      type="text"
                      onChange={(e) => setCourseName(e.target.value)}
                      value={courseName}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Course Code</label>
                    <input
                      type="text"
                      onChange={(e) => setCourseCode(e.target.value)}
                      value={courseCode}
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Description</label>
                    <input
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Coordinator</label>
                    <select
                      onChange={(e) => setCoordinator(e.target.value)}
                      value={coordinator}
                      className={styles.newFacultySelect}
                    >
                      <option></option>
                      {allStaff &&
                        allStaff.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.user.full_name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className={styles.inputBox}>
                    <label>Active Faculty</label>
                    <input
                      type="text"
                      onChange={(e) => setIsActive(e.target.value)}
                      value={isActive}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    {loading ? (
                      <Button
                        isLoading
                        loadingText="Validating Credentials..."
                        colorScheme="blue"
                        variant="outline"
                        style={{ height: "4rem" }}
                      />
                    ) : (
                      <button
                        className={styles.modalBtn}
                        onClick={submitHandler}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageViewCourse;
