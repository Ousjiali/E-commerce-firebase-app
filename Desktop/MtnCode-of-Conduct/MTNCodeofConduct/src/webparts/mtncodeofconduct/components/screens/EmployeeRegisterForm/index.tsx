// import { unionWith } from "lodash";
import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  AdminHeader,
  Input,
  Spinner,
  Select,
  Helpers,
  Modal,
} from "../../Containers";
import styles from "./styles.module.scss";
import "@pnp/graph/users";
import { sp } from "@pnp/sp";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import swal from "sweetalert";

const EmployeeRegisterForm = ({ context }) => {
  const [employeeFullName, setEmployeeFullName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [pledgeDate, setPledgeDate] = React.useState("");
  const [pledgeTime, setPledgeTime] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [jobTitle, setJobTitle] = React.useState("");
  const [HCMID, setHCMID] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [pledgeWitness, setPledgeWitness] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [departments, setDepartments] = React.useState([]);
  const [divisions, setDivisions] = React.useState([]);
  const [units, setUnits] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  // const [staffWitness, setStaffWitness] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    sp.web.lists
      .getByTitle(`PledgeRegistration`)
      .items.add({
        EmployeeID: id,
        EmployeeName: employeeFullName,
        EmployeeEmail: employeeEmail,
        PledgeDate: pledgeDate,
        PledgeTimes: pledgeTime,
        PledgeWitness: pledgeWitness,
        Division: division,
        JobTitle: jobTitle,
        Unit: unit,
        PhoneNumber: phone,
        JobLevel: jobLevel,
        Department: department,
        PledgeStatus: "Completed",
        HCMIDs: HCMID,
        Location: location,
      })
      .then((res) => {
        swal(
          "Success",
          "Thank you, your Pledge has been successfully submited",
          "success"
        );
        history.push("/");
        setLoading(false);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        setLoading(false);
        console.error(e);
      });
  };

  // function getPeoplePickerItems(items: any[]) {
  //   setEmployeeEmail(items[0].secondaryText);
  // }

  function getPeoplePickerItems(items: any[]) {
    const staff = items[0].secondaryText;
    setEmployeeEmail(items[0].secondaryText);
    setPledgeWitness(items[0].text);
    context.spHttpClient.get(
      `https://mtncloud.sharepoint.com/sites/MTNNigeriaComplianceUniverse/testenv/_api/lists/GetByTitle('CURRENT HCM STAFF LIST')/items?$filter=EMAIL_ADDRESS eq '${staff}'`,
      SPHttpClient.configurations.v1
    );
  }

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeFullName(response.DisplayName);
      setEmployeeEmail(response.UserProfileProperties[19].Value);
      sp.web.lists
        .getByTitle(`PledgeRegistration`)
        .items.filter(
          `EmployeeEmail eq '${response.UserProfileProperties[19].Value}'`
        )
        .get()
        .then((res) => {
          if (res.length > 0) {
          }
        });
    });
  }, [history]);

  const modalHandler = () => {
    setOpen(true);
  };

  const submitModalHandler = () => {
    setOpenModal(true);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setId("");
    setPledgeDate("");
    setPledgeTime("");
    setDepartment("");
    setDivision("");
    setJobLevel("");
    setLocation("");
    setUnit("");
    setJobTitle("");
    setHCMID("");
    setPhone("");
    setOpen(false);
  };

  const prevHandler = () => {
    history.push("/");
    setOpen(false);
  };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Location`)
      .items.get()
      .then((res) => {
        setLocations(res);
        console.log(res);
      });
    sp.web.lists
      .getByTitle(`Division`)
      .items.get()
      .then((res) => {
        setDivisions(res);
        console.log(res);
      });
  }, []);

  const divisionHandler = (e) => {
    setDivision(e.target.value);
    const filter = divisions.filter((x) => x.Title === e.target.value);
    setDepartments(filter);
    setUnits(filter);
  };

  return (
    <div>
      <div>
        <AdminHeader title="Code of Conduct Pledge" />
      </div>
      <div className="content__wapper">
        {loading ? (
          <Spinner />
        ) : (
          <form>
            <div className={styles.form__container}>
              <Input
                type="text"
                value={employeeFullName}
                onChange={(e) => setEmployeeFullName(e.target.value)}
                title="Employee's Full Name"
                required={true}
                readOnly={true}
              />

              <Input
                type="text"
                title="Employee ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required={true}
              />

              <Input
                type="text"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                title="Employee Email"
                required={true}
                readOnly={true}
              />

              <Select
                onChange={divisionHandler}
                title="Division"
                value={division}
                required={true}
                options={divisions}
                filterOption="Title"
                filter={true}
              />
              <Select
                onChange={(e) => setDepartment(e.target.value)}
                title="Department"
                value={department}
                required={true}
                options={departments}
                filterOption="Department"
                filter={true}
              />

              <Select
                onChange={(e) => setUnit(e.target.value)}
                title="Unit"
                value={unit}
                required={true}
                options={units}
                filterOption="Unit"
                filter={true}
              />
              <Input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                title="Job Title"
                required={true}
              />
              <Input
                type="number"
                value={HCMID}
                onChange={(e) => setHCMID(e.target.value)}
                title="Employee HCM ID"
                required={true}
              />

              <Select
                onChange={(e) => setJobLevel(e.target.value)}
                title="Job Level"
                value={jobLevel}
                required={true}
                options={Helpers.level}
              />
              <Input
                title="Employee Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 11))}
                type="number"
                required={true}
              />
              <div className={`mtn__InputContainer mtn__child`}>
                <PeoplePicker
                  context={context}
                  titleText="Pledge Witness"
                  personSelectionLimit={1}
                  groupName="" // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={getPeoplePickerItems}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
              </div>
              <Select
                onChange={(e) => setLocation(e.target.value)}
                title="Location"
                value={location}
                required={true}
                options={locations}
                filterOption="Title"
                filter={true}
              />
              <Input
                title="Pledge Date"
                value={pledgeDate}
                onChange={(e) => setPledgeDate(e.target.value)}
                type="date"
                required={true}
              />
              <Input
                title="Pledge Time"
                value={pledgeTime}
                onChange={(e) => setPledgeTime(e.target.value)}
                type="time"
                required={true}
              />
            </div>
            <div>
              <div className={styles.btnContainer}>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={modalHandler}
                >
                  Cancel
                </button>
                <Modal
                  isVisible={open}
                  title="Are you sure you want to Cancel"
                  size="md"
                  content={
                    <div className={styles.modal__Btn}>
                      <button
                        type="button"
                        className={styles.btnCancel1}
                        onClick={cancelHandler}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className={styles.btnCancel2}
                        onClick={prevHandler}
                      >
                        Yes
                      </button>
                    </div>
                  }
                  onClose={() => setOpen(false)}
                  footer=""
                />
                <button
                  type="button"
                  className={styles.btnSubmit}
                  // onClick={approveHandler}
                  onClick={submitModalHandler}
                >
                  Submit
                </button>
                <Modal
                  isVisible={openModal}
                  title="Eligibility Guildline"
                  size="lg"
                  content={
                    <div className={styles.mtnEligibilityGuildline}>
                      <h1>MTN NIGERIA COMMUNICATIONS PLC.</h1>
                      <br />
                      <h2>
                        ELECTION GUIDELINES FOR THE 2022 BIENNIAL EMPLOYEE
                        COUNCIL ELECTION.
                      </h2>
                      <br />
                      <h3>Introduction</h3>
                      <h5>
                        In line with the provisions of the MTNN Employee Council
                        Constitution, election into the MTNN Employee Council
                        holds once in two (2) years. The last election took
                        place in October 2018 and based on the constitution, the
                        next election is planned to hold in October 2020.
                        <br />
                        As we prepare for another Employee Council election
                        scheduled to hold in October 30 2020, find below the
                        proposed plan for the forthcoming elections, including
                        general eligibility criteria for contesting elective
                        office etc. <br />
                        <br />
                        <span>Eligibility Criteria</span> <br />
                        <p>
                          Candidates that will contest for available seats in
                          each business region / location will be required to
                          meet the following criteria:
                        </p>
                        <ul>
                          <br />
                          <li>
                            1. Only confirmed national staff on job levels 1 & 2
                            are eligible to contest for seats on the Employee
                            Council.
                          </li>
                          <br />
                          <li>
                            2. ALL permanent national employees levels (both
                            confirmed and unconfirmed) on levels 1 & 2 are
                            eligible to vote.
                          </li>
                          <br />
                          <li>
                            3. Employees who have an active disciplinary
                            sanction are not eligible to contest.
                          </li>
                          <br />
                          <li>
                            4. Incumbent representatives who have served two
                            consecutive terms (i.e. 4 years) are not eligible to
                            contest.
                          </li>
                          <br />
                          <li>
                            5. Incumbent representatives who have served only
                            one term (i.e. 2 years) are eligible to contest.
                          </li>
                          <br />
                          <li>
                            6. Staff can only contest for allocated seats within
                            their region/location.
                          </li>
                          <br />
                          <span>Nomination and Election</span>
                          <li>
                            1. Election shall be through secret ballot
                            (electronically), and will be coordinated by the
                            Employee Relations Team with the Fraud Management
                            unit.
                          </li>
                          <br />
                          <li>
                            2. Nominations shall be made for each of the
                            allocated seats in each region. There is a
                            nomination form to be filled by interested eligible
                            employees.
                          </li>
                          <br />
                          <li>
                            3. At the close of nominations, votes shall be cast
                            and the candidates that obtain a simple majority
                            shall be declared elected.
                          </li>
                          <br />
                          <li>
                            4. Where there is a tie, a run-off election shall be
                            conducted to determine the winner.
                          </li>
                          <br />
                        </ul>
                      </h5>
                      <form onSubmit={submitHandler}>
                        <Input
                          title="I have read and agreed to abiide to the Terms and Conditions to the MTN Group's Code of Conduct and Pledge."
                          value={employeeEmail}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          type="checkbox"
                          required={true}
                        />
                        <div className="btnContainer">
                          <button
                            type="submit"
                            className="mtn__btn mtn__yellow"
                          >
                            Proceed
                          </button>
                        </div>
                      </form>
                    </div>
                  }
                  onClose={() => setOpenModal(false)}
                  footer=""
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployeeRegisterForm;
