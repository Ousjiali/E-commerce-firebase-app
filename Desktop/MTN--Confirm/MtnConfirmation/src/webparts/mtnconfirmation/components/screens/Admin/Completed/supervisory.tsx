import { sp } from "@pnp/sp";
import jsPDF from "jspdf";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { MenuBar } from "../../../Containers";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { SupervisoryEvaluationContext } from "../../../Context/SupervisoryContext";

const Report = () => {
  const history = useHistory();
  const {
    leadershipRating,
    administrationRating,
    delegationRating,
    peopleManagementComment,
    setPeopleManagementComment,
    peopleManagementRating,
    setPeopleManagementRating,
    planningComment,
    setPlanningComment,
    planningRating,
    setPlanningRating,
    delegationComment,
    leadershipComment,
    administrationComment,
    setSupervisoryEvaluationScore: setSupervisorScore,
    supervisoryEvaluationScore: supervisorScore,
    setLeadershipRating,
    setAdministrationComment,
    setDelegationComment,
    setLeadershipComment,
    setAdministrationRating,
    setDelegationRating,
  } = React.useContext(SupervisoryEvaluationContext);
  const { id, itemId } = React.useContext(EmployeeContext);
  React.useEffect(() => {
    if (!id) {
      return history.push("/admin/completed");
    }

    sp.web.lists
      .getByTitle("SupervisoryEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          setLeadershipRating(response[0].LeadershipRating);
          setLeadershipComment(response[0].LeadershipComment);
          setDelegationRating(response[0].DelegationRating);
          setDelegationComment(response[0].DelegationComment);
          setAdministrationRating(response[0].AdministrationRating);
          setAdministrationComment(response[0].AdministrationComment);
          setSupervisorScore(response[0].TotalRatingScore);
          setPeopleManagementRating(response[0].PeopleManagementRating);
          setPeopleManagementComment(response[0].PeopleManagementComment);
          setPlanningComment(response[0].PlanningComment);
          setPlanningRating(response[0].PlanningRating);
        }
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
        scale: 0.197,
      },
    });
  };

  const nextHandler = () => {
    history.push(`/admin/completed/summary/${id}`);
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
      active: true,
    },
    { name: "Documents", url: `/admin/completed/documentation/${id}` },
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

        <div className="three_column_div ">
          <div className="two_column header_blue">
            PART IV: SUPERVISORY FACTORS
          </div>
          <div className="two_column header_blue">RATINGS</div>
          <div className="two_column header_blue">COMMENTS</div>

          <div className="two_column yellow">
            <h3>Leadership</h3>
            <ul>
              <li>
                Consider how well the employee demonstrates effective
                supervisory abilities
              </li>
              <li>Gains respect and co-operates with others</li>
              <li>Inspires and motivates subordinates</li>
              <li>Directs the work towards a common goal.</li>
            </ul>
          </div>
          <div className="two_column blue">{leadershipRating}</div>
          <div className="two_column blue">{leadershipComment}</div>

          <div className="two_column yellow">
            <h3>Delegation</h3>
            <ul>
              <li>
                How well does the employee demonstrate the ability to direct
                others in accomplishing work effectively select and motivate
                staff define assignments oversee the work of the subordinates.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{delegationRating}</div>
          <div className="two_column blue">{delegationComment}</div>

          <div className="two_column yellow">
            <h3>Planning and Organising</h3>
            <ul>
              <li>Consider how well the employee plans his/her work</li>
              <li>
                Coordinates with others and establishes appropriate priorities
              </li>
              <li>Anticipates future needs</li>
              <li>Carries out assignments effectively.</li>
            </ul>
          </div>
          <div className="two_column blue">{planningRating}</div>
          <div className="two_column blue">{planningComment}</div>

          <div className="two_column yellow">
            <h3>Administration</h3>
            <ul>
              <li>
                How well does the employee perform day to day administrative
                tasks
              </li>
              <li>Manage time</li>
              <li>Administer policies and implement procedures</li>
              <li>
                Maintain appropriate contact with his/her supervisor and utilize
                funds, staff or equipment?
              </li>
            </ul>
          </div>
          <div className="two_column blue">{administrationRating}</div>
          <div className="two_column blue">{administrationComment}</div>

          <div className="two_column yellow">
            <h3>People Management</h3>
            <ul>
              <li>Consider how well the employee serves as a role model</li>

              <li>
                Provides guidance and opportunities to staff for their
                development and advancement
              </li>
              <li>
                Resolves work related employee problems ▪ Assists subordinates
                in accomplishing their work related objectives
              </li>
              <li>
                Does the employee communicate well with subordinates in a clear
                concise, accurate and timely manner and make useful suggestions
              </li>
            </ul>
          </div>
          <div className="two_column blue">{peopleManagementRating}</div>
          <div className="two_column blue">{peopleManagementComment}</div>

          <div className="two_column header_blue">
            Total Score For Supervisory Staff
          </div>
          <div className="two_column header_blue">{supervisorScore}</div>
          <div className="two_column header_blue"></div>

          {/* <div className="two_column header_blue">
            
          </div>
          <div className="two_column header_blue">score</div>
          <div className="two_column header_blue">score</div> */}
        </div>
      </div>
    </div>
  );
};

export default Report;
