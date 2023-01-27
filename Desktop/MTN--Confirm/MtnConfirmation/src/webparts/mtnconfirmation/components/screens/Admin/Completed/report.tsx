import jsPDF from "jspdf";
import * as React from "react";
import { sp } from "@pnp/sp";
import { useHistory, Link } from "react-router-dom";
import { ActorContext } from "../../../Context/ActorContext";
import { EmployeeContext } from "../../../Context/EmployeeContext";
import { MenuBar } from "../../../Containers";
import { BehavioralContext } from "../../../Context/BehavioralContext";
import { BehavioralContext1 } from "../../../Context/behavioralContext1";
import { performanceEvaluationContext } from "../../../Context/performanceContext";
import { SupervisoryEvaluationContext } from "../../../Context/SupervisoryContext";
import { RaterContext } from "../../../Context/RaterContext";

const Report = ({ match }) => {
  let itemID = match.params.id;

  const [loading, setLoading] = React.useState(false);
  const [id, setId] = React.useState("");
  const [employee_Name, setEmployee_Name] = React.useState("");
  const [employee_Id, setEmployee_Id] = React.useState("");
  const [form_No, setForm_No] = React.useState("");
  const [job_Title, setJob_Title] = React.useState("");
  const [staff_Level, setStaff_Level] = React.useState("");
  const { setEmployeeLevel } = React.useContext(EmployeeContext);
  const [division, setDivision] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [rater, setRater] = React.useState("");
  const [employmentDate, setEmployeeDate] = React.useState("");
  const [confirmationDate, setConfirmationDate] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [report, setReport] = React.useState("");
  const { setId: setEmployeeId, setItemId } = React.useContext(EmployeeContext);
  const { setActor, actor } = React.useContext(ActorContext);

  const [employeeCredentialsUrl, setEmployeeCredentialsUrl] =
    React.useState("");

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
  const { itemId } = React.useContext(EmployeeContext);
  const [CHROName, setCHROName] = React.useState("");
  const [CHRODate, setCHRODate] = React.useState("");
  const [GMHRName, setGMHRName] = React.useState("");
  const [GMHRDate, setGMHRDate] = React.useState("");
  const [referenceUrl, setReferenceUrl] = React.useState("");
  const [gmhrcomment, setGmHRComment] = React.useState("");
  const [jobSummary, setJobSummary] = React.useState("");
  const [photoUrl, setPhotoUrl] = React.useState("");
  const [hirsUrl, setHirsUrl] = React.useState("");
  const [nyscUrl, setNyscUrl] = React.useState("");
  const [hrbpSignoffUrl, setHrbpSignoffUrl] = React.useState("");
  const [lmSignoffUrl, setLmSignoffUrl] = React.useState("");
  const [SMEName, setSMEName] = React.useState("");
  const [SMEDate, setSMEDate] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [firstWrittenWarning, setFirstWrittenWarning] = React.useState("");
  const [finalWrittenWarning, setFinalWrittenWarning] = React.useState("");
  const [investigation, setInvestigation] = React.useState("");
  const [verbalWarning, setVerbalWarning] = React.useState("");
  const [sMESComment, setSMESComment] = React.useState("");
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
    sp.web.lists
      .getByTitle(`Confirmation`)
      .items.filter(
        `EmployeeID
      eq '${itemID}'`
      )
      .get()
      .then((res) => {
        setId(res[0].ID);

        setConfirmationStatus(res[0].ConfirmationStatusByScore);
        setDevelopmentalRequiremnt(res[0].raterDevelopmentalComment);
        setRaterEmail(res[0].RaterEmail);
        setRaterName(res[0].RaterEmail);
        setActor(res[0].Approvals);
        setEmployee_Name(res[0].EmployeeName);
        setEmployee_Id(res[0].EmployeeID);
        setEmployeeId(res[0].EmployeeID);
        setForm_No(res[0].FormNo);
        setJob_Title(res[0].JobTitle);
        setStaff_Level(res[0].Level);
        setEmployeeLevel(res[0].Level);
        setDivision(res[0].Division);
        setDepartment(res[0].Department);
        setPhone(res[0].Phone);
        setLocation(res[0].Location);
        setRater(res[0].Rater);
        setEmployeeDate(res[0].EmploymentDate);
        setConfirmationDate(res[0].ConfirmationDate);
        setStartDate(res[0].StartDate);
        setEndDate(res[0].EndDate);
        setReport(res[0].DirectReport);
        setLoading(false);
      });

    sp.web.lists
      .getByTitle("BehavioralTraitsEvaluation")
      .items.filter(`EmployeeID eq '${itemID}'`)
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
      });
    sp.web.lists
      .getByTitle("PerformanceFactorEvaluation")
      .items.filter(`EmployeeID eq '${itemID}'`)
      .get()
      .then((res) => {
        setLoading(false);
        if (res.length > 0) {
          setRaterDate(res[0].RatingDate);
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
      });

    sp.web.lists
      .getByTitle("SupervisoryEvaluation")
      .items.filter(`EmployeeID eq '${itemID}'`)
      .get()
      .then((response) => {
        if (response.length > 0) {
          setRaterFinalComments(response[0].RaterFinalComment);

          setRaterEmail(response[0].raterEmail);

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

    sp.web.lists
      .getByTitle("EvaluationComments")
      .items.filter(`EmployeeID eq '${itemID}'`)
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
          setLineManagerComment(response[0].RaterLineManagerComment);
          setMhrbpComment(response[0].HRBPComment);

          setGmHRComment(response[0].GMHRComment);
          setGMHRDate(response[0].GMHRDate);
          setGMHRName(response[0].GMHRName);
          setReviewerDate(response[0].LineManagerDate);
          setReviewerName(response[0].LineManagerName);
          setHRBPDate(response[0].HRBPDate);
          setHRBPName(response[0].HRBPName);
          setChiefHrOfficerComment(response[0].ChiefHROfficerComment);
          setCHRODate(response[0].CHRODate);
          setCHROName(response[0].CHROName);
          setSMESComment(response[0].SMESComment);
          setSMEDate(response[0].SMEDate);
          setSMEName(response[0].SMEName);
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
        doc.save(`${employee_Name}.pdf`);
      },
      html2canvas: {
        scale: 0.2,
      },
    });
  };
  const menu = [
    {
      name: "Employee Data",
      url: `/admin/completed/report/${id}`,
      active: true,
    },
    { name: "Performance", url: `/admin/completed/performance/${id}` },
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
      <div className="mtn__btnContaainer" style={{ marginLeft: "10px" }}>
        <button
          className="mtn__btns mtn__black"
          type="button"
          onClick={reportHandler}
        >
          Back
        </button>

        <button
          className="mtn__btns mtn__blue"
          type="button"
          onClick={handleDownload}
        >
          Download Report
        </button>
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
        <div className="two_column_div" style={{ marginBottom: "4rem" }}>
          <div className="two_column yellow">Employee Name</div>
          <div className="two_column blue">{employee_Name}</div>
          <div className="two_column yellow">Employee Id</div>
          <div className="two_column blue">{employee_Id}</div>
          <div className="two_column yellow">Form no</div>
          <div className="two_column blue">{form_No}</div>
          <div className="two_column yellow">Job Title</div>
          <div className="two_column blue">{job_Title}</div>
          <div className="two_column yellow">Staff Level</div>
          <div className="two_column blue">{staff_Level}</div>
          <div className="two_column yellow">Division</div>
          <div className="two_column blue">{division}</div>
          <div className="two_column yellow">Department</div>
          <div className="two_column blue">{department}</div>
          <div className="two_column yellow">Employee Phone No.</div>
          <div className="two_column blue">{phone}</div>
          <div className="two_column yellow">Location</div>
          <div className="two_column blue">{location}</div>

          <div className="two_column yellow">Employment Date</div>
          <div className="two_column blue">{employmentDate}</div>
          <div className="two_column yellow">Confirmation Due Date</div>
          <div className="two_column blue">{confirmationDate}</div>
          <div className="two_column yellow">Period supervised</div>
          <div className="two_column blue">
            Start Date:{startDate} - End Date: {endDate}
          </div>
          <div className="two_column yellow">
            Does the employee have direct report?
          </div>
          <div className="two_column blue">{report}</div>
        </div>

        {/* // Performance Factor */}
        <div className="three_column_div" style={{ marginTop: "7rem" }}>
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
        {/* behavioral */}
        <div className="three_column_div" style={{ marginTop: "7rem" }}>
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
        {/* supervisory */}
        <div className="three_column_div" style={{ marginTop: "7rem" }}>
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
        <h3 style={{ marginTop: "7rem" }}>Job Summary</h3>
        <div className="two_column_div">
          <div className="two_column yellow">
            JOB RESPONSIBILITIES (SUMMARY)
          </div>
          <div className="two_column blue">{jobSummary}</div>
        </div>

        <h3>Documentation</h3>

        <div className="two_column_div">
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

        <div className="two_column_div">
          <div className="two_column yellow">Developmental Requirements</div>
          <div className="two_column blue">{developmentalRequirement}</div>
        </div>
        <div className="five_column_div">
          <div className="two_column yellow">ACTOR</div>
          <div className="two_column yellow">DESG</div>
          <div className="two_column yellow">COMMENT</div>
          <div className="two_column yellow">DATE/TIME</div>
          <div className="two_column yellow">RECOMMENDATIONS</div>

          <div className="two_column yellow">
            {raterName.substring(0, raterName.length - 8)}
          </div>
          <div className="two_column yellow">Rater</div>
          <div className="two_column yellow">{raterFinalComments}</div>

          <div className="two_column yellow">{raterDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          <div className="two_column yellow">
            {reviewerName.substring(0, reviewerName.length - 8)}
          </div>
          <div className="two_column yellow">Reviewer</div>
          <div className="two_column yellow">{lineManagerComment}</div>
          <div className="two_column yellow">{reviewerDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          <div className="two_column yellow">
            {HRBPName.substring(0, HRBPName.length - 8)}
          </div>
          <div className="two_column yellow">HRBP</div>
          <div className="two_column yellow">{mhrbpComment}</div>
          <div className="two_column yellow">{HRBPDate}</div>
          <div className="two_column yellow">{confirmationStatus}</div>

          {staff_Level === "Level 3H" ? (
            <>
              {" "}
              <div className="two_column yellow">
                {GMHRName.substring(0, GMHRName.length - 8)}
              </div>
              <div className="two_column yellow">GMHRO</div>
              <div className="two_column yellow">{gmhrcomment}</div>
              <div className="two_column yellow">{GMHRDate}</div>
              <div className="two_column yellow">{confirmationStatus}</div>
            </>
          ) : staff_Level === "Level 4" ||
            staff_Level === "Level 5" ||
            staff_Level === "Level 6" ? (
            <>
              <div className="two_column yellow">
                {CHROName.substring(0, CHROName.length - 8)}
              </div>
              <div className="two_column yellow">CHRO</div>
              <div className="two_column yellow">{chiefHrOfficerComment}</div>
              <div className="two_column yellow">{CHRODate}</div>
              <div className="two_column yellow">{confirmationStatus}</div>
            </>
          ) : (
            <>
              {" "}
              <div className="two_column yellow">
                {SMEName.substring(0, SMEName.length - 8)}
              </div>
              <div className="two_column yellow">SM,ES</div>
              <div className="two_column yellow">{sMESComment}</div>
              <div className="two_column yellow">{SMEDate}</div>
              <div className="two_column yellow">{confirmationStatus}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
