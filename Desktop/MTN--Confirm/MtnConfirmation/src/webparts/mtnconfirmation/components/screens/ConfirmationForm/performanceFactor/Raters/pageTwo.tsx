// import * as React from "react";
// import { useState } from "react";
// import { useHistory, Link } from "react-router-dom";
// import {
//   Header,
//   Select,
//   Helpers,
//   TextArea,
//   Card,
//   Modal,
// } from "../../../../Containers";
// import { performanceEvaluationContext } from "../../../../Context/performanceContext";
// import { RaterContext } from "../../../../Context/RaterContext";
// import styles from "../performance.module.scss";

// import { registerCustomRequestClientFactory, sp } from "@pnp/sp";
// import swal from "sweetalert";
// import { EmployeeContext } from "../../../../Context/EmployeeContext";

// const RatersWorkHabit = () => {
//   const [workHabitRatingMsg, setworkHabitRatingMsg] = useState(false);
//   const [communicationRatingMsg, setcommunicationRatingMsg] = useState(false);
//   const [showSubmitButton, setShowSubmitButton] = React.useState(true);
//   const [employeeLevel, setEmployeeLevel] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const history = useHistory();
//   const [communicationCommentMsg, setcommunicationCommentMsg] = useState(false);
//   const [workhabitcommentMsg, setworkhabitcommentMsg] = useState(false);
//   const { rater, raterEmail, date } = React.useContext(RaterContext);
//   const { id } = React.useContext(EmployeeContext);
//   const [open, setOpen] = useState(false);
//   const [itemID, setItemId] = useState(0);

//   React.useEffect(() => {
//     sp.web.lists
//       .getByTitle(`PerformanceFactorEvaluation`)
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((res) => {
//         setEmployeeLevel(res[0].Level);
//         setWorkHabitRating(res[0].WorkHabitRating);
//         setWorkHabitComment(res[0].WorkHabitComment);
//         setCommunicationRating(res[0].CommunicatonRating);
//         setCommunicationComment(res[0].CommunicationComment);
//         setTotalPerformanceScore(res[0].TotalPerformanceScore);
//         setItemId(res[0].Id);
//       });
//   }, []);

//   const {
//     knowlegdeRating,
//     setKnowlegdeRating,
//     knowlegdeComment,
//     setknowlegdeComment,
//     workQualityRating,
//     setWorkQualityRating,
//     workQualityComment,
//     setWorkQualityComment,
//     workQuantityRating,
//     setworkQuantityRating,
//     workQuantityComment,
//     setworkQuantityComment,
//     workHabitRating,
//     setWorkHabitRating,
//     workHabitComment,
//     setWorkHabitComment,
//     communicationRating,
//     setCommunicationRating,
//     communicationComment,
//     setCommunicationComment,
//     totalPerformanceScore,
//     setTotalPerformanceScore,
//   } = React.useContext(performanceEvaluationContext);
//   const scoreHandler = () => {
//     if (
//       !knowlegdeRating ||
//       !knowlegdeComment ||
//       !workQualityRating ||
//       !workQualityComment ||
//       !workQuantityRating ||
//       !workQuantityComment ||
//       !workHabitRating ||
//       !workHabitComment ||
//       !communicationRating ||
//       !communicationComment ||
//       !totalPerformanceScore
//     ) {
//     }
//     if (workHabitComment.length < 60) {
//       setworkhabitcommentMsg(true);
//     }
//     if (communicationComment.length < 60) {
//       setcommunicationCommentMsg(true);
//     }
//     if (workHabitRating === null) {
//       setworkHabitRatingMsg(true);
//     }
//     if (communicationRating === null) {
//       setcommunicationRatingMsg(true);
//     } else {
//       const total =
//         Number(workHabitRating) +
//         Number(knowlegdeRating) +
//         Number(workQualityRating) +
//         Number(workQuantityRating) +
//         Number(communicationRating);
//       setTotalPerformanceScore(total);
//       setShowSubmitButton(false);
//     }
//   };

//   React.useEffect(() => {
//     if (!id) {
//       history.push("/pendingrequests");
//       return;
//     }
//   }, []);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (workHabitComment.length < 60) {
//       setworkhabitcommentMsg(true);
//     }
//     if (communicationComment.length < 60) {
//       setcommunicationCommentMsg(true);
//     } else {
//       setLoading(true);

//       sp.web.lists
//         .getByTitle("PerformanceFactorEvaluation")
//         .items.filter(`EmployeeID eq '${id}'`)
//         .get()
//         .then((response) => {
//           if (response.length > 0) {
//             sp.web.lists
//               .getByTitle("PerformanceFactorEvaluation")
//               .items.getById(itemID)
//               .update({
//                 KnowlegdeRating: knowlegdeRating,
//                 KnowlegdeComment: knowlegdeComment,
//                 WorkQualityRating: workQualityRating,
//                 WorkQualityComment: workQualityComment,
//                 WorkQuantityRating: workQuantityRating,
//                 WorkQuantityComment: workQuantityComment,
//                 WorkHabitRating: workHabitRating,
//                 WorkHabitComment: workHabitComment,
//                 CommunicatonRating: communicationRating,
//                 CommunicationComment: communicationComment,
//                 TotalPerformanceScore: totalPerformanceScore,
//               })
//               .then((res) => {
//                 history.push("/rater/behavioral/section1");
//                 setLoading(false);
//               })
//               .catch((e) => {
//                 swal("Warning!", "An Error Occured, Try Again!", "error");
//                 setLoading(false);
//                 console.error(e);
//               });
//           } else {
//             sp.web.lists
//               .getByTitle("PerformanceFactorEvaluation")
//               .items.add({
//                 EmployeeID: id,
//                 RaterName: rater,
//                 RaterEmail: raterEmail,
//                 RatingDate: date,
//                 KnowlegdeRating: knowlegdeRating,
//                 KnowlegdeComment: knowlegdeComment,
//                 WorkQualityRating: workQualityRating,
//                 WorkQualityComment: workQualityComment,
//                 WorkQuantityRating: workQuantityRating,
//                 WorkQuantityComment: workQuantityComment,
//                 WorkHabitRating: workHabitRating,
//                 WorkHabitComment: workHabitComment,
//                 CommunicatonRating: communicationRating,
//                 CommunicationComment: communicationComment,
//                 TotalPerformanceScore: totalPerformanceScore,
//               })
//               .then((item) => {
//                 setLoading(false);
//                 setKnowlegdeRating(0);
//                 setknowlegdeComment("");
//                 setWorkQualityComment("");
//                 setworkQuantityComment("");
//                 setWorkHabitComment("");
//                 setCommunicationComment("");
//                 setWorkQualityRating(0);
//                 setworkQuantityRating(0);
//                 setWorkHabitRating(0);
//                 setCommunicationRating(0);

//                 history.push("/rater/behavioral/section1");
//               })
//               .catch((error) => {
//                 setLoading(false);
//                 swal(
//                   "Error Occured",
//                   "An error occured while submitting your data!",
//                   "error"
//                 );
//                 console.log(error);
//               });
//           }
//         });
//     }
//   };

//   const modalHandler = () => {
//     setOpen(true);
//   };

//   const noHandler = () => {
//     setOpen(false);
//   };

//   const cancelHandler = () => {
//     setWorkHabitRating(0);
//     setCommunicationRating(0);
//     setWorkHabitComment("");
//     setCommunicationComment("");
//     // setTotalPerformanceScore(0);
//     setOpen(false);
//   };

//   const backHandler = () => {
//     history.goBack();
//   };

//   return (
//     <>
//       <Header title="Performance Factor" />
//       <div className={styles.evaluation__section2__container}>
//         <div className={styles.evaluation__section}>
//           <Card header="Work Habits">
//             <ul>
//               <li>
//                 To what extent does the employee display a positive cooperative
//                 attitude towards work, assignments and requirements?
//               </li>
//               <li>
//                 Consider compliance with established work rules and
//                 organizational policies
//               </li>
//             </ul>
//           </Card>

//           <div className={styles.section1__ratings}>
//             <Select
//               value={workHabitRating}
//               onChange={(e: any) => {
//                 setWorkHabitRating(e.target.value);
//               }}
//               title="Rating"
//               options={Helpers.rating}
//             />
//             {workHabitRatingMsg ? (
//               <span className={styles.msg}>kindly rate </span>
//             ) : null}
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comment</h2>
//             <TextArea
//               onChange={(e: any) => {
//                 setWorkHabitComment(e.target.value);
//               }}
//               value={workHabitComment}
//             />
//             {workhabitcommentMsg ? (
//               <span>Your comment should be at least 60 characters </span>
//             ) : null}
//           </div>
//         </div>
//         <div className={styles.evaluation__section}>
//           <Card header="Communication">
//             <ul>
//               <li>Consider job related effectiveness in dealing with others</li>
//               <li>
//                 Does the employee express ideas clearly both orally and in
//                 writting,listen well and respond appropriately
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             <Select
//               onChange={(e) => {
//                 setCommunicationRating(e.target.value);
//               }}
//               title="Rating"
//               value={communicationRating}
//               options={Helpers.rating}
//             />
//             {communicationRatingMsg ? (
//               <span className={styles.msg}>kindly rate </span>
//             ) : null}
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comment</h2>

//             <TextArea
//               onChange={(e) => {
//                 setCommunicationComment(e.target.value);
//               }}
//               value={communicationComment}
//             />
//             {communicationCommentMsg ? (
//               <span>Your comment should be at least 60 characters </span>
//             ) : null}
//           </div>
//           <div className={styles.evaluation__section}>
//             <Card header="Total Performance Score">
//               <input
//                 className={styles.score__input}
//                 title="Total Performance Scores"
//                 style={{ backgroundColor: "white" }}
//                 value={totalPerformanceScore}
//                 type="text"
//                 readOnly
//               />
//             </Card>
//           </div>
//         </div>
//         <div className={styles.mtn__btnContaainer2}>
//           <div>
//             <button
//               type="button"
//               className="mtn__btn mtn__blackOutline"
//               onClick={backHandler}
//             >
//               Previous
//             </button>
//           </div>

//           <div className="mtn__btnPage1">
//             <button
//               type="button"
//               className="mtn__btn mtn__black"
//               onClick={modalHandler}
//             >
//               Cancel
//             </button>
//             <Modal
//               isVisible={open}
//               title="Are you sure you want to Cancel"
//               size="md"
//               content={
//                 <div className={styles.modal__Btn}>
//                   <button
//                     type="button"
//                     className={styles.btnCancel1}
//                     onClick={noHandler}
//                   >
//                     No
//                   </button>
//                   <button
//                     type="button"
//                     className={styles.btnCancel2}
//                     onClick={cancelHandler}
//                   >
//                     Yes
//                   </button>
//                 </div>
//               }
//               onClose={() => setOpen(false)}
//               footer=""
//             />
//             {showSubmitButton ? (
//               <button
//                 className="mtn__btn mtn__black"
//                 type="button"
//                 onClick={scoreHandler}
//               >
//                 Calculate Performance
//               </button>
//             ) : (
//               <button
//                 className="mtn__btn mtn__black"
//                 type="button"
//                 onClick={submitHandler}
//               >
//                 {loading ? "Loading..." : "Next"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RatersWorkHabit;
