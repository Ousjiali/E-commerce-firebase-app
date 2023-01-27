import * as React from "react";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AdminHeader, Navigation, Spinner, Text } from "../../../Containers";
import { sp } from "@pnp/sp";

import "@pnp/graph/users";

const AdminViewPending = ({ match }) => {
  // Helpers
  const history = useHistory();
  const itemID = match.params.id;

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
  const [approval, setApproval] = useState("");
  const [confirmationStatusByScore, setConfirmationStatusByScore] =
    useState("");

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    sp.profiles.myProperties.get().then((response) => {
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

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(`ID eq '${itemID}'`)
      .get()
      .then((res) => {
        setName(res[0].EmployeeName);
        setEmail(res[0].EmployeeEmail);
        setId(res[0].EmployeeID);
        setFormNo(res[0].FormNo);
        setTitle(res[0].JobTitle);
        setLevel(res[0].Level);
        setDivision(res[0].Division);
        setDepartment(res[0].Department);
        setPhone(res[0].Phone);
        setLocation(res[0].Location);
        setRater(res[0].Rater);
        setRaterEmail(res[0].RaterEmail);
        setEmploymentDate(res[0].EmploymentDate);
        setConfirmationDate(res[0].ConfirmationDate);
        setStartDate(res[0].StartDate);
        setEndDate(res[0].EndDate);
        setReport(res[0].DirectReport);
        setApproval(res[0].Approvals);
        setConfirmationStatusByScore(res[0].ConfirmationStatusByScore);
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
      });
  }, []);

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

  const ratings = () => {
    history.push(`/hr/view`);
  };

  return (
    <div className="appContainer">
      <Navigation complete={`active`} />
      <div className="contentsRight">
        <AdminHeader title="Completed" />
        {loading ? (
          <Spinner />
        ) : (
          <div className="textContainer">
            <Text title="Employee Name" value={name} />
            <Text title="Employee Email" value={email} />
            <Text title="Employee ID" value={id} />

            <Text title="Form No." value={formNo} />
            <Text title="Job Title" value={title} />
            <Text title="Staff Level" value={level} />
            <Text title="Division" value={division} />
            <Text title="Department" value={department} />
            <Text title="Employee Phone Number" value={phone} />
            <Text title="Location" value={location} />
            <Text title="Rater" value={rater} />
            <Text title="Rater's Email" value={raterEmail} />
            <Text title="Employment Date" value={employmentDate} />
            <Text title="Confirmation Date" value={confirmationDate} />
            <Text title="Period Supervised (Start Date)" value={startDate} />
            <Text title="Period Supervised (End Date)" value={endDate} />
          </div>
        )}
        <div className="btnContainer">
          <div className="mtn__btnPage1">
            <button
              className="mtn__btns mtn__black"
              type="button"
              onClick={ratings}
            >
              View Ratings
            </button>

            <button
              className={
                confirmationStatusByScore === "Defer"
                  ? "mtn__btns mtn__blue"
                  : "hidden"
              }
              type="button"
              onClick={reInitiate}
            >
              RE-Initiate Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewPending;
