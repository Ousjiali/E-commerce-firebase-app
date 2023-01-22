import React from "react";
import { useDispatch } from "react-redux";
import { MdSpaceDashboard } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { FaFolderPlus, FaPiggyBank } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { adminLogout } from "../../redux/actions/userActions";

function Sidebar() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(adminLogout());
  };

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <h4 className="sidebar_title">
          <Link to="/">
            <strong>E-INTERVIEW</strong>
          </Link>
        </h4>

        <div className="sidebar_icons">
          <ul>
            <li>
              <Link to="/dashboard">
                <div className="icon_container">
                  <div className="icon">
                    <MdSpaceDashboard />
                  </div>
                  <div className="icon_name">
                    <p>Dashboard</p>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <div className="icon_container">
                  <div className="icon">
                    <MdPerson />
                  </div>
                  <div className="icon_name">
                    <p>Exam Candidates</p>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/adminTest">
                <div className="icon_container">
                  <div className="icon">
                    <FaFolderPlus />
                  </div>
                  <div className="icon_name">
                    <p>Add Test</p>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/allcandidate">
                <div className="icon_container">
                  <div className="icon">
                    <IoIosPeople />
                  </div>
                  <div className="icon_name">
                    <p>All Candidates</p>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/questionbank">
                <div className="icon_container">
                  <div className="icon">
                    <FaPiggyBank />
                  </div>
                  <div className="icon_name">
                    <p>Question Bank</p>
                  </div>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/adminregister">
                <div className="icon_container">
                  <div className="icon">
                    <MdAdminPanelSettings />
                  </div>
                  <div className="icon_name">
                    <p>Admin</p>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/adminlogin" onClick={logoutHandler}>
                <div className="logout">
                  <div className="icon_container">
                    <div className="icon">
                      <MdOutlineLogout />
                    </div>
                    <div className="icon_name">
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
