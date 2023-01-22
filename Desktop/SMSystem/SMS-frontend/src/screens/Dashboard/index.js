import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaUserGraduate } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { BsBuilding } from "react-icons/bs";
import { ImBook } from "react-icons/im";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../redux/action/noticeBoardAction";
import { getfaculty } from "../../redux/action/facultyAction";
import { totalStudent } from "../../redux/action/studentAction";
import { totalStaff } from "../../redux/action/staffAction";
import { getDepartment } from "../../redux/action/departmentAction";
import { getCourse } from "../../redux/action/courseAction";
import { Link } from "react-router-dom";
// import MyCalendar from "../../components/Calendar";

const Dashboard = (props) => {
  const [calDate, setCalDate] = useState(new Date());

  // let {id} = useParams();

  const dispatch = useDispatch();

  function onChange() {
    setCalDate(calDate);
  }

  useEffect(() => {
    dispatch(totalStudent());
  }, [dispatch]);

  const totalStudentNo = useSelector((state) => state.totalStudentNo);
  const { allStudent } = totalStudentNo;

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const courseGet = useSelector((state) => state.courseGet);
  const { getCourseId } = courseGet;

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  const noticeGet = useSelector((state) => state.noticeGet);
  const { allNotice } = noticeGet;

  return (
    <div className={styles.dashboardConatiner}>
      <Sidebar />
      <div className={styles.dashboard}>
        <HeaderNav title="Dashboard" />
        <div className={styles.dashboardBox}>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCount}>
              <p>
                <FaUserGraduate />
                <h5>Students</h5>
              </p>
              <h1>|</h1>
              <Link to="/admin/managestudent">
                <h3> {allStudent && allStudent.length}</h3>
              </Link>
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCount2}>
              <p>
                <MdGroups />
                <h5>Staff</h5>
              </p>
              <h1>|</h1>
              <Link to="/admin/managestaff">
                <h3>{allStaff && allStaff.length}</h3>
              </Link>
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCount3}>
              <p>
                <FaCity />
                <h5>Faculty</h5>
              </p>
              <h1>|</h1>
              <Link to="/admin/managefaculty">
                <h3>{faculty && faculty.length}</h3>
              </Link>
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCount4}>
              <p>
                <BsBuilding />

                <h5>Department</h5>
              </p>
              <h1>|</h1>
              <Link to="/admin/managedepartment">
                <h3>{departmentid && departmentid.length}</h3>
              </Link>
            </div>
          </div>
          <div className={styles.dashboardCard}>
            <div className={styles.dashboardCount5}>
              <p>
                <ImBook />
                <h5>Course</h5>
              </p>
              <h1>|</h1>
              <Link to="/admin/managecourse">
                <h3>{getCourseId && getCourseId.count}</h3>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardCalendar}>
            <div className={styles.calendarTitle}>
              <span>Calendar</span>
            </div>
            <div className={styles.reactCalendar}>
              <Calendar onChange={onChange} value={calDate} />
              {/* <MyCalendar styles={{ height: "500", width: "100" }} /> */}
            </div>
          </div>
          <div className={styles.dashboardNotice}>
            <div className={styles.noticeTitle}>
              <span>Notice Board</span>
            </div>
            {allNotice &&
              allNotice.map((item, i) => (
                <div key={i} className={styles.noticeContent}>
                  <h2>{item.timestamp}</h2>
                  <h4>{item.title}</h4>
                  <Link to="/admin/managenotice">
                    <h5 className={styles.noticeComment}>{item.message}</h5>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
