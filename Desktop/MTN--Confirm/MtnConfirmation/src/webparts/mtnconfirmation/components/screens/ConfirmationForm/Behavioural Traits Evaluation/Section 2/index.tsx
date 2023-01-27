// import * as React from "react";
// import { Link, useHistory } from "react-router-dom";
// import {
//   Header,
//   Card,
//   Select,
//   TextArea,
//   Helpers,
//   Modal,
// } from "../../../../Containers";
// import { RoleContext } from "../../../../Context/RoleContext";
// import { EmployeeContext } from "../../../../Context/EmployeeContext";
// import { BehavioralContext } from "../../../../Context/BehavioralContext";
// import { sp } from "@pnp/sp";
// import styles from "./section2.module.scss";
// import Role from "../../../Admin/Config/Role";

// const Section2 = () => {
//   const { role } = React.useContext(RoleContext);
//   const [open, setOpen] = React.useState(false);

//   const {
//     adaptComment,
//     setAdaptComment,
//     adaptRating,
//     setAdaptRating,
//     judgementRating,
//     setJudgementRating,
//     judgementComment,
//     setJudgementComment,
//     attendanceRating,
//     setAttendanceRating,
//     attendanceComment,
//     setAttendanceComment,
//   } = React.useContext(BehavioralContext);
//   const { itemId } = React.useContext(EmployeeContext);
//   const [level, setLevel] = React.useState("");
//   const { id } = React.useContext(EmployeeContext);

//   const history = useHistory();
//   React.useEffect(() => {
//     if (!id) {
//       history.push("/pendingrequests");
//     }
//     sp.web.lists
//       .getByTitle("Confirmation")
//       .items.getById(Number(itemId))
//       .get()
//       .then((res) => {
//         console.log(res.Level, "this is the level");
//         setLevel(res.Level);
//       });
//     sp.web.lists
//       .getByTitle("BehavioralTraitsEvaluation")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((response) => {
//         if (response.length > 0) {
//           setAdaptRating(response[0].Adaptability);
//           setAdaptComment(response[0].AdaptComment);
//           setJudgementRating(response[0].Judgement);
//           setJudgementComment(response[0].JudgementComment);
//           setAttendanceRating(response[0].Attendance);
//           setAttendanceComment(response[0].AttendanceComment);
//         }
//       });
//   }, []);

//   const nextHandler = () => {
//     if (adaptComment.length < 60) {
//       setAdaptCommentMsg(true);
//     }
//     if (judgementComment.length < 60) {
//       setJudgementCommentMsg(true);
//     }
//     if (attendanceComment.length < 60) {
//       setAttendanceCommentMsg(true);
//     } else {
//       switch (level) {
//         case "Level 2":
//           history.push("/rater/behavioral/section3");
//           break;
//         case "Level 1":
//           history.push("/rater/behavioral/section3");
//           break;
//         default:
//           history.push("/behavioral/section3");
//           break;
//       }
//     }
//   };

//   const [adaptCommentMsg, setAdaptCommentMsg] = React.useState(false);
//   const [judgementCommentMsg, setJudgementCommentMsg] = React.useState(false);
//   const [attendanceCommentMsg, setAttendanceCommentMsg] = React.useState(false);
//   const [msg, setMsg] = React.useState(false);

//   const modalHandler = () => {
//     setOpen(true);
//   };

//   const noHandler = () => {
//     setOpen(false);
//   };

//   const cancelHandler = (e) => {
//     e.preventDefault();
//     setAdaptRating(0);
//     setAdaptComment("");
//     setJudgementRating(0);
//     setJudgementComment("");
//     setAttendanceRating(0);
//     setAttendanceComment("");
//     setOpen(false);
//   };
//   const backHandler = () => {
//     history.goBack();
//   };

//   return (
//     <>
//       <Header title="Behavioural Traits Evaluation" />
//       <form
//         className={styles.evaluation__section2__container}
//         onSubmit={nextHandler}
//       >
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Adaptability">
//             <ul>
//               <li>
//                 Consider the ease with which the employee adjust to any change
//                 in duties, procedures, supervisors or the work environment.
//               </li>
//               <li>
//                 How well does the employee accept new ideas and approaches to
//                 work, responds appropriately to constructive criticisms and
//                 suggestions for work improvements?
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             <Select
//               onChange={(e: any) => {
//                 setAdaptRating(e.target.value);
//               }}
//               title="Ratings"
//               value={adaptRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={adaptComment}
//               required={true}
//               onChange={(e: any) => {
//                 setAdaptComment(e.target.value);
//               }}
//             />
//             {adaptCommentMsg ? (
//               <span>Your comment should be at least 60 characters </span>
//             ) : null}
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Judgement">
//             <ul>
//               <li>
//                 Consider how well the employee effectively analyses problems,
//                 determines the appropriate course of action, suggests solutions
//                 and exhibits timely and decisive action.
//               </li>
//               <li>Thinks logically.</li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             <Select
//               onChange={(e) => {
//                 setJudgementRating(e.target.value);
//               }}
//               title="Ratings"
//               required={true}
//               value={judgementRating}
//               options={Helpers.rating}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={judgementComment}
//               onChange={(e: any) => {
//                 setJudgementComment(e.target.value);
//               }}
//               required={true}
//             />
//             {judgementCommentMsg ? (
//               <span>Your comment should be at least 60 characters </span>
//             ) : null}
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Attendance">
//             <ul>
//               <li>
//                 Consider number of absences, use of annual and sick leave in
//                 accordance with MTN policy.
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             {/* <h2>Ratings</h2> */}
//             <Select
//               onChange={(e: any) => {
//                 setAttendanceRating(e.target.value);
//               }}
//               title="Ratings"
//               value={attendanceRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={attendanceComment}
//               onChange={(e: any) => {
//                 setAttendanceComment(e.target.value);
//               }}
//               required={true}
//             />
//             {attendanceCommentMsg ? (
//               <span>Your comment should be at least 60 characters </span>
//             ) : null}
//           </div>
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
//             <div className="mtn__btnPage1">
//               <button
//                 type="button"
//                 className="mtn__btn mtn__black"
//                 onClick={modalHandler}
//               >
//                 Cancel
//               </button>
//               <Modal
//                 isVisible={open}
//                 title="Are you sure you want to Cancel"
//                 size="md"
//                 content={
//                   <div className={styles.modal__Btn}>
//                     <button
//                       type="button"
//                       className={styles.btnCancel1}
//                       onClick={noHandler}
//                     >
//                       No
//                     </button>
//                     <button
//                       type="button"
//                       className={styles.btnCancel2}
//                       onClick={cancelHandler}
//                     >
//                       Yes
//                     </button>
//                   </div>
//                 }
//                 onClose={() => setOpen(false)}
//                 footer=""
//               />
//               <button type="submit" className="mtn__btn mtn__black">
//                 {/* <Link to="/behavioral/section3" > */}
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// };

// export default Section2;
