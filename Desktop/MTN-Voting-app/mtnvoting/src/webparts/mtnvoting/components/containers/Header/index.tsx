import * as React from "react";
import styles from "./styles.module.scss";
import { useHistory } from 'react-router-dom'
const Header = ({ title }) => {
  const history = useHistory()
  const prevHandler =() =>{
    history.push("/"); 
  }
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.employee__Title}>
          <h3 onClick={prevHandler}>Go Back</h3>
        </div>
      {/* <div className={styles.headerImg}>
        <img src={require("../../assets/logo.png")} alt="" />
      </div> */}
    </div>
  );
};

export default Header;
