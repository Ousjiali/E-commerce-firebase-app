import jsPDF from "jspdf";
import * as React from "react";
import { sp } from "@pnp/sp";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { useHistory } from "react-router-dom";
import { performanceEvaluationContext } from "../../../Context/performanceContext";
import { MenuBar } from "../../../Containers";
const Report = ({ match }) => {
  const history = useHistory();
  const { id } = React.useContext(EmployeeContext);
  const [loading, setLoading] = React.useState(false);
  const {
    knowlegdeRating,
    setKnowlegdeRating,
    knowlegdeComment,
    setknowlegdeComment,
    workQualityRating,
    setWorkQualityRating,
    workQualityComment,
    setWorkQualityComment,
    workQuantityRating,
    setworkQuantityRating,
    workQuantityComment,
    setworkQuantityComment,
    workHabitRating,
    setWorkHabitRating,
    workHabitComment,
    setWorkHabitComment,
    communicationRating,
    setCommunicationRating,
    communicationComment,
    setCommunicationComment,
    totalPerformanceScore,
    setTotalPerformanceScore,
  } = React.useContext(performanceEvaluationContext);

  React.useEffect(() => {
    if (!id) {
      history.push("/admin/completed");
      return;
    }

    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${id}'`)
      .get()
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setKnowlegdeRating(res[0].KnowlegdeRating);
          setknowlegdeComment(res[0].KnowlegdeComment);
          setWorkQualityRating(res[0].WorkQualityRating);
          setWorkQualityComment(res[0].WorkQualityComment);
          setworkQuantityRating(res[0].WorkQuantityRating);
          setworkQuantityComment(res[0].WorkQuantityComment);
          setWorkHabitRating(res[0].WorkHabitRating);
          setWorkHabitComment(res[0].WorkHabitComment);
          setCommunicationRating(res[0].CommunicatonRating);
          setCommunicationComment(res[0].CommunicationComment);
          setTotalPerformanceScore(res[0].TotalPerformanceScore);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const nextHandler = () => {
    history.push(`/admin/completed/behavioural/${id}`);
  };

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
    {
      name: "Performance",
      url: `/admin/completed/performance/${id}`,
      active: true,
    },
    {
      name: "Behavioural",
      url: `/admin/completed/behavioural/${id}`,
    },
    { name: "Supervisory", url: `/admin/completed/supervisory/${id}` },
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
            RECOMMENDATION PART II: PERFORMANCE FACTORS
          </div>
          <div className="two_column header_blue">RATINGS</div>
          <div className="two_column header_blue">COMMENTS</div>

          <div className="two_column yellow">
            <h3>knowlegde, skill and ability</h3>
            <ul>
              <li>
                Consider the degree to which the employee exhibits the required
                level of job knowledge skills to perform the job and the use of
                established techniques, materials and equipment as they relate
                to performance.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{knowlegdeRating}</div>
          <div className="two_column blue">{knowlegdeComment}</div>

          <div className="two_column yellow">
            <h3>Quality of Work</h3>
            <ul>
              <li>Does the employee’s assignments meet quality standards?</li>
              <li>
                Consider accuracy neatness, thoroughness and adherence to
                standards and safety.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{workQualityRating}</div>
          <div className="two_column blue">{workQualityComment}</div>

          <div className="two_column yellow">
            <h3>Quantity of Work</h3>
            <ul>
              <li>Consider the result of the employee’s effort</li>
              <li>
                Does the employee demonstrate the ability to
                <ul>
                  <li>Manage several responsibilities simultaneously?</li>
                  <li>Perform work in a productive & timely manner?</li>
                  <li>Meet work schedule.</li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="two_column blue">{workQuantityRating}</div>
          <div className="two_column blue">{workQuantityComment}</div>

          <div className="two_column yellow">
            <h3>Work Habits</h3>
            <ul>
              <li>
                To what extent does the employee display a positive, cooperative
                attitude towards work assignments and requirements?
              </li>

              <li>
                Consider compliance with established work rules and
                organisational policies.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{workHabitRating}</div>
          <div className="two_column blue">{workHabitComment}</div>

          <div className="two_column yellow">
            <h3>Communication</h3>
            <ul>
              <li>Consider job related effectiveness in dealing with others</li>

              <li>
                Does the employee express ideas clearly both orally and in
                writing, listen well and respond appropriately.
              </li>
            </ul>
          </div>
          <div className="two_column blue">{communicationRating}</div>
          <div className="two_column blue">{communicationComment}</div>

          <div className="two_column header_blue">Total Performance Score</div>
          <div className="two_column header_blue">{totalPerformanceScore}</div>
          <div className="two_column header_blue"></div>
        </div>
      </div>
    </div>
  );
};

export default Report;
