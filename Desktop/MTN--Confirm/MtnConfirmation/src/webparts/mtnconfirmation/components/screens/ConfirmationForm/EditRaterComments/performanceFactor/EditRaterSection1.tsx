import * as React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Header,
  Select,
  Helpers,
  TextArea,
  Card,
  Spinner,
} from "../../../../Containers";
import styles from "../../performanceFactor/performance.module.scss";

import { sp } from "@pnp/sp";
import swal from "sweetalert";
import { EmployeeContext } from "../../../../Context/EmployeeContext";
import { performanceEvaluationContext } from "../../../../Context/performanceContext";

const EditRaterSection1 = ({ context }) => {
  const {
    knowlegdeRating,
    setKnowlegdeRating,
    knowlegdeComment,
    setknowlegdeComment,
    workQualityRating,
    setWorkQualityRating,
    workQualityComment,
    setWorkQualityComment,
    workQuantityRating,
    setworkQuantityRating,
    workQuantityComment,
    setworkQuantityComment,
  } = React.useContext(performanceEvaluationContext);

  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = useState("");
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const history = useHistory();

  const { id } = React.useContext(EmployeeContext);
  const { id: itemID } = useParams();

  const backHandler = () => {
    history.goBack();
  };

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.getById(itemID)
      .update({
        KnowlegdeRating: knowlegdeRating,
        KnowlegdeComment: knowlegdeComment,
        WorkQualityRating: workQualityRating,
        WorkQualityComment: workQualityComment,
        WorkQuantityRating: workQuantityRating,
        WorkQuantityComment: workQuantityComment,
      })
      .then((res) => {
        swal("successful", {
          buttons: { cancel: false, confirm: false },
          timer: 2000,
        });
        history.push("/");
        setLoading(false);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        setLoading(false);
        console.error(e);
      });
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/rejected/pending/requests");
      return;
    }

    setLoading(true);
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setKnowlegdeRating(res[0].KnowlegdeRating);
          setknowlegdeComment(res[0].KnowlegdeComment);
          setWorkQualityRating(res[0].WorkQualityRating);
          setWorkQualityComment(res[0].WorkQualityComment);
          setworkQuantityRating(res[0].WorkQuantityRating);
          setworkQuantityComment(res[0].WorkQuantityComment);
        }
      });
  }, []);

  const nextHandler = () => {
    history.push("/edit/rater/comments/section2");
    setShowSubmitButton(true);
  };

  return (
    <div>
      {" "}
      <Header title="Performance Factor" />
      {loading && <Spinner />}
      <div
        className={styles.evaluation__section2__container}
        onSubmit={submitHandler}
      >
        <div className={styles.evaluation__section}>
          <Card header="knowlegde, skill and ability">
            <ul>
              <li>
                Consider the degree to which the employee exhibits the required
                level of job knowledge skills to perform the job and the use of
                established techniques, materials and equipment as they relate
                to performance.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              value={knowlegdeRating}
              onChange={(e) => setKnowlegdeRating(e.target.value)}
              title="Ratings"
              options={Helpers.rating}
            />
          </div>

          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={knowlegdeComment}
              readOnly={false}
              onChange={(e) => setknowlegdeComment(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <Card header="Quality of work">
            <ul>
              <li>Does the employee assignments meet quality standards?</li>
              <li>
                consider accuracy neatness, thoroughness and adherence to
                standard and safety.
              </li>
            </ul>
          </Card>
          <div className={styles.section1__ratings}>
            <Select
              title="Rating"
              onChange={(e) => setWorkQualityRating(e.target.value)}
              value={workQualityRating}
              options={Helpers.rating}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={workQualityComment}
              onChange={(e) => setWorkQualityComment(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.evaluation__section}>
          <div>
            <Card header="Quantity of Work">
              <ul>
                <li>Consider the degree to which the employee exhibits</li>
                <li>
                  Consider the result of the employee's effort does the employee
                  demostrate the ability to
                </li>
                <li>Manage several responsibilities simultaneously?</li>
                <li>Perform work in a productive and timely manner?</li>
                <li>Meet work schedule?</li>
              </ul>
            </Card>
          </div>
          <div className={styles.section1__ratings}>
            <Select
              value={workQuantityRating}
              onChange={(e) => setworkQuantityRating(e.target.value)}
              title="Rating"
              options={Helpers.rating}
            />
          </div>
          <div className={styles.section1__comments}>
            <h2>Comment</h2>
            <TextArea
              value={workQuantityComment}
              onChange={(e) => setworkQuantityComment(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.evaluation__section__button}>
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
                <button type="submit" disabled={loading}>
                  {loading ? "Updating..." : "Next"}
                </button>
              ) : (
                <div className="mtn__btn mtn__black" onClick={nextHandler}>
                  Next
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRaterSection1;
