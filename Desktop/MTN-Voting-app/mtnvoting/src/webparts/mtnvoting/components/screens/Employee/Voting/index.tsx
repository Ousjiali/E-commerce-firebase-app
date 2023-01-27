// import * as React from "react";
// import { Header, Modal, NomineeCard } from "../../../containers";
// import { sp } from "@pnp/sp";
// import styles from "./voting.module.scss";
// import Carousel from "react-elastic-carousel";
// import swal from "sweetalert";
// import { useHistory } from "react-router-dom";

// const Voting = () => {
//   const [nominees, setNominees] = React.useState([]);
//   const [checked, setChecked] = React.useState(false);
//   const [indexFrom, setIndexFrom] = React.useState(0);
//   const [indexTo, setIndexTo] = React.useState(4);
//   const [open, setOpen] = React.useState(false);
//   const [id, setId] = React.useState();
//   const [userEmail, setUserEmail] = React.useState();
//   const [userID, setUserID] = React.useState();
//   const [loading, setLoading] = React.useState(false);
//   const [region, setRegion] = React.useState("");
//   const [submitting, setSubmitting] = React.useState(false);
//   const [isRegistered, setIsRegistered] = React.useState(false);
//   const [test, setTest] = React.useState([]);
//   const [index, setIndex] = React.useState(null);
//   const [name, setName] = React.useState("");

//   const history = useHistory();

//   //Get all Nominees
//   React.useEffect(() => {
//     setLoading(true);
//     sp.web.lists
//       .getByTitle(`Nominees`)
//       .items.filter(`Status eq 'Approved'`)
//       .get()
//       .then((res) => {
//         setNominees(res.filter((item) => item.Region === region));

//         setLoading(false);
//       });
//   }, [region]);

//   //find the logged in user and check if the user already voted
//   React.useEffect(() => {
//     sp.profiles.myProperties.get().then((res) => {
//       setUserEmail(res.Email);
//       sp.web.lists
//         .getByTitle("Registration")
//         .items.filter(`EmployeeEmail eq '${res.Email}'`)
//         .get()
//         .then((items) => {
//           if (!items.length) {
//             swal("Error", "You are not yet registered to vote", "error");
//             history.push("/");
//             return;
//           }
//           setIsRegistered(true);
//           setUserID(items[0].ID);
//           setRegion(items[0].Region);

//           sp.web.lists
//             .getByTitle(`Votes`)
//             .items.filter(`EmployeeID eq '${items[0].ID}' `)
//             .get()
//             .then((data) => {
//               if (data.length > 0) {
//                 swal({
//                   closeOnClickOutside: false,
//                   closeOnEsc: false,
//                   text: "You have voted already!",
//                 }).then(() => {
//                   history.push("/");
//                 });
//               }
//             });
//         });
//     });
//   }, []);

//   React.useEffect(() => {
//     //create a value for each item in the list
//     for (let i = 0; i < nominees.length; i++) {
//       test.push({ [i]: "", checked: false, disabled: false });
//     }
//   }, [nominees]);

//   const votedNominee = (id, index, name) => {
//     setId(id);
//     setOpen(true);
//     setIndex(index);
//     setName(name);
//   };

//   //Find a nominee with their id
//   const addNomineeVotes = (id) => {
//     return nominees.filter((nominee) => nominee.ID === id);
//   };

//   const yesHandler = () => {
//     setSubmitting(true);
//     sp.web.lists
//       .getByTitle(`Votes`)
//       .items.filter(`EmployeeID eq '${userID}' `)
//       .get()
//       .then((items) => {
//         if (items.length > 0) {
//           swal({
//             closeOnClickOutside: false,
//             closeOnEsc: false,
//             text: "You have voted already!",
//           }).then(() => {
//             history.push("/");
//           });
//         } else {
//           sp.web.lists
//             .getByTitle(`Votes`)
//             .items.add({
//               EmployeeID: String(userID),
//               Nominee: String(id),
//               // Title: Math.random(),
//             })
//             .then(() => {
//               setSubmitting(false);
//               swal("Success", "Voted Successfully", "success");
//               setOpen(false);
//               sp.web.lists
//                 .getByTitle(`Nominees`)
//                 .items.filter(`Status eq 'Approved'`)
//                 .get()
//                 .then((res) => {
//                   test[index].checked = true;
//                   test
//                     .filter((item, ind) => ind !== index)
//                     .map((item) => {
//                       return (item.disabled = true);
//                     });
//                   setNominees(res);
//                 });
//               sp.web.lists
//                 .getByTitle(`Registration`)
//                 .items.getById(userID)
//                 .update({
//                   Voted: JSON.stringify(true),
//                 })
//                 .then(() => {
//                   setTimeout(() => {
//                     setOpen(false);
//                   }, 1000);
//                 });
//             })
//             .catch((err) => {
//               console.log(err);
//               setSubmitting(false);
//             });
//         }
//       });
//   };

//   const noHandler = () => {
//     setOpen(false);
//   };

//   const votePermissions = () => {
//     return (
//       <div className={styles.modalContent}>
//         <span>
//           Are you sure you want to vote for <br />
//           <strong>{name}</strong>?
//         </span>
//         <div className={styles.modalContentButton}>
//           <button disabled={submitting} onClick={noHandler}>
//             No
//           </button>
//           {submitting ? (
//             <button disabled>Adding...</button>
//           ) : (
//             <button onClick={yesHandler}>Yes</button>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const breakPoints = [
//     { width: 1, itemsToShow: 1 },
//     { width: 550, itemsToShow: 2, itemsToScroll: 2 },
//     { width: 768, itemsToShow: 3 },
//     { width: 1200, itemsToShow: 4 },
//   ];

//   return (
//     <>
//       {isRegistered && (
//         <div className={styles.votingPageContainer}>
//           <Header title="Nominees" />

//           <div className={styles.nomineeContainerScreen}>
//             {nominees.length > 0 ? (
//               loading ? (
//                 <div>Loading...</div>
//               ) : (
//                 <Carousel
//                   breakPoints={breakPoints}
//                   isRTL={false}
//                   initialActiveIndex={0}
//                   pagination={false}
//                   className={styles.carousel}
//                 >
//                   {nominees.map((nominee) => {
//                     return (
//                       <>
//                         {/* <NomineeCard
//                       checked={checked}
//                       image={nominee.PassportPhotograph}
//                       name={nominee.EmployeeName}
//                       lastName={nominee.lastName}
//                       onClick={() => {
//                         votedNominee(nominee.ID);
//                       }}
//                       disabled
//                     /> */}
//                       </>
//                     );
//                   })}
//                 </Carousel>
//               )
//             ) : (
//               <div>No Nominees yet!</div>
//             )}
//           </div>

//           <Modal
//             title=""
//             content={votePermissions()}
//             onClose={handleClose}
//             isVisible={open}
//             size="sm"
//             footer=""
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Voting;
