import React, { useEffect, useState } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import styles from "./styles.module.css";
import Modal from "../../components/Modal";
import { Button, useToast } from "@chakra-ui/react";
import { totalStaff } from "../../redux/action/staffAction";
import {
  editFacultyId,
  getFacultyId,
} from "../../redux/action/editFacultyIdAction";
import { EDIT_FACULTYBYID_RESET } from "../../redux/constants/editFacultyIdConstant";

const ManageViewFaculty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const [faculty_Name, setFaculty_Name] = useState("");
  const [faculty_Code, setFaculty_Code] = useState("");
  const [deanOfFaculty, setDeanOfFaculty] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    dispatch(
      getFacultyId(
        id,
        setFaculty_Name,
        setFaculty_Code,
        setDescription,
        setDeanOfFaculty,
        setIsActive,
        onChangeHandler
      )
    );
  }, [id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: faculty_Name,
      code: faculty_Code,
      description: description,
      dean: deanOfFaculty,
      is_active: isActive,
    };
    dispatch(editFacultyId(id, data));
    console.log(data);
  };
  console.log(id);

  const onChangeHandler = (e) => {
    setFaculty_Name(e.target.value);
    setFaculty_Code(e.target.value);
    setDescription(e.target.value);
    setDeanOfFaculty(e.target.value);
    setIsActive(e.target.value);
  };

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);

  const [facultyInfo, setFacultyInfo] = React.useState();

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty = [], success: faculties } = listFaculty;
  const data = faculty.filter((x) => x.id === parseInt(id));

  React.useEffect(() => {
    if (faculties) {
      setFacultyInfo(data && data);
    }
  }, [faculties]);
  console.log(facultyInfo && facultyInfo[0].dean);

  const backHandler = () => {
    navigate("/admin/managefaculty");
  };

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;
  // console.log(specializationid);

  const editFaculty = useSelector((state) => state.editFaculty);
  const { success, error, loading } = editFaculty;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    dispatch(getFacultyId());
  }

  if (success) {
    toast({
      title: "Notification",
      description: "Update Successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_FACULTYBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Updating",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_FACULTYBYID_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="View Faculty" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <FaPeopleArrows />
                <h2>Staffs</h2>
              </div>
              <h1>|</h1>
              <h4>{faculty && faculty.length}</h4>
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
              <header>Faculty Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {facultyInfo && facultyInfo[0].name}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Faculty Code</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {facultyInfo && facultyInfo[0].code}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Description</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {facultyInfo && facultyInfo[0].description}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Dean of Faculty</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {facultyInfo && facultyInfo[0].dean}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Active Faculty</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {facultyInfo && facultyInfo[0].is_active.toString()}
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
                  <span>Edit Faculty Details</span>
                  <div className={styles.inputBox}>
                    <label>Faculty Name</label>
                    <input
                      type="text"
                      onChange={(e) => setFaculty_Name(e.target.value)}
                      value={faculty_Name}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Faculty Code</label>
                    <input
                      type="text"
                      onChange={(e) => setFaculty_Code(e.target.value)}
                      value={faculty_Code}
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Dean of Faculty</label>
                    <select
                      onChange={(e) => setDeanOfFaculty(e.target.value)}
                      value={deanOfFaculty}
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
                    <label>Description</label>
                    <input
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
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

export default ManageViewFaculty;
