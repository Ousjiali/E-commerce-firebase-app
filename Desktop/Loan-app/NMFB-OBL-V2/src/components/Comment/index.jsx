import React from "react";
import styles from "./styles.module.css";

const Comment = ({ comments, role, action }) => {
  return (
    <div className={styles.comment}>
      <h5>Role: {role}</h5>
      <p>Action: {action}</p>

      <p>Comments: </p>

      <div className={styles.inputContainer}>{comments}</div>
    </div>
  );
};

export default Comment;
