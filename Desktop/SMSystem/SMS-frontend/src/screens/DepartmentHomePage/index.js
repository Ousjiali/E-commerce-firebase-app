import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { getDepartment } from "../../redux/action/departmentAction";
import { getfaculty } from "../../redux/action/facultyAction";

function FacultyHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  console.log(departmentid);

  const departmentPost = useSelector((state) => state.departmentPost);
  const { loading } = departmentPost;

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  const getNumberOfDepartment = (id) => {
    const foundItems =
      departmentid &&
      departmentid.filter(({ faculty }) => {
        return faculty.id === id;
      });
    return foundItems ? foundItems.length : 0;
  };

  const percentage = (id) => {
    const findItems =
      departmentid &&
      departmentid.filter(({ faculty }) => {
        return faculty.id === id;
      });
    return findItems ? findItems.length : 0;
  };

  const nextHandler = () => {
    navigate("/admin/department");
  };
  const manageHandler = () => {
    navigate("/admin/managedepartment");
  };

  // const percentage = 5;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Department" />
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
                  Create Department
                </button>
              )}

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
                  onClick={manageHandler}
                >
                  Manage Department
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
                          <h6>{getNumberOfDepartment(item.id)}</h6>
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
                  <BsBuilding />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>Newly Created Depart.</h2>
                  <h3>{departmentid && departmentid.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <BsBuilding />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Created Depart.</h2>
                  <h3>{departmentid && departmentid.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHomePage;
