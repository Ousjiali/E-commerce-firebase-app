import * as React from "react";
import styles from "./styles.module.scss";
import { sp } from "@pnp/sp";

const TitleHeader = ({ title }) => {
  const [data, setData] = React.useState({ DisplayName: "", Email: "" });

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setData(response);
    });
  }, []);

  return (
    <div className={styles.header}>
      {/* <img src={require("../../assets/mtnpic.png")} alt="logo" /> */}
      <div className={styles.title}>{title}</div>

      {/* <div className={styles.info}>
        <h3>{data.DisplayName}</h3>
        <p>{data.Email}</p>
      </div> */}
    </div>
  );
};

export default TitleHeader;
