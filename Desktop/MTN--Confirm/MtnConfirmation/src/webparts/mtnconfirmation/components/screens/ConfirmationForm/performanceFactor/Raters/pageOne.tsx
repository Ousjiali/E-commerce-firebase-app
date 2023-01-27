import { sp } from "@pnp/sp";
import { number } from "echarts";
import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import {
  Header,
  Select,
  Helpers,
  Card,
  TextArea,
  Modal,
} from "../../../../Containers";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";
import { RaterContext } from "../../../../Context/RaterContext";
import styles from "../performance.module.scss";

// entry page for rating, initially it has two page but change to a page base on client request

const RatersKnowlegdeFactor = () => {
  const history = useHistory();
  const [knowlegdeRatingMsg, setKnowlegdeRatingMsg] = useState(false);
  const [workQualityRatingMsg, setWorkQualityRatingMsg] = useState(false);
  const [workQuantityRatingMsg, setworkQuantityRatingMsg] = useState(false);
  const { id } = React.useContext(EmployeeContext);
  const [employee_Name, setEmployee_Name] = useState("");
  const [msg, setMsg] = useState(false);
  const [workMsg2, setWorkMsg2] = useState(false);
  const [knowlegdeMsg, setknowlegdeMsg] = useState(false);

  const [workMsg, setWorkMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [workHabitRatingMsg, setworkHabitRatingMsg] = useState(false);
  const [communicationRatingMsg, setcommunicationRatingMsg] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [employeeLevel, setEmployeeLevel] = React.useState("");
  const [communicationCommentMsg, setcommunicationCommentMsg] = useState(false);
  const [workhabitcommentMsg, setworkhabitcommentMsg] = useState(false);
  const { rater, raterEmail, date } = React.useContext(RaterContext);
  const [itemID, setItemId] = useState(0);

  const {
    knowlegdeRating,
    setKnowlegdeRating,
    knowlegdeComment,
    setknowlegdeComment,
    workQualityRating,
    setWorkQualityRating,
    workQualityComment,
    setWorkQualityComment,
    workQuantityRating,
    setworkQuantityRating,
    workQuantityComment,
    setworkQuantityComment,
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

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
      return;
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setEmployeeLevel(res[0].Level);
      });

    sp.web.lists
      .getByTitle(`PerformanceFactorEvaluation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        if (res.length > 0) {
          setEmployee_Name(res[0].EmployeeName);
          setKnowlegdeRating(res[0].KnowlegdeRating);
          setknowlegdeComment(res[0].KnowlegdeComment);
          setWorkQualityRating(res[0].WorkQualityRating);
          setWorkQualityComment(res[0].WorkQualityComment);
          setworkQuantityRating(res[0].WorkQuantityRating);
          setworkQuantityComment(res[0].WorkQuantityComment);
          // setEmployeeLevel(res[0].Level);
          setWorkHabitRating(res[0].WorkHabitRating);
          setWorkHabitComment(res[0].WorkHabitComment);
          setCommunicationRating(res[0].CommunicatonRating);
          setCommunicationComment(res[0].CommunicationComment);
          setTotalPerformanceScore(res[0].TotalPerformanceScore);
          setItemId(res[0].Id);
        }
      });
    setLoading(false);
  }, []);

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
      !communicationComment
    ) {
      swal("Error Occured", "Incomplete field!", "error");
    } else if (knowlegdeRating === null) {
      setKnowlegdeRatingMsg(true);
    } else if (workQualityRating === null) {
      setWorkQualityRatingMsg(true);
    } else if (workQuantityRating === null) {
      setworkQuantityRatingMsg(true);
    } else if (knowlegdeComment.length < 60) {
      setknowlegdeMsg(true);
    } else if (workQualityComment.length < 60) {
      setWorkMsg(true);
    } else if (workQuantityComment.length < 60) {
      setWorkMsg2(true);
    } else if (workHabitComment.length < 60) {
      setworkhabitcommentMsg(true);
    } else if (communicationComment.length < 60) {
      setcommunicationCommentMsg(true);
    } else if (workHabitRating === null) {
      setworkHabitRatingMsg(true);
    } else if (workHabitComment.length < 60) {
      setworkhabitcommentMsg(true);
    } else if (communicationComment.length < 60) {
      setcommunicationCommentMsg(true);
    } else if (workHabitRating === null) {
      setworkHabitRatingMsg(true);
    } else if (communicationRating === null) {
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

  const modalHandler = () => {
    setOpen(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setKnowlegdeRating(0);
    setWorkQualityRating(0);
    setworkQuantityRating(0);
    setknowlegdeComment("");
    setWorkQualityComment("");
    setworkQuantityComment("");
    setWorkHabitRating(0);
    setCommunicationRating(0);
    setWorkHabitComment("");
    setCommunicationComment("");
    setTotalPerformanceScore(0);
    setOpen(false);
  };

  const noHandler = () => {
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (workHabitComment.length < 60) {
      setworkhabitcommentMsg(true);
    }
    if (communicationComment.length < 60) {
      setcommunicationCommentMsg(true);
    } else {
      setLoading(true);

      sp.web.lists
        .getByTitle("PerformanceFactorEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
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
                switch (employeeLevel) {
                  case "Level 2":
                    history.push("/rater/behavioral/section1");
                    break;
                  case "Level 1":
                    history.push("/rater/behavioral/section1");
                    break;
                  default:
                    history.push("/behavioral/section3");
                    break;
                }

                setLoading(false);
              })
              .catch((e) => {
                swal("Warning!", "An Error Occured, Try Again!", "error");
                setLoading(false);
                console.error(e);
              });
          } else {
            sp.web.lists
              .getByTitle("PerformanceFactorEvaluation")
              .items.add({
                EmployeeID: id,
                RaterName: rater,
                RaterEmail: raterEmail,
                RatingDate: date,
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
              .then((item) => {
                setLoading(false);
                setKnowlegdeRating(0);
                setknowlegdeComment("");
                setWorkQualityComment("");
                setworkQuantityComment("");
                setWorkHabitComment("");
                setCommunicationComment("");
                setWorkQualityRating(0);
                setworkQuantityRating(0);
                setWorkHabitRating(0);
                setCommunicationRating(0);

                switch (employeeLevel) {
                  case "Level 2":
                    history.push("/rater/behavioral/section1");
                    break;
                  case "Level 1":
                    history.push("/rater/behavioral/section1");
                    break;
                  default:
                    history.push("/behavioral/section3");
                    break;
                }
              })
              .catch((error) => {
                setLoading(false);
                swal(
                  "Error Occured",
                  "An error occured while submitting your data!",
                  "error"
                );
                console.log(error);
              });
          }
        });
    }
  };

  return (
    <>
      <Header title="Performance Factor" />

      <div className={styles.evaluation__section2__container}>
        <div className={styles.evaluation__section}>
          <Card header="knowlegde, skill and ability">
            <ul>
              <li>
                Consider the degree to which the employee exhibits the required
                level of job knowledge skills to perform the job and the use of
                established techniques, materials and equipment as they relate
                to performance.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              value={knowlegdeRating}
              onChange={(e: any) => {
                setKnowlegdeRating(e.target.value);
              }}
              title="Ratings"
              options={Helpers.rating}
            />
            {knowlegdeRatingMsg ? (
              <span className={styles.msg}>kindly rate </span>
            ) : null}
          </div>

          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={knowlegdeComment}
              onChange={(e: any) => {
                setknowlegdeComment(e.target.value);
              }}
            />
            {knowlegdeMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <Card header="Quality of work">
            <ul>
              <li>Does the employee assignments meet quality standards?</li>
              <li>
                consider accuracy neatness, thoroughness and adherence to
                standard and safety.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              title="Rating"
              onChange={(e: any) => {
                setWorkQualityRating(e.target.value);
              }}
              value={workQualityRating}
              options={Helpers.rating}
            />
            {workQualityRatingMsg ? (
              <span className={styles.msg}>kindly rate </span>
            ) : null}
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={workQualityComment}
              onChange={(e: any) => {
                setWorkQualityComment(e.target.value);
              }}
            />
            {workMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <div>
            <Card header="Quantity of Work">
              <p>
                Consider the result of the employee's effort does the employee
                demostrate the ability to :
              </p>
              <ul>
                <li>Manage several responsibilities simultaneously?</li>
                <li>Perform work in a productive and timely manner?</li>
                <li>Meet work schedule?</li>
              </ul>
            </Card>
          </div>
          <div className={styles.section1__ratings}>
            <Select
              value={workQuantityRating}
              onChange={(e: any) => {
                setworkQuantityRating(e.target.value);
              }}
              title="Rating"
              options={Helpers.rating}
            />
            {workQuantityRatingMsg ? (
              <span className={styles.msg}>kindly rate </span>
            ) : null}
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={workQuantityComment}
              onChange={(e: any) => {
                setworkQuantityComment(e.target.value);
              }}
            />
            {workMsg2 ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>
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
            {workHabitRatingMsg ? (
              <span className={styles.msg}>kindly rate </span>
            ) : null}
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
                setCommunicationRating(e.target.value);
              }}
              title="Rating"
              value={communicationRating}
              options={Helpers.rating}
            />
            {communicationRatingMsg ? (
              <span className={styles.msg}>kindly rate </span>
            ) : null}
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
            <button
              type="button"
              className="mtn__btn mtn__black"
              onClick={modalHandler}
            >
              Cancel
            </button>
            <Modal
              isVisible={open}
              title="Are you sure you want to Cancel"
              size="md"
              content={
                <div className={styles.modal__Btn}>
                  <button
                    type="button"
                    className={styles.btnCancel1}
                    onClick={noHandler}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className={styles.btnCancel2}
                    onClick={cancelHandler}
                  >
                    Yes
                  </button>
                </div>
              }
              onClose={() => setOpen(false)}
              footer=""
            />
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
                disabled={loading}
              >
                {loading ? "Loading..." : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RatersKnowlegdeFactor;
