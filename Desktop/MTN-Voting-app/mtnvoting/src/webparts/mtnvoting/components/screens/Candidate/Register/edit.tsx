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
import { values } from "lodash";
import { Item } from "@pnp/sp/items";
import { useHistory } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const CandidateEdit = ({ context }) => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({} as any);
  const history = useHistory();

  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeEmail, setEmployeeEmail] = React.useState("");
  const [dateEmployed, setDateEmployed] = React.useState("");
  const [jobLevel, setJobLevel] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [disciplinaryModal, setDisciplinaryModal] = React.useState(false);
  const [regions, setRegions] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [locations, setLocations] = React.useState([]);
  const [service, setService] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [disciplinary, setDisciplinary] = React.useState("");
  const [passport, setPassport] = React.useState("");
  const [agenda, setAgenda] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [agree, setAgree] = React.useState(false);
  const [cancelModal, setCancelModal] = React.useState(false);
  const [list, setList] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState(null);
  const [upload, setUpload] = React.useState(false);
  const [serviceModal, setServiceModal] = React.useState(false);
  const [agendas, setAgendas] = React.useState([]);
  const [DisciplinaryCouncil, setDisciplinaryCouncil] = React.useState("");
  const [constituency, setConstituency] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [constituencies, setConstituencies] = React.useState([]);

  const agendaHandler = () => {
    setAgendas([...agendas, agenda]);
    console.log("working");
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
    setAgenda("");
    setPassport("");
    setConstituency("");
    setCancelModal(false);
  };
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  React.useEffect(() => {
    setLoading(true);
    sp.profiles.myProperties
      .get()

      .then((response) => {
        sp.web.lists
          .getByTitle(`Nominees`)
          .items.filter(`EmployeeEmail eq '${response.Email}'`)
          .get()
          .then((res) => {
            setData(res[0]);
            console.log(res[0]);
            setLoading(false);
            setEmployeeName(res[0].EmployeeName);
            setEmployeeEmail(res[0].EmployeeEmail);
            setDateEmployed(res[0].DateEmployed);
            setJobLevel(res[0].JobLevel);
            setStartDate(res[0].StartDate);
            setEndDate(res[0].EndDate);
            setRegion(res[0].Region);
            setLocation(res[0].Location);
            setService(res[0].ServedOnTheCouncil);
            setDisciplinary(res[0].DisciplinarySanction);
            setDisciplinaryCouncil(res[0].DisciplinaryCouncil);
            setPhotoUrl(res[0].PassportPhotograph);
            setAgendas(JSON.parse(res[0].Agenda));
            setConstituency(res[0].Constituency);
            setMobile(res[0].Mobile);

            setId(res[0].ID);
            sp.web.lists
              .getByTitle(`Location`)
              .items.filter(`Region eq '${res[0].Region}'`)
              .get()
              .then((res) => {
                setLocations(res);
              });
          });
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
  }, []);

  const jobLevelData = [{ value: "level 1" }, { value: "level 2" }];

  const serviceData = [{ value: "Yes" }, { value: "No" }];
  const disciplinaryData = [{ value: "Yes" }, { value: "No" }];

  const reader = new FileReader();

  const approveHandler = () => {
    setOpen(true);
  };
  const submitHandler = () => {
    setLoading(true);
    sp.web.lists
      .getByTitle("Nominees")
      .items.getById(id)
      .update({
        EmployeeName: employeeName,
        EmployeeEmail: employeeEmail,
        DateEmployed: dateEmployed,
        JobLevel: jobLevel,
        Region: region,
        Location: location,
        ServedOnTheCouncil: service,
        DisciplinarySanction: disciplinary,
        StartDate: startDate,
        EndDate: endDate,
        DisciplinaryCouncil: DisciplinaryCouncil,
        PassportPhotograph: photoUrl,
        Agenda: JSON.stringify(agendas),
        Constituency: constituency,
        Mobile: `234${mobile.slice(1)}`,
      })
      .then((res) => {
        setOpen(false);
        swal("Success", "You have Successfully Registered", "success");
        setTimeout(function () {
          localStorage.removeItem("dp");
          history.push(`/candidate`);
        }, 2000);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        console.error(e);
      });
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

  // const removeHandler = (i) => {
  //   const index = agendas.indexOf(i);
  //   if (index > -1) {
  //     agendas.splice(index, 1);
  //   }
  //   return agendas;
  // };
  const serviceHandler = (e) => {
    // const serv = e.target.value
    // setService(e.target.value)
    // if (serv === "Yes") {
    //   setServiceModal(true)
    // }
    setServiceModal(true);
  };

  const disciplinaryHandler = (e) => {
    // setDisciplinary(e.target.value)
    // const dist = e.target.value
    // if (dist === "Yes") {
    //   setDisciplinaryModal(true)
    // }
    setDisciplinaryModal(true);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setServiceModal(false);
    setDisciplinaryModal(false);
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
  return (
    <div className="appContainer">
      <CandidateNavigation register={`active`} />
      <div className="contentsRight__">
        <Header title="Edit registration" />
        <div className="mtn__InputFlex">
          <Input
            title="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            type="text"
            readOnly={false}
          />
          <Input
            title="Employee Email"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            type="email"
            readOnly={false}
          />

          <Input
            title="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="tel"
            required={true}
          />

          <Input
            title="Date Employed"
            value={dateEmployed}
            onChange={(e) => setDateEmployed(e.target.value)}
            type="date"
            readOnly={false}
          />

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
            onChange={(e) => setService(e.target.value)}
            title="Have you served on the council before?"
            options={serviceData}
            value={service}
          />
          {service === "Yes" ? (
            <div style={{ margin: "2rem" }}>
              {" "}
              Council Start Date: {startDate} -- Council End Date : {endDate}{" "}
              <button style={{ marginLeft: "2rem" }} onClick={serviceHandler}>
                <FaEdit />
              </button>{" "}
            </div>
          ) : null}
          <Radio
            onChange={(e) => setDisciplinary(e.target.value)}
            title="Do you have any disciplinary sanction?"
            options={disciplinaryData}
            value={disciplinary}
          />
          {disciplinary === "Yes" ? (
            <div style={{ margin: "2rem" }}>
              {" "}
              {DisciplinaryCouncil}{" "}
              <button
                style={{ marginLeft: "2rem", font: "20px" }}
                onClick={disciplinaryHandler}
              >
                <FaEdit />
              </button>{" "}
            </div>
          ) : null}
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
              disabled={agendas && agendas.length === 5}
            >
              Add
            </button>
          </div>
        </div>
        <div className="mtn__InputContainer mtn__adult">
          <ul>
            {agendas &&
              agendas.map((item, i) => (
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
              <button
                onClick={cancelButton}
                className="mtn__btn mtn__white_blackColor"
              >
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
                      <div className={styles.checkBox}>
                        <input
                          type="checkbox"
                          id="agree"
                          onChange={checkboxHandler}
                        />
                      </div>
                      <label htmlFor="agree">
                        {" "}
                        I agree to <b>terms and conditions</b>
                      </label>

                      <div className="btnContainerProceed">
                        <button
                          onClick={submitHandler}
                          type="button"
                          className="mtn__btn23 mtn__yellow"
                          disabled={!agree}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              }
              onClose={() => setOpen(false)}
              footer=""
            />
            <Modal
              isVisible={cancelModal}
              title="Are you sure you want to cancel edit proccess?"
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
                      value={DisciplinaryCouncil}
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

export default CandidateEdit;
