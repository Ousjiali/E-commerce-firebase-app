import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
} from "../../../../Containers";
import { BehavioralContext } from "../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";

import styles from "./section2.module.scss";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
const GetBehavioralSection2Rating = () => {
  const {
    adaptComment,
    setAdaptComment,
    adaptRating,
    setAdaptRating,
    judgementRating,
    setJudgementRating,
    judgementComment,
    setJudgementComment,
    attendanceRating,
    setAttendanceRating,
    attendanceComment,
    setAttendanceComment,
  } = React.useContext(BehavioralContext);
  const { itemId } = React.useContext(EmployeeContext);
  const { id } = React.useContext(EmployeeContext);
  const [level, setLevel] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(Number(itemId))
      .get()
      .then((res) => {
        setLevel(res.Level);
        setLoading(false);
      });
  }, []);

  const history = useHistory();
  const nextHandler = () => {
    switch (level) {
      case "Level 1":
        history.push("/view/behavioral/section3/linemanager");
        break;
      case "Level 2":
        history.push("/view/behavioral/section3/linemanager");
        break;
      default:
        history.push("/view-behavioral/section3");
        break;
    }
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/");
      return;
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          setAdaptRating(response[0].Adaptability);
          setAdaptComment(response[0].AdaptComment);
          setJudgementRating(response[0].Judgement);
          setJudgementComment(response[0].JudgementComment);
          setAttendanceRating(response[0].Attendance);
          setAttendanceComment(response[0].AttendanceComment);
          setLoading(false);
        }
      });
  }, []);

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      <div className={styles.evaluation__section2__container}>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Adaptability">
            <ul>
              <li>
                Consider the ease with which the employee adjust to any change
                in duties, procedures, supervisors or the work environment.
              </li>
              <li>
                How well does the employee accept new ideas and approaches to
                work, responds appropriately to constructive criticisms and
                suggestions for work improvements?
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              onChange={(e: any) => {
                setAdaptRating(e.target.value);
              }}
              title="Ratings"
              value={adaptRating}
              options={Helpers.rating}
              readOnly={true}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={adaptComment}
              required={true}
              onChange={(e: any) => {
                setAdaptComment(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Judgement">
            <ul>
              <li>
                Consider how well the employee effectively analyses problems,
                determines the appropriate course of action, suggests solutions
                and exhibits timely and decisive action.
              </li>
              <li>Thinks logically.</li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              onChange={(e) => {
                setJudgementRating(e.target.value);
              }}
              title="Ratings"
              required={true}
              value={judgementRating}
              options={Helpers.rating}
              readOnly={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={judgementComment}
              onChange={(e: any) => {
                setJudgementComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Attendance">
            <ul>
              <li>
                Consider number of absences, use of annual and sick leave in
                accordance with MTN policy.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setAttendanceRating(e.target.value);
              }}
              title="Ratings"
              value={attendanceRating}
              options={Helpers.rating}
              readOnly={true}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={attendanceComment}
              onChange={(e: any) => {
                setAttendanceComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section__button} `}>
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
                type="button"
                className="mtn__btn mtn__black"
                onClick={nextHandler}
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

export default GetBehavioralSection2Rating;
