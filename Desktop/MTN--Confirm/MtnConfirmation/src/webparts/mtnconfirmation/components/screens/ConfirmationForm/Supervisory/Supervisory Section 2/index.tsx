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
import styles from "./section2.module.scss";
import { TextAreaSmall } from "../../../../Containers/TextArea";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { RaterContext } from "../../../../Context/RaterContext";
import swal from "sweetalert";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { BehavioralContext } from "../../../../Context/BehavioralContext";
import { getColor } from "../../Behavioural Traits Evaluation/Section 3/viewbehavioralLevel3/utils";
const Section3 = () => {
  const history = useHistory();

  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
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

  const { raterFinalComments, setRaterFinalComments, rater, raterEmail } =
    React.useContext(RaterContext);
  const [date, setDate] = React.useState(
    new Date(Date.now()).toLocaleDateString()
  );
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [Id, setId] = React.useState(0);
  const [itemID, setItemId] = React.useState("");
  const [performanceID, setPerformanceID] = React.useState("");
  const { behavioralEvaluationScore } = React.useContext(BehavioralContext);
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const { id, itemId, setId: employee } = React.useContext(EmployeeContext);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (!id) {
      return history.push("/pendingrequests");
    }

    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setId(res[0].Id);
      });

    sp.web.lists
      .getByTitle(`PerformanceFactorEvaluation`)
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setPerformanceID(res[0].ID);
      });

    sp.web.lists
      .getByTitle("SupervisoryEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          setLeadershipRating(response[0].LeadershipRating);
          setLeadershipComment(response[0].LeadershipComment);
          setDelegationRating(response[0].DelegationRating);
          setDelegationComment(response[0].DelegationComment);
          setAdministrationRating(response[0].AdministrationRating);
          setAdministrationComment(response[0].AdministrationComment);
          setSupervisorScore(response[0].TotalRatingScore);
          setPeopleManagementRating(response[0].PeopleManagementRating);
          setPeopleManagementComment(response[0].PeopleManagementComment);
          setPlanningComment(response[0].PlanningComment);
          setPlanningRating(response[0].PlanningRating);
          setItemId(response[0].ID);
          setRaterFinalComments(response[0].RaterFinalComment);
        }
      });
  }, []);

  const backHandler = () => {
    history.goBack();
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
  }, [score]);

  const scoreHandler = () => {
    const total =
      Number(leadershipRating) +
      Number(administrationRating) +
      Number(delegationRating) +
      Number(peopleManagementRating) +
      Number(planningRating) +
      Number(behavioralEvaluationScore);
    setSupervisorScore(total);
    setScore(total);
    setShowSubmitButton(true);
  };

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

    if (!supervisorScore) {
      return swal(
        "Error Occured",
        "Please click on the calculate score",
        "error"
      );
    }
    setLoading(true);
    sp.web.lists
      .getByTitle("SupervisoryEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
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
              employee("");

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
        } else
          sp.web.lists
            .getByTitle("SupervisoryEvaluation")
            .items.add(data)
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
                  TotalScore: supervisorScore,
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
          <Card header="Leadership">
            <ul>
              <li>
                Consider how well the employee demonstrates effective
                supervisory abilities
              </li>
              <li>Gains respect and co-operates with others</li>
              <li>Inspires and motivates surbodinates </li>
              <li>Directs the work towards a common goal </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setLeadershipRating(e.target.value);
              }}
              title="Ratings"
              value={leadershipRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={leadershipComment}
              onChange={(e: any) => {
                setLeadershipComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Delegation">
            <ul>
              <li>
                How well does the employee demonstrate the ability to direct
                others in accomplishing work effectively, select and motivate
                staff, define assignments and oversee the work of the
                subordinates?
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setDelegationRating(e.target.value);
              }}
              title="Ratings"
              value={delegationRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={delegationComment}
              onChange={(e: any) => {
                setDelegationComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
        <div className={`${styles.evaluation__section} `}>
          <Card header="Administration">
            <ul>
              <li>
                How well does the employee perform day to day administrative
                tasks.
              </li>
              <li>Manage time</li>
              <li>Administer policies and implement procedures</li>
              <li>
                Maintain appropriate contact with his/her supervisor and utilize
                funds, staff or equipment?
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            {/* <h2>Ratings</h2> */}
            <Select
              onChange={(e: any) => {
                setAdministrationRating(e.target.value);
              }}
              title="Ratings"
              value={administrationRating}
              options={Helpers.rating}
              required={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              value={administrationComment}
              onChange={(e: any) => {
                setAdministrationComment(e.target.value);
              }}
              required={true}
            />
          </div>
        </div>
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
          <div className="mtn__btn mtn__black" onClick={scoreHandler}>
            Calculate Supervisory Score
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
              required={true}
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

export default Section3;
