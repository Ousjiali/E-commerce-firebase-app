import * as React from "react";
import { sp } from "@pnp/sp";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Table,
  Modal,
} from "../../../../Containers";
import { useHistory } from "react-router-dom";
import styles from "../Supervisory Section 2/section2.module.scss";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { RaterContext } from "../../../../Context/RaterContext";
import swal from "sweetalert";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { BehavioralContext } from "../../../../Context/BehavioralContext";

import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";
const MHRBPView = () => {
  const history = useHistory();
  const backHandler = () => {
    history.goBack();
  };
  const [loading, setLoading] = React.useState(false);
  const {
    peopleManagementComment,
    setPeopleManagementComment,
    peopleManagementRating,
    setPeopleManagementRating,
    planningComment,
    setPlanningComment,
    planningRating,
    setPlanningRating,
    setSupervisoryEvaluationScore: setSupervisorScore,
    supervisoryEvaluationScore: supervisorScore,
  } = React.useContext(SupervisoryEvaluationContext);

  const { raterFinalComments, setRaterFinalComments, raterEmail, date } =
    React.useContext(RaterContext);

  const { id, itemId } = React.useContext(EmployeeContext);
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
  const [reviewerComment, setReviewerComment] = React.useState("");
  const [employeeComment, setEmployeeComment] = React.useState("");
  const [mhrbpComment, setMhrbpComment] = React.useState("");
  const [hrbpDevelpomentReq, setHrbpDevelpomentReq] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [linemanagerEmail, setLineManagerEmail] = React.useState("");
  const [raterDate, setRaterDate] = React.useState("");
  const [raterName, setRaterName] = React.useState("");
  const [linemanagerDate, setLineManagerDate] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [actionDate, setActionDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );
  const [actorEmail, setActorEmail] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setActorEmail(response?.Email);
    });
  }, []);

  const [sendBackperson, setSendBackPerson] = React.useState("");
  const noHandler = () => {
    setOpen(false);
  };
  const modalHandler = () => {
    setOpen(true);
  };
  const submitFeedbackHandler = (e) => {
    e.preventDefault();
    setOpen(false);
    setLoading(true);

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

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      HRBPComment: mhrbpComment,
      HRBPName: actorEmail,
      HRBPDate: actionDate,
      // HrbpDevelopmentRequest:hrbpDevelpomentReq
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

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/hrbp");
      return;
    }

    Promise.all([
      sp.web.lists
        .getByTitle("SupervisoryEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setSupervisorScore(response[0].TotalRatingScore);
            setPeopleManagementRating(response[0].PeopleManagementRating);
            setPeopleManagementComment(response[0].PeopleManagementComment);
            setPlanningComment(response[0].PlanningComment);
            setPlanningRating(response[0].PlanningRating);
            setRaterFinalComments(response[0].RaterFinalComment);
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
            setDevelopmentalRequiremnt(
              response[0].LineManagerDevelopmentRequiremen
            );
            setLineManagerComment(response[0].RaterLineManagerComment);
            setReviewerComment(response[0].ReviewerComment);
            setEmployeeComment(response[0].EmployeeComment);
            setMhrbpComment(response[0].HRBPComment);
            setLineManagerEmail(response[0].LineManagerName);
            setLineManagerDate(response[0].LineManagerDate);
          }
        }),
      sp.web.lists
        .getByTitle("Confirmation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((res) => {
          setConfirmationStatus(res[0].ConfirmationStatusByScore);
          setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
        }),
    ]);
  }, []);

  return (
    <>
      <Header title="Supervisory Evaluation" />
      <form
        className={styles.evaluation__section2__container}
        onSubmit={submitHandler}
      >
        <div className={`${styles.evaluation__section} `}>
          <Card header="People Management">
            <ul>
              <li>Consider how well the employee serves as a role model</li>
              <li>
                Provides guidance and opportunities to staff for their
                development and advancement
              </li>
              <li>Resolves work related employee problems </li>
              <li>
                Assists subordinates in accomplishing their work related
                objectives
              </li>
              <li>
                Does the employee communicate well with subordinates in a clear
                concise, accurate and timely manner and make useful suggestions?
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setPeopleManagementRating(e.target.value);
              }}
              required={true}
              title="Ratings"
              value={peopleManagementRating}
              options={Helpers.rating}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={peopleManagementComment}
              onChange={(e: any) => {
                setPeopleManagementComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Planning and Organising">
            <ul>
              <li>Consider how well the employee plans his/her work</li>
              <li>
                Coordinates with others and establishes appropriate priorities
              </li>
              <li>Anticipates future needs </li>
              <li>Carries out assignments effectively. </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              onChange={(e: any) => {
                setPlanningRating(e.target.value);
              }}
              title="Ratings"
              value={planningRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={planningComment}
              onChange={(e: any) => {
                setPlanningComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>

        <div className={`${styles.evaluation__section} `}>
          <Card header="Total Score">
            <input
              className={styles.score__input}
              type="text"
              style={{ backgroundColor: "white" }}
              readOnly
              value={supervisorScore}
              required
            />
          </Card>

          <div></div>

          <div className={styles.section1__comments}></div>
        </div>
        <Table score={supervisorScore} />
        <div className={`${styles.evaluation__section} `}>
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
            <span>
              Action Date: {raterDate.substring(0, raterDate.length - 10)}
            </span>
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <div className={styles.section1__comments}></div>
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

export default MHRBPView;
