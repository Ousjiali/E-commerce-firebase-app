import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { totalStudent } from "../../redux/action/studentAction";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
// import { BsFillPersonDashFill } from "react-icons/bs";
import { BsPersonCheckFill } from "react-icons/bs";
import { getfaculty } from "../../redux/action/facultyAction";

function StudentHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(totalStudent());
  }, [dispatch]);

  const totalStudentNo = useSelector((state) => state.totalStudentNo);
  const { allStudent } = totalStudentNo;
  console.log(allStudent);

  const postNewStudent = useSelector((state) => state.postNewStudent);
  const { loading } = postNewStudent;

  const nextHandler = () => {
    navigate("/admin/student");
  };
  const manageHandler = () => {
    navigate("/admin/managestudent");
  };

  const getNumberOfStudents = (id) => {
    const foundItems =
      allStudent &&
      allStudent.filter(({ specialization }) => {
        return specialization.department.faculty === id;
      });
    return foundItems ? foundItems.length : 0;
  };

  const percentage = (id) => {
    const findItems =
      allStudent &&
      allStudent.filter(({ specialization }) => {
        return specialization.department.faculty === id;
      });
    return findItems ? findItems.length : 0;
  };

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  console.log(faculty);

  useEffect(() => {
    dispatch(totalStudent());
  }, [dispatch]);

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Student" />
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
          </div>
          <div className={styles.profileContent}>
            <div className={styles.submitButton}>
              {loading ? (
                <Button
                  isLoading
                  loadingText="Loading..."
                  colorScheme="green"
                  variant="outline"
                  style={{ height: "2rem" }}
                />
              ) : (
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={nextHandler}
                >
                  Create Student
                </button>
              )}

              {loading ? (
                <Button
                  isLoading
                  loadingText="Validating Credentials..."
                  colorScheme="teal"
                  variant="outline"
                  style={{ height: "3rem" }}
                />
              ) : (
                <button
                  type="submit"
                  className={styles.subButton}
                  onClick={manageHandler}
                >
                  Manage Student
                </button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.profileBox}>
            <div className={styles.pageTitle}>
              <span>Analytics</span>
            </div>
            <div className={styles.profileGridBox}>
              <div className={styles.profileEachBox}>
                <div className={styles.statsBox}>
                  {faculty &&
                    faculty.map((item, i) => (
                      <div key={i} className={styles.stats}>
                        <h5>{item.name}</h5>
                        <div className={styles.statsCount}>
                          <h6>{getNumberOfStudents(item.id)}</h6>
                        </div>
                        <div className={styles.statBoxmap}>
                          <h1>|</h1>
                          <div className={styles.statsRating}>
                            <CircularProgressbar
                              value={percentage(item.id)}
                              text={`${percentage(item.id)}%`}
                            />
                          </div>
                          <div className={styles.statsIcon}>
                            <FaPlay />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.profileBox2}>
            <div className={styles.pageTitle2}>
              <span>Statistics</span>
            </div>
            <div className={styles.profileGridCard}>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <BsPersonFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>Newly Created Students</h2>
                  <h3>{allStudent && allStudent.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <BsPersonCheckFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Created Students</h2>
                  <h3>{allStudent && allStudent.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
              {/* <div className={styles.profileEachCard}>
                <div className={styles.profileIcon2}>
                  <BsFillPersonDashFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Deleted Students</h2>
                  <h3>53</h3>
                </div>
                <div className={styles.profileCardIcon}><FaPlay /></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomePage;
