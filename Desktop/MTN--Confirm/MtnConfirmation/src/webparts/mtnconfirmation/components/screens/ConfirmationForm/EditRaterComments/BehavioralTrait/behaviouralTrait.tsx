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
  Modal,
} from "../../../../Containers";
import styles from "../../performanceFactor/performance.module.scss";
import { sp } from "@pnp/sp";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { BehavioralContext1 } from "../../../../Context/behavioralContext1";
const BehaviouralTrait = () => {
  const history = useHistory();

  const noHandler = () => {
    setOpen(false);
  };
  const { itemId } = React.useContext(EmployeeContext);

  const { id } = React.useContext(EmployeeContext);
  const [workMsg2, setWorkMsg2] = useState(false);
  const [knowlegdeMsg, setknowlegdeMsg] = useState(false);
  const [workMsg, setWorkMsg] = useState(false);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const modalHandler = () => {
    setOpen(true);
  };
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

  const cancelHandler = (e) => {
    e.preventDefault();
    setDependabilityRating(0);
    setDependabilityComment("");
    setCoperationRating(0);
    setCoperationComment("");
    setInitiativeRating(0);
    setInitiativeComment("");
    setOpen(false);
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/rejected/pending/requests");
      return;
    }

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

  const backHandler = () => {
    history.goBack();
  };

  // React.useEffect(()=>{
  //   sp.web.lists
  //         .getByTitle("Confirmation")
  //         .items.getById(Number(itemId))
  //         .get().then((res)=>{
  //           console.log(res.Level)
  //           setLevel(res.Level)
  //         });
  //       },[])

  // const nextHandler = () => {
  //   switch (level) {
  //     case "Level 1" :
  //         history.push("/view/behavioral/section2Level3");
  //         break;
  //         case "Level 2" :
  //           history.push("/view/behavioral/section2Level3");
  //           break;
  //           case "Level 3" :
  //             history.push("/view/behavioral/section2Level3");
  //             break;
  //     default:
  //       history.push("/view-behavioral/section2");
  //       break;
  //   }

  // };

  const nextHandler = () => {
    if (dependabilityComment.length < 60) {
      setknowlegdeMsg(true);
    }
    if (coperationComment.length < 60) {
      setWorkMsg(true);
    }
    if (initiativeComment.length < 60) {
      setWorkMsg2(true);
    } else {
      history.push("/edit/rater/behavioral/section2");
    }
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
              onChange={(e) => {
                setDependabilityComment(e.target.value);
              }}
              value={dependabilityComment}
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
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              onChange={(e) => {
                setCoperationComment(e.target.value);
              }}
              value={coperationComment}
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
            />
            {workMsg2 ? (
              <span>Your comment should be at least 60 characters </span>
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
              <div className="mtn__trait">
                <button
                  className="mtn__btn mtn__black"
                  type="button"
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
              </div>
              <div className="mtn__nextBtn">
                <button
                  onClick={nextHandler}
                  className="mtn__btn mtn__black"
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BehaviouralTrait;
