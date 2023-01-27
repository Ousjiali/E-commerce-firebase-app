import * as React from "react";
import styles from "./styles.module.scss";
import { HiUserGroup } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { sp, } from "@pnp/sp"
import { graph } from "@pnp/graph";
import '@pnp/graph/users';

const LandingPage = () => {

  const [admin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      sp.web.lists.getByTitle(`Administrator`).items.filter(`Email eq '${response.Email}'`).get().then
        ((res) => {
          if (res.length > 0) {
            setAdmin(true)
          }
        })
    });
  }, [])

  return (
    <div className={styles.LandingPageContainer}>
      <div className={styles.bgContainer}>
        <div className={styles.pageContainer}>
          <div className={styles.pageContent1}>
            <img src={require("../../assets/logo.png")} alt="logo" />
            <h1>Welcome to Our </h1>
            <p>Voting</p>
            <span>Portal</span>
          </div>
        </div>
        <div className={styles.pageContainer2}>
          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <Link to="/registration">
                <div className={styles.register}><HiUserGroup /> </div>
                <p>Register to vote</p>
              </Link>
            </div>
          </div>

          <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <Link to="/candidate">
                <BsFillPersonFill />
                <p>Aspirant</p>
              </Link>
            </div>
          </div>

          {admin && <div className={styles.pageCard}>
            <div className={styles.pgInCard}>
              <Link to="/admin">
                <RiAdminFill />
                <p>Admin</p>
              </Link>
            </div>
          </div>}


        </div>
      </div>
    </div>
  );
};
export default LandingPage;
