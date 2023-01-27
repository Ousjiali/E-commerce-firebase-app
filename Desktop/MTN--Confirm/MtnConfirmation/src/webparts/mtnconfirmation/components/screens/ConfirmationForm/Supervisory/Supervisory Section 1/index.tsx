// import * as React from "react";
// import {
//   Header,
//   Card,
//   Select,
//   TextArea,
//   Helpers,
//   Modal,
// } from "../../../../Containers";
// import { useHistory } from "react-router-dom";
// import styles from "./section1.module.scss";
// import { RaterContext } from "../../../../Context/RaterContext";
// import { SupervisoryEvaluationContext } from "../../../../Context/SupervisoryContext";
// import { sp } from "sp-pnp-js";
// import { EmployeeContext } from "../../../../Context/EmployeeContext";
// const SuperVisorySection1 = () => {
//   const history = useHistory();
//   const { id } = React.useContext(EmployeeContext);
//   const nextHandler = () => {
//     history.push("/supervisory/section2");
//   };

//   const { date, raterEmail, rater } = React.useContext(RaterContext);
//   const {
//     leadershipRating,
//     setLeadershipRating,
//     leadershipComment,
//     setLeadershipComment,
//     delegationComment,
//     setDelegationComment,
//     delegationRating,
//     setDelegationRating,
//     administrationComment,
//     setAdministrationComment,
//     administrationRating,
//     setAdministrationRating,
//   } = React.useContext(SupervisoryEvaluationContext);

//   const [open, setOpen] = React.useState(false);

//   const modalHandler = () => {
//     setOpen(true);
//   };

//   const noHandler = () => {
//     setOpen(false);
//   };

//   const backHandler = () => {
//     history.goBack();
//   };

//   const cancelHandler = () => {
//     setLeadershipRating(0);
//     setLeadershipComment("");
//     setDelegationRating(0);
//     setDelegationComment("");
//     setAdministrationComment("");
//     setAdministrationRating(0);
//     setOpen(false);
//   };

//   React.useEffect(() => {
//     if (!id) {
//       history.push("/pendingrequests");
//       return;
//     }
//     sp.web.lists
//       .getByTitle("SupervisoryEvaluation")
//       .items.filter(`EmployeeID eq '${id}'`)
//       .get()
//       .then((response) => {
//         if (response.length > 0) {
//           setLeadershipRating(response[0].LeadershipRating);
//           setLeadershipComment(response[0].LeadershipComment);
//           setDelegationRating(response[0].DelegationRating);
//           setDelegationComment(response[0].DelegationComment);
//           setAdministrationRating(response[0].AdministrationRating);
//           setAdministrationComment(response[0].AdministrationComment);
//         }
//       });
//   }, []);

//   return (
//     <>
//       <Header title="Supervisory Evaluation" />
//       <div className={styles.evaluation__section2__container}>
//         {/* <div className={`${styles.evaluation__section} `}>
//           <div>
//             <div>Rater Name</div>
//             <input
//               className={styles.score__input}
//               type="text"
//               style={{ backgroundColor: "white" }}
//               readOnly
//               value={rater}
//             />
//           </div>
//           <div>
//             <div>Rater Email</div>
//             <input
//               className={styles.score__input}
//               type="text"
//               style={{ backgroundColor: "white" }}
//               readOnly
//               value={raterEmail}
//             />
//           </div>
//           <div>
//             <div>Rating Date</div>
//             <input
//               className={styles.score__input}
//               type="text"
//               style={{ backgroundColor: "white" }}
//               readOnly
//               value={date}
//             />
//           </div>
//         </div> */}

//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Leadership">
//             <ul>
//               <li>
//                 Consider how well the employee demonstrates effective
//                 supervisory abilities
//               </li>
//               <li>Gains respect and co-operates with others</li>
//               <li>Inspires and motivates surbodinates </li>
//               <li>Directs the work towards a common goal </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             {/* <h2>Ratings</h2> */}
//             <Select
//               onChange={(e: any) => {
//                 setLeadershipRating(e.target.value);
//               }}
//               title="Ratings"
//               value={leadershipRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={leadershipComment}
//               onChange={(e: any) => {
//                 setLeadershipComment(e.target.value);
//               }}
//               required={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Delegation">
//             <ul>
//               <li>
//                 How well does the employee demonstrate the ability to direct
//                 others in accomplishing work effectively, select and motivate
//                 staff, define assignments and oversee the work of the
//                 subordinates?
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             {/* <h2>Ratings</h2> */}
//             <Select
//               onChange={(e: any) => {
//                 setDelegationRating(e.target.value);
//               }}
//               title="Ratings"
//               value={delegationRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={delegationComment}
//               onChange={(e: any) => {
//                 setDelegationComment(e.target.value);
//               }}
//               required={true}
//             />
//           </div>
//         </div>
//         <div className={`${styles.evaluation__section} `}>
//           <Card header="Administration">
//             <ul>
//               <li>
//                 How well does the employee perform day to day administrative
//                 tasks.
//               </li>
//               <li>Manage time</li>
//               <li>Administer policies and implement procedures</li>
//               <li>
//                 Maintain appropriate contact with his/her supervisor and utilize
//                 funds, staff or equipment?
//               </li>
//             </ul>
//           </Card>
//           <div className={styles.section1__ratings}>
//             {/* <h2>Ratings</h2> */}
//             <Select
//               onChange={(e: any) => {
//                 setAdministrationRating(e.target.value);
//               }}
//               title="Ratings"
//               value={administrationRating}
//               options={Helpers.rating}
//               required={true}
//             />
//           </div>
//           <div className={styles.section1__comments}>
//             <h2>Comments</h2>
//             <TextArea
//               value={administrationComment}
//               onChange={(e: any) => {
//                 setAdministrationComment(e.target.value);
//               }}
//               required={true}
//             />
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
//             <div>
//               <button
//                 className="mtn__btn mtn__black"
//                 type="button"
//                 onClick={() => nextHandler()}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SuperVisorySection1;
