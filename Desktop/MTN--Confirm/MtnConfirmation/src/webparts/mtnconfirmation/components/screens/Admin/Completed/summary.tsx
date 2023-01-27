import { sp } from "@pnp/sp";
import jsPDF from "jspdf";
import * as React from "react";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { RaterContext } from "../../../Context/RaterContext";
import { useHistory } from "react-router-dom";
import { MenuBar } from "../../../Containers";

const Report = () => {
  const history = useHistory();
  const { raterFinalComments, setRaterFinalComments } =
    React.useContext(RaterContext);
  const [mhrbpComment, setMhrbpComment] = React.useState("");
  const [confirmationStatus, setConfirmationStatus] = React.useState("");
  const [raterDate, setRaterDate] = React.useState("");
  const [raterName, setRaterName] = React.useState("");
  const [reviewerDate, setReviewerDate] = React.useState("");
  const [reviewerName, setReviewerName] = React.useState("");
  const [HRBPName, setHRBPName] = React.useState("");
  const [HRBPDate, setHRBPDate] = React.useState("");
  const [lineManagerComment, setLineManagerComment] = React.useState("");
  const [developmentalRequirement, setDevelopmentalRequiremnt] =
    React.useState("");
  const [raterEmail, setRaterEmail] = React.useState("");
  const [chiefHrOfficerComment, setChiefHrOfficerComment] = React.useState("");
  const { id, itemId } = React.useContext(EmployeeContext);
  const [CHROName, setCHROName] = React.useState("");
  const [CHRODate, setCHRODate] = React.useState("");

  React.useEffect(() => {
    if (!id) {
      history.push("/admin/completed");
      return;
    }

    Promise.all([
      sp.web.lists
        .getByTitle("SupervisoryEvaluation")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setRaterFinalComments(response[0].RaterFinalComment);
            setRaterName(response[0].RaterEmail);
            setRaterDate(response[0].RatingDate);
          }
        }),
      sp.web.lists
        .getByTitle("EvaluationComments")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setLineManagerComment(response[0].RaterLineManagerComment);
            setMhrbpComment(response[0].HRBPComment);
            setDevelopmentalRequiremnt(
              response[0].LineManagerDevelopmentRequiremen
            );
            setReviewerDate(response[0].LineManagerDate);
            setReviewerName(response[0].LineManagerName);
            setHRBPDate(response[0].HRBPDate);
            setHRBPName(response[0].HRBPName);
            setChiefHrOfficerComment(response[0].ChiefHROfficerComment);
            setCHRODate(response[0].CHRODate);
            setCHROName(response[0].CHROName);
          }
        }),
    ]);
    sp.web.lists
      .getByTitle("Confirmation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setConfirmationStatus(res[0].ConfirmationStatusByScore);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
        setRaterEmail(res[0].raterEmail);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
      });
  }, []);

  const pdfRef: any = React.createRef();

  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      html2canvas: {
        scale: 0.2,
      },
    });
  };

  const menu = [
    { name: "Employee Data", url: `/admin/completed/report/${id}` },
    { name: "Performance", url: `/admin/completed/performance/${id}` },
    {
      name: "Behavioural",
      url: `/admin/completed/behavioural/${id}`,
    },
    {
      name: "Supervisory",
      url: `/admin/completed/supervisory/${id}`,
    },
    { name: "Documents", url: `/admin/completed/documentation/${id}` },
    { name: "Summary", url: `/admin/completed/summary/${id}`, active: true },
  ];

  const reportHandler = () => {
    history.push(`/admin/completed`);
  };

  return (
    <div>
      <div className="mtn__btnContaainer" style={{ marginLeft: "20px" }}>
        <button
          className="mtn__btns mtn__black"
          type="button"
          onClick={reportHandler}
        >
          Report
        </button>

        <button
          className="mtn__btns mtn__blue"
          type="button"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <div className="center">
        <MenuBar menu={menu} />
      </div>
      <div className="report_container" ref={pdfRef}>
        <div style={{ width: "80%" }}>
          <h3 style={{ color: "#006993" }}>
            MTNN EMPLOYEE CONFIRMATION EVALUATION FORM
          </h3>
          <h5>
            PERSONAL INFORMATION, PERFORMANCE FACTORS, BEHAVIOURAL TRAITS,
            SUPERVISORY FACTORS, CONFIRMATION SUMMARY APPROVAL & COMMENTS
          </h5>
        </div>

        <div className="two_column_div">
          <div className="two_column yellow">Developmental Requirements</div>
          <div className="two_column blue">{developmentalRequirement}</div>
        </div>
        <div className="five_column_div">
          <div className="two_column yellow">ACTOR</div>
          <div className="two_column yellow">DESIGNATION</div>
          <div className="two_column yellow">COMMENT</div>
          <div className="two_column yellow">DATE/TIME</div>
          <div className="two_column yellow">RECOMMENDATIONS</div>

          <div className="two_column yellow">{raterName}</div>
          <div className="two_column yellow">Rater</div>
          <div className="two_column yellow">{raterFinalComments}</div>
          <div className="two_column yellow">{raterDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          <div className="two_column yellow">{reviewerName}</div>
          <div className="two_column yellow">Reviewer</div>
          <div className="two_column yellow">{lineManagerComment}</div>
          <div className="two_column yellow">{reviewerDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          <div className="two_column yellow">{HRBPName}</div>
          <div className="two_column yellow">HRBP</div>
          <div className="two_column yellow">{mhrbpComment}</div>
          <div className="two_column yellow">{HRBPDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          <div className="two_column yellow">{CHROName}</div>
          <div className="two_column yellow">CHRO</div>
          <div className="two_column yellow">{chiefHrOfficerComment}</div>
          <div className="two_column yellow">{CHRODate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>
        </div>
      </div>
    </div>
  );
};

export default Report;
