// import * as React from "react";
// import { Link, useHistory } from "react-router-dom";
// import {
//   Header,
//   Card,
//   Select,
//   TextArea,
//   Helpers,
//   Table,
// } from "../../../../../Containers";
// import { BehavioralContext } from "../../../../../Context/BehavioralContext";
// import { sp } from "@pnp/sp";
// import styles from "../section3.module.scss";
// import { RaterContext } from "../../../../../Context/RaterContext";
// import { EmployeeContext } from "../../../../../Context/EmployeeContext";
// import swal from "sweetalert";
// import { TextAreaSmall } from "../../../../../Containers/TextArea";
// import { getColor } from "./utils";
// const GetBehavioralSection3Rating = () => {
//   const {
//     punctualityRating,
//     setPunctualityRating,
//     punctualityComment,
//     setPunctualityComment,
//     queryComment,
//     setQueryComment,
//     queryRating: queryResponse,
//     setQueryRating: setQueryResponse,
//     behavioralEvaluationScore: performanceScore,
//     setBehavioralEvaluationScore: setPerformanceScore,
//     disciplinaryRating: disciplinaryResponse,
//     setDisciplinaryRating: setDisciplinaryResponse,
//   } = React.useContext(BehavioralContext);
//   const { raterFinalComments, setRaterFinalComments, rater, raterEmail, date } =
//     React.useContext(RaterContext);
//   const { id, itemId } = React.useContext(EmployeeContext);
//   const [lineManagerComment, setLineManagerComment] = React.useState("");
//   const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
//   const [mhrbpComment, setMhrbpComment] = React.useState("");
//   const [showMsg, setShowMsg] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);
//   const [hrComment, setHrComment] = React.useState("");
//   const [sMESComment, setSMESComment] = React.useState("");
//   const [developmentalRequirement, setDevelopmentalRequiremnt] =
//     React.useState("");
//   const [confirmationStatus, setConfirmationStatus] = React.useState("");
//   const history = useHistory();

//   const backHandler = () => {
//     history.goBack();
//   };

//   const submitHandler = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const data = {
//       EmployeeID: id,
//       SMESComment: sMESComment,
//     };

//     sp.web.lists
//       .getByTitle("EvaluationComments")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((item) => {
//         if (item.length > 0) {
//           const submissionID = item && item[0].Id;
//           console.log(submissionID, "yes");
//           sp.web.lists
//             .getByTitle("EvaluationComments")
//             .items.getById(submissionID)
//             .update(data)
//             .then(() => {
//               sp.web.lists
//                 .getByTitle("Confirmation")
//                 .items.getById(Number(itemId))
//                 .update({
//                   Approvals: "HR Close Out Request",
//                   ConfirmationStatus: "Pending",
//                 })
//                 .then(() => {
//                   setLoading(false);
//                   setSMESComment("");
//                   swal({
//                     title: "Success",
//                     text: "Evaluation Comment Submitted Successfully",
//                     icon: "success",
//                   }).then((ok) => {
//                     if (ok) {
//                       history.push(
//                         "/pending/requests/seniormanageremployeeservices"
//                       );
//                     }
//                   });
//                 });
//             });
//         } else {
//           history.push("/pending/requests/seniormanageremployeeservices");
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         swal(
//           "Error Occured",
//           "An error occured while submitting your data!",
//           "error"
//         );
//         console.log(error);
//       });
//   };

//   //   const nextHandler = () => {
//   //     history.push("/view-supervisory/section1");
//   //   };
//   const approveHandler = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const data = {
//       EmployeeID: id,
//       SMESComment: sMESComment,
//     };

//     sp.web.lists
//       .getByTitle("EvaluationComments")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((item) => {
//         if (item.length > 0) {
//           const SubmissionID = item && item[0].Id;
//           sp.web.lists
//             .getByTitle("EvaluationComments")
//             .items.getById(SubmissionID)
//             .update(data)
//             .then(() => {
//               sp.web.lists
//                 .getByTitle("Confirmation")
//                 .items.getById(Number(itemId))
//                 .update({
//                   Approvals: "HR Close Out Request",
//                   ConfirmationStatus: "Pending",
//                 })
//                 .then(() => {
//                   setLoading(false);
//                   setSMESComment("");
//                   swal({
//                     title: "Success",
//                     text: "Evaluation Comment Submitted Successfully",
//                     icon: "success",
//                   }).then((ok) => {
//                     if (ok) {
//                       history.push(
//                         "/pending/requests/seniormanageremployeeservices"
//                       );
//                     }
//                   });
//                 });
//             });
//         } else {
//           history.push("/pending/requests/seniormanageremployeeservices");
//         }
//       })
//       .catch((error) => {
//         setLoading(false);
//         swal(
//           "Error Occured",
//           "An error occured while submitting your data!",
//           "error"
//         );
//         console.log(error);
//       });
//   };
//   React.useEffect(() => {
//     if (!id) {
//       history.push("/pending/requests/seniormanageremployeeservices");
//       return;
//     }

//     Promise.all([
//       sp.web.lists
//         .getByTitle("BehavioralTraitsEvaluation")
//         .items.filter(`EmployeeID eq '${id}'`)
//         .get()
//         .then((response) => {
//           if (response.length > 0) {
//             setPunctualityRating(response[0].Punctuality);
//             setPunctualityComment(response[0].PuctualityComment);
//             setQueryResponse(response[0].QueryRating);
//             setQueryComment(response[0].DisciplinaryAndQueryComment);
//             setDisciplinaryResponse(response[0].Disciplinary);
//             setRaterFinalComments(response[0].RaterFinalComment);
//             setPerformanceScore(response[0].Total);
//             setHrComment(response[0].HRComment);
//           }
//         }),
//       sp.web.lists
//         .getByTitle("EvaluationComments")
//         .items.filter(`EmployeeID eq '${id}'`)
//         .get()
//         .then((response) => {
//           if (response.length > 0) {
//             setCommentFieldReadOnly(true);
//             setLineManagerComment(response[0].RaterLineManagerComment);
//             setMhrbpComment(response[0].HRBPComment);
//             setSMESComment(response[0].SMESComment);
//             setHrComment(response[0].HRComment);
//             setDevelopmentalRequiremnt(
//               response[0].LineManagerDevelopmentRequirement
//             );
//           }
//         }),
//     ]);
//     sp.web.lists
//       .getByTitle("Confirmation")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((res) => {
//         setConfirmationStatus(res[0].ConfirmationStatusByScore);
//       });
//   }, []);

//   return (
//     <>
//       <Header title="Behavioural Traits Evaluation" />
//       <form
//         onSubmit={submitHandler}
//         className={styles.evaluation__section2__container}
//       >
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Punctuality">
//             <ul>
//               <li>
//                 Consider work arrivals and departure in accordance with
//                 Departmental and MTN policy.
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             <Select
//               onChange={(e: any) => {
//                 setPunctualityRating(e.target.value);
//               }}
//               title="Ratings"
//               readOnly={true}
//               value={punctualityRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               readOnly={true}
//               value={punctualityComment}
//               onChange={(e: any) => {
//                 e.target.value.length <= 60
//                   ? setPunctualityComment(e.target.value)
//                   : setShowMsg(true);
//               }}
//             />
//             {showMsg ? (
//               <span>You can only type 60 characters or less</span>
//             ) : null}
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Total Performance Score">
//             <input
//               className={styles.score__input}
//               type="text"
//               style={{ backgroundColor: "white" }}
//               value={performanceScore}
//               readOnly
//             />
//           </Card>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <div className={styles.disciplinary}>
//             <h2>Query/Disciplinary Issues</h2>
//             <div>Confirm if employee has received query or warning</div>
//             <div>Confirm if employee has any engaging/disciplinary issues</div>
//           </div>
//           <div className={styles.input__container}>
//             <div className={styles.section1__input}>
//               <div className={styles.radio_input}>
//                 <input
//                   type="radio"
//                   disabled={true}
//                   name="confirm"
//                   onChange={(e) => {
//                     setQueryResponse(e.target.value);
//                   }}
//                   value="Yes"
//                   checked={queryResponse === "Yes"}
//                   // @ts-ignore
//                   name="query"
//                 />
//                 <label>Yes</label>
//               </div>
//               <div className={styles.radio_input}>
//                 <input
//                   type="radio"
//                   disabled={true}
//                   name="confirm"
//                   onChange={(e) => {
//                     setQueryResponse(e.target.value);
//                   }}
//                   value="No"
//                   checked={queryResponse === "No"}
//                   // @ts-ignore
//                   name="query"
//                 />
//                 <label>No</label>
//               </div>
//             </div>
//             <div className={styles.section1__input}>
//               <div className={styles.radio_input}>
//                 <input
//                   type="radio"
//                   disabled={true}
//                   name="disciplinary"
//                   onChange={(e) => {
//                     setDisciplinaryResponse(e.target.value);
//                   }}
//                   value="Yes"
//                   checked={disciplinaryResponse === "Yes"}
//                   // @ts-ignore
//                   name="disciplinary"
//                   required
//                 />
//                 <label>Yes</label>
//               </div>
//               <div className={styles.radio_input}>
//                 <input
//                   type="radio"
//                   disabled={true}
//                   name="disciplinary"
//                   onChange={(e) => {
//                     setDisciplinaryResponse(e.target.value);
//                   }}
//                   value="No"
//                   checked={disciplinaryResponse === "No"}
//                   // @ts-ignore
//                   name="disciplinary"
//                   required
//                 />
//                 <label>No</label>
//               </div>
//             </div>
//           </div>
//           <div className={styles.section1__comments}>
//             {queryResponse === "Yes" || disciplinaryResponse === "Yes" ? (
//               <div>
//                 <h2>Comments</h2>
//                 <TextArea
//                   value={queryComment}
//                   onChange={(e: any) => {
//                     setQueryComment(e.target.value);
//                   }}
//                   required={true}
//                 />
//               </div>
//             ) : null}
//           </div>
//         </div>
//         <Table score={performanceScore} />
//         <div className={`${styles.evaluation__section} `}>
//           <div></div>
//           <div></div>
//           <div className={styles.section1__comments}>
//             <h2>Rater's Final comment</h2>
//             <TextAreaSmall
//               value={raterFinalComments}
//               rows={5}
//               onChange={(e: any) => {
//                 setRaterFinalComments(e.target.value);
//               }}
//               required={true}
//               readOnly={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           {confirmationStatus && (
//             <h2>
//               Confirmation Status:
//               <p style={{ color: getColor(confirmationStatus) }}>
//                 {confirmationStatus}{" "}
//               </p>
//             </h2>
//           )}
//           <div>
//             <div>
//               <div className={styles.section1__comments}>
//                 <h2>Developmental Requirement</h2>
//                 <TextAreaSmall
//                   value={developmentalRequirement}
//                   rows={5}
//                   onChange={(e: any) => {
//                     setDevelopmentalRequiremnt(e.target.value);
//                   }}
//                   required={true}
//                   readOnly={true}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Reviewer's comment</h2>
//             <TextAreaSmall
//               value={lineManagerComment}
//               rows={5}
//               onChange={(e: any) => {
//                 setLineManagerComment(e.target.value);
//               }}
//               required={true}
//               readOnly={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <div></div>
//           <div></div>
//           <div className={styles.section1__comments}>
//             <h2>MHRBP comment</h2>
//             <TextAreaSmall
//               value={mhrbpComment}
//               rows={5}
//               onChange={(e: any) => {
//                 setMhrbpComment(e.target.value);
//               }}
//               required={true}
//               readOnly={commentFieldReadOnly}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <div></div>
//           <div></div>
//           <div className={styles.section1__comments}>
//             <h2>HR Administrator Comment</h2>
//             <TextAreaSmall
//               value={hrComment}
//               rows={5}
//               onChange={(e: any) => {
//                 setHrComment(e.target.value);
//               }}
//               required={true}
//               // readOnly={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <div></div>
//           <div></div>
//           <div className={styles.section1__comments}>
//             <h2>SMES's Comment</h2>
//             <TextAreaSmall
//               value={sMESComment}
//               rows={5}
//               onChange={(e: any) => {
//                 setSMESComment(e.target.value);
//               }}
//               required={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section__button_left} `}>
//           <div className="mtn__btnContaainer">
//             <div>
//               <button
//                 className="mtn__btn mtn__blackOutline"
//                 type="submit"
//                 disabled={loading}
//               >
//                 Defer
//               </button>
//             </div>
//             <div>
//               <button
//                 className="mtn__btn mtn__yellow"
//                 type="button"
//                 onClick={approveHandler}
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Approve"}
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section__button} `}>
//           <div className="mtn__btnContaainer">
//             <div>
//               <button
//                 className="mtn__btn mtn__blackOutline"
//                 type="button"
//                 onClick={() => backHandler()}
//                 disabled={loading}
//               >
//                 Previous
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default GetBehavioralSection3Rating;
