import * as React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import {
  AiOutlineAppstore,
  AiFillSignal,
  AiOutlineLogout,
  AiOutlineHourglass,
  AiOutlineFileDone,
  AiOutlineException,
  AiOutlineUserAdd,
} from "react-icons/ai";
const Navigation = ({
  dashboard = "",
  pending = "",
  complete = "",
  config = "",
  report = "",
  init = "",
}) => {
  return (
    <div className={styles.mtn__navigation}>
      <div className={styles.mtn__logo}>
        <img src={require("../../assets/mtn-logo2.png")} alt="MTN Logo" />
      </div>
      <div className={styles.mtn__url}>
        <ul>
          <li className={styles[dashboard]}>
            <Link to={`/admin/dashboard`}>
              <AiOutlineAppstore />
              Dashboard
            </Link>
          </li>
          <li className={styles[init]}>
            <Link to={`/admin/confirmation`}>
              <AiOutlineHourglass />
              Initiate Confirmation
            </Link>
          </li>
          <li className={styles[pending]}>
            <Link to={`/admin/pending`}>
              <AiOutlineException />
              Pending Requests
            </Link>
          </li>
          <li className={styles[complete]}>
            <Link to={`/admin/completed`}>
              <AiOutlineFileDone />
              Completed Requests
            </Link>
          </li>
          <li className={styles[config]}>
            <Link to={`/admin/config`}>
              <AiOutlineUserAdd />
              Config
            </Link>
          </li>
          {/* <li className={styles[report]}><Link to={`/admin/reports`}><AiFillSignal />Reports</Link></li> */}
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

export default Navigation;
