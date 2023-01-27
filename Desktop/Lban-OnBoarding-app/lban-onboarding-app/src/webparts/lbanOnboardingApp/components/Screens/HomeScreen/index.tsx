import * as React from "react";
import styles from "./home.module.scss";
import home from "./home.module.scss";

const HomeScreen = () => {
  return (
    <div className={home.homePage}>
      <div className={home.homeContainer}>
        <img src={require("../../assets/lban-logo.png")} alt="logo" />
        <div className={home.homeText}>
          <h2>Welcome to</h2>
          <span>Onboarding Training Portal</span>
        </div>
        <div className={styles.homeBtn}>
          <button className={styles.homeButton}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
