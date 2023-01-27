import { sp } from "@pnp/sp";
import jsPDF from "jspdf";
import * as React from "react";
import { BehavioralContext1 } from "../../../Context/behavioralContext1";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { useHistory } from "react-router-dom";
import { BehavioralContext } from "../../../Context/BehavioralContext";
import { MenuBar } from "../../../Containers";

const Report = () => {
  const history = useHistory();
  const { id } = React.useContext(EmployeeContext);

  const [loading, setLoading] = React.useState(false);
  const {
    dependabilityRating,
    setDependabilityRating,
    dependabilityComment,
    setDependabilityComment,
    coperationRating,
    setCoperationRating,
    coperationComment,
    setCoperationComment,
    initiativeRating,
    setInitiativeRating,
    initiativeComment,
    setInitiativeComment,
  } = React.useContext(BehavioralContext1);

  const {
    adaptComment,
    setAdaptComment,
    adaptRating,
    setAdaptRating,
    judgementRating,
    setJudgementRating,
    judgementComment,
    setJudgementComment,
    attendanceRating,
    setAttendanceRating,
    attendanceComment,
    setAttendanceComment,
    punctualityRating,
    setPunctualityRating,
    punctualityComment,
    setPunctualityComment,
    queryComment,
    setQueryComment,
    queryRating: queryResponse,
    setQueryRating: setQueryResponse,
    behavioralEvaluationScore: performanceScore,
    setBehavioralEvaluationScore: setPerformanceScore,
  } = React.useContext(BehavioralContext);

  React.useEffect(() => {
    if (!id) {
      history.push("/admin/completed");
      return;
    }

    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((response) => {
        setLoading(false);
        if (response.length > 0) {
          setDependabilityRating(response[0].Dependability);
          setDependabilityComment(response[0].DependabilityComment);
          setCoperationComment(response[0].CooperationComment);
          setCoperationRating(response[0].Co_x002d_operation);
          setInitiativeRating(response[0].Initiative);
          setInitiativeComment(response[0].InitiativeComment);
          setPunctualityRating(response[0].Punctuality);
          setPunctualityComment(response[0].PuctualityComment);
          setQueryResponse(response[0].QueryRating);
          setQueryComment(response[0].DisciplinaryAndQueryComment);
          setPerformanceScore(response[0].Total);
          setAdaptRating(response[0].Adaptability);
          setAdaptComment(response[0].AdaptComment);
          setJudgementRating(response[0].Judgement);
          setJudgementComment(response[0].JudgementComment);
          setAttendanceRating(response[0].Attendance);
          setAttendanceComment(response[0].AttendanceComment);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);
  const pdfRef: any = React.createRef();

  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF("p", "mm", [210, 297]);
    doc.html(content, {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
      html2canvas: {
        scale: 0.18,
      },
    });
  };

  const reportHandler = () => {
    history.push(`/admin/completed`);
  };

  const menu = [
    { name: "Employee Data", url: `/admin/completed/report/${id}` },
    { name: "Performance", url: `/admin/completed/performance/${id}` },
    {
      name: "Behavioural",
      url: `/admin/completed/behavioural/${id}`,
      active: true,
    },
    { name: "Supervisory", url: `/admin/completed/supervisory/${id}` },
    { name: "Documents", url: `/admin/completed/documentation/${id}` },
    { name: "Summary", url: `/admin/completed/summary/${id}` },
  ];

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
          <h4>
            PERSONAL INFORMATION, PERFORMANCE FACTORS, BEHAVIOURAL TRAITS,
            SUPERVISORY FACTORS, CONFIRMATION SUMMARY APPROVAL & COMMENTS
          </h4>
        </div>

        <div className="three_column_div ">
          <div className="two_column header_blue">
            PART III: BEHAVIOURAL TRAITS
          </div>
          <div className="two_column header_blue">RATINGS</div>
          <div className="two_column header_blue">COMMENTS</div>

          <div className="two_column yellow">
            <h3>Dependability</h3>
            <ul>
              <li>Consider the amount of time spent directing this employee</li>
              <li>
                Does the employee monitor projects and exercise follow-through
              </li>
              <li>Adhere to time frame</li>
              <li>Is on time for meetings and appointments and</li>
            </ul>
          </div>
          <div className="two_column blue">{dependabilityRating}</div>
          <div className="two_column blue">{dependabilityComment}</div>

          {/* <div className="two_column yellow">
            <h3>Quality of Work</h3>
            <ul>
              <li>Does the employee’s assignments meet quality standards?</li>
              <li>
                Consider accuracy neatness, thoroughness and adherence to
                standards and safety.
              </li>
              <li>Responds appropriately to instructions and procedures.</li>
            </ul>
          </div>
          <div className="two_column blue">{}</div>
          <div className="two_column blue">testing</div> */}

          <div className="two_column yellow">
            <h3>Co-Operation</h3>
            <ul>
              <li>
                How well does the employee with co- workers and supervisors as a
                contributing member
              </li>
              <li>
                Does the employee demonstrate consideration for others maintain
                rapport with others help others willingly.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{coperationRating}</div>
          <div className="two_column blue">{coperationComment}</div>

          <div className="two_column yellow">
            <h3>Initiative</h3>
            <ul>
              <li>
                Consider how well the employee seeks and assumes greater
                responsibility monitors projects independently, and follows
                through appropriately.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{initiativeRating}</div>
          <div className="two_column blue">{initiativeComment}</div>

          <div className="two_column yellow">
            <h3>Adaptability</h3>
            <ul>
              <li>
                Consider the ease with which the employee adjusts to any change
                in duties, procedures, supervisors, or the work environment
              </li>

              <li>
                How well does the employee accept new ideas and approaches to
                work, responds appropriately to constructive criticisms and
                suggestions for work improvement?
              </li>
            </ul>
          </div>
          <div className="two_column blue">{adaptRating}</div>
          <div className="two_column blue">{adaptComment}</div>

          <div className="two_column yellow">
            <h3>Judgement</h3>
            <ul>
              <li>
                Consider how well the employee effectively analyses problems,
                determines the appropriate course of action, suggests solutions
                and exhibits timely and decisive action
              </li>
              <li>Thinks logically.</li>
            </ul>
          </div>
          <div className="two_column blue">{judgementRating}</div>
          <div className="two_column blue">{judgementComment}</div>

          <div className="two_column yellow">
            <h3>Attendance</h3>
            <ul>
              <li>
                Consider number of absences, use of annual and sick leave in
                accordance with MTN policy.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{attendanceRating}</div>
          <div className="two_column blue">{attendanceComment}</div>

          <div className="two_column yellow">
            <h3>Punctuality</h3>
            <ul>
              <li>
                Consider work arrivals and departure in accordance with
                Departmental and MTN policy.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{punctualityRating}</div>
          <div className="two_column blue">{punctualityComment}</div>

          <div className="two_column header_blue">
            Total Behavioural Traits Score
          </div>
          <div className="two_column header_blue">{performanceScore}</div>
          <div className="two_column header_blue"></div>
        </div>
      </div>
    </div>
  );
};

export default Report;
