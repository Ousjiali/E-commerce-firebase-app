import * as React from "react";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { sp } from "@pnp/sp";

const HomeScreen = () => {
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists
        .getByTitle(`Admin`)
        .items.filter(
          `Title eq '${response.DisplayName}' and Role eq 'HR HCM Administrator'`
        )
        .get()
        .then((res) => {
          if (res.length > 0) {
            setUser("admin");
          }
        });
    });
  }, []);

  return (
    <>
      <div className={styles.app}>
        <div className={styles.mtn__banner}>
          <div className={styles.mtn__logoContainer}>
            <div className={styles.logo}>
              <img src={require("../../assets/mtn-logo2.png")} alt="logo" />
            </div>
            <div className={styles.text}>
              <h3>Employee Confirmation</h3>
              <h1>PORTAL</h1>
            </div>
          </div>
          {user === "admin" ? (
            <div className={styles.btnContainer}>
              <Link to={`/admin/dashboard`} className="mtn__btn mtn__black">
                Proceed
              </Link>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      ;
    </>
  );
};

export default HomeScreen;
