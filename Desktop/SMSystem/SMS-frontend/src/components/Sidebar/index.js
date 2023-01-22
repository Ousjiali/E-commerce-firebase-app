import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import personlog from "../../assets/personlog.png";
import { RiDashboardFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaUserGraduate } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri";
import { userLogout } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";

function Sidebar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout());
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebarLogo}>
        <img src={personlog} alt="User Avatar" />
      </div>
      <div className={styles.sidebarContent}>
        <ul>
          <Link to="/admin/dashboard">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <RiDashboardFill />
              </div>
              <p>Dashboard</p>
            </li>
          </Link>

          <Link to="/admin/viewprofiledata">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <CgProfile />
              </div>
              <p>Profile</p>
            </li>
          </Link>

          <Link to="/admin/student/homepage">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <FaUserGraduate />
              </div>
              <p>Student</p>
            </li>
          </Link>
          <Link to="/admin/staff/homepage">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <MdGroups />
              </div>
              <p>Staff</p>
            </li>
          </Link>
          <Link to="/admin/faculty/homepage">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <FaCity />
              </div>
              <p>Faculty</p>
            </li>
          </Link>
          <Link to="/admin/department/homepage">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <BsBuilding />
              </div>
              <p>Department</p>
            </li>
          </Link>
          <Link to="/admin/course/homepage">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <ImBook />
              </div>
              <p>Course</p>
            </li>
          </Link>
          <Link to="/admin/noticeboard">
            <li className={styles.iconsBody}>
              <div className={styles.icons}>
                <BsFillInfoSquareFill />
              </div>
              <p>Notice</p>
            </li>
          </Link>

          <Link to="/" onClick={logoutHandler}>
            <li className={styles.iconsBodyLogout}>
              <div className={styles.icons}>
                <RiLogoutCircleLine />
              </div>
              <p>Logout</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
