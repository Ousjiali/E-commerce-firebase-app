import * as React from "react";
import { useState } from "react";
import { useHistory, Link, useParam } from "react-router-dom";
import {
  Header,
  Select,
  Helpers,
  TextArea,
  Card,
  Spinner,
} from "../../../../Containers";
import styles from "../performance.module.scss";

import { sp } from "@pnp/sp";
import { EmployeeContext } from "../../../../Context/EmployeeContext";

const workHabit = () => {
  const [detail, setDetail] = useState({});
  const [workHabitRating, setWorkHabitRating] = useState(0);
  const [workHabitComment, setWorkHabitComment] = useState("");
  const [communicationRating, setCommunicationRating] = useState(0);
  const [communicationComment, setCommunicationComment] = useState("");
  const [totalPerformanceScore, setTotalPerformanceScore] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = useState("");
  const { id } = React.useContext(EmployeeContext);
  const history = useHistory();

  React.useEffect(() => {
    if (!id) {
      history.push("/");
      return;
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        if (res.length > 0) {
          setWorkHabitRating(res[0].WorkHabitRating);
          setWorkHabitComment(res[0].WorkHabitComment);
          setCommunicationRating(res[0].CommunicatonRating);
          setCommunicationComment(res[0].CommunicationComment);
          setTotalPerformanceScore(res[0].TotalPerformanceScore);
          setLoading(false);
        }
      });
  }, []);

  const nextHandler = (e) => {
    history.push("/behavioral/section1");
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Performance Factor" />
      {loading ? <Spinner /> : null}
      <div className={styles.evaluation__section2__container}>
        <div className={styles.evaluation__section}>
          <Card header="Work Habits">
            <ul>
              <li>
                To what extent does the employee display a positive cooperative
                attitude towards work, assignments and requirements?
              </li>
              <li>
                Consider compliance with established work rules and
                organizational policies
              </li>
            </ul>
          </Card>

          <div className={styles.section1__ratings}>
            <Select
              value={workHabitRating}
              onChange={(e: any) => {
                setWorkHabitRating(e.target.value);
              }}
              title="Rating"
              options={Helpers.rating}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              readOnly={true}
              onChange={(e: any) => {
                setWorkHabitComment(e.target.value);
              }}
              value={workHabitComment}
            />
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <Card header="Communication">
            <ul>
              <li>Consider job related effectiveness in dealing with others</li>
              <li>
                Does the employee express ideas clearly both orally and in
                writting,listen well and respond appropriately
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              onChange={(e) => {
                localStorage.setItem("communicationRating", e.target.value);
                setCommunicationRating(e.target.value);
              }}
              title="Rating"
              value={communicationRating}
              options={Helpers.rating}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>

            <TextArea
              readOnly={true}
              onChange={(e) => {
                setCommunicationComment(e.target.value);
              }}
              value={communicationComment}
            />
          </div>
          <div className={styles.evaluation__section}>
            <Card header="Total Performance Score">
              <input
                className={styles.score__input}
                title="Total Performance Scores"
                style={{ backgroundColor: "white" }}
                value={totalPerformanceScore}
                type="text"
                readOnly
              />
            </Card>
          </div>
        </div>
        <div className={styles.mtn__btnContaainer2}>
          <div>
            <button
              type="button"
              className="mtn__btn mtn__blackOutline"
              onClick={backHandler}
            >
              Previous
            </button>
          </div>

          <div>
            <button
              className="mtn__btn mtn__black"
              type="button"
              onClick={nextHandler}
              disabled={loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default workHabit;
