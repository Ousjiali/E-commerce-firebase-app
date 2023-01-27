import * as React from "react";
import { sp } from "@pnp/sp";
import {
  Header,
  Card,
  Modal,
  Select,
  TextArea,
  Helpers,
  Table,
} from "../../../../Containers";
import { Link, useHistory } from "react-router-dom";
import styles from "../Supervisory Section 2/section2.module.scss";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { RaterContext } from "../../../../Context/RaterContext";
import swal from "sweetalert";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { Box } from "@material-ui/core";
import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";

const LineManagerView = () => {
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
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const { raterFinalComments, setRaterFinalComments, rater, raterEmail } =
    React.useContext(RaterContext);
  const [date, setDate] = React.useState("");
  const [EmployeeName, setEmployeeName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [lineManagerFeedback, setLineManagerFeedback] = React.useState("");
  const { id, itemId } = React.useContext(EmployeeContext);
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
  const [deferModal, setDeferModal] = React.useState(false);
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [actorEmail, setActorEmail] = React.useState("");
  const [actionDate, setActionDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );

  const modalHandler = () => {
    setOpen(true);
  };
  const noHandler = () => {
    setOpen(false);
  };

  const closeModal = () => {
    setDeferModal(false);
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setActorEmail(response?.Email);
    });
  }, []);

  const submitFeedbackHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setOpen(false);
    const data = {
      EmployeeID: id,
      RejectCommentLineManager: lineManagerFeedback,
      // LineManagerDevelopmentRequiremen : developmentalRequirement,
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
  const submitHandler = (e: any) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      EmployeeID: id,
      RaterLineManagerComment: lineManagerComment,
      LineManagerDevelopmentRequiremen: developmentalRequirement,
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

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/linemanager");
      return;
    }

    Promise.all([
      sp.web.lists
        .getByTitle("SupervisoryEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setDate(response[0].RatingDate);
            setSupervisorScore(response[0].TotalRatingScore);
            setPeopleManagementRating(response[0].PeopleManagementRating);
            setPeopleManagementComment(response[0].PeopleManagementComment);
            setPlanningComment(response[0].PlanningComment);
            setPlanningRating(response[0].PlanningRating);
            setRaterFinalComments(response[0].RaterFinalComment);
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
      sp.web.lists
        .getByTitle("Confirmation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((res) => {
          setConfirmationStatus(res[0].ConfirmationStatusByScore);
          setEmployeeName(res[0].EmployeeName);
          setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
        }),
    ]);
  }, []);

  // React.useMemo(()=>{
  //   if (confirmationStatus === "Defer") {
  //     setDeferModal(true)
  //   }
  // },[confirmationStatus])

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
              readOnly={true}
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
              readOnly={true}
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
              readOnly={true}
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
              readOnly={true}
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
            <div className={styles.section1__comments}>
              <h2>Development Requirements</h2>
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

          <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              <span>Action Date:{date.substring(0, date.length - 10)}</span>
            </div>
          </Box>
        </div>
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
                className="mtn__btn mtn__blackOutline"
                type="button"
                onClick={() => backHandler()}
                disabled={loading}
              >
                Previous
              </button>
            </div>
            <Modal
              isVisible={open}
              title={<h5>Reason for Rejection</h5>}
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
                      type="submit"
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
                // onClick={feedbackHandler}
                onClick={modalHandler}
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
    </>
  );
};

export default LineManagerView;
