import { sp } from "@pnp/sp";
import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import swal from "sweetalert";
import {
  Header,
  Select,
  Helpers,
  TextArea,
  Card,
  Modal,
  Table,
} from "../../../../Containers";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { BehavioralContext } from "../../../../Context/BehavioralContext";
import { BehavioralContext1 } from "../../../../Context/behavioralContext1";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";
import { RaterContext } from "../../../../Context/RaterContext";
import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";
import styles from "../performance.module.scss";

const RatersBehaviouralTrait = () => {
  // interface ButtonOptions {
  //   visible: boolean;
  //   text: string;
  //   value: any;
  //   className: string;
  //   closeModal: boolean;
  // }

  // interface ButtonList {
  //   [buttonNamespace: string]: ButtonOptions;
  // }

  const history = useHistory();
  const [showMsg, setShowMsg] = React.useState(false);
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [employeeLevel, setEmployeeLevel] = React.useState("");
  const [performanceID, setPerformanceID] = React.useState("");
  const [punctualityMsg, setPunctualityMsg] = React.useState(false);
  const [developmentMsg, setDevelopmentMsg] = React.useState(false);
  const [queryMsg, setQueryMsg] = React.useState(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const [raterMsg, setRaterMsg] = React.useState(false);
  const [disciplineMsg, setDisciplineMsg] = React.useState(false);
  const [queryCommentMsg, setQueryCommentMsg] = React.useState(false);
  const [punctualRatingMsg, setPunctualRatingMsg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [workMsg2, setWorkMsg2] = useState(false);
  const [knowlegdeMsg, setknowlegdeMsg] = useState(false);
  const [workMsg, setWorkMsg] = useState(false);
  const [msg, setMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = React.useState("");
  const [adaptCommentMsg, setAdaptCommentMsg] = React.useState(false);
  const [judgementCommentMsg, setJudgementCommentMsg] = React.useState(false);
  const [attendanceCommentMsg, setAttendanceCommentMsg] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const [itemID, setItemId] = React.useState(0);
  const { id, itemId, setId } = React.useContext(EmployeeContext);
  const { rater, raterEmail } = React.useContext(RaterContext);
  const [date, setDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );
  const { totalPerformanceScore } = React.useContext(
    performanceEvaluationContext
  );
  const { raterFinalComments, setRaterFinalComments } =
    React.useContext(RaterContext);
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const {
    dependabilityRating,
    setDependabilityRating,
    dependabilityComment,
    setDependabilityComment,
    coperationRating,
    setCoperationRating,
    coperationComment,
    setCoperationComment,
    initiativeRating,
    setInitiativeRating,
    initiativeComment,
    setInitiativeComment,
  } = React.useContext(BehavioralContext1);

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

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(Number(itemId))
      .get()
      .then((res) => {
        setEmployeeLevel(res[0].Level);
      });
    sp.web.lists
      .getByTitle(`PerformanceFactorEvaluation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setPerformanceID(res[0].ID);
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
          setPunctualityRating(response[0].Punctuality);
          setPunctualityComment(response[0].PuctualityComment);
          setQueryResponse(response[0].QueryRating);
          setQueryComment(response[0].DisciplinaryAndQueryComment);
          setDisciplinaryResponse(response[0].Disciplinary);
          setItemId(response[0].ID);
          setRaterFinalComments(response[0].RaterFinalComment);
          setPerformanceScore(response[0].Total);
          setLoading(false);
        }
      });
  }, []);

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
      return;
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        setLoading(false);
        if (response.length > 0) {
          setDependabilityRating(response[0].Dependability);
          setDependabilityComment(response[0].DependabilityComment);
          setCoperationComment(response[0].CooperationComment);
          setCoperationRating(response[0].Co_x002d_operation);
          setInitiativeRating(response[0].Initiative);
          setInitiativeComment(response[0].InitiativeComment);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

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

  React.useMemo(() => {}, [
    queryResponse,
    disciplinaryResponse,
    punctualityRating,
    developmentalRequirement,
    raterFinalComments,
  ]);

  const backHandler = () => {
    history.goBack();
  };

  const modalHandler = () => {
    setOpen(true);
  };

  const noHandler = () => {
    setOpen(false);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setDependabilityRating(0);
    setDependabilityComment("");
    setCoperationRating(0);
    setCoperationComment("");
    setInitiativeRating(0);
    setInitiativeComment("");
    setAdaptRating(0);
    setAdaptComment("");
    setJudgementRating(0);
    setJudgementComment("");
    setAttendanceRating(0);
    setAttendanceComment("");
    setOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!performanceScore) {
      return swal(
        "Error Occured",
        "Please click on the calculate score",
        "error"
      );
    }

    setLoading(true);
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
      RaterFinalComment: raterFinalComments,
      Total: performanceScore,
    };

    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          sp.web.lists
            .getByTitle("BehavioralTraitsEvaluation")
            .items.getById(Number(itemID))
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
              setId("");

              sp.web.lists
                .getByTitle("Confirmation")
                .items.getById(Number(itemId))
                .update({
                  Approvals: "Rater Line Manager",
                  ConfirmationStatusByScore: confirmationStatus,
                  raterDevelopmentalComment: developmentalRequirement,
                  EvaluationDate: new Date(Date.now()).toLocaleDateString(),
                });

              // swal({
              //   title: "Success",
              //   text: "Evaluation Submitted Successfully!",
              //   icon: "success",
              //   buttons: false,
              //   timer: 3000,
              // });

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
              history.push("/");
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

              sp.web.lists
                .getByTitle("Confirmation")
                .items.getById(Number(itemId))
                .update({
                  Approvals: "Rater Line Manager",
                  ConfirmationStatusByScore: confirmationStatus,
                  raterDevelopmentalComment: developmentalRequirement,
                });

              sp.web.lists
                .getByTitle(`PerformanceFactorEvaluation`)
                .items.getById(Number(performanceID))
                .update({
                  TotalScore: performanceScore,
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
              history.push("/");
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
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      <form
        onSubmit={submitHandler}
        className={styles.evaluation__section2__container}
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
              required={true}
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
            {/* <h2>Ratings</h2> */}
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
            {punctualRatingMsg ? (
              <span style={{ color: "red", marginLeft: "70px" }}>
                kindly rate{" "}
              </span>
            ) : null}
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
            {punctualityMsg ? (
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
              required={true}
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
            <div
              className="mtn__btn mtn__black"
              onClick={() => {
                const behavioralScore =
                  Number(punctualityRating) +
                  Number(adaptRating) +
                  Number(judgementRating) +
                  Number(attendanceRating) +
                  Number(initiativeRating) +
                  Number(dependabilityRating) +
                  Number(coperationRating);

                const overallBehavioral = Number(behavioralScore * 1.07);
                const total =
                  Number(overallBehavioral) + Number(totalPerformanceScore);
                setPerformanceScore(Math.ceil(total));
                setScore(Math.ceil(total));
                if (punctualityComment.length < 60) {
                  setShowMsg(true);
                } else {
                  setShowSubmitButton(true);
                }
              }}
            >
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
                {queryMsg ? (
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    kindly select{" "}
                  </span>
                ) : null}
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
                {disciplineMsg ? (
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    kindly select{" "}
                  </span>
                ) : null}
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
            {disciplinaryResponse === "Yes" || queryResponse === "Yes" ? (
              <div>
                <h2>Comments</h2>
                <TextArea
                  value={queryComment}
                  onChange={(e: any) => {
                    setQueryComment(e.target.value);
                  }}
                  required={true}
                />
                {queryCommentMsg ? (
                  <span style={{ color: "red", marginLeft: "10px" }}>
                    This field is Required{" "}
                  </span>
                ) : null}
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
              required={true}
            />
            {developmentMsg ? (
              <span style={{ color: "red", marginLeft: "10px" }}>
                This field is Required{" "}
              </span>
            ) : null}
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
            {raterMsg ? (
              <span style={{ color: "red", marginLeft: "10px" }}>
                This field is Required{" "}
              </span>
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
                <button
                  className="mtn__btn mtn__black"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default RatersBehaviouralTrait;
