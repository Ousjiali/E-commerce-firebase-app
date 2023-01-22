import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import {  useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/userActions";

const Navigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
 

  const myDetail = JSON.parse(localStorage.getItem("candidateDetail"));
  const user = myDetail;

  const logoutHandler = () => {
    dispatch(logOut());
    setTimeout(() => history.push("/login"), [1000]);
  };

  return (
    <div className={styles.navigation}>
      <div className={styles.title}>
        <Link to="/">
          <h3>E-Interview</h3>
        </Link>
      </div>
      <div className={styles.btnContainer}>
        {user && user ? (
          <>
            <h3 className={styles.paddingTop}>
              {" "}
              candidate: {user && user.data.firstName}
            </h3>
            <Link to="/#" className="btn gold" onClick={logoutHandler}>
              Log out
            </Link>
          </>
        ) : (
          <>
            <div className="drop">
              <button className="btn white">Sign In</button>
              <div className="drop-content">
                <Link to="/login">Sign In</Link>
                <br />
                <Link to="/adminlogin">Admin Login</Link>
              </div>
            </div>
            <Link to="/signup" className="btn gold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
