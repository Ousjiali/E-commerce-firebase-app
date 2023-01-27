import * as React from "react";
import { useState } from "react";
import { useHistory, Link, useParam } from "react-router-dom";
import {
  Header,
  Select,
  Helpers,
  TextArea,
  Card,
  Spinner,
} from "../../../../Containers";
import styles from "../performance.module.scss";
import { sp } from "@pnp/sp";
import { EmployeeContext } from "../../../../Context/EmployeeContext";

const BehaviouralTrait = () => {
  const history = useHistory();
  const { id } = React.useContext(EmployeeContext);
  const [dependabilityRating, setDependabilityRating] = useState(0);
  const [dependabilityComment, setDependabilityComment] = useState("");
  const [coperationRating, setCoperationRating] = useState(0);
  const [coperationComment, setCoperationComment] = useState("");
  const [initiativeRating, setInitiativeRating] = useState(0);
  const [initiativeComment, setInitiativeComment] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!id) {
      history.push("/");
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
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  const { itemId } = React.useContext(EmployeeContext);

  const [level, setLevel] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(Number(itemId))
      .get()
      .then((res) => {
        setLevel(res.Level);
        setLoading(false);
      });
  }, []);

  const nextHandler = () => {
    switch (level) {
      case "Level 1":
        history.push("/view/behavioral/section2Level3");
        break;
      case "Level 2":
        history.push("/view/behavioral/section2Level3");
        break;
      default:
        history.push("/view-behavioral/section2");
        break;
    }
  };

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      {loading ? <Spinner /> : null}
      <div className={styles.evaluation__section2__container}>
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
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              readOnly={true}
              onChange={(e) => {
                setDependabilityComment(e.target.value);
              }}
              value={dependabilityComment}
            />
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
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              readOnly={true}
              onChange={(e) => {
                setCoperationComment(e.target.value);
              }}
              value={coperationComment}
            />
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
              readOnly={true}
              onChange={(e) => {
                setInitiativeComment(e.target.value);
              }}
              value={initiativeComment}
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
                onClick={nextHandler}
                className="mtn__btn mtn__black"
                type="button"
                disabled={loading}
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

export default BehaviouralTrait;
