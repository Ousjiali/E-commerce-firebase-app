import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaCity } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createNewFaculty, getfaculty } from "../../redux/action/facultyAction";
import { totalStaff } from "../../redux/action/staffAction";
import { CREATE_FACULTY_RESET } from "../../redux/constants/facultyConstant";
import { useNavigate } from "react-router-dom";

function Faculty() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [faculty_Name, setFaculty_Name] = useState("");
  const [faculty_Code, setFaculty_Code] = useState("");
  const [deanOfFaculty, setDeanOfFaculty] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  console.log(isActive);

  const submitHandler = (e) => {
    e.preventDefault();
    const facultyData = {
      name: faculty_Name,
      code: faculty_Code,
      description: description,
      dean: deanOfFaculty,
      is_active: isActive,
    };
    dispatch(createNewFaculty(facultyData));
    console.log(facultyData);
  };

  const postNewFaculty = useSelector((state) => state.postNewFaculty);
  const { loading, success, error } = postNewFaculty;

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;

  const backHandler = () => {
    navigate("/admin/faculty/homepage");
  };

  if (success) {
    dispatch(getfaculty());
  }

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    setFaculty_Name("");
    setFaculty_Code("");
    setDescription("");
    setDeanOfFaculty("");
    toast({
      title: "Notification",
      description: "Faculty Successfully Added",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_FACULTY_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_FACULTY_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Faculty" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <FaCity />
                  <h2>Faculty</h2>
                </div>
                <h1>|</h1>
                <h4>{faculty && faculty.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Faculty</p>
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
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="blue.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Faculty</label>
                  <input
                    type="text"
                    onChange={(e) => setFaculty_Name(e.target.value)}
                    value={faculty_Name}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Faculty Code</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFaculty_Code(e.currentTarget.value.slice(0, 11))
                    }
                    value={faculty_Code}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Dean of Faculty</label>
                  <select
                    onChange={(e) => setDeanOfFaculty(e.target.value)}
                    value={deanOfFaculty}
                    required={true}
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
                  <label>Description (optional)</label>
                  <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>Publish Faculty</span>
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

export default Faculty;
