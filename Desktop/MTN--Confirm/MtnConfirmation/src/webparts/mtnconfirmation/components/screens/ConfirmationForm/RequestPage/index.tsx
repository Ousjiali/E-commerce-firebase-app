import * as React from "react";
import styles from "./fonsus.module.scss";
import { useHistory } from "react-router-dom";

const RequestPage = () => {
  const history = useHistory();

  const nextHandler = () => {
    history.push("/pendingrequests");
  };

  return (
    <div>
      <div className={styles.mtn__yellologo}>
        <img src={require("../../../assets/logo.png")} alt="logo" />
      </div>
      <div className={styles.yello__container}>
        <div className={styles.yello__Con}>
          <div className={styles.yello__side}>
            <div className={styles.mtn__yello}>Y'ello</div>
            <span>You have a new request that reqires your attention</span>
            <div className={styles.mtn__btnCon}>
              <button
                className={`${styles.mtn__btn} ${styles.mtn__black}`}
                type="button"
                onClick={nextHandler}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
