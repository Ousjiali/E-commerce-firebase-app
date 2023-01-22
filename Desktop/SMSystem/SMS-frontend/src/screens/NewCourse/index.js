import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { ImBook } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getCourse, postAddCourses } from "../../redux/action/courseAction";
import { BiArrowBack } from "react-icons/bi";
import { POST_ADDCOURSE_RESET } from "../../redux/constants/courseConstant";
import { getSpecialization } from "../../redux/action/userProfileDataAction";
import { totalStaff } from "../../redux/action/staffAction";
import { useNavigate } from "react-router-dom";

function NewCourse() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [specialization, setSpecialization] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [description, setDescription] = useState("");
  const [coordinator, setCoordinator] = useState("");
  const [isActive, setIsActive] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const addcourseData = {
      specialization: specialization,
      name: courseName,
      code: courseCode,
      description: description,
      coordinator: coordinator,
      is_active: isActive,
    };
    dispatch(postAddCourses(addcourseData));
    console.log(addcourseData);
  };

  const postNewCourse = useSelector((state) => state.postNewCourse);
  const { loading, success, error } = postNewCourse;

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const courseGet = useSelector((state) => state.courseGet);
  const { getCourseId } = courseGet;

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;
  console.log(allStaff);

  const backHandler = () => {
    navigate("/admin/course/homepage");
  };

  if (success) {
    dispatch(getCourse());
  }

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    setSpecialization("");
    setCourseName("");
    setCourseCode("");
    setDescription("");
    setCoordinator("");
    toast({
      title: "Notification",
      description: "Course Created Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_ADDCOURSE_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: POST_ADDCOURSE_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Course" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <ImBook />
                  <h2>Course</h2>
                </div>
                <h1>|</h1>
                <h4>{getCourseId && getCourseId.count}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Course</p>
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
                  Cancel
                </button>

                {loading ? (
                  <Button
                    isLoading
                    loadingText="Validating Credentials..."
                    colorScheme="teal"
                    variant="outline"
                    style={{ height: "5rem" }}
                  />
                ) : (
                  <button
                    type="submit"
                    className={styles.subButton}
                    onClick={submitHandler}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="purple.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Specialization</label>
                  <select
                    onChange={(e) => setSpecialization(e.target.value)}
                    value={specialization}
                    required={true}
                    className={styles.addCourseSelect}
                  >
                    <option></option>
                    {specializationid &&
                      specializationid.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Course Name</label>
                  <input
                    type="text"
                    onChange={(e) => setCourseName(e.target.value)}
                    value={courseName}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Course Code</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setCourseCode(e.currentTarget.value.slice(0, 11))
                    }
                    value={courseCode}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Description (optional)</label>
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
                    required={true}
                    className={styles.addCourseSelect}
                  >
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    {/* {allStaff &&
                      allStaff.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.user.full_name}
                        </option>
                      ))} */}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>Publish Course</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCourse;
