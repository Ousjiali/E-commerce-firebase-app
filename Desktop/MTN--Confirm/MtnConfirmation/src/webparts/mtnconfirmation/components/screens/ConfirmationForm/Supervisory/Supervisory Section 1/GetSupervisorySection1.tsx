import * as React from "react";
import { sp } from "@pnp/sp";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
} from "../../../../Containers";
import { useHistory } from "react-router-dom";
import styles from "./section1.module.scss";
import { RaterContext } from "../../../../Context/RaterContext";
import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import swal from "sweetalert";
import { RoleContext } from "../../../../Context/RoleContext";
const GetSuperVisorySection1 = () => {
  const { role } = React.useContext(RoleContext);
  const history = useHistory();

  const nextHandler = () => {
    switch (role) {
      case "Rater Line Manager":
        history.push("/view-supervisory/linemanager");
        break;
      case "HCM Administrator":
        history.push("/view-supervisory/hradmin");
        break;
      case "GM HR Operations":
        history.push("/view-supervisory/gmhr");
        break;
      case "Employee":
        history.push("/view-supervisory/employee");
        break;
      case "HRBP":
        history.push("/view-supervisory/mhrbp");
        break;

      case "Chief HR Officer":
        history.push("/view-supervisory/hradmin");
        break;

      case "HR Close Out Request":
        history.push("/view-supervisory/hradmin");
        break;

      default:
        swal({
          title: "Error",
          text: "You are not authorized to view this page",
          icon: "error",
          closeOnClickOutside: false,
          closeOnEsc: false,
        }).then(() => {
          history.push("/");
        });
        break;
    }
  };

  const {
    leadershipRating,
    setLeadershipRating,
    leadershipComment,
    setLeadershipComment,
    delegationComment,
    setDelegationComment,
    delegationRating,
    setDelegationRating,
    administrationComment,
    setAdministrationComment,
    administrationRating,
    setAdministrationRating,
  } = React.useContext(SupervisoryEvaluationContext);

  const { id } = React.useContext(EmployeeContext);

  React.useEffect(() => {
    if (!id) {
      history.push("/pendingrequests");
      return;
    }
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
        }
      });
  }, []);

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Supervisory Evaluation" />
      <div className={styles.evaluation__section2__container}>
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
              readOnly={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={leadershipComment}
              onChange={(e: any) => {
                setLeadershipComment(e.target.value);
              }}
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
              readOnly={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={delegationComment}
              onChange={(e: any) => {
                setDelegationComment(e.target.value);
              }}
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
              readOnly={true}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comments</h2>
            <TextArea
              readOnly={true}
              value={administrationComment}
              onChange={(e: any) => {
                setAdministrationComment(e.target.value);
              }}
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
                type="button"
                onClick={() => nextHandler()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetSuperVisorySection1;
