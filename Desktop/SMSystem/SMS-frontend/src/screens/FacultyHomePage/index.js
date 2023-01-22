import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaCity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { FaPlay } from "react-icons/fa";
import { getfaculty } from "../../redux/action/facultyAction";

function FacultyHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  const postNewFaculty = useSelector((state) => state.postNewFaculty);
  const { loading } = postNewFaculty;

  const nextHandler = () => {
    navigate("/admin/faculty");
  };
  const manageHandler = () => {
    navigate("/admin/managefaculty");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Faculty" />
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
                  Create Faculty
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
                  Manage Faculty
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
                        <h4>{item.name}</h4>
                        <div className={styles.statBoxmap}>
                          <h1>|</h1>
                          <div className={styles.statsRating}>
                            <h5>Year</h5>
                            <h6>2022</h6>
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
                  <FaCity />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>Newly Created Faculty</h2>
                  <h3>{faculty && faculty.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <FaCity />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Created Faculty</h2>
                  <h3>{faculty && faculty.length}</h3>
                </div>
                <div className={styles.profileCardIcon}>{/* <FaPlay /> */}</div>
              </div>
              {/* <div className={styles.profileEachCard}>
                <div className={styles.profileIcon2}>
                  <BsFillPersonDashFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Deleted Staff</h2>
                  <h3>2</h3>
                </div>
                <div className={styles.profileCardIcon}>
                  <FaPlay />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyHomePage;
