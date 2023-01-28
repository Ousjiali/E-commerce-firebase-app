import React, { useContext, useState } from "react";
import { Navigator } from "./Navigator";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../context";
import { Link } from "react-router-dom";
const Navigation = ({ name }) => {
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <>
      <ToastContainer />
      <div className={styles.mobileNav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Upcoma Logo" />
          </Link>
        </div>
        <div className={styles.bars}>
          {toggle ? (
            <FaTimes onClick={() => setToggle(!toggle)} />
          ) : (
            <FaBars onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
      <div className={toggle ? styles.mobileNavigation : styles.navigation}>
        {!toggle && (
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Upcoma Logo" />
            </Link>
          </div>
        )}
        <Navigator role={user?.role} name={name} />
      </div>
    </>
  );
};

export default Navigation;
