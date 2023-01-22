import React from "react";
import logo from "../../assets/img-login.svg";
import styles from "./styles.module.css";
const AccountHeader = ({ instruction, title, children }) => {
  return (
    <div className={styles.header}>
      <div className={styles.circle}>
        <img src={logo} alt="logo" />
      </div>
      <h2>{title}</h2>
      <p>{instruction}</p>
      {children}
    </div>
  );
};

export default AccountHeader;
