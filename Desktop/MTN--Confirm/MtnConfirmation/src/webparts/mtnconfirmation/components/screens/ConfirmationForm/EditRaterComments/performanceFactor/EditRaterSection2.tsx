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
import styles from "../../../ConfirmationForm/performanceFactor/performance.module.scss";
import swal from "sweetalert";
import { sp } from "@pnp/sp";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";

const EditRaterSection2 = ({ context }) => {
  const [workHabitRatingMsg, setworkHabitRatingMsg] = useState(false);
  const [communicationRatingMsg, setcommunicationRatingMsg] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(true);
  const history = useHistory();
  const [communicationCommentMsg, setcommunicationCommentMsg] = useState(false);
  const [workhabitcommentMsg, setworkhabitcommentMsg] = useState(false);

  const {
    knowlegdeRating,
    knowlegdeComment,
    workQualityRating,
    workQualityComment,
    workQuantityRating,
    workQuantityComment,
    workHabitRating,
    setWorkHabitRating,
    workHabitComment,
    setWorkHabitComment,
    communicationRating,
    setCommunicationRating,
    communicationComment,
    setCommunicationComment,
    totalPerformanceScore,
    setTotalPerformanceScore,
  } = React.useContext(performanceEvaluationContext);
  const [loading, setLoading] = React.useState(false);

  const { id } = React.useContext(EmployeeContext);
  const [itemID, setItemId] = useState(0);
  // const {id} = useParam()

  const backHandler = () => {
    history.goBack();
  };

  const scoreHandler = () => {
    if (
      !knowlegdeRating ||
      !knowlegdeComment ||
      !workQualityRating ||
      !workQualityComment ||
      !workQuantityRating ||
      !workQuantityComment ||
      !workHabitRating ||
      !workHabitComment ||
      !communicationRating ||
      !communicationComment ||
      !totalPerformanceScore
    ) {
    }
    if (workHabitComment.length < 60) {
      setworkhabitcommentMsg(true);
    }
    if (communicationComment.length < 60) {
      setcommunicationCommentMsg(true);
    }
    if (workHabitRating === null) {
      setworkHabitRatingMsg(true);
    }
    if (communicationRating === null) {
      setcommunicationRatingMsg(true);
    } else {
      const total =
        Number(workHabitRating) +
        Number(knowlegdeRating) +
        Number(workQualityRating) +
        Number(workQuantityRating) +
        Number(communicationRating);
      setTotalPerformanceScore(Math.ceil(total * 1.08));
      setShowSubmitButton(false);
    }
  };
  React.useEffect(() => {
    if (!id) {
      history.push("/rejected/pending/requests");
      return;
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setWorkHabitRating(res[0].WorkHabitRating);
          setWorkHabitComment(res[0].WorkHabitComment);
          setCommunicationRating(res[0].CommunicatonRating);
          setCommunicationComment(res[0].CommunicationComment);
          setTotalPerformanceScore(res[0].TotalPerformanceScore);
          setItemId(res[0].Id);
        }
      });
  }, []);

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.getById(itemID)
      .update({
        KnowlegdeRating: knowlegdeRating,
        KnowlegdeComment: knowlegdeComment,
        WorkQualityRating: workQualityRating,
        WorkQualityComment: workQualityComment,
        WorkQuantityRating: workQuantityRating,
        WorkQuantityComment: workQuantityComment,
        WorkHabitRating: workHabitRating,
        WorkHabitComment: workHabitComment,
        CommunicatonRating: communicationRating,
        CommunicationComment: communicationComment,
        TotalPerformanceScore: totalPerformanceScore,
      })
      .then((res) => {
        history.push("/edit/rater/behavioral/section1");
        setLoading(false);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        setLoading(false);
        console.error(e);
      });
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
            {workHabitRatingMsg ? <span>Kindly Rate </span> : null}
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              onChange={(e: any) => {
                setWorkHabitComment(e.target.value);
              }}
              value={workHabitComment}
            />
            {workhabitcommentMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
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
            {communicationRatingMsg ? <span>Kindly Rate </span> : null}
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>

            <TextArea
              onChange={(e) => {
                setCommunicationComment(e.target.value);
              }}
              value={communicationComment}
            />
            {communicationCommentMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
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
          <div className="mtn__btnPage1">
            {showSubmitButton ? (
              <button
                className="mtn__btn mtn__black"
                type="button"
                onClick={scoreHandler}
              >
                Calculate Performance
              </button>
            ) : (
              <button
                className="mtn__btn mtn__black"
                type="button"
                onClick={submitHandler}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditRaterSection2;
