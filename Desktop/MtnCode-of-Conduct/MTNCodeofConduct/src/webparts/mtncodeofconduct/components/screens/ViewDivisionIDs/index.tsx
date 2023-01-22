import * as React from "react";
import { Navigation, Spinner, TitleHeader } from "../../Containers";
import styles from "./styles.module.scss";
import { useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";

const ViewDivisionIDs = ({ match }) => {
  let ItemsID = match.params.id;
  console.log(ItemsID);

  const history = useHistory();

  const [loading, setLoading] = React.useState(false);
  const [employee_name, setEmployee_name] = React.useState("");
  const [employee_email, setEmployee_email] = React.useState("");
  const [employee_id, setEmployee_id] = React.useState("");
  const [job_Title, setJob_Title] = React.useState("");
  const [staff_Level, setStaff_Level] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [pledge_date, setPledge_date] = React.useState("");
  const [pledge_time, setPledge_time] = React.useState("");
  const [pledge_status, setPledge_status] = React.useState("");
  const [pledge_witness, setPledge_witness] = React.useState("");
  const [HCMID, setHCMID] = React.useState("");

  const backHandler = () => {
    history.push("/admin/compliance/status");
  };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.filter(`ID eq '${ItemsID}'`)
      .get()
      .then((res) => {
        setEmployee_name(res[0].EmployeeName);
        setEmployee_email(res[0].EmployeeEmail);
        setEmployee_id(res[0].EmployeeID);
        setJob_Title(res[0].JobTitle);
        setStaff_Level(res[0].JobLevel);
        setDivision(res[0].Division);
        setDepartment(res[0].Department);
        setPhone(res[0].PhoneNumber);
        setLocation(res[0].Location);
        setUnit(res[0].Unit);
        setPledge_date(res[0].PledgeDate);
        setPledge_time(res[0].PledgeTimes);
        setPledge_witness(res[0].PledgeWitness);
        setPledge_status(res[0].PledgeStatus);
        setHCMID(res[0].HCMIDs);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="appContainer">
        <Navigation status={`active`} />
        <div className="contentsRight">
          <div className="contentPage">
            <div className="dashboard">
              <div className="header__title">
                <TitleHeader title="Staff Details" />
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <div className={styles.gridbox__allContent}>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Employee Name</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{employee_name}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Employee ID</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{employee_id}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Employee Email</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{employee_email}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Employee HCM ID</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{HCMID}</p>
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
                    <header>Unit</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{unit}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Pledge Date</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{pledge_date}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Pledge Time</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{pledge_time}</p>
                    </span>
                  </div>
                  <div className={styles.eachGridbox__allContent}>
                    <header>Pledge Status</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{pledge_status}</p>
                    </span>
                  </div>

                  <div className={styles.eachGridbox__allContent}>
                    <header>Pledge Witness</header>
                    <span className={styles.grid__titleContent}>
                      <p className={styles.grid__titleName}>{pledge_witness}</p>
                    </span>
                  </div>
                </div>
              )}
              <div className={styles.allContent__btn}>
                <button
                  type="button"
                  className={`${styles.view__Btn2} ${styles.mtn__black}`}
                  onClick={backHandler}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDivisionIDs;
