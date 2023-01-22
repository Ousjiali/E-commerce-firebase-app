import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getSpecialization } from "../../redux/action/userProfileDataAction";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getDepartment } from "../../redux/action/departmentAction";
import { getLevelAction } from "../../redux/action/levelAction";
import { POST_SCOPE_RESET } from "../../redux/constants/scopeConstant";
import { postScope } from "../../redux/action/scopeAction";
import { getCourse } from "../../redux/action/courseAction";
import { getfaculty } from "../../redux/action/facultyAction";
import { FaMicroscope } from "react-icons/fa";

function CreateScope() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [courseName, setCourseName] = useState("");
  const [maxLevel, setMaxLevel] = useState("");
  const [descName, setDescName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  console.log(isActive);

  const submitHandler = (e) => {
    e.preventDefault();
    const scopeData = {
      faculty: facultyName,
      department: departmentName,
      specialization: specialization,
      course: courseName,
      level: maxLevel,
      description: descName,
      is_active: isActive,
    };
    dispatch(postScope(scopeData));
  };

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;
  console.log(specializationid);

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const courseGet = useSelector((state) => state.courseGet);
  const { getCourseId } = courseGet;

  const scopeCourse = getCourseId && getCourseId.results;
  console.log(scopeCourse);

  console.log(getCourseId);

  useEffect(() => {
    dispatch(getLevelAction());
  }, [dispatch]);

  const levelGet = useSelector((state) => state.levelGet);
  const { getLevelId } = levelGet;
  console.log(getLevelId);

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  const postScopeData = useSelector((state) => state.postScopeData);
  const { loading, success, error } = postScopeData;

  const backHandler = () => {
    navigate("/admin/noticeboard");
  };

  if (success) {
    setFacultyName("");
    setDepartmentName("");
    setMaxLevel("");
    setSpecialization("");
    setCourseName("");
    setDescName("");
    toast({
      title: "Notification",
      description: "Scope Created",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: POST_SCOPE_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: POST_SCOPE_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Scope" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <FaMicroscope />
                  <h2>Scope</h2>
                </div>
                <h1>|</h1>
                <h4>{specializationid && specializationid.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Scope</p>
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

                {loading ? (
                  <Button
                    isLoading
                    loadingText="Validating Credentials..."
                    colorScheme="teal"
                    variant="outline"
                    isfullWidth
                    style={{ height: "3rem" }}
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
                <CircularProgress isIndeterminate color="green.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Faculty Name</label>
                  <select
                    onChange={(e) => setFacultyName(e.target.value)}
                    value={facultyName}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {faculty &&
                      faculty.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Deparment Name</label>
                  <select
                    onChange={(e) => setDepartmentName(e.target.value)}
                    value={departmentName}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {departmentid &&
                      departmentid.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Specialization</label>
                  <select
                    onChange={(e) => setSpecialization(e.target.value)}
                    value={maxLevel}
                    required={true}
                    className={styles.specializationSelect}
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
                  <label>Max Level</label>
                  <select
                    onChange={(e) => setMaxLevel(e.target.value)}
                    value={maxLevel}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {getLevelId &&
                      getLevelId.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.code}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={styles.inputBox}>
                  <label>Course Name</label>
                  <select
                    onChange={(e) => setMaxLevel(e.target.value)}
                    value={maxLevel}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {scopeCourse &&
                      scopeCourse.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={styles.inputBox}>
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    onChange={(e) => setDescName(e.target.value)}
                    value={descName}
                    required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>Publish Scope</span>
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

export default CreateScope;
