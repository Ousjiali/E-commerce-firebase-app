import * as React from "react";
import styles from "./header.module.scss";
import { FaHome } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";

// const history = useHistory();

// const homeHandler = () => {
//   history.push("/admin/dashboard");
// };

const Header = ({ title }) => (
  <div className={styles.mtn__header}>
    <div className={styles.mtn__header__logo}>
      <div className={styles.imageContainer}>
        <img src={require("../../assets/mtn-logo2.png")} alt="logo" />
      </div>
    </div>

    <div className={styles.mtn__header__text}>
      <h1>{title}</h1>
    </div>

    <div className={styles.mtn__header__icon}>
      <Link to="/">
        <div className={styles.mtn__header__icon2}>
          <FaHome />
          <p>Go Home</p>
        </div>
      </Link>
    </div>
  </div>
);

export default Header;
