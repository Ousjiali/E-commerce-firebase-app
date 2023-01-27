// import * as React from "react";
// import { sp } from "@pnp/sp";
// import {
//   Header,
//   Card,
//   Select,
//   TextArea,
//   Helpers,
//   Table,
// } from "../../../../Containers";
// import { useHistory } from "react-router-dom";
// import styles from "../Supervisory Section 2/section2.module.scss";
// import { TextAreaSmall } from "../../../../Containers/TextArea";
// import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
// import { RaterContext } from "../../../../Context/RaterContext";
// import swal from "sweetalert";
// import { EmployeeContext } from "../../../../Context/EmployeeContext";
// import { BehavioralContext } from "../../../../Context/BehavioralContext";
// import { Box } from "@material-ui/core";
// const ManagerIndustrialRelationshipView = () => {
//   const history = useHistory();
//   const backHandler = () => {
//     history.goBack();
//   };

//   const [loading, setLoading] = React.useState(false);
//   const {
//     peopleManagementComment,
//     setPeopleManagementComment,
//     peopleManagementRating,
//     setPeopleManagementRating,
//     planningComment,
//     setPlanningComment,
//     planningRating,
//     setPlanningRating,
//     setSupervisoryEvaluationScore: setSupervisorScore,
//     supervisoryEvaluationScore: supervisorScore,
//   } = React.useContext(SupervisoryEvaluationContext);

//   const { raterFinalComments, setRaterFinalComments } =
//     React.useContext(RaterContext);

//   const { id, itemId } = React.useContext(EmployeeContext);
//   const [lineManagerComment, setLineManagerComment] = React.useState("");
//   const [commentFieldReadOnly, setCommentFieldReadOnly] = React.useState(false);
//   const [reviewerComment, setReviewerComment] = React.useState("");
//   const [employeeComment, setEmployeeComment] = React.useState("");
//   const [mhrbpComment, setMhrbpComment] = React.useState("");
//   const [IndustrialManagerComment, setIndustrialManagerComment] =
//     React.useState("");

//   const submitHandler = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     const data = {
//       ManagerIndustrialComments: IndustrialManagerComment,
//     };

//     sp.web.lists
//       .getByTitle("EvaluationComments")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((item) => {
//         if (item.length > 0) {
//           const { id: SubmissionID } = item[0];
//           sp.web.lists
//             .getByTitle("EvaluationComments")
//             .items.getById(SubmissionID)
//             .update(data)
//             .then(() => {
//               sp.web.lists
//                 .getByTitle("Confirmation")
//                 .items.getById(Number(itemId))
//                 .update({
//                   Approvals: "Senior Manager Employee Services",
//                 })
//                 .then(() => {
//                   setLoading(false);
//                   setIndustrialManagerComment("");
//                   swal({
//                     title: "Success",
//                     text: "Evaluation Comment Submitted Successfully",
//                     icon: "success",
//                   }).then((ok) => {
//                     if (ok) {
//                       history.push("/pendingrequests");
//                     }
//                   });
//                 });
//             });
//         } else {
//           history.push("/pendingrequests");
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
//       history.push("/pendingrequests");
//       return;
//     }

//     Promise.all([
//       sp.web.lists
//         .getByTitle("SupervisoryEvaluation")
//         .items.filter(`EmployeeID eq '${id}'`)
//         .get()
//         .then((response) => {
//           if (response.length > 0) {
//             setSupervisorScore(response[0].TotalRatingScore);
//             setPeopleManagementRating(response[0].PeopleManagementRating);
//             setPeopleManagementComment(response[0].PeopleManagementComment);
//             setPlanningComment(response[0].PlanningComment);
//             setPlanningRating(response[0].PlanningRating);
//             setRaterFinalComments(response[0].RaterFinalComment);
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
//             setReviewerComment(response[0].ReviewerComment);
//             setEmployeeComment(response[0].EmployeeComment);
//             setMhrbpComment(response[0].MHRBPComment);
//           }
//         }),
//     ]);
//   }, []);

//   return (
//     <>
//       <Header title="Supervisory Evaluation" />
//       <form
//         className={styles.evaluation__section2__container}
//         onSubmit={submitHandler}
//       >
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="People Management">
//             <ul>
//               <li>Consider how well the employee serves as a role model</li>
//               <li>
//                 Provides guidance and opportunities to staff for their
//                 development and advancement
//               </li>
//               <li>Resolves work related employee problems </li>
//               <li>
//                 Assists subordinates in accomplishing their work related
//                 objectives
//               </li>
//               <li>
//                 Does the employee communicate well with subordinates in a clear
//                 concise, accurate and timely manner and make useful suggestions?
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             {/* <h2>Ratings</h2> */}
//             <Select
//               onChange={(e: any) => {
//                 setPeopleManagementRating(e.target.value);
//               }}
//               required={true}
//               title="Ratings"
//               value={peopleManagementRating}
//               options={Helpers.rating}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={peopleManagementComment}
//               onChange={(e: any) => {
//                 setPeopleManagementComment(e.target.value);
//               }}
//               required={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Planning and Organising">
//             <ul>
//               <li>Consider how well the employee plans his/her work</li>
//               <li>
//                 Coordinates with others and establishes appropriate priorities
//               </li>
//               <li>Anticipates future needs </li>
//               <li>Carries out assignments effectively. </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             <Select
//               onChange={(e: any) => {
//                 setPlanningRating(e.target.value);
//               }}
//               title="Ratings"
//               value={planningRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={planningComment}
//               onChange={(e: any) => {
//                 setPlanningComment(e.target.value);
//               }}
//               required={true}
//             />
//           </div>
//           <div className={`${styles.evaluation__section} `}>
//             <Card header="Total Performance Score">
//               <input
//                 className={styles.score__input}
//                 type="text"
//                 style={{ backgroundColor: "white" }}
//                 readOnly
//                 value={supervisorScore}
//                 required
//               />
//             </Card>
//           </div>
//           <Table score={supervisorScore} />
//           <div></div>
//           <Box sx={{ display: "flex", flexDirection: "column" }}>
//             <div className={styles.section1__comments}>
//               <h2>Rater's Final comment</h2>
//               <TextAreaSmall
//                 value={raterFinalComments}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setRaterFinalComments(e.target.value);
//                 }}
//                 required={true}
//                 readOnly={true}
//               />
//             </div>
//             <div className={styles.section1__comments}>
//               <h2>Line Manager's comment</h2>
//               <TextAreaSmall
//                 value={lineManagerComment}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setLineManagerComment(e.target.value);
//                 }}
//                 required={true}
//                 readOnly={commentFieldReadOnly}
//               />
//             </div>
//             <div className={styles.section1__comments}>
//               <h2>Reviewer's comment</h2>
//               <TextAreaSmall
//                 value={reviewerComment}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setReviewerComment(e.target.value);
//                 }}
//                 required={true}
//                 readOnly={commentFieldReadOnly}
//               />
//             </div>
//             <div className={styles.section1__comments}>
//               <h2>Employee's comment</h2>
//               <TextAreaSmall
//                 value={employeeComment}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setEmployeeComment(e.target.value);
//                 }}
//                 required={true}
//                 readOnly={commentFieldReadOnly}
//               />
//             </div>
//             <div className={styles.section1__comments}>
//               <h2>MHRBP comment</h2>
//               <TextAreaSmall
//                 value={mhrbpComment}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setMhrbpComment(e.target.value);
//                 }}
//                 required={true}
//                 readOnly={true}
//               />
//             </div>
//             <div className={styles.section1__comments}>
//               <h2>Manager Industrial Relations</h2>
//               <TextAreaSmall
//                 value={IndustrialManagerComment}
//                 rows={5}
//                 onChange={(e: any) => {
//                   setIndustrialManagerComment(e.target.value);
//                 }}
//                 required={true}
//               />
//             </div>
//           </Box>
//           <div></div>
//           <div></div>
//           {/* <div className={styles.section1__comments}>
//             <h2>Next Actor</h2>
//             <TextAreaSmall
//               value={planningComment}
//               onChange={(e: any) => {
//                 setPlanningComment(e.target.value);
//               }}
//             />
//           </div> */}
//         </div>

//         <div className={`${styles.evaluation__section__button} `}>
//           <div className="mtn__btnContaainer">
//             <div>
//               <button
//                 type="button"
//                 className="mtn__btn mtn__blackOutline"
//                 onClick={backHandler}
//               >
//                 Previous
//               </button>
//             </div>
//             <div>
//               <button
//                 className="mtn__btn mtn__black"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ManagerIndustrialRelationshipView;
