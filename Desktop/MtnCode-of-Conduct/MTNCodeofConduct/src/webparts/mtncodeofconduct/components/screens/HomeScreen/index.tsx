import * as React from "react";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { sp } from "@pnp/sp";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
// import { RiAdminFill } from "react-icons/ri";

const HomeScreen = () => {
  const [admin, setAdmin] = React.useState(false);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists
        .getByTitle(`Admin`)
        .items.filter(`Email eq '${response.UserProfileProperties[19].Value}'`)
        .get()
        .then((res) => {
          if (res.length > 0) {
            setAdmin(true);
          }
        });
      console.log(response.UserProfileProperties[19].Value);
    });
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.mtn__banner}>
        <div className={styles.text}>
          <img src={require("../../assets/mtnpic.png")} alt="logo" />
          <h5>Welcome to</h5>
          <h3>Code of Conduct</h3>
          <h1>Pledge</h1>
        </div>

        <div className={styles.btnContainer}>
          <Link to={`/register/pledge`} className="mtn__btn mtn__black">
            Proceed <BsArrowRightSquareFill />
          </Link>
          {admin && (
            <Link
              to={`/admin/pledge/dashboard`}
              className="mtn__btn mtn__black"
            >
              Admin <MdOutlineAdminPanelSettings />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
