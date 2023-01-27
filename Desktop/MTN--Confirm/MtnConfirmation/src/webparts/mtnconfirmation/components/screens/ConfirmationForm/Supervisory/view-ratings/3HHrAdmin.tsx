import * as React from "react";
import { sp } from "@pnp/sp";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Table,
} from "../../../../Containers";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { RoleContext } from "../../../../Context/RoleContext";
import styles from "../Supervisory Section 2/section2.module.scss";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { RaterContext } from "../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { Box } from "@material-ui/core";
import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";

const HRAdminView = () => {
  const history = useHistory();

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

  const { raterFinalComments, setRaterFinalComments } =
    React.useContext(RaterContext);
  const { setRole, role } = React.useContext(RoleContext);
  const { id, itemId } = React.useContext(EmployeeContext);
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);

  const [employeeComment, setEmployeeComment] = React.useState("");
  const [mhrbpComment, setMhrbpComment] = React.useState("");

  const [hrbpDevelpomentReq, setHrbpDevelpomentReq] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [raterDate, setRaterDate] = React.useState("");
  const [raterName, setRaterName] = React.useState("");
  const [reviewerDate, setReviewerDate] = React.useState("");
  const [reviewerName, setReviewerName] = React.useState("");
  const [HRBPName, setHRBPName] = React.useState("");
  const [HRBPDate, setHRBPDate] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");

  const nextHandler = () => {
    switch (role) {
      case "GM HR Operations":
        history.push("/view-supervisory/gmhr");
        break;

      case "HR Close Out Request":
        history.push("/level3h/hr-closeout");
        break;

      default:
        history.push("/level3h/summary");
        break;
    }
  };

  const backHandler = () => {
    history.goBack();
  };

  // const submitHandler = (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   const data = {
  //     EmployeeID: id,
  //     HRComment: hrComment,
  //   };
  //   console.log(id, itemId, "id inside button");
  //   sp.web.lists
  //     .getByTitle("EvaluationComments")
  //     .items.filter(`EmployeeID eq '${id}'`)
  //     .get()
  //     .then((item) => {
  //       console.log(item, "this is it");
  //       if (item.length > 0) {
  //         const SubmissionID = item && item[0].Id;
  //         console.log(SubmissionID, "yes");
  //         sp.web.lists
  //           .getByTitle("EvaluationComments")
  //           .items.getById(SubmissionID)
  //           .update(data)
  //           .then(() => {
  //             sp.web.lists
  //               .getByTitle("Confirmation")
  //               .items.getById(Number(itemId))
  //               .update({
  //                 Approvals: "GM HR Operations",
  //               })
  //               .then(() => {
  //                 setLoading(false);
  //                 setMhrbpComment("");
  //                 swal({
  //                   title: "Success",
  //                   text: "Evaluation Comment Submitted Successfully",
  //                   icon: "success",
  //                 }).then((ok) => {
  //                   if (ok) {
  //                     history.push("/pending/requests/hradministrator");
  //                   }
  //                 });
  //               });
  //           });
  //       } else {
  //         history.push("/pending/requests/hradministrator");
  //       }
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       swal(
  //         "Error Occured",
  //         "An error occured while submitting your data!",
  //         "error"
  //       );
  //       console.log(error);
  //     });
  // };

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/hradministrator");
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
            setHrbpDevelpomentReq(response[0].HrbpDevelopmentRequest);
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
            // setReviewerComment(response[0].ReviewerComment);
            // setEmployeeComment(response[0].EmployeeComment);
            setHrbpDevelpomentReq(response[0].HrbpDevelopmentRequest);
            setMhrbpComment(response[0].HRBPComment);
            setDevelopmentalRequiremnt(
              response[0].LineManagerDevelopmentRequiremen
            );
            setReviewerDate(response[0].LineManagerDate);
            setReviewerName(response[0].LineManagerName);
            setHRBPDate(response[0].HRBPDate);
            setHRBPName(response[0].HRBPName);
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
  }, []);

  return (
    <>
      <Header title="Supervisory Evaluation" />
      <form className={styles.evaluation__section2__container}>
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
            <span>Reviewer's Email: {reviewerName}</span>
            <br />
            <span>Action Date: {reviewerDate}</span>
          </div>
          <div className={styles.section1__comments}>
            <h2>HRPB Comment</h2>
            <TextAreaSmall
              value={mhrbpComment}
              rows={5}
              onChange={(e: any) => {
                setMhrbpComment(e.target.value);
              }}
              required={true}
              readOnly={true}
            />
            <span>HRBP's Email: {HRBPName}</span>
            <br />
            <span>Action Date: {HRBPDate}</span>
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
            <div>
              <button className="mtn__btn mtn__black" onClick={nextHandler}>
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HRAdminView;
