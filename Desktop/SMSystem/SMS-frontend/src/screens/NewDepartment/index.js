import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import {
  getDepartment,
  postDepartment,
} from "../../redux/action/departmentAction";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { CREATE_DEPARTMENT_RESET } from "../../redux/constants/departmentConstant";
import { totalStaff } from "../../redux/action/staffAction";
import { getfaculty } from "../../redux/action/facultyAction";
import { useNavigate } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";

function NewDepartment() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [nameOfDepartment, setNameOfDepartment] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const departmentData = {
      faculty: facultyName,
      name: nameOfDepartment,
      code: departmentCode,
      description: descriptionInput,
      head: headOfDepartment,
      is_active: isActive,
    };
    dispatch(postDepartment(departmentData));
    console.log(departmentData);
  };

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);
  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);
  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const backHandler = () => {
    navigate("/admin/department/homepage");
  };

  const departmentPost = useSelector((state) => state.departmentPost);
  const { loading, success, error } = departmentPost;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    dispatch(getDepartment());
  }

  if (success) {
    setFacultyName("");
    setNameOfDepartment("");
    setDepartmentCode("");
    setHeadOfDepartment("");
    setDescriptionInput("");
    toast({
      title: "Notification",
      description: "Department Successfully Added",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_DEPARTMENT_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_DEPARTMENT_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Department" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <BsBuilding />
                  <h2>Department</h2>
                </div>
                <h1>|</h1>
                <h4>{departmentid && departmentid.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Department</p>
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
                <CircularProgress isIndeterminate color="blue.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Faculty</label>
                  <select
                    type="text"
                    onChange={(e) => setFacultyName(e.target.value)}
                    value={facultyName}
                    required={true}
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
                  <label>Name of Department</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setNameOfDepartment(e.currentTarget.value.slice(0, 30))
                    }
                    value={nameOfDepartment}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Department Code</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setDepartmentCode(e.currentTarget.value.slice(0, 15))
                    }
                    value={departmentCode}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Head of Department</label>
                  <select
                    onChange={(e) => setHeadOfDepartment(e.target.value)}
                    value={headOfDepartment}
                    required={true}
                    className={styles.newDepartmentSelect}
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
                  <label>Description (optional)</label>
                  <textarea
                    type="text"
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    value={descriptionInput}
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>
                      Publish Department
                    </span>
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

export default NewDepartment;
