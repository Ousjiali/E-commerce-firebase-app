import * as React from "react";
import { Header, Spinner } from "../../../Containers";
import styles from "./allDetails.module.scss";
import { sp } from "@pnp/sp";
import { useHistory, Link } from "react-router-dom";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { ActorContext } from "../../../Context/ActorContext";
import { RaterContext } from "../../../Context/RaterContext";
import { RoleContext } from "../../../Context/RoleContext";
import jsPDF from "jspdf";

const ViewRequestDetails = ({ match }) => {
  const pdfRef: any = React.createRef();

  let itemID = match.params.id;
  const { setId: setEmployeeId, setItemId } = React.useContext(EmployeeContext);
  const { setActor, actor } = React.useContext(ActorContext);
  const { raterEmail } = React.useContext(RaterContext);
  const { setRole, role } = React.useContext(RoleContext);
  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState("");
  const [employee_Name, setEmployee_Name] = React.useState("");
  const [employee_Id, setEmployee_Id] = React.useState("");
  const [form_No, setForm_No] = React.useState("");
  const [job_Title, setJob_Title] = React.useState("");
  const [staff_Level, setStaff_Level] = React.useState("");
  const { setEmployeeLevel } = React.useContext(EmployeeContext);
  const [division, setDivision] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [rater, setRater] = React.useState("");
  const [employmentDate, setEmployeeDate] = React.useState("");
  const [confirmationDate, setConfirmationDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [report, setReport] = React.useState("");
  const [confirmationStatusByScore, setConfirmationStatusByScore] =
    React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ID eq '${itemID}'`)
      .get()
      .then((res) => {
        setId(res[0].ID);
        setActor(res[0].Approvals);
        setEmployee_Name(res[0].EmployeeName);
        setEmployee_Id(res[0].EmployeeID);
        setEmployeeId(res[0].EmployeeID);
        setForm_No(res[0].FormNo);
        setJob_Title(res[0].JobTitle);
        setStaff_Level(res[0].Level);
        setEmployeeLevel(res[0].Level);
        setDivision(res[0].Division);
        setDepartment(res[0].Department);
        setPhone(res[0].Phone);
        setLocation(res[0].Location);
        setRater(res[0].Rater);
        setEmployeeDate(res[0].EmploymentDate);
        setConfirmationDate(res[0].ConfirmationDate);
        setStartDate(res[0].StartDate);
        setEndDate(res[0].EndDate);
        setReport(res[0].DirectReport);
        setConfirmationStatusByScore(res[0].ConfirmationStatusByScore);
        setLoading(false);
      });
  }, []);

  // sp.web.lists
  //   .getByTitle(`Confirmation`)
  //   .items.filter(`Rater eq '${id}'`)
  //   .get()
  //   .then((res) => {
  //     const raterId = res.filter((x) => x.id === id);
  //     return raterId[0].id;
  //     ``;
  //   });

  const nextHandler = () => {
    switch (role) {
      case "Rater":
        history.push("/rater/performance/welcomePage");
        break;

      default:
        history.push("/performance/section1");
        break;
    }
  };

  React.useEffect(() => {
    setItemId(itemID);
  }, [itemID]);

  React.useEffect(() => {
    switch (actor) {
      case "Rater":
        setRole("Rater");
        break;
      case "Rater Line Manager":
        setRole("Rater Line Manager");
        break;
      case "HCM Administrator":
        setRole("HCM Administrator");
        break;
      case "Senior Manager Employee Services":
        setRole("Senior Manager Employee Services");
        break;
      case "HRBP":
        setRole("HRBP");
        break;
      case "GM HR Operations":
        setRole("GM HR Operations");
        break;
      case "Chief HR Officer":
        setRole("Chief HR Officer");
        break;
      case "HR Close Out Request":
        setRole("HR Close Out Request");
        break;
      default:
        setRole("");
        break;
    }
  }, [actor]);

  const reInitiate = () => {
    setLoading(true);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(itemID)
      .update({
        Approvals: "Rater",
        ConfirmationStatus: "Pending",
      })
      .then((res) => {
        history.push(`/admin/pending`);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <Header title="" />
      </div>
      <div className={styles.view__allContent}>
        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.gridbox__allContent}>
            <div className={styles.eachGridbox__allContent}>
              <header>Employee Name</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{employee_Name}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Employee ID</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{employee_Id}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Form No.</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{form_No}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Job Title</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{job_Title}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Staff Level</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{staff_Level}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Divison</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{division}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Department</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{department}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Employee Phone Number</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{phone}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Location</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{location}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Rater</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{rater}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Employment Date</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{employmentDate}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Confirmation Due Date</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{confirmationDate}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Period Supervised(Start Date)</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{startDate}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Period Supervised(End Date)</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{endDate}</p>
              </span>
            </div>
            <div className={styles.eachGridbox__allContent}>
              <header>Does the Employee have direct Report</header>
              <span className={styles.grid__titleContent}>
                <p className={styles.grid__titleName}>{report}</p>
              </span>
            </div>
            {/* <div className={styles.eachGridbox__allContent}>
            <header>Employee's Comment</header>
            <span className={styles.grid__titleContent}>
              <p className={styles.grid__titleName}>Satisfactory</p>
            </span>
          </div> */}
          </div>
        )}
        <div className={styles.allContent__btn}>
          <button
            type="button"
            className={`${styles.view__Btn2} ${styles.mtn__black}`}
            onClick={nextHandler}
          >
            Next
          </button>

          <button
            className={
              confirmationStatusByScore === "Defer"
                ? "mtn__btns mtn__blue"
                : "hidden"
            }
            style={{ marginTop: "15px" }}
            type="button"
            onClick={reInitiate}
          >
            RE-Initiate Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequestDetails;
