import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Select,
  AdminHeader,
  Input,
  Navigation,
  Helpers,
  Spinner,
} from "../../../Containers";
import { sp } from "@pnp/sp";
import swal from "sweetalert";
import "@pnp/graph/users";
import { useParams } from "react-router-dom";
import {
  PeoplePicker,
  PrincipalType,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  HttpClient,
  IHttpClientOptions,
  HttpClientResponse,
} from "@microsoft/sp-http";
import toast, { Toaster } from "react-hot-toast";
import { CODE } from "../../config";

const EditConfirmation = ({ context }) => {
  // Helpers
  const history = useHistory();
  // const  = match.params.id
  const { id: itemID } = useParams();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [id, setId] = useState("");
  const [formNo, setFormNo] = useState("");
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [division, setDivision] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [rater, setRater] = useState("");
  const [raterEmail, setRaterEmail] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [confirmationDate, setConfirmationDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [report, setReport] = useState("");
  const [locations, setLocations] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [raterLineManager, setRaterLineManager] = useState("");
  const [raterLineManagerName, setRaterLineManagerName] = useState("");
  const [viewOnly, setViewOnly] = useState(true);

  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    sp.web.lists
      .getByTitle("Confirmation")
      .items.getById(itemID)
      .update({
        EmployeeName: name,
        EmployeeEmail: employeeEmail,
        EmployeeID: id,
        FormNo: formNo,
        JobTitle: title,
        Level: level,
        Division: division,
        Department: department,
        Phone: phone,
        Location: location,
        Rater: rater,
        RaterEmail: raterEmail,
        EmploymentDate: employmentDate,
        ConfirmationDate: confirmationDate,
        StartDate: startDate,
        EndDate: endDate,
        DirectReport: report,
        RaterLineManager: raterLineManager,
        RaterLineManagerName: raterLineManagerName,
      })
      .then((res) => {
        swal("Success", "Success", "success");
        history.push("/admin/pending");
        setLoading(false);
      })
      .catch((e) => {
        swal("Warning!", "An Error Occured, Try Again!", "error");
        setLoading(false);
        console.error(e);
      });
  };

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
      console.log("response:", response);
      sp.web.lists
        .getByTitle(`Admin`)
        .items.filter(
          `Title eq '${response.DisplayName}' and Role eq 'HR HCM Administrator'`
        )
        .get()
        .then((res) => {
          if (res.length === 0) {
            history.push("/");
          }
        });
    });
  }, []);

  const enableEdit = (e) => {
    e.preventDefault();
    setViewOnly(false);
  };

  React.useMemo(() => {}, [viewOnly]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ID eq '${itemID}'`)
      .get()
      .then((res) => {
        setName(res[0].EmployeeName);
        setId(res[0].EmployeeID);
        setFormNo(res[0].FormNo);
        setTitle(res[0].JobTitle);
        setLevel(res[0].Level);
        setDivision(res[0].Division);
        setDepartment(res[0].Department);
        setPhone(res[0].Phone);
        setLocation(res[0].Location);
        setRater(res[0].Rater);
        setEmploymentDate(res[0].EmploymentDate);
        setConfirmationDate(res[0].ConfirmationDate);
        setStartDate(res[0].StartDate);
        setEndDate(res[0].EndDate);
        setReport(res[0].DirectReport);
        setRaterLineManager(res[0].field_5);
        setRaterLineManagerName(res[0].field_8);

        sp.web.lists
          .getByTitle(`Division`)
          .items.get()
          .then((resp) => {
            setDivisions(resp);
            const filter = resp.filter((x) => x.Title === res[0].Division);
            setDepartments(filter);
          });
        sp.web.lists
          .getByTitle(`Location`)
          .items.get()
          .then((resps) => {
            setLocations(resps);
          });
        sp.web.lists
          .getByTitle(`Department`)
          .items.get()
          .then((resps) => {
            setDepartments(resps);
          });
      });
  }, []);

  const divisionHandler = (e) => {
    setDivision(e.target.value);
    sp.web.lists
      .getByTitle(`Department`)
      .items.filter(`Division eq '${e.target.value}'`)
      .get()
      .then((res) => {
        setDepartments(res);
      });
  };

  function getPeoplePickerItems(items: any[]) {
    setName(items[0].text);
    setEmployeeEmail(items[0].secondaryText);
  }

  async function getRaterPickerItems(items: any[]) {
    const staff = items[0].secondaryText;
    setRater(items[0].text);
    setRaterEmail(items[0].secondaryText);

    const URL = `https://prod-nigeria.mtn.ng/ppk/fma/getUserByEmail/${staff}`;
    const httpClientOptions: IHttpClientOptions = {
      headers: {
        "Content-Type": "application/json",
        apiKey: `${CODE}`,
      },
      method: "GET",
      // mode: "no-cors",
    };
    const data = await context.httpClient
      .get(URL, HttpClient.configurations.v1, httpClientOptions)
      .then((response: Response): Promise<HttpClientResponse> => {
        return response.json();
      });
    if (!data.user) return toast.error("Line Manager not found");
    setRaterLineManagerName(data.user.lineManagerFullname);
    setRaterLineManager(data.user.lineManagerEmail);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const dateHandler = (e) => {
    setEmploymentDate(e.target.value);
    let date = new Date(e.target.value);
    date.setMonth(date.getMonth() + 6);
    setConfirmationDate(formatDate(date));
  };

  const cancelHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Form Fields would be cleared",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        history.push("/admin/pending");
      }
    });
  };

  return (
    <div className="appContainer">
      <Navigation init={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Edit Confirmation Form" />
        <Toaster position="bottom-center" reverseOrder={false} />
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mtn__InputFlex">
              <div
                className={
                  viewOnly ? "hidden" : `mtn__InputContainer mtn__child`
                }
              >
                <PeoplePicker
                  context={context}
                  titleText="Employee Name"
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

              {viewOnly ? (
                <Input
                  title="Employee Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required={true}
                  disabled={viewOnly}
                />
              ) : null}
              <Input
                title="Employee ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
                type="text"
                required={true}
                disabled={viewOnly}
              />

              <Input
                title="Form No."
                value={formNo}
                onChange={(e) => setFormNo(e.target.value)}
                type="text"
                readOnly={true}
                disabled={viewOnly}
              />
              <Input
                title="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                required={true}
                disabled={viewOnly}
              />
              <Select
                onChange={(e) => setLevel(e.target.value)}
                title="Staff Level"
                value={level}
                required={true}
                options={Helpers.level}
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
                filterOption="Title"
                filter={true}
              />

              <Input
                title="Employee Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.slice(0, 11))}
                type="number"
                required={true}
                disabled={viewOnly}
              />
              <Select
                onChange={(e) => setLocation(e.target.value)}
                title="Location"
                value={location}
                required={true}
                options={locations}
                filterOption="Title"
                filter={true}
              />

              <div
                className={
                  viewOnly ? "hidden" : `mtn__InputContainer mtn__child`
                }
              >
                <PeoplePicker
                  context={context}
                  titleText="Rater"
                  personSelectionLimit={1}
                  groupName="" // Leave this blank in case you want to filter from all users
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={getRaterPickerItems}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  resolveDelay={1000}
                />
              </div>

              {viewOnly ? (
                <Input
                  title="Rater"
                  value={rater}
                  onChange={dateHandler}
                  type="text"
                  required={true}
                  disabled={viewOnly}
                />
              ) : null}

              <Input
                title="Employment Date"
                value={employmentDate}
                onChange={dateHandler}
                type="date"
                required={true}
                disabled={viewOnly}
              />
              <Input
                title="Confirmation Date"
                value={confirmationDate}
                onChange={(e) => setConfirmationDate(e.target.value)}
                type="date"
                required={true}
                disabled={viewOnly}
              />
              <Input
                title="Period Supervised (Start Date)"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                required={true}
                disabled={viewOnly}
              />
              <Input
                title="Period Supervised (End Date)"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                required={true}
                disabled={viewOnly}
              />
              <div className="mtn__InputContainer mtn__child">
                <label>Does the employee have direct report?</label>
                <div className="most__RadioContainer">
                  <span>
                    Yes{" "}
                    <input
                      type="radio"
                      onChange={(e) => setReport("Yes")}
                      value={report}
                      name="report"
                    />
                  </span>
                  <span>
                    No{" "}
                    <input
                      type="radio"
                      onChange={(e) => setReport("No")}
                      value={report}
                      name="report"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div className="btnContainer">
              <div className="mtn__btnPage1">
                <button
                  className="mtn__btns mtn__black"
                  type="button"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
                {viewOnly ? (
                  <button className="mtn__btns mtn__blue" onClick={enableEdit}>
                    Edit
                  </button>
                ) : (
                  <button className="mtn__btns mtn__blue" type="submit">
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditConfirmation;
