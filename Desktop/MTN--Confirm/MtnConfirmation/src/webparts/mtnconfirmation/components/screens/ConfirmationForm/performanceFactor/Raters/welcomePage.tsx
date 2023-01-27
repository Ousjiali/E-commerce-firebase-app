import { sp } from "@pnp/sp";
import { number } from "echarts";
import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Header,
  Select,
  Helpers,
  Card,
  TextArea,
  Modal,
} from "../../../../Containers";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import styles from "../performance.module.scss";

const RatersKnowlegdeFactor = () => {
  const history = useHistory();

  const { id } = React.useContext(EmployeeContext);
  const [employee_Name, setEmployee_Name] = useState("");
  const [msg, setMsg] = useState(false);
  const [workMsg2, setWorkMsg2] = useState(false);
  const [knowlegdeMsg, setknowlegdeMsg] = useState(false);
  const [workMsg, setWorkMsg] = useState(false);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
      return;
    }
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        console.log(res);
        setEmployee_Name(res[0].EmployeeName);
      });
  }, []);

  const prevHandler = () => {
    history.goBack();
  };

  const nextHandler = () => {
    history.push("/rater/performance/section1");
  };

  return (
    <>
      <Header title="Employee Confirmation Portal" />
      <div className={styles.center}>
        <div className={styles.center_conformation}>
          <h3>
            You are about to rate {employee_Name} within the period he/she has
            worked with you under supervision
          </h3>
          <div className={styles.mtn__btnContaainer2}>
            <button className="mtn__btn mtn__black" onClick={prevHandler}>
              Cancel
            </button>

            <button
              onClick={nextHandler}
              className="mtn__btn mtn__blue"
              type="button"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatersKnowlegdeFactor;
