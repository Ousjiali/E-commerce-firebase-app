import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Modal,
} from "../../../../Containers";
import { BehavioralContext } from "../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";

import styles from "./section3.module.scss";
import swal from "sweetalert";
import { RaterContext } from "../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";
import { BehavioralContext1 } from "../../../../Context/behavioralContext1";
const Section3 = () => {
  const {
    punctualityRating,
    setPunctualityRating,
    punctualityComment,
    setPunctualityComment,
    queryComment,
    setQueryComment,
    queryRating: queryResponse,
    setQueryRating: setQueryResponse,
    behavioralEvaluationScore: performanceScore,
    setBehavioralEvaluationScore: setPerformanceScore,
    disciplinaryRating: disciplinaryResponse,
    setDisciplinaryRating: setDisciplinaryResponse,
    judgementRating,
    judgementComment,
    setJudgementRating,
    setJudgementComment,
    attendanceRating,
    setAttendanceRating,
    attendanceComment,
    setAttendanceComment,
    adaptRating,
    setAdaptRating,
    adaptComment,
    setAdaptComment,
  } = React.useContext(BehavioralContext);

  React.useMemo(() => {}, [queryResponse, disciplinaryResponse]);
  const [workMsg2, setWorkMsg2] = React.useState(false);
  const [knowlegdeMsg, setknowlegdeMsg] = React.useState(false);
  const [workMsg, setWorkMsg] = React.useState(false);
  const { rater, raterEmail, date } = React.useContext(RaterContext);
  const { totalPerformanceScore, setTotalPerformanceScore } = React.useContext(
    performanceEvaluationContext
  );
  const {
    coperationRating,
    dependabilityRating,
    initiativeRating,
    setInitiativeComment,
    setCoperationRating,
    setDependabilityRating,
    setInitiativeRating,
    setDependabilityComment,
    setCoperationComment,
    dependabilityComment,
    coperationComment,
    initiativeComment,
  } = React.useContext(BehavioralContext1);

  const [showMsg, setShowMsg] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [itemID, setItemId] = React.useState(0);
  const [Id, setId] = React.useState(0);
  const [adaptCommentMsg, setAdaptCommentMsg] = React.useState(false);
  const [judgementCommentMsg, setJudgementCommentMsg] = React.useState(false);
  const [attendanceCommentMsg, setAttendanceCommentMsg] = React.useState(false);
  const { id } = React.useContext(EmployeeContext);

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
    }
    sp.web.lists
      .getByTitle(`PerformanceFactorEvaluation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setTotalPerformanceScore(res[0].TotalPerformanceScore);
      });
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
          setDependabilityRating(response[0].Dependability);
          setDependabilityComment(response[0].DependabilityComment);
          setCoperationComment(response[0].CooperationComment);
          setCoperationRating(response[0].Co_x002d_operation);
          setInitiativeRating(response[0].Initiative);
          setInitiativeComment(response[0].InitiativeComment);
          setPunctualityRating(response[0].Punctuality);
          setPunctualityComment(response[0].PuctualityComment);
          setQueryResponse(response[0].QueryRating);
          setQueryComment(response[0].DisciplinaryAndQueryComment);
          setDisciplinaryResponse(response[0].Disciplinary);
          setPerformanceScore(response[0].Total);
          setItemId(response[0].ID);
        }
      });
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setId(res[0].Id);
      });
  }, []);

  const history = useHistory();

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      RaterEmail: raterEmail,
      RatingDate: date,
      RaterName: rater,
      Adaptability: adaptRating,
      AdaptComment: adaptComment,
      Judgement: judgementRating,
      JudgementComment: judgementComment,
      Attendance: attendanceRating,
      AttendanceComment: attendanceComment,
      Punctuality: punctualityRating,
      PuctualityComment: punctualityComment,
      QueryRating: queryResponse,
      Disciplinary: disciplinaryResponse,
      DisciplinaryAndQueryComment: queryComment,
      Dependability: dependabilityRating,
      DependabilityComment: dependabilityComment,
      Initiative: initiativeRating,
      InitiativeComment: initiativeComment,
      Co_x002d_operation: coperationRating,
      CooperationComment: coperationComment,
      Total: performanceScore,
    };
    if (dependabilityComment.length < 60) {
      setknowlegdeMsg(true);
    } else if (coperationComment.length < 60) {
      setWorkMsg(true);
    } else if (initiativeComment.length < 60) {
      setWorkMsg2(true);
    } else if (adaptComment.length < 60) {
      setAdaptCommentMsg(true);
    } else if (judgementComment.length < 60) {
      setJudgementCommentMsg(true);
    } else if (attendanceComment.length < 60) {
      setAttendanceCommentMsg(true);
    } else {
      sp.web.lists
        .getByTitle("BehavioralTraitsEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            sp.web.lists
              .getByTitle("BehavioralTraitsEvaluation")
              .items.getById(itemID)
              .update(data)
              .then(() => {
                setLoading(false);
                setAdaptComment("");
                setAdaptRating(0);
                setAttendanceComment("");
                setAttendanceRating(0);
                setDisciplinaryResponse("");
                setJudgementRating(0);
                setJudgementComment("");
                setPunctualityComment("");
                setPunctualityRating(0);
                setQueryComment("");
                setQueryResponse("");
                setCoperationComment("");
                setCoperationRating(0);
                setDependabilityComment("");
                setDependabilityRating(0);
                setInitiativeComment("");
                setInitiativeRating(0);
                history.push("/supervisory/section2");
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
          } else
            sp.web.lists
              .getByTitle("BehavioralTraitsEvaluation")
              .items.add(data)
              .then(() => {
                setLoading(false);
                setAdaptComment("");
                setAdaptRating(0);
                setAttendanceComment("");
                setAttendanceRating(0);
                setDisciplinaryResponse("");
                setJudgementRating(0);
                setJudgementComment("");
                setPunctualityComment("");
                setPunctualityRating(0);
                setQueryComment("");
                setQueryResponse("");
                setCoperationComment("");
                setCoperationRating(0);
                setDependabilityComment("");
                setDependabilityRating(0);
                setInitiativeComment("");
                setInitiativeRating(0);
                history.push("/supervisory/section2");
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
        });
    }
  };

  const scoreHandler = () => {
    const behavioralScore =
      Number(punctualityRating) +
      Number(adaptRating) +
      Number(judgementRating) +
      Number(attendanceRating) +
      Number(initiativeRating) +
      Number(dependabilityRating) +
      Number(coperationRating);

    const overallBehavioral = Number(behavioralScore * 1.05);
    const total = Math.ceil(
      Number(totalPerformanceScore) + Number(overallBehavioral)
    );
    setPerformanceScore(total);
    if (punctualityComment.length < 60) {
      setShowMsg(true);
    } else {
      setShowSubmitButton(true);
    }
  };

  const modalHandler = () => {
    setOpen(true);
  };

  const noHandler = () => {
    setOpen(false);
  };

  const backHandler = () => {
    history.goBack();
  };

  const cancelHandler = () => {
    setPunctualityComment("");
    setPunctualityRating(0);
    setQueryResponse("");
    setDisciplinaryResponse("");
    setQueryComment("");
    // setPerformanceScore(0);
    setOpen(false);
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      <form
        className={styles.evaluation__section2__container}
        onSubmit={submitHandler}
      >
        <div className={styles.evaluation__section}>
          <Card header="Dependability">
            <ul>
              <li>
                Consider the amount of time spent directing this employee{" "}
              </li>
              <li>
                Does this employee monitor project and exercise follow-through?
              </li>
              <li>Adhere to time frame?</li>
              <li>
                Is the employee punctual for meeting and appointments and
                respond appropriately to instructions and procedures?
              </li>
            </ul>
          </Card>

          <div className={styles.section1__ratings}>
            <Select
              onChange={(e) => setDependabilityRating(e.target.value)}
              title="Rating"
              value={dependabilityRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              onChange={(e) => {
                setDependabilityComment(e.target.value);
              }}
              value={dependabilityComment}
              required={true}
            />
            {knowlegdeMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <Card header="Co-Operation">
            <ul>
              <li>
                How well does the employee work/co-operate with co-workers and
                supervisor as a contributing member?
              </li>
              <li>
                Does the employee demonstrate consideration for the others,
                maintain rapport with others and help others willingly?
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              onChange={(e) => setCoperationRating(e.target.value)}
              title="Rating"
              value={coperationRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              onChange={(e) => {
                setCoperationComment(e.target.value);
              }}
              value={coperationComment}
            />
            {workMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <Card header="Initiative">
            <ul>
              <li>
                Consider how well the employee seeks and assumes greater
                responsibility,monitor projects independently and follow through
                appropriately
              </li>
            </ul>
          </Card>

          <div className={styles.section1__ratings}>
            <Select
              onChange={(e) => setInitiativeRating(e.target.value)}
              title="Rating"
              value={initiativeRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              onChange={(e) => {
                setInitiativeComment(e.target.value);
              }}
              value={initiativeComment}
              required={true}
            />
            {workMsg2 ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>

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
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={adaptComment}
              required={true}
              onChange={(e: any) => {
                setAdaptComment(e.target.value);
              }}
            />
            {adaptCommentMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
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
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={judgementComment}
              onChange={(e: any) => {
                setJudgementComment(e.target.value);
              }}
              required={true}
            />
            {judgementCommentMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
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
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={attendanceComment}
              onChange={(e: any) => {
                setAttendanceComment(e.target.value);
              }}
              required={true}
            />
            {attendanceCommentMsg ? (
              <span>Your comment should be at least 60 characters </span>
            ) : null}
          </div>
        </div>

        <div className={`${styles.evaluation__section} `}>
          <Card header="Punctuality">
            <ul>
              <li>
                Consider work arrivals and departure in accordance with
                Departmental and MTN policy.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setPunctualityRating(e.target.value);
              }}
              title="Ratings"
              value={punctualityRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={punctualityComment}
              onChange={(e: any) => {
                setPunctualityComment(e.target.value);
              }}
              required={true}
            />
            {showMsg ? (
              <span>Your comment should be at least 60 characters</span>
            ) : null}
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Total Behavioural Score">
            <input
              className={styles.score__input}
              type="text"
              style={{ backgroundColor: "white" }}
              value={performanceScore}
              readOnly
            />
          </Card>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <div className={styles.disciplinary}>
            <h2>Query/Disciplinary Issues</h2>
            <div>Confirm if employee has received query or warning</div>
            <div>Confirm if employee has any engaging/disciplinary issues</div>
          </div>
          <div className={styles.input__container}>
            <div className={styles.section1__input}>
              <div className={styles.radio_input}>
                <input
                  type="radio"
                  name="confirm"
                  onChange={(e) => {
                    setQueryResponse(e.target.value);
                  }}
                  value="Yes"
                  // @ts-ignore
                  name="query"
                  required
                />
                <label>Yes</label>
              </div>
              <div className={styles.radio_input}>
                <input
                  type="radio"
                  name="confirm"
                  onChange={(e) => {
                    setQueryResponse(e.target.value);
                  }}
                  value="No"
                  // @ts-ignore
                  name="query"
                  required
                />
                <label>No</label>
              </div>
            </div>
            <div className={styles.section1__input}>
              <div className={styles.radio_input}>
                <input
                  type="radio"
                  name="disciplinary"
                  onChange={(e) => {
                    setDisciplinaryResponse(e.target.value);
                  }}
                  value="Yes"
                  // @ts-ignore
                  name="disciplinary"
                  required
                />
                <label>Yes</label>
              </div>
              <div className={styles.radio_input}>
                <input
                  type="radio"
                  name="disciplinary"
                  onChange={(e) => {
                    setDisciplinaryResponse(e.target.value);
                  }}
                  value="No"
                  // @ts-ignore
                  name="disciplinary"
                  required
                />
                <label>No</label>
              </div>
            </div>
          </div>
          <div className={styles.section1__comments}>
            {queryResponse === "Yes" || disciplinaryResponse === "Yes" ? (
              <div>
                <h2>Comments</h2>
                <TextArea
                  value={queryComment}
                  onChange={(e: any) => {
                    setQueryComment(e.target.value);
                  }}
                  required={true}
                />
              </div>
            ) : null}
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
              <div className="mtn__nextBtn">
                {showSubmitButton ? (
                  <button
                    className="mtn__btn mtn__black"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Next"}
                  </button>
                ) : (
                  <div className="mtn__btn mtn__black" onClick={scoreHandler}>
                    Calculate Behavioural
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Section3;
