import * as React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { sp } from "@pnp/sp";
import {
  AiOutlineAppstore,
  AiOutlineLogout,
  AiOutlineFileDone,
} from "react-icons/ai";
import { BsViewList } from "react-icons/bs";
import { GrCompliance, GrConfigure } from "react-icons/gr";
const Navigation = ({
  dashboard = "",
  status = "",
  report = "",
  config = "",
  init = "",
}) => {
  const [data, setData] = React.useState({ DisplayName: "", Email: "" });

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className={styles.mtn__navigation}>
      <div className={styles.mtn__logo}>
        <img src={require("../../assets/mtnpic.png")} alt="MTN Logo" />
      </div>

      <div className={styles.admin__title}>
        <h3>{data.DisplayName}</h3>
        <p>Admin</p>
      </div>

      <div className={styles.mtn__url}>
        <ul>
          <li className={styles[dashboard]}>
            <Link to={`/admin/pledge/dashboard`}>
              <AiOutlineAppstore />
              Dashboard
            </Link>
          </li>
          {/* <li className={styles[init]}>
            <Link to={`/admin/conduct/pledge`}>
              <BsViewList />
              Code of Conduct Pledge
            </Link>
          </li> */}
          <li className={styles[status]}>
            <Link to={`/admin/compliance/status`}>
              <GrCompliance />
              Compliance Status
            </Link>
          </li>
          <li className={styles[config]}>
            <Link to={`/admin/config/roles/add`}>
              <GrConfigure />
              Configure
            </Link>
          </li>
          <li className={styles[report]}>
            <Link to={`/admin/report/log`}>
              <AiOutlineFileDone />
              Report Log
            </Link>
          </li>
          {/* <li className={styles[config]}>
            <Link to={`/admin/config`}>
              <AiOutlineUserAdd />
              Config
            </Link>
          </li> */}
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
