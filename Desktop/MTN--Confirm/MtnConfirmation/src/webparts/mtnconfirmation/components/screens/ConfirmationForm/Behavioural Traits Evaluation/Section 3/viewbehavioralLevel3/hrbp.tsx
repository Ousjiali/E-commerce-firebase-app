import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Table,
  Modal,
} from "../../../../../Containers";
import { BehavioralContext } from "../../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";
import styles from "../section3.module.scss";
import { RaterContext } from "../../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../../Context/EmployeeContext";
import swal from "sweetalert";
import { TextAreaSmall } from "../../../../../Containers/TextArea";
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
  const [mhrbpComment, setMhrbpComment] = React.useState("");
  const [showMsg, setShowMsg] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [sendBackperson, setSendBackPerson] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [actionDate, setActionDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );
  const [linemanagerEmail, setLineManagerEmail] = React.useState("");
  const [linemanagerDate, setLineManagerDate] = React.useState("");
  const [actorEmail, setActorEmail] = React.useState("");
  const [hrbpDevelpomentReq, setHrbpDevelpomentReq] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [raterDate, setRaterDate] = React.useState("");
  const [raterName, setRaterName] = React.useState("");
  const history = useHistory();
  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setActorEmail(response?.Email);
    });
  }, []);

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      HRBPComment: mhrbpComment,
      HrbpDevelopmentRequest: hrbpDevelpomentReq,
      HRBPName: actorEmail,
      HRBPDate: actionDate,
    };

    sp.web.lists
      .getByTitle("EvaluationComments")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((item) => {
        if (item.length > 0) {
          const submissionID = item && item[0].Id;

          sp.web.lists
            .getByTitle("EvaluationComments")
            .items.getById(submissionID)
            .update(data)
            .then(() => {
              sp.web.lists
                .getByTitle("Confirmation")
                .items.getById(Number(itemId))
                .update({
                  Approvals: "HCM Administrator",
                })
                .then(() => {
                  setLoading(false);
                  setMhrbpComment("");
                  swal("successful", {
                    buttons: { cancel: false, confirm: false },
                    timer: 2000,
                  });
                  history.push("/");
                });
            });
        } else {
          history.push("/pending/requests/hrbp");
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
  };

  const modalHandler = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/hrbp");
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
            setRaterName(response[0].RaterEmail);
            setRaterDate(response[0].RatingDate);
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
            setDevelopmentalRequiremnt(
              response[0].LineManagerDevelopmentRequiremen
            );
            setMhrbpComment(response[0].HRBPComment);
            setLineManagerEmail(response[0].LineManagerName);
            setLineManagerDate(response[0].LineManagerDate);
          }
        }),
    ]);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setConfirmationStatus(res[0].ConfirmationStatusByScore);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
      });

    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setDate(res[0].RatingDate);
      }),
      setLoading(false);
  }, []);

  const noHandler = () => {
    setOpen(false);
  };

  const submitFeedbackHandler = (e) => {
    e.preventDefault();
    setOpen(false);
    setLoading(true);
    setOpen(false);
    if (sendBackperson === "select" || sendBackperson === "") {
      swal("Error Occured", "Please select a valid Person", "error");
    } else {
      sp.web.lists
        .getByTitle("Confirmation")
        .items.getById(Number(itemId))
        .update({
          Approvals: sendBackperson,
          RejectedBy: "HRBP",
        })
        .then(() => {
          swal("successful", {
            buttons: { cancel: false, confirm: false },
            timer: 2000,
          });
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
    }
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
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
            <div>Confirm if employee has any engaging/disciplinary issues</div>
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
          <div></div>
          <div></div>
        </div>

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
            <div>
              <div className={styles.section1__comments}>
                <h2>Developmental Requirement</h2>
                <TextAreaSmall
                  value={developmentalRequirement}
                  rows={5}
                  onChange={(e: any) => {
                    setDevelopmentalRequiremnt(e.target.value);
                  }}
                  required={true}
                  readOnly={true}
                />
              </div>
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
            <span>Rater's Email: {raterName}</span>
            <br />
            <span>Action Date: {raterDate}</span>
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
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
              readOnly={true}
            />
            <span>Reviewer's Email: {linemanagerEmail}</span>
            <br />
            <span>Action Date: {linemanagerDate}</span>
          </div>

          <div className={styles.section1__comments}>
            <h2>HRBP comment</h2>
            <TextAreaSmall
              value={mhrbpComment}
              rows={5}
              onChange={(e: any) => {
                setMhrbpComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section__button} `}>
          <div className="mtn__btnContaainer">
            <div className="mtn__btnPage1">
              <button
                type="button"
                className="mtn__btn mtn__blackOutline"
                onClick={backHandler}
              >
                Previous
              </button>
              <button
                type="button"
                className="mtn__btn mtn__black"
                onClick={modalHandler}
              >
                Send Back
              </button>
            </div>

            <div>
              <button
                className="mtn__btn mtn__black"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
          <Modal
            isVisible={open}
            title={""}
            size="md"
            content={
              <div>
                <div className="mtn__InputContainer">
                  <select
                    value={sendBackperson}
                    onChange={(e: any) => {
                      setSendBackPerson(e.target.value);
                    }}
                  >
                    <option value="select">--Select--</option>
                    <option value="Rejected Ratings">Rater</option>
                    <option value="Rater Line Manager">Line Manager</option>
                    required={true}
                  </select>
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
        </div>
      </form>
    </>
  );
};

export default GetBehavioralSection3Rating;
