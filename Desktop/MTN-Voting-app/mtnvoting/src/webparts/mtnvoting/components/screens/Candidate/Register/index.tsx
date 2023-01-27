import * as React from "react";
import {
  Text,
  Header,
  Spinner,
  Textarea,
  Modal,
  Input,
  Select,
  Radio,
  ImageUpload,
  CandidateNavigation,
} from "../../../containers";
import styles from "./styles.module.scss";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import FileUpload from "../../../containers/Forms/Input/FileUpload";
import { useHistory } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CandidateRegister = ({ context }) => {
  const history = useHistory();
  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [dateEmployed, setDateEmployed] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [locations, setLocations] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [service, setService] = React.useState("");
  const [disciplinary, setDisciplinary] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [startDate, setStartDate] = React.useState("");

  const [disciplinaryCouncil, setDisciplinaryCouncil] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [terms, setTerms] = React.useState("");
  const [constituency, setConstituency] = React.useState("");
  const [constituencies, setConstituencies] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);
  const jobLevelData = [{ value: "level 1" }, { value: "level 2" }];
  const serviceData = [{ value: "Yes" }, { value: "No" }];
  const disciplinaryData = [{ value: "No" }, { value: "Yes" }];
  const [agree, setAgree] = React.useState(false);
  const [disciplinaryModal, setDisciplinaryModal] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState(null);
  const [upload, setUpload] = React.useState(false);
  const [mobile, setMobile] = React.useState("");
  const [serviceModal, setServiceModal] = React.useState(false);

  const [agenda, setAgenda] = React.useState("");
  const [agendas, setAgendas] = React.useState([]);

  const agendaHandler = () => {
    setAgendas([...agendas, agenda]);
    setAgenda("");
  };

  const removeHandler = (i) => {
    // const index = agendas.indexOf(i);
    // if (index > -1) {
    //   agendas.splice(index, 1);
    // }
    // return agendas
    let filtered = agendas.filter((agendalist) => {
      return agendalist !== i;
    });
    setAgendas(filtered);
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      setEmployeeName(response.DisplayName);
      setEmployeeEmail(response.Email);

      sp.web.lists
        .getByTitle("Nominees")
        .items.filter(`EmployeeEmail eq '${response.Email}'`)
        .get()
        .then((items) => {
          if (items.length > 0) {
            swal("Error", "You are already registered", "error");
            history.push("/candidate");
            return;
          }
        });
      // get registration closing date
      sp.web.lists
        .getByTitle(`AspirantRegistration`)
        .items.get()
        .then((res) => {
          console.log(res[0].EndDate);
          let todayDate = new Date(Date.now());
          let regEndDate = new Date(res[0].EndDate);
          // check current date and closing date
          console.log(todayDate, "Today");
          console.log(regEndDate, "Closing date");
          if (todayDate > regEndDate) {
            swal("Error", "Aspirant registration has closed", "error");
            history.push("/candidate");
            return;
          }
        });

      sp.web.lists
        .getByTitle(`Region`)
        .items.get()
        .then((resp) => {
          setRegions(resp);
        });
      sp.web.lists
        .getByTitle(`Constituency`)
        .items.get()
        .then((res) => {
          setConstituencies(res);
        });
    });
  }, []);

  const approveHandler = () => {
    if (
      !jobLevel ||
      !dateEmployed ||
      !region ||
      !location ||
      !service ||
      !disciplinary ||
      !photoUrl ||
      !mobile
    ) {
      swal("Warning!", "All Fields are required", "error");
    } else {
      if (agendas.length < 5) {
        swal("Warning!", "State 5 Points Agenda", "error");
      } else {
        setOpen(true);
      }
    }
  };
  const cancelButton = () => {
    setCancelModal(true);
  };
  const cancelHandler = () => {
    setDisciplinary("");
    setJobLevel("");
    setRegion("");
    setDisciplinary("");
    setService("");
    setLocation("");
    setDateEmployed("");
    setConstituency("");
    setAgenda("");
    setMobile("");
    setCancelModal(false);
  };
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  const submitHandler = () => {
    if (terms && terms == "No") {
      swal("Warning!", "you have to agree with terms and condition", "error");
    } else {
      setLoading(true);
      sp.web.lists
        .getByTitle("Nominees")
        .items.add({
          EmployeeName: employeeName,
          EmployeeEmail: employeeEmail,
          DateEmployed: dateEmployed,
          JobLevel: jobLevel,
          Region: region,
          Location: location,
          ServedOnTheCouncil: service,
          DisciplinarySanction: disciplinary,
          PassportPhotograph: photoUrl,
          Agenda: JSON.stringify(agendas),
          Constituency: constituency,
          StartDate: startDate,
          EndDate: endDate,
          DisciplinaryCouncil: disciplinaryCouncil,
          Mobile: `234${mobile.slice(1)}`,
        })
        .then((res) => {
          setLoading(false);
          setOpen(false);
          swal("Success", "You have Successfully Registered", "success");
          setTimeout(function () {
            history.push(`/candidate`);
          }, 2000);
        })
        .catch((e) => {
          setLoading(false);
          swal("Warning!", "An Error Occured, Try Again!", "error");
          console.error(e);
        });
    }
  };

  const regionHandler = (e) => {
    setRegion(e.target.value);
    sp.web.lists
      .getByTitle(`Location`)
      .items.filter(`Region eq '${e.target.value}'`)
      .get()
      .then((res) => {
        setLocations(res);
      });
  };

  const photoHandler = (e) => {
    const pix = e.target.files[0];
    setUpload(true);
    sp.web
      .getFolderByServerRelativeUrl("NomineePhoto")
      .files.add(`${employeeEmail}-${pix.name}`, pix, true)
      .then((result) => {
        result.file.listItemAllFields.get().then((listItemAllFields) => {
          setPhotoUrl(`${context._web.absoluteUrl}/NomineePhoto/${employeeEmail}-${pix.name}`);
          setUpload(false);
        });
      })
      .catch((e) => {
        setUpload(false);
        swal("Warning!", "File Upload Failed", "error");
        console.log(e.response);
      });
  };

  const serviceHandler = (e) => {
    const serv = e.target.value;
    setService(e.target.value);
    if (serv === "Yes") {
      setServiceModal(true);
    }
  };

  const disciplinaryHandler = (e) => {
    setDisciplinary(e.target.value);
    const dist = e.target.value;
    if (dist === "Yes") {
      setDisciplinaryModal(true);
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setServiceModal(false);
    setDisciplinaryModal(false);
  };

  return (
    <div className="appContainer">
      <CandidateNavigation register={`active`} />
      <div className="contentsRight__">
        <Header title="Registration" />
        <div className="mtn__InputFlex">
          <Input
            title="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            type="text"
            readOnly={true}
          />

          <Input
            title="Employee Email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            type="email"
            readOnly={true}
          />

          <Input
            title="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="tel"
            required={true}
          />

          <div className={`mtn__InputContainer mtn__child`}>
            <label>Date Employed</label>
            <input
              type="date"
              value={dateEmployed}
              onChange={(e) => setDateEmployed(e.target.value)}
              required={true}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <Select
            onChange={(e) => setJobLevel(e.target.value)}
            value={jobLevel}
            title="Job level"
            options={jobLevelData}
          />

          <Select
            value={constituency}
            onChange={(e) => setConstituency(e.target.value)}
            required={false}
            title="Constituency"
            options={constituencies}
            filter={true}
            filterOption="Title"
            size={"mtn__child"}
          />

          <Select
            onChange={regionHandler}
            value={region}
            title="Region"
            options={regions}
            filter={true}
            filterOption="Title"
          />

          <Select
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            title="Location"
            options={locations}
            filter={true}
            filterOption="Title"
          />
          <div className={styles.space}>
            <ImageUpload
              title="Upload your picture"
              value={passport}
              onChange={photoHandler}
              loading={upload}
            />
            {photoUrl && (
              <div className={styles.imageContainer}>
                <img src={photoUrl} alt={employeeName} />
              </div>
            )}
          </div>

          <Radio
            onChange={serviceHandler}
            title="Have you served on the council before?"
            options={serviceData}
            value={service}
          />
          <Radio
            onChange={disciplinaryHandler}
            title="Do you have any disciplinary sanction?"
            options={disciplinaryData}
            value={disciplinary}
          />
          <Input
            title="State your five point agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            type="text"
            size="mtn__child"
          />
          <div className="mtn__InputContainer mtn__child">
            <label style={{ visibility: "hidden" }}>Add</label>
            <button
              className="mtn__btn mtn__yellow"
              onClick={agendaHandler}
              disabled={agendas.length === 5}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mtn__InputContainer mtn__adult">
          <ul>
            {agendas.map((item, i) => (
              <li key={i} className="plane">
                {item}{" "}
                <div className="remove">
                  <FaTrash onClick={() => removeHandler(item)} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.inputContainer}>
          <div className="radioContainer">
            <div className="minimizeBtn">
              <button className="mtn__btn mtn__black" onClick={cancelButton}>
                Cancel
              </button>
              <button
                className="mtn__btn mtn__yellow bg"
                onClick={approveHandler}
              >
                Submit
              </button>
            </div>
            <Modal
              isVisible={open}
              title="Terms and Condition"
              size="md"
              content={
                <div className="terms">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <div>
                      <div className="mtn__terms">
                        <img
                          src={require("../../../assets/mtnpic.png")}
                          alt="logo"
                        />
                        <h2>MTN NIGERIA COMMUNICATIONS PLC.</h2>
                      </div>
                      <h3>
                        ELECTION GUIDELINES FOR THE 2022 BIENNIAL EMPLOYEE
                        COUNCIL ELECTION.
                      </h3>
                      <br />
                      <h3>Introduction</h3>
                      <p>
                        In line with the provisions of the MTNN Employee Council
                        Constitution, election into the MTNN Employee Council
                        holds once in two (2) years. The last election took
                        place in October 2020 hence, the next election is
                        planned to take place in October 2022.
                        <br />
                        As we prepare for the taking place on October 24, 2022,
                        find below general eligibility criteria for contesting
                        and voting for an elective office and the proposed
                        implementation plan for a seamless elections process
                        etc.
                      </p>
                      <h3>Eligibility Criteria</h3>
                      <p>
                        Candidates that will contest for available seats in each
                        business region / location will be required to meet the
                        following criteria:
                      </p>
                      <ul>
                        <li>
                          Only confirmed national staff on job levels 1 & 2 are
                          eligible to contest for seats on the Employee Council.
                        </li>
                        <li>
                          ALL permanent national employees levels (both
                          confirmed and unconfirmed) on levels 1 & 2 are
                          eligible to vote.
                        </li>
                        <li>
                          Employees who have an active disciplinary sanction are
                          &nbsp; <strong>not eligible</strong> to contest.
                        </li>
                        <li>
                          Incumbent representatives who have served two
                          consecutive terms (i.e. 4 years) are not eligible to
                          contest.
                        </li>
                        <li>
                          Incumbent representatives who have served only one
                          term (i.e. 2 years) are eligible to contest.
                        </li>
                        <li>
                          Staff can only contest for allocated seats within
                          their region/location.
                        </li>
                      </ul>
                      <form onSubmit={submitHandler}>
                        <Input
                          title="I agree to terms and conditions."
                          value={employeeEmail}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          type="checkbox"
                          required={true}
                        />
                        <div className="btnContainerProceed">
                          <button
                            type="submit"
                            className="mtn__btn23 mtn__yellow"
                          >
                            Proceed
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              }
              onClose={() => setOpen(false)}
              footer=""
            />

            <Modal
              isVisible={cancelModal}
              title="Are you sure you want to cancel registeration process?"
              size="md"
              content={
                <div className="terms">
                  <div className="btnContainer">
                    <button
                      onClick={cancelHandler}
                      type="button"
                      className="mtn__btn mtn__yellow"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              }
              onClose={() => setCancelModal(false)}
              footer=""
            />

            <Modal
              isVisible={disciplinaryModal}
              title="if yes what disciplinary have you served?"
              size="md"
              content={
                <form onSubmit={saveHandler}>
                  <div className="mtn__InputFlex">
                    <Textarea
                      title="Disciplinary"
                      value={disciplinaryCouncil}
                      onChange={(e) => setDisciplinaryCouncil(e.target.value)}
                      required={true}
                    />
                    <button type="submit" className="mtn__btn mtn__yellow">
                      Save
                    </button>
                  </div>
                </form>
              }
              onClose={() => setDisciplinaryModal(false)}
              footer=""
            />

            <Modal
              isVisible={serviceModal}
              title="if yes what time did have you serve"
              size="md"
              content={
                <form onSubmit={saveHandler}>
                  <div className="mtn__InputFlex">
                    <Input
                      title="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      type="date"
                      required={true}
                      size="mtn__adult"
                    />
                    <Input
                      title="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      type="date"
                      required={true}
                      size="mtn__adult"
                    />
                    <button type="submit" className="mtn__btn mtn__yellow">
                      Save
                    </button>
                  </div>
                </form>
              }
              onClose={() => setServiceModal(false)}
              footer=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister;
