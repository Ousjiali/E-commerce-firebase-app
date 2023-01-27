import { sp } from "@pnp/sp";
import jsPDF from "jspdf";
import * as React from "react";
import { EmployeeContext } from "../../../Context/EmployeeContext";

import { useHistory } from "react-router-dom";
import { MenuBar } from "../../../Containers";

const Report = () => {
  const history = useHistory();

  const [employeeCredentialsUrl, setEmployeeCredentialsUrl] =
    React.useState("");

  const [referenceUrl, setReferenceUrl] = React.useState("");
  const { id, itemId } = React.useContext(EmployeeContext);
  const [jobSummary, setJobSummary] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [hirsUrl, setHirsUrl] = React.useState("");
  const [nyscUrl, setNyscUrl] = React.useState("");
  const [hrbpSignoffUrl, setHrbpSignoffUrl] = React.useState("");
  const [lmSignoffUrl, setLmSignoffUrl] = React.useState("");

  const [query, setQuery] = React.useState("");
  const [firstWrittenWarning, setFirstWrittenWarning] = React.useState("");
  const [finalWrittenWarning, setFinalWrittenWarning] = React.useState("");
  const [investigation, setInvestigation] = React.useState("");
  const [verbalWarning, setVerbalWarning] = React.useState("");

  React.useEffect(() => {
    if (!id) {
      history.push("/admin/completed");
      return;
    }

    Promise.all([
      sp.web.lists
        .getByTitle("EvaluationComments")
        .items.filter(`EmployeeID eq '${id}'`)
        .get()
        .then((response) => {
          if (response.length > 0) {
            setJobSummary(response[0].JobResponsibilities);
            setEmployeeCredentialsUrl(response[0].EmployeeCredentials);
            setPhotoUrl(response[0].Passport);
            setReferenceUrl(response[0].Reference);
            setHirsUrl(response[0].HRIS);
            setNyscUrl(response[0].NYSC);
            setLmSignoffUrl(response[0].LMSignoff);
            setHrbpSignoffUrl(response[0].HRBPSignoff);
            setFirstWrittenWarning(response[0].FirstWrittenWarning);
            setFinalWrittenWarning(response[0].FinalWrittenWarning);
            setVerbalWarning(response[0].VerbalWarning);
            setInvestigation(response[0].Investigation);
            setQuery(response[0].Query);
          }
        }),
    ]);
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
    {
      name: "Documents",
      url: `/admin/completed/documentation/${id}`,
      active: true,
    },
    { name: "Summary", url: `/admin/completed/summary/${id}` },
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
          <div className="two_column yellow">Job Summary</div>
          <div className="two_column blue">{jobSummary}</div>
          <div className="two_column yellow">Copies of Credentials</div>
          <div className="two_column blue">{employeeCredentialsUrl}</div>
          <div className="two_column yellow">Passport Photograph</div>
          <div className="two_column blue">{photoUrl}</div>
          <div className="two_column yellow">
            Satisfactory Reference from ex-Employer
          </div>
          <div className="two_column blue">{referenceUrl}</div>
          <div className="two_column yellow">HRIS Biodata Form</div>
          <div className="two_column blue">{hirsUrl}</div>

          <div className="two_column yellow">
            NYSC Discharge/Exemption Certificate
          </div>
          <div className="two_column blue">{nyscUrl}</div>
          <div className="two_column yellow">Line Manager's Sign Off</div>
          <div className="two_column blue">{lmSignoffUrl}</div>
          <div className="two_column yellow">
            HR Business Partner’s Sign- Off included
          </div>
          <div className="two_column blue">{hrbpSignoffUrl}</div>
        </div>
        <h3 style={{ marginTop: "30px" }}>Staff Conduct</h3>
        <div className="two_column_div">
          <div className="two_column yellow">Pending/Ongoing Investigation</div>
          <div className="two_column blue">{investigation}</div>
          <div className="two_column yellow">Query</div>
          <div className="two_column blue">{query}</div>
          <div className="two_column yellow">Documented Verbal Warning</div>
          <div className="two_column blue">{verbalWarning}</div>
          <div className="two_column yellow">First Written Warning</div>
          <div className="two_column blue">{firstWrittenWarning}</div>
          <div className="two_column yellow">Final Written Warning</div>
          <div className="two_column blue">{finalWrittenWarning}</div>
        </div>
      </div>
    </div>
  );
};

export default Report;
