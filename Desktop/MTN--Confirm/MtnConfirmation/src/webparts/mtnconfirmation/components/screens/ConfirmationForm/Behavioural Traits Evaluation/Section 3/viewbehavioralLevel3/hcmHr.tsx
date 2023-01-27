import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Header,
  Card,
  Select,
  TextArea,
  Helpers,
  Table,
} from "../../../../../Containers";
import { BehavioralContext } from "../../../../../Context/BehavioralContext";
import { sp } from "@pnp/sp";
import styles from "../section3.module.scss";
import { RaterContext } from "../../../../../Context/RaterContext";
import { EmployeeContext } from "../../../../../Context/EmployeeContext";
import { TextAreaSmall } from "../../../../../Containers/TextArea";
import { RoleContext } from "../../../../../Context/RoleContext";
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
  const { raterFinalComments, setRaterFinalComments, rater, raterEmail, date } =
    React.useContext(RaterContext);
  const { id } = React.useContext(EmployeeContext);
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
  const [mhrbpComment, setMhrbpComment] = React.useState("");
  const [showMsg, setShowMsg] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [raterDate, setRaterDate] = React.useState("");
  const [raterName, setRaterName] = React.useState("");
  const [reviewerDate, setReviewerDate] = React.useState("");
  const [reviewerName, setReviewerName] = React.useState("");
  const [HRBPName, setHRBPName] = React.useState("");
  const [HRBPDate, setHRBPDate] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [hrbpDevelpomentReq, setHrbpDevelpomentReq] = React.useState("");
  const { role } = React.useContext(RoleContext);

  const history = useHistory();

  const nextHandler = () => {
    switch (role) {
      case "Senior Manager Employee Services":
        history.push("/view/behavioral/section3/smes");
        break;
      case "HR Close Out Request":
        history.push("/level2/hr-closeout");
        break;
      default:
        history.push("/level/summary");
        break;
    }
  };

  React.useEffect(() => {
    if (!id) {
      history.push("/pending/requests/hradministrator");
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
            setMhrbpComment(response[0].HRBPComment);
            setDevelopmentalRequiremnt(
              response[0].LineManagerDevelopmentRequiremen
            );
            setHrbpDevelpomentReq(response[0].HrbpDevelopmentRequest);
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
    setLoading(false);
  }, []);

  const backHandler = () => {
    history.goBack();
  };

  return (
    <>
      <Header title="Behavioural Traits Evaluation" />
      <div className={styles.evaluation__section2__container}>
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
            <h2>Raters final comment</h2>
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
            <span>Reviewer's Email: {reviewerName}</span>
            <br />
            <span>Action Date: {reviewerDate}</span>
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
              readOnly={commentFieldReadOnly}
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
                onClick={nextHandler}
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

export default GetBehavioralSection3Rating;
