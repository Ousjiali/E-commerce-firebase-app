import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Modal,
  Table,
} from "../../../../Containers";
import { BehavioralContext } from "../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";

import styles from "../../Behavioural Traits Evaluation/Section 3/section3.module.scss";
import swal from "sweetalert";
import { RaterContext } from "../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";
import { BehavioralContext1 } from "../../../../Context/behavioralContext1";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";
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

  const scoreHandler = () => {
    const behavioralScore =
      Number(punctualityRating) +
      Number(adaptRating) +
      Number(judgementRating) +
      Number(attendanceRating) +
      Number(initiativeRating) +
      Number(dependabilityRating) +
      Number(coperationRating);

    const overallBehavioral = Number(behavioralScore * 1.07);
    const total = Number(overallBehavioral) + Number(totalPerformanceScore);
    setPerformanceScore(Math.ceil(total));
    setScore(Math.ceil(total));
    setShowSubmitButton(false);
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/rejected/pending/requests");
      return;
    }
    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          setPunctualityRating(response[0].Punctuality);
          setPunctualityComment(response[0].PuctualityComment);
          setQueryResponse(response[0].QueryRating);
          setQueryComment(response[0].DisciplinaryAndQueryComment);
          setDisciplinaryResponse(response[0].Disciplinary);
          setItemId(response[0].Id);
          setRaterFinalComments(response[0].RaterFinalComment);
          setPerformanceScore(response[0].Total);
        }
      });
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setId(res[0].Id);
        setConfirmationStatus(res[0].ConfirmationStatusByScore);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
      });
  }, []);

  const { id } = React.useContext(EmployeeContext);
  const [itemId, setItemId] = React.useState(0);
  const [Id, setId] = React.useState(0);
  const { rater, raterEmail, date } = React.useContext(RaterContext);
  const { totalPerformanceScore } = React.useContext(
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
  const { raterFinalComments, setRaterFinalComments } =
    React.useContext(RaterContext);
  const [showMsg, setShowMsg] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [score, setScore] = React.useState(0);
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    if (score === 0) {
      return swal(
        "Error Occured",
        "Please click on the calculate score",
        "error"
      );
    }
    const data = {
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
      RaterFinalComment: raterFinalComments,
      Total: performanceScore,
    };
    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.getById(Number(itemId))
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

        sp.web.lists
          .getByTitle("Confirmation")
          .items.getById(Number(Id))
          .update({
            Approvals: "Rater Line Manager",
            ConfirmationStatusByScore: confirmationStatus,
            raterDevelopmentalComment: developmentalRequirement,
          });

        swal("successful", {
          buttons: { cancel: false, confirm: false },
          timer: 2000,
        });
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
        history.push("/rejected/pending/requests");
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
  };

  const backHandler = () => {
    history.goBack();
  };

  const modalHandler = () => {
    setOpen(true);
  };

  const noHandler = () => {
    setOpen(false);
  };

  React.useMemo(() => {
    if (performanceScore === 0) {
      setConfirmationStatus("");
    } else if (performanceScore > 0 && performanceScore <= 20) {
      setConfirmationStatus("Do not Confirm");
    } else if (performanceScore > 20 && performanceScore <= 31) {
      setConfirmationStatus("Defer");
    } else {
      setConfirmationStatus("Confirm");
    }
  }, [performanceScore]);

  React.useMemo(() => {
    setScore(performanceScore);
  }, [score]);

  const cancelHandler = () => {
    setPunctualityComment("");
    setPunctualityRating(0);
    setQueryResponse("");
    setDisciplinaryResponse("");
    setQueryComment("");
    setPerformanceScore(0);
    setRaterFinalComments("");
    setOpen(false);
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      <form
        className={styles.evaluation__section2__container}
        onSubmit={submitHandler}
      >
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
            />
            {showMsg ? (
              <span>Your comment should be at least 60 characters</span>
            ) : null}
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Total Score">
            <input
              className={styles.score__input}
              type="text"
              style={{ backgroundColor: "white" }}
              value={performanceScore}
              readOnly
            />
          </Card>
          <div>
            {confirmationStatus && (
              <h2>
                Confirmation Status:
                <p style={{ color: getColor(confirmationStatus) }}>
                  {confirmationStatus}{" "}
                </p>
              </h2>
            )}
          </div>
          <div></div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <div>
            <div className="mtn__btn mtn__black" onClick={scoreHandler}>
              Calculate Performance
            </div>
          </div>
          <div></div>
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
            {queryResponse === "Yes" ? (
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
        <div>
          <Table score={score} />
        </div>

        <div className={`${styles.evaluation__section} `}>
          <div className={styles.section1__comments}>
            <h2>Developmental Requirement</h2>
            <TextAreaSmall
              value={developmentalRequirement}
              rows={5}
              onChange={(e: any) => {
                setDevelopmentalRequiremnt(e.target.value);
              }}
            />
          </div>

          <div></div>
          <div className={styles.section1__comments}>
            <h2>Rater's final comment</h2>
            <TextAreaSmall
              value={raterFinalComments}
              rows={5}
              onChange={(e: any) => {
                setRaterFinalComments(e.target.value);
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
                    type="button"
                    onClick={scoreHandler}
                  >
                    Calculate Behavioural
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
        </div>
      </form>
    </>
  );
};

export default Section3;
