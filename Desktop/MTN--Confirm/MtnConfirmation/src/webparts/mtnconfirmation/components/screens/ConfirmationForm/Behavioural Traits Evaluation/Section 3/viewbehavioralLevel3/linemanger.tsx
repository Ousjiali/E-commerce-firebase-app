import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Modal,
  Table,
} from "../../../../../Containers";
import { BehavioralContext } from "../../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";
import styles from "../section3.module.scss";
import { RaterContext } from "../../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../../Context/EmployeeContext";
import swal from "sweetalert";
import { TextAreaSmall } from "../../../../../Containers/TextArea";
import { Spinner } from "@microsoft/office-ui-fabric-react-bundle";
import { getColor } from "./utils";

const GetBehavioralSection3Rating = () => {
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
  } = React.useContext(BehavioralContext);

  const { raterFinalComments, setRaterFinalComments, rater, raterEmail } =
    React.useContext(RaterContext);

  const [date, setDate] = React.useState("");
  const { id, itemId } = React.useContext(EmployeeContext);
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
  const [raterLevel, setRaterLevel] = React.useState("");
  const [showMsg, setShowMsg] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");

  const [open, setOpen] = React.useState(false);
  const [deferModal, setDeferModal] = React.useState(false);
  const [lineManagerFeedback, setLineManagerFeedback] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [EmployeeName, setEmployeeName] = React.useState("");
  const [actorEmail, setActorEmail] = React.useState("");
  const [actionDate, setActionDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setActorEmail(response?.Email);
    });
  }, []);
  const history = useHistory();

  const submitHandler = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      RaterLineManagerComment: lineManagerComment,
      LineManagerName: actorEmail,
      LineManagerDate: actionDate,
    };
    sp.web.lists
      .getByTitle("EvaluationComments")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          const submissionID = res && res[0].Id;

          sp.web.lists
            .getByTitle("EvaluationComments")
            .items.getById(submissionID)
            .update(data);
        } else {
          sp.web.lists
            .getByTitle("EvaluationComments")
            .items.add(data)
            .then(() => {
              setLoading(false);
              setLineManagerComment("");
            });
        }

        sp.web.lists
          .getByTitle("Confirmation")
          .items.getById(Number(itemId))
          .update({
            Approvals: "HRBP",
          })
          .then(() => {
            swal("successful", {
              buttons: { cancel: false, confirm: false },
              timer: 2000,
            });
            history.push("/");
          });
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

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/linemanager");
      return;
    }
    setLoading(true);
    Promise.all([
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
            setRaterFinalComments(response[0].RaterFinalComment);
            setPerformanceScore(response[0].Total);
          }
        }),
      sp.web.lists
        .getByTitle("EvaluationComments")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setCommentFieldReadOnly(true);
            setLineManagerComment(response[0].RaterLineManagerComment);
          }
        }),
    ]);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setRaterLevel(res[0].Level);
        setConfirmationStatus(res[0].ConfirmationStatusByScore);
        setEmployeeName(res[0].EmployeeName);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
      }),
      sp.web.lists
        .getByTitle("PerformanceFactorEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((res) => {
          setDate(res[0].RatingDate);
        }),
      setLoading(false);
  }, []);

  const modalHandler = () => {
    setOpen(true);
  };
  const noHandler = () => {
    setOpen(false);
  };

  const submitFeedbackHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      RejectCommentLineManager: lineManagerFeedback,
    };

    sp.web.lists
      .getByTitle("EvaluationComments")
      .items.add(data)
      .then((item) => {
        setLoading(false);
        setLineManagerComment("");

        sp.web.lists
          .getByTitle("Confirmation")
          .items.getById(Number(itemId))
          .update({
            Approvals: "Rejected Ratings",
            RejectedBy: "Rater Line Manager",
          })
          .then(() => {
            swal("successful", {
              buttons: { cancel: false, confirm: false },
              timer: 2000,
            });
            history.push("/");
          });
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

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      {loading ? (
        <Spinner />
      ) : (
        <form
          onSubmit={submitHandler}
          className={styles.evaluation__section2__container}
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
              <Select
                onChange={(e: any) => {
                  setPunctualityRating(e.target.value);
                }}
                title="Ratings"
                readOnly={true}
                value={punctualityRating}
                options={Helpers.rating}
                required={true}
              />
            </div>
            <div className={styles.section1__comments}>
              <h2>Comments</h2>
              <TextArea
                readOnly={true}
                value={punctualityComment}
                onChange={(e: any) => {
                  e.target.value.length <= 60
                    ? setPunctualityComment(e.target.value)
                    : setShowMsg(true);
                }}
              />
              {showMsg ? (
                <span>You can only type 60 characters or less</span>
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
          </div>
          <div className={`${styles.evaluation__section} `}>
            <div className={styles.disciplinary}>
              <h2>Query/Disciplinary Issues</h2>
              <div>Confirm if employee has received query or warning</div>
              <div>
                Confirm if employee has any engaging/disciplinary issues
              </div>
            </div>
            <div className={styles.input__container}>
              <div className={styles.section1__input}>
                <div className={styles.radio_input}>
                  <input
                    type="radio"
                    disabled={true}
                    name="confirm"
                    onChange={(e) => {
                      setQueryResponse(e.target.value);
                    }}
                    value="Yes"
                    checked={queryResponse === "Yes"}
                    // @ts-ignore
                    name="query"
                  />
                  <label>Yes</label>
                </div>
                <div className={styles.radio_input}>
                  <input
                    type="radio"
                    disabled={true}
                    name="confirm"
                    onChange={(e) => {
                      setQueryResponse(e.target.value);
                    }}
                    value="No"
                    checked={queryResponse === "No"}
                    // @ts-ignore
                    name="query"
                  />
                  <label>No</label>
                </div>
              </div>
              <div className={styles.section1__input}>
                <div className={styles.radio_input}>
                  <input
                    type="radio"
                    disabled={true}
                    name="disciplinary"
                    onChange={(e) => {
                      setDisciplinaryResponse(e.target.value);
                    }}
                    value="Yes"
                    checked={disciplinaryResponse === "Yes"}
                    // @ts-ignore
                    name="disciplinary"
                    required
                  />
                  <label>Yes</label>
                </div>
                <div className={styles.radio_input}>
                  <input
                    type="radio"
                    disabled={true}
                    name="disciplinary"
                    onChange={(e) => {
                      setDisciplinaryResponse(e.target.value);
                    }}
                    value="No"
                    checked={disciplinaryResponse === "No"}
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
          <Table score={performanceScore} />
          <div className={`${styles.evaluation__section} `}>
            {confirmationStatus && (
              <h2>
                Confirmation Status:
                <p style={{ color: getColor(confirmationStatus) }}>
                  {confirmationStatus}{" "}
                </p>
              </h2>
            )}
            <div>
              <div className={styles.section1__comments}>
                <h2>Developmental Requirement</h2>
                <TextAreaSmall
                  value={developmentalRequirement}
                  rows={5}
                  onChange={(e: any) => {
                    setDevelopmentalRequiremnt(e.target.value);
                  }}
                  readOnly={true}
                />
              </div>
            </div>
            <div className={styles.section1__comments}>
              <h2>Rater's Final comment</h2>
              <TextAreaSmall
                value={raterFinalComments}
                rows={5}
                onChange={(e: any) => {
                  setRaterFinalComments(e.target.value);
                }}
                required={true}
                readOnly={true}
              />
              <span>Rater's Email: {raterEmail}</span>
              <br />
              <span>Action Date: {date}</span>
            </div>
          </div>{" "}
          <div className={`${styles.evaluation__section} `}>
            <div></div>

            <div></div>
            <div className={styles.section1__comments}>
              <h2>Reviewer's comment</h2>
              <TextAreaSmall
                value={lineManagerComment}
                rows={5}
                onChange={(e: any) => {
                  setLineManagerComment(e.target.value);
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
              <Modal
                isVisible={open}
                title={<h5>Reason for Rejection </h5>}
                size="md"
                content={
                  <div>
                    <div>
                      <TextArea
                        value={lineManagerFeedback}
                        onChange={(e: any) => {
                          setLineManagerFeedback(e.target.value);
                        }}
                        required={true}
                      />
                    </div>
                    <div className={styles.modal__Btn}>
                      <div></div>
                      <button
                        type="button"
                        className={styles.btnCancel1}
                        onClick={noHandler}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={styles.btnCancel2}
                        onClick={submitFeedbackHandler}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                }
                onClose={() => setOpen(false)}
                footer=""
              />
              {/* <Modal
              isVisible={deferModal}
              title={""}
              size="md"
              content={
                <div>
                  <div className={styles.center}>
                    <div className={styles.center_conformation}>
                      <h3 style={{marginBottom:"20px"}}>
                      Employee Confirmation for {EmployeeName} will be deferred for a period of 3 months based on the scores achieved by your direct report.
                      </h3>
                      <p style={{marginBottom:"20px"}}>Please enter developmental requirements for the next 3 months,Your HR Business Partner will engage you further on this </p>
                      <button
                        onClick={closeModal}
                        className="mtn__btn mtn__blue"
                        type="button"
                      >
                       CONTINUE WITH DEFERMENT
                      </button>

                     
                    </div>
                  </div>
                </div>
              }
              onClose={() => setDeferModal(false)}
              footer=""
            /> */}
              <div className="mtn__btnPage1">
                <button
                  type="button"
                  className="mtn__btn mtn__black"
                  onClick={modalHandler}
                  disabled={loading}
                >
                  Send back to rater for changes
                </button>

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
        </form>
      )}
    </>
  );
};

export default GetBehavioralSection3Rating;
