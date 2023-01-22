import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewStudent,
  totalStudent,
} from "../../redux/action/studentAction";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getSpecialization } from "../../redux/action/userProfileDataAction";
import { BiArrowBack } from "react-icons/bi";
import { CREATE_STUDENT_RESET } from "../../redux/constants/studentConstant";
import { useNavigate } from "react-router-dom";

function StudentData() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [first_Name, setFirst_Name] = useState("");
  const [middle_Name, setMiddle_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [matric_no, setMatric_no] = useState("");
  const [student_id, setStudent_id] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  console.log(isActive);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      user: {
        first_name: first_Name,
        middle_name: middle_Name,
        last_name: last_Name,
        email,
        specialization,
      },
      matric_no,
      student_id,
      specialization,
    };
    dispatch(createNewStudent(data));
  };

  const postNewStudent = useSelector((state) => state.postNewStudent);
  const { loading, success, error } = postNewStudent;

  useEffect(() => {
    dispatch(totalStudent());
  }, [dispatch]);

  const totalStudentNo = useSelector((state) => state.totalStudentNo);
  const { allStudent } = totalStudentNo;

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;

  const backHandler = () => {
    navigate("/admin/student/homepage");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    dispatch(totalStudent());
  }

  if (success) {
    setFirst_Name("");
    setMiddle_Name("");
    setLast_Name("");
    setMatric_no("");
    setStudent_id("");
    setEmail("");
    setSpecialization("");
    toast({
      title: "Notification",
      description: "Student Successfully Added",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: CREATE_STUDENT_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: error,
      status: "error",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: CREATE_STUDENT_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Student" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <FaUserGraduate />
                  <h2>Students</h2>
                </div>
                <h1>|</h1>
                <h4>{allStudent && allStudent.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Student</p>
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
                    loadingText="Loading..."
                    colorScheme="teal"
                    variant="outline"
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
                  <label>First Name</label>
                  <input
                    type="text"
                    onChange={(e) => setFirst_Name(e.target.value)}
                    value={first_Name}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Middle Name</label>
                  <input
                    type="text"
                    onChange={(e) => setMiddle_Name(e.target.value)}
                    value={middle_Name}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    onChange={(e) => setLast_Name(e.target.value)}
                    value={last_Name}
                    required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Student Identity Number</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setStudent_id(e.currentTarget.value.slice(0, 11))
                    }
                    value={student_id}
                    required={true}
                  />
                </div>

                {/* <div className={styles.inputBox}>
                  <label>Matric No.</label>
                  <input
                    type="number"
                    onChange={(e) =>
                      setMatric_no(e.currentTarget.value.slice(0, 11))
                    }
                    value={matric_no}
                    required={true}
                  />
                </div> */}

                <div className={styles.inputBox}>
                  <label>Specialization</label>
                  <select
                    onChange={(e) => setSpecialization(e.target.value)}
                    value={specialization}
                    required={true}
                    className={styles.newStudentSelect}
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
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>Publish Student</span>
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

export default StudentData;
