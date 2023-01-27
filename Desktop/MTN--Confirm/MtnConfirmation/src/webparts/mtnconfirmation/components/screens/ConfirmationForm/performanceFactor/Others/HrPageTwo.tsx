import { sp } from "@pnp/sp";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Select,
  Helpers,
  TextArea,
  Card,
  Spinner,
} from "../../../../Containers";
import styles from "../performance.module.scss";

const HRworkHabit = () => {
  const [detail, setDetail] = useState({});
  const [workHabitRating, setWorkHabitRating] = useState(0);
  const [workHabitComment, setWorkHabitComment] = useState("");
  const [managerComment, setManagerComment] = useState("");
  const [MHRBPComment, setMHRBPComment] = useState("");
  const [communicationRating, setCommunicationRating] = useState(0);
  const [communicationComment, setCommunicationComment] = useState("");
  const [totalPerformanceScore, setTotalPerformanceScore] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = useState("");
  const history = useHistory();
  // const {id} = useParam()
  const [data, setData] = useState([]);

  const backHandler = () => {
    history.goBack();
  };

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties.get().then((res) => {
      setDetail({ res });
      sp.web.lists
        .getByTitle("Admin")
        .items.filter(`Email eq '${res?.Email}' `)
        .get()
        .then((res) => {
          setRole(res[0] ? res[0].Role : "Employee");
        });
    });
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.getById(1)
      .get()
      .then((res) => {
        setData(res[0]);
        setLoading(false);
        setWorkHabitRating(res.workHabitRating);
        setWorkHabitComment(res.workHabitComment);
        setCommunicationRating(res.communicatonRating);
        setCommunicationComment(res.communicationComment);
        setTotalPerformanceScore(res.totalPerformanceScore);
      });
    sp.web.lists
      .getByTitle("EvaluationComments")
      .items.getById(1)
      .get()
      .then((res) => {
        setData(res[0]);
        setMHRBPComment(res.MHRBPComment);
        setManagerComment(res.ManagerIndustrialComments);
        setLoading(false);
      });
  }, []);

  const nextHandler = (e) => {
    history.push();
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
            \
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
            <div></div>

            <div className={styles.section1__comments}>
              <h2>Manager's Comment</h2>

              <TextArea
                readOnly={true}
                onChange={(e) => {
                  setCommunicationComment(e.target.value);
                }}
                value={managerComment}
              />
            </div>
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <div></div>
          <div></div>
          <div className={styles.section1__comments}>
            <h2>MHRBP’s Comment</h2>

            <TextArea
              readOnly={true}
              onChange={(e) => {
                setCommunicationComment(e.target.value);
              }}
              value={MHRBPComment}
            />
          </div>
        </div>

        <div className={styles.evaluation__section__button}>
          <div className="mtn__btnContaainer">
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
                onClick={nextHandler}
                className="mtn__btn mtn__black"
                type="button"
                disabled={loading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRworkHabit;
