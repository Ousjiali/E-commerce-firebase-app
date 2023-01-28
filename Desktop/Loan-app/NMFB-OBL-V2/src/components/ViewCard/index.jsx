import React from "react";
import styles from "./styles.module.css";

const ViewCard = ({ title, value }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.titleContainer}>{title}</div>
      <div className={styles.inputContainer}>{value}</div>
    </div>
  );
};

export default ViewCard;
