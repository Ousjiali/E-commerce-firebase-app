import * as React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiOutlineAliwangwang,
  AiOutlineBook,
  AiOutlineUsergroupAdd,
  AiFillSignal,
  AiOutlineLogout,
  AiOutlineDisconnect,
  AiFillFileAdd,
} from "react-icons/ai";
const AdminNavigation = ({
  dashboard = "",
  pending = "",
  approved = "",
  declined = "",
  config = "",
  report = "",
  revoked = "",
  guideline = "",
}) => {
  return (
    <div className={styles.mtn__navigation}>
      <div className={styles.mtn__logo}>
        <img src={require("../../assets/logo.png")} alt="MTN Logo" />
      </div>
      <div className={styles.mtn__url}>
        <ul>
          <li className={styles[dashboard]}>
            <Link to={`/admin`}>
              <AiOutlineAppstore />
              Dashboard
            </Link>
          </li>
          <li className={styles[pending]}>
            <Link to={`/admin/pending`}>
              <AiOutlineAliwangwang />
              Pending
            </Link>
          </li>
          <li className={styles[approved]}>
            <Link to={`/admin/approved`}>
              <AiOutlineBook />
              Approved
            </Link>
          </li>
          <li className={styles[declined]}>
            <Link to={`/admin/declined`}>
              <AiOutlineDisconnect />
              Declined
            </Link>
          </li>
          <li className={styles[revoked]}>
            <Link to={`/admin/revoked`}>
              <AiOutlineDisconnect />
              Revoked
            </Link>
          </li>
          <li className={styles[guideline]}>
            <Link to={`/admin/guideline`}>
              <AiFillFileAdd />
              Guideline
            </Link>
          </li>
          <li className={styles[config]}>
            <Link to={`/admin/add`}>
              <AiOutlineUsergroupAdd />
              Configuration
            </Link>
          </li>
          <li className={styles[report]}>
            <Link to={`/admin/reports`}>
              <AiFillSignal />
              Reports
            </Link>
          </li>
          <li>
            <Link to={`/`}>
              <AiOutlineLogout />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavigation;
