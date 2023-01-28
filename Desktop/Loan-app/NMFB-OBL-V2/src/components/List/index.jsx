import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import styles from "./styles.module.css";
const List = ({ name, remove }) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        <p>{name}</p>
        <span className="btnSMtable green" onClick={remove}>
          <FaTimesCircle />
        </span>
      </div>
    </div>
  );
};

export default List;
