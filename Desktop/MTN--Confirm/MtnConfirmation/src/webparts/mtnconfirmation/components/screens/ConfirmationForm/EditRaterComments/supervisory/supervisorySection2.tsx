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
import styles from "../../Supervisory/Supervisory Section 2/section2.module.scss";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { RaterContext } from "../../../../Context/RaterContext";
import swal from "sweetalert";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { BehavioralContext } from "../../../../Context/BehavioralContext";

const Section3 = () => {
  const history = useHistory();

  const backHandler = () => {
    history.goBack();
  };
  const [Id, setId] = React.useState(0);
  const [itemID, setItemId] = React.useState("");
  const [showSubmitButton, setShowSubmitButton] = React.useState(true);
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [score, setScore] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const {
    leadershipRating,
    administrationRating,
    delegationRating,
    peopleManagementComment,
    setPeopleManagementComment,
    peopleManagementRating,
    setPeopleManagementRating,
    planningComment,
    setPlanningComment,
    // nextActor,
    // setNextAcor,
    planningRating,
    setPlanningRating,
    delegationComment,
    leadershipComment,
    administrationComment,
    setSupervisoryEvaluationScore: setSupervisorScore,
    supervisoryEvaluationScore: supervisorScore,
    setLeadershipRating,
    setAdministrationComment,
    setDelegationComment,
    setLeadershipComment,
    setAdministrationRating,
    setDelegationRating,
  } = React.useContext(SupervisoryEvaluationContext);

  const { raterFinalComments, setRaterFinalComments, rater, raterEmail, date } =
    React.useContext(RaterContext);

  const { behavioralEvaluationScore } = React.useContext(BehavioralContext);

  const { id, itemId } = React.useContext(EmployeeContext);

  const scoreHandler = () => {
    const total =
      Number(leadershipRating) +
      Number(administrationRating) +
      Number(delegationRating) +
      Number(peopleManagementRating) +
      Number(planningRating) +
      Number(behavioralEvaluationScore);
    setSupervisorScore(total);
    setShowSubmitButton(false);
  };
  React.useMemo(() => {
    if (supervisorScore === 0) {
      setConfirmationStatus(" ");
    } else if (supervisorScore > 0 && supervisorScore <= 28) {
      setConfirmationStatus("Do not Confirm");
    } else if (supervisorScore > 28 && supervisorScore <= 43) {
      setConfirmationStatus("Defer");
    } else {
      setConfirmationStatus("Confirm");
    }
  }, [supervisorScore]);

  React.useMemo(() => {
    setScore(supervisorScore);
  }, [score, supervisorScore]);

  React.useEffect(() => {
    if (!id) {
      history.push("/rejected/pending/requests");
      return;
    }

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
          setItemId(response[0].Id);
          setRaterFinalComments(response[0].RaterFinalComment);
        }
      }),
      sp.web.lists
        .getByTitle("Confirmation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((res) => {
          console.log(res[0].Id);

          setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);

          setConfirmationStatus(res[0].ConfirmationStatusByScore);
          setId(res[0].Id);
        });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      EmployeeID: id,
      RaterName: rater,
      RaterEmail: raterEmail,
      RatingDate: date,
      LeadershipRating: leadershipRating,
      AdministrationRating: administrationRating,
      DelegationRating: delegationRating,
      PeopleManagementRating: peopleManagementRating,
      PlanningRating: planningRating,
      PeopleManagementComment: peopleManagementComment,
      PlanningComment: planningComment,
      DelegationComment: delegationComment,
      LeadershipComment: leadershipComment,
      AdministrationComment: administrationComment,
      RaterFinalComment: raterFinalComments,
      TotalRatingScore: supervisorScore,
    };

    if (score === 0) {
      return swal(
        "Error Occured",
        "Please click on the calculate score",
        "error"
      );
    }
    setLoading(true);

    sp.web.lists
      .getByTitle("SupervisoryEvaluation")
      .items.getById(Number(itemID))
      .update(data)
      .then((item) => {
        setLoading(false);
        setPeopleManagementComment("");
        setPlanningComment("");
        setDelegationComment("");
        setLeadershipComment("");
        setAdministrationComment("");
        setRaterFinalComments("");
        setSupervisorScore(0);
        setPeopleManagementRating(0);
        setPlanningRating(0);
        setDelegationRating(0);
        setLeadershipRating(0);
        setAdministrationRating(0);

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
  };

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
          <div>
            <h2>
              Confirmation Status:
              {confirmationStatus === "Confirm" ? (
                <p style={{ color: "green" }}> Confirm </p>
              ) : confirmationStatus === "zero" ? null : (
                <p style={{ color: "red" }}> Defer</p>
              )}
            </h2>
          </div>
          <div></div>
        </div>

        <div className={`${styles.evaluation__section} `}>
          <div className="mtn__btn mtn__black" onClick={scoreHandler}>
            Calculate Supervisory
          </div>
          <div></div>
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
            <div>
              {showSubmitButton ? (
                <button
                  className="mtn__btn mtn__black"
                  type="button"
                  onClick={scoreHandler}
                >
                  Calculate Supervisory
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
      </form>
    </>
  );
};

export default Section3;
