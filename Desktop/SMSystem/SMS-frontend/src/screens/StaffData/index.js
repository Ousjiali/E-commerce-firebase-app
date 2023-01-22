import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaPeopleArrows } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { getSpecialization } from "../../redux/action/userProfileDataAction";
import { newStaff, totalStaff } from "../../redux/action/staffAction";
import { NEWSTAFF_RESET } from "../../redux/constants/staffConstant";
import { useNavigate } from "react-router-dom";

function StaffData() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);

  const [first_Name, setFirst_Name] = useState("");
  const [middle_Name, setMiddle_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  console.log(isActive);

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      user: {
        first_name: first_Name,
        middle_name: middle_Name,
        last_name: last_Name,
        email,
        specialization,
        is_staff: isActive,
        is_IT: isActive,
        is_superuser: isActive,
        is_dean_of_faculty: isActive,
        is_head_of_department: isActive,
      },
      employee_id,
      specialization,
    };
    dispatch(newStaff(data));
    console.log(data);
  };

  const postNewStaff = useSelector((state) => state.postNewStaff);
  const { loading, success, error } = postNewStaff;

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;

  const pageHandler = () => {
    navigate("/admin/specialization");
  };

  const cancelHandler = () => {
    navigate("/admin/staff/homepage");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    dispatch(totalStaff());
  }

  if (success) {
    setFirst_Name("");
    setMiddle_Name("");
    setLast_Name("");
    setEmail("");
    setSpecialization("");
    setEmployee_id("");
    toast({
      title: "Notification",
      description: "Staff Successfully Added",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: NEWSTAFF_RESET });
  }

  if (error) {
    toast({
      title: "Error",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: NEWSTAFF_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Staff" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <FaPeopleArrows />
                  <h2>Staff</h2>
                </div>
                <h1>|</h1>
                <h4>{allStaff && allStaff.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Staff</p>
              </div>
            </div>
            <div className={styles.profileContent}>
              <button onClick={pageHandler}>Create Specialization</button>
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
                  <label>Employe ID</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setEmployee_id(e.currentTarget.value.slice(0, 11))
                    }
                    value={employee_id}
                    required={true}
                  />
                </div>

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
                    <span className={styles.toggleRound}>Publish Staff</span>
                    {/* <select>
                      <option></option>
                      <option value={isActive ? "false" : "true"}>
                        Publish Head of Department
                      </option>
                      <option value={isActive ? "false" : "true"}>
                        Publish Bursar
                      </option>
                      <option value={isActive ? "false" : "true"}>
                        Publish IT Lead
                      </option>
                    </select> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.submitButton}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={cancelHandler}
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
                isfullWidth
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
    </div>
  );
}

export default StaffData;
