import * as React from "react";
import "./styles.scss";
import { IMtnconfirmationProps } from "./IMtnconfirmationProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";
import {
  HomeScreen,
  // Section2,
  Section3,
  RequestPage,
  // Section1__Supervisory,
  Section2__Supervisory,
  PendingRequests,
  ViewRequestDetails,
  Dashboard,
  Confirmation,
  Roles,
  Location,
  Division,
  AdminCompleted,
  AdminPending,
  EditConfirmation,
  AdminViewPending,
  AdminViewRating,
  Performance_Section1,
  Performance_Section2,
  Rater_Performance_Section1,
  // Rater_Performance_Section2,
  Rater_behavioral_Section1,
  behavioral_Section1,
  GetSuperVisorySection1,
  GetBehavioralSection2Rating,
  GetBehavioralSection3Rating,
  LineManagerView,
  ConfirmationSummary,
  // EmployeeView,
  GMHRView,
  SMESView,
  // ManagerIndustrialRelationshipView,
  HRAdminView,
  MHRBPView,
  ReviewerView,
  HrAdminstrationPendingPage,
  GmHrOperationsPendingPage,
  Role,
  // RaterBehavioralTraitTwo,
  ViewLineMangerLevel3,
  ViewHrbpLevel3,
  ViewSection2,
  ViewHrLevel3,
  ViewSmeLevel3,
  Level3HHr,
  Level3HSupervisory,
  Level3BelowSummary,
  Level3HsummaryHr,
  Level4summary,
  Chrosummary,
  EditRaterSection2,
  EditBehavioral,
  EditBehavioral2,
  EditBehavioral3,
  Level3EditBehavioral,
  EditSupervisory1,
  EditSupervisory2,
  Department,
  Rater_WelcomePage,
  level3Supervisory,
  level3Summary,
  level3ConfirmationSummary,
  level3HrCloseOut,
  level3HHrCloseOut,
  level4HrCloseOut,
  level2HrCloseOut,
  HrCloseOutTable,
  AdminCompletedView,
  HrViewTable,
  AdminReport,
  AdminCompletedReport,
  AdminCompletedPerformance,
  AdminCompletedSummary,
  AdminCompletedBehavioural,
  AdminCompletedSupervisory,
  AdminCompletedViewDetails,
  AdminCompletedDocumentation,
} from "./screens";
import LineManagerPendingPage from "./screens/ConfirmationForm/PendingRequests/LineManagerPendingPage";
import HrbpPendingPage from "./screens/ConfirmationForm/PendingRequests/HrbpPendingPage";
import SeniorManagerESPendingPage from "./screens/ConfirmationForm/PendingRequests/SeniorManagerESPendingPage";
import "./assets/icon.scss";
import {
  performanceEvaluationContext,
  performanceEvaluationContextType,
} from "../components/Context/performanceContext";
import {
  BehavioralContext,
  BehavioralContextType,
} from "./Context/BehavioralContext";
import {
  SupervisoryEvaluationContext,
  SupervisoryEvaluationContextType,
} from "./Context/SupervisoryContext";
import {
  BehavioralContext1,
  BehavioralContext1Type,
} from "./Context/behavioralContext1";
import { RaterContext, RaterContextType } from "./Context/RaterContext";
import {
  EmployeeContext,
  EmployeeContextType,
} from "./Context/EmployeeContext";
import { RoleContext, RoleContextType } from "./Context/RoleContext";
import { ActorContext, ActorContextType } from "./Context/ActorContext";
// import ReviewerPendingPage from "./screens/ConfirmationForm/PendingRequests/ReviewerPendingPage";
import ChiefHROfficerPendingPage from "./screens/ConfirmationForm/PendingRequests/ChiefHROfficerPendingPage";
import ChiefHROfficer from "./screens/ConfirmationForm/Supervisory/view-ratings/ChiefHROfficer";
import EditRaterSection1 from "./screens/ConfirmationForm/EditRaterComments/performanceFactor/EditRaterSection1";
import RejectedPendingRequest from "./screens/ConfirmationForm/PendingRequests/RejectPendingRequest";
import ViewRejectedDetails from "./screens/ConfirmationForm/ViewRequestDetails/ViewRejectedDetails";
// import EditRaterSection2 from "./screens/ConfirmationForm/EditRaterComments/EditRater1to3/EditRaterSection2";

export default class Mtnconfirmation extends React.Component<
  IMtnconfirmationProps,
  {
    adaptComment: string;
    adaptRating: number;
    setAdaptRating: React.Dispatch<React.SetStateAction<number>>;
    setAdaptComment: React.Dispatch<React.SetStateAction<string>>;
    rater: string;
    raterEmail: string;
    ratingDate: string;
    leadershipRating: number;
    setLeaderShipRating: React.Dispatch<React.SetStateAction<number>>;
    setLeadershipComment: React.Dispatch<React.SetStateAction<string>>;
    leadershipComment: string;
    delegationComment: string;
    delegationRating: number;
    administrationComment: string;
    administrationRating: number;
    setDelegationRating: React.Dispatch<React.SetStateAction<number>>;
    setDelegationComment: React.Dispatch<React.SetStateAction<string>>;
    setAdministrationComment: React.Dispatch<React.SetStateAction<string>>;
    setAdministrationRating: React.Dispatch<React.SetStateAction<number>>;
    planningComment: string;
    planningRating: number;
    setPlanningComment: React.Dispatch<React.SetStateAction<string>>;
    setPlanningRating: React.Dispatch<React.SetStateAction<number>>;
    peopleManagementComment: string;
    peopleManagementRating: number;
    setPeopleManagementComment: React.Dispatch<React.SetStateAction<string>>;
    setPeopleManagementRating: React.Dispatch<React.SetStateAction<number>>;
    supervisoryEvaluationScore: number;
    setSupervisoryEvaluationScore: React.Dispatch<React.SetStateAction<number>>;
    raterFinalComments: string;
    setRaterFinalComments: React.Dispatch<React.SetStateAction<string>>;
    attendanceComment: string;
    setAttendanceComment: React.Dispatch<React.SetStateAction<string>>;
    attendanceRating: number;
    setAttendanceRating: React.Dispatch<React.SetStateAction<number>>;
    punctualityRating: number;
    setPunctualityRating: React.Dispatch<React.SetStateAction<number>>;
    punctualityComment: string;
    setPunctualityComment: React.Dispatch<React.SetStateAction<string>>;
    judgementRating: number;
    setJudgementRating: React.Dispatch<React.SetStateAction<number>>;
    judgementComment: string;
    setJudgementComment: React.Dispatch<React.SetStateAction<string>>;
    behavioralEvaluationScore: number;
    setBehavioralEvaluationScore: React.Dispatch<React.SetStateAction<number>>;
    queryRating: string;
    setQueryRating: React.Dispatch<React.SetStateAction<string>>;
    queryComment: string;
    setQueryComment: React.Dispatch<React.SetStateAction<string>>;
    disciplinaryRating: string;
    setDisciplinaryRating: React.Dispatch<React.SetStateAction<string>>;
    disciplinaryComment: string;
    setDisciplinaryComment: React.Dispatch<React.SetStateAction<string>>;
    knowlegdeRating: number;
    setKnowlegdeRating: React.Dispatch<React.SetStateAction<number>>;
    knowlegdeComment: string;
    setknowlegdeComment: React.Dispatch<React.SetStateAction<string>>;
    workQualityRating: number;
    setWorkQualityRating: React.Dispatch<React.SetStateAction<number>>;
    workQualityComment: string;
    setWorkQualityComment: React.Dispatch<React.SetStateAction<string>>;
    workQuantityRating: number;
    setworkQuantityRating: React.Dispatch<React.SetStateAction<number>>;
    workQuantityComment: string;
    setworkQuantityComment: React.Dispatch<React.SetStateAction<string>>;
    workHabitRating: number;
    setWorkHabitRating: React.Dispatch<React.SetStateAction<number>>;
    workHabitComment: string;
    setWorkHabitComment: React.Dispatch<React.SetStateAction<string>>;
    communicationRating: number;
    setCommunicationRating: React.Dispatch<React.SetStateAction<number>>;
    communicationComment: string;
    setCommunicationComment: React.Dispatch<React.SetStateAction<string>>;
    totalPerformanceScore: number;
    setTotalPerformanceScore: React.Dispatch<React.SetStateAction<number>>;

    dependabilityRating: number;
    setDependabilityRating: React.Dispatch<React.SetStateAction<number>>;
    dependabilityComment: string;
    setDependabilityComment: React.Dispatch<React.SetStateAction<string>>;
    coperationRating: number;
    setCoperationRating: React.Dispatch<React.SetStateAction<number>>;
    coperationComment: string;
    setCoperationComment: React.Dispatch<React.SetStateAction<string>>;
    initiativeRating: number;
    setInitiativeRating: React.Dispatch<React.SetStateAction<number>>;
    initiativeComment: string;
    setInitiativeComment: React.Dispatch<React.SetStateAction<string>>;
    employeeId: string;
    employeeLevel: string;
    setEmployeeLevel: React.Dispatch<React.SetStateAction<string>>;
    setEmployeeId: React.Dispatch<React.SetStateAction<string>>;
    itemId: string;
    setItemId: React.Dispatch<React.SetStateAction<string>>;
    role: string;
    actor: string;
    setActor: React.Dispatch<React.SetStateAction<string>>;
    setRole: React.Dispatch<React.SetStateAction<string>>;
  }
> {
  constructor(props: IMtnconfirmationProps) {
    super(props);
    this.state = {
      adaptComment: "",
      adaptRating: null,
      leadershipRating: null,
      setAdaptRating: this.setAdaptRating,
      setAdaptComment: this.setAdaptComment,
      rater: "",
      raterEmail: "",
      ratingDate: new Date(Date.now()).toLocaleDateString(),
      setLeaderShipRating: this.setLeaderShipRating,
      leadershipComment: "",
      setLeadershipComment: this.setLeadershipComment,
      setAdministrationComment: this.setAdministrationComment,
      delegationRating: null,
      administrationComment: "",
      setDelegationRating: this.setDelegationRating,
      setDelegationComment: this.setDelegationComment,
      setAdministrationRating: this.setAdministrationRating,
      administrationRating: null,
      delegationComment: "",
      planningComment: "",
      planningRating: null,
      setPlanningComment: this.setPlanningComment,
      setPlanningRating: this.setPlanningRating,
      peopleManagementComment: "",
      peopleManagementRating: null,
      setPeopleManagementComment: this.setPeopleManagementComment,
      setPeopleManagementRating: this.setPeopleManagementRating,
      setSupervisoryEvaluationScore: this.setSupervisoryEvaluationScore,
      supervisoryEvaluationScore: 0,
      raterFinalComments: "",
      setRaterFinalComments: this.setRaterFinalComments,
      attendanceComment: "",
      setAttendanceComment: this.setAttendanceComment,
      attendanceRating: null,
      setAttendanceRating: this.setAttendanceRating,
      punctualityRating: null,
      setPunctualityRating: this.setPunctualityRating,
      punctualityComment: "",
      setPunctualityComment: this.setPunctualityComment,
      judgementRating: null,
      setJudgementRating: this.setJudgementRating,
      judgementComment: "",
      setJudgementComment: this.setJudgementComment,
      behavioralEvaluationScore: 0,
      setBehavioralEvaluationScore: this.setBehavioralEvaluationScore,
      queryRating: "",
      queryComment: "",
      setQueryRating: this.setQueryRating,
      setQueryComment: this.setQueryComment,
      disciplinaryRating: "",
      setDisciplinaryRating: this.setDisciplinaryRating,
      disciplinaryComment: "",
      setDisciplinaryComment: this.setDisciplinaryComment,
      knowlegdeRating: null,
      setKnowlegdeRating: this.setKnowlegdeRating,
      knowlegdeComment: "",
      setknowlegdeComment: this.setknowlegdeComment,
      workQualityRating: null,
      setWorkQualityRating: this.setWorkQualityRating,
      workQualityComment: "",
      setWorkQualityComment: this.setWorkQualityComment,
      workHabitRating: null,
      setWorkHabitRating: this.setWorkHabitRating,
      workHabitComment: "",
      setWorkHabitComment: this.setWorkHabitComment,
      communicationRating: null,
      setCommunicationRating: this.setCommunicationRating,
      communicationComment: "",
      setCommunicationComment: this.setCommunicationComment,
      totalPerformanceScore: null,
      setTotalPerformanceScore: this.setTotalPerformanceScore,
      dependabilityRating: null,
      setDependabilityRating: this.setDependabilityRating,
      dependabilityComment: "",
      setDependabilityComment: this.setDependabilityComment,
      coperationRating: null,
      setCoperationRating: this.setCoperationRating,
      coperationComment: "",
      setCoperationComment: this.setCoperationComment,
      initiativeRating: null,
      setInitiativeRating: this.setIntiativeRating,
      initiativeComment: "",
      setInitiativeComment: this.setInitiativeComment,
      employeeId: "",
      setEmployeeId: this.setEmployeeId,
      itemId: "",
      setItemId: this.setItemId,
      employeeLevel: "",
      setEmployeeLevel: this.setEmployeeLevel,
      role: "",
      actor: "",
      setActor: this.setActor,
      setRole: this.setRole,

      workQuantityRating: null,
      setworkQuantityRating: this.setworkQuantityRating,
      workQuantityComment: "",
      setworkQuantityComment: this.setworkQuantityComment,
    };
  }

  setActor = (actor: string): void => {
    this.setState({ actor });
  };
  setRole = (role: string): void => {
    this.setState({ role });
  };
  setItemId = (itemId: string): void => {
    this.setState({ itemId });
  };
  setEmployeeLevel = (employeeLevel: string): void => {
    this.setState({ employeeLevel });
  };
  setEmployeeId = (employeeId: string): void => {
    this.setState({ employeeId });
  };
  setAdaptRating = (adaptRating: number): void => {
    this.setState({ adaptRating });
  };

  setAdaptComment = (adaptComment: string): void => {
    this.setState({ adaptComment });
  };

  setLeaderShipRating = (leadershipRating: number): void => {
    this.setState({ leadershipRating });
  };

  setLeadershipComment = (leadershipComment: string): void => {
    this.setState({ leadershipComment });
  };

  setDelegationComment = (delegationComment: string): void => {
    this.setState({ delegationComment });
  };
  setDelegationRating = (delegationRating: number): void => {
    this.setState({ delegationRating });
  };

  setAdministrationComment = (administrationComment: string): void => {
    this.setState({ administrationComment });
  };

  setAdministrationRating = (administrationRating: number): void => {
    this.setState({ administrationRating });
  };

  setPeopleManagementRating = (peopleManagementRating: number): void => {
    this.setState({ peopleManagementRating });
  };
  setPeopleManagementComment = (peopleManagementComment: string): void => {
    this.setState({ peopleManagementComment });
  };

  setPlanningComment = (planningComment: string): void => {
    this.setState({ planningComment });
  };

  setPlanningRating = (planningRating: number): void => {
    this.setState({ planningRating });
  };
  setSupervisoryEvaluationScore = (
    supervisoryEvaluationScore: number
  ): void => {
    this.setState({ supervisoryEvaluationScore });
  };

  setRaterFinalComments = (raterFinalComments: string): void => {
    this.setState({ raterFinalComments });
  };

  setAttendanceComment = (attendanceComment: string): void => {
    this.setState({ attendanceComment });
  };

  setAttendanceRating = (attendanceRating: number): void => {
    this.setState({ attendanceRating });
  };

  setPunctualityComment = (punctualityComment: string): void => {
    this.setState({ punctualityComment });
  };

  setPunctualityRating = (punctualityRating: number): void => {
    this.setState({ punctualityRating });
  };

  setJudgementComment = (judgementComment: string): void => {
    this.setState({ judgementComment });
  };

  setJudgementRating = (judgementRating: number): void => {
    this.setState({ judgementRating });
  };

  setBehavioralEvaluationScore = (behavioralEvaluationScore: number): void => {
    this.setState({ behavioralEvaluationScore });
  };

  setQueryRating = (queryRating: string): void => {
    this.setState({ queryRating });
  };

  setQueryComment = (queryComment: string): void => {
    this.setState({ queryComment });
  };

  setDisciplinaryRating = (disciplinaryRating: string): void => {
    this.setState({ disciplinaryRating });
  };

  setDisciplinaryComment = (disciplinaryComment: string): void => {
    this.setState({ disciplinaryComment });
  };

  setDependabilityRating = (dependabilityRating: number): void => {
    this.setState({ dependabilityRating });
  };

  setDependabilityComment = (dependabilityComment: string): void => {
    this.setState({ dependabilityComment });
  };

  setCoperationRating = (coperationRating: number): void => {
    this.setState({ coperationRating });
  };

  setIntiativeRating = (initiativeRating: number): void => {
    this.setState({ initiativeRating });
  };

  setInitiativeComment = (initiativeComment: string): void => {
    this.setState({ initiativeComment });
  };

  setCoperationComment = (coperationComment: string): void => {
    this.setState({ coperationComment });
  };

  setKnowlegdeRating = (knowlegdeRating: number): void => {
    this.setState({ knowlegdeRating });
  };

  setknowlegdeComment = (knowlegdeComment: string): void => {
    this.setState({ knowlegdeComment });
  };

  setWorkQualityRating = (workQualityRating: number): void => {
    this.setState({ workQualityRating });
  };

  setWorkQualityComment = (workQualityComment: string): void => {
    this.setState({ workQualityComment });
  };

  setworkQuantityRating = (workQuantityRating: number): void => {
    this.setState({ workQuantityRating });
  };

  setworkQuantityComment = (workQuantityComment: string): void => {
    this.setState({ workQuantityComment });
  };

  setWorkHabitRating = (workHabitRating: number): void => {
    this.setState({ workHabitRating });
  };

  setWorkHabitComment = (workHabitComment: string): void => {
    this.setState({ workHabitComment });
  };

  setCommunicationRating = (communicationRating: number): void => {
    this.setState({ communicationRating });
  };
  setCommunicationComment = (communicationComment: string): void => {
    this.setState({ communicationComment });
  };
  setTotalPerformanceScore = (totalPerformanceScore: number): void => {
    this.setState({ totalPerformanceScore });
  };

  componentDidMount() {
    sp.profiles.myProperties.get().then((res) => {
      this.setState({
        rater: res?.DisplayName,
        raterEmail: res?.Email,
      });
    });
  }

  public render(): React.ReactElement<IMtnconfirmationProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <>
        <HashRouter>
          <ActorContext.Provider
            value={{
              setActor: this.setActor,
              actor: this.state.actor,
            }}
          >
            <RoleContext.Provider
              value={
                {
                  role: this.state.role,
                  setRole: this.setRole,
                } as RoleContextType
              }
            >
              <RaterContext.Provider
                value={
                  {
                    rater: this.state.rater,
                    raterEmail: this.state.raterEmail,
                    date: this.state.ratingDate,
                    setRaterFinalComments: this.setRaterFinalComments,
                    raterFinalComments: this.state.raterFinalComments,
                  } as RaterContextType
                }
              >
                <EmployeeContext.Provider
                  value={
                    {
                      id: this.state.employeeId,
                      setId: this.setEmployeeId,
                      itemId: this.state.itemId,
                      setItemId: this.setItemId,
                      setEmployeeLevel: this.setEmployeeLevel,
                    } as EmployeeContextType
                  }
                >
                  <SupervisoryEvaluationContext.Provider
                    value={
                      {
                        leadershipRating: this.state.leadershipRating,
                        setLeadershipRating: this.state.setLeaderShipRating,
                        leadershipComment: this.state.leadershipComment,
                        setLeadershipComment: this.state.setLeadershipComment,
                        delegationRating: this.state.delegationRating,
                        setDelegationRating: this.state.setDelegationRating,
                        delegationComment: this.state.delegationComment,
                        setDelegationComment: this.state.setDelegationComment,
                        administrationRating: this.state.administrationRating,
                        setAdministrationRating:
                          this.state.setAdministrationRating,
                        administrationComment: this.state.administrationComment,
                        setAdministrationComment:
                          this.state.setAdministrationComment,
                        setSupervisoryEvaluationScore:
                          this.state.setSupervisoryEvaluationScore,
                        supervisoryEvaluationScore:
                          this.state.supervisoryEvaluationScore,
                        planningRating: this.state.planningRating,
                        setPlanningRating: this.state.setPlanningRating,
                        planningComment: this.state.planningComment,
                        setPlanningComment: this.state.setPlanningComment,
                        peopleManagementRating:
                          this.state.peopleManagementRating,
                        setPeopleManagementRating:
                          this.state.setPeopleManagementRating,
                        peopleManagementComment:
                          this.state.peopleManagementComment,
                        setPeopleManagementComment:
                          this.state.setPeopleManagementComment,
                      } as SupervisoryEvaluationContextType
                    }
                  >
                    <BehavioralContext.Provider
                      value={
                        {
                          adaptComment: this.state.adaptComment,
                          adaptRating: this.state.adaptRating,
                          setAdaptRating: this.setAdaptRating,
                          setAdaptComment: this.setAdaptComment,
                          attendanceComment: this.state.attendanceComment,
                          attendanceRating: this.state.attendanceRating,
                          setAttendanceRating: this.setAttendanceRating,
                          setAttendanceComment: this.setAttendanceComment,
                          behavioralEvaluationScore:
                            this.state.behavioralEvaluationScore,
                          setBehavioralEvaluationScore:
                            this.setBehavioralEvaluationScore,
                          judgementComment: this.state.judgementComment,
                          judgementRating: this.state.judgementRating,
                          setJudgementRating: this.setJudgementRating,
                          setJudgementComment: this.setJudgementComment,
                          punctualityComment: this.state.punctualityComment,
                          punctualityRating: this.state.punctualityRating,
                          setPunctualityRating: this.setPunctualityRating,
                          setPunctualityComment: this.setPunctualityComment,
                          queryComment: this.state.queryComment,
                          queryRating: this.state.queryRating,
                          setQueryRating: this.setQueryRating,
                          setQueryComment: this.setQueryComment,
                          disciplinaryComment: this.state.disciplinaryComment,
                          disciplinaryRating: this.state.disciplinaryRating,
                          setDisciplinaryRating: this.setDisciplinaryRating,
                          setDisciplinaryComment: this.setDisciplinaryComment,
                        } as BehavioralContextType
                      }
                    >
                      <performanceEvaluationContext.Provider
                        value={
                          {
                            knowlegdeRating: this.state.knowlegdeRating,
                            setKnowlegdeRating: this.state.setKnowlegdeRating,
                            knowlegdeComment: this.state.knowlegdeComment,
                            setknowlegdeComment: this.state.setknowlegdeComment,
                            workQualityRating: this.state.workQualityRating,
                            setWorkQualityRating:
                              this.state.setWorkQualityRating,
                            workQualityComment: this.state.workQualityComment,
                            setWorkQualityComment:
                              this.state.setWorkQualityComment,
                            workQuantityRating: this.state.workQuantityRating,
                            setworkQuantityRating:
                              this.state.setworkQuantityRating,
                            workQuantityComment: this.state.workQuantityComment,
                            setworkQuantityComment:
                              this.state.setworkQuantityComment,
                            workHabitRating: this.state.workHabitRating,
                            setWorkHabitRating: this.state.setWorkHabitRating,
                            workHabitComment: this.state.workHabitComment,
                            setWorkHabitComment: this.state.setWorkHabitComment,
                            communicationRating: this.state.communicationRating,
                            setCommunicationRating:
                              this.state.setCommunicationRating,
                            communicationComment:
                              this.state.communicationComment,
                            setCommunicationComment:
                              this.state.setCommunicationComment,
                            totalPerformanceScore:
                              this.state.totalPerformanceScore,
                            setTotalPerformanceScore:
                              this.state.setTotalPerformanceScore,
                          } as performanceEvaluationContextType
                        }
                      >
                        <BehavioralContext1.Provider
                          value={
                            {
                              dependabilityRating:
                                this.state.dependabilityRating,
                              setDependabilityRating:
                                this.state.setDependabilityRating,
                              dependabilityComment:
                                this.state.dependabilityComment,
                              setDependabilityComment:
                                this.state.setDependabilityComment,
                              coperationRating: this.state.coperationRating,
                              setCoperationRating:
                                this.state.setCoperationRating,
                              coperationComment: this.state.coperationComment,
                              setCoperationComment:
                                this.state.setCoperationComment,
                              initiativeRating: this.state.initiativeRating,
                              setInitiativeRating:
                                this.state.setInitiativeRating,
                              workQuantityComment:
                                this.state.workQuantityComment,
                              initiativeComment: this.state.initiativeComment,
                              setInitiativeComment:
                                this.state.setInitiativeComment,
                            } as BehavioralContext1Type
                          }
                        >
                          <Switch>
                            <Route path="/" exact component={HomeScreen} />
                            <Route
                              path="/admin/dashboard"
                              exact
                              component={Dashboard}
                            />
                            <Route
                              path="/admin/confirmation"
                              exact
                              render={(props) => (
                                <Confirmation context={this.props.context} />
                              )}
                            />
                            <Route
                              path="/admin/confirmation/edit/:id"
                              exact
                              render={(props) => (
                                <EditConfirmation
                                  context={this.props.context}
                                />
                              )}
                            />
                            <Route
                              path="/admin/config"
                              exact
                              render={(props) => (
                                <Roles context={this.props.context} />
                              )}
                            />
                            <Route path="/admin/roles" exact component={Role} />
                            <Route
                              path="/admin/config/report"
                              exact
                              component={AdminReport}
                            />
                            <Route
                              path="/admin/location"
                              exact
                              component={Location}
                            />
                            <Route
                              path="/admin/division"
                              exact
                              component={Division}
                            />
                            <Route
                              path="/admin/department"
                              exact
                              component={Department}
                            />
                            <Route
                              path="/admin/pending"
                              exact
                              component={AdminPending}
                            />
                            <Route
                              path="/admin/pending/:id"
                              exact
                              component={AdminViewPending}
                            />
                            <Route
                              path="/admin/pending/rating/:id"
                              exact
                              component={AdminViewRating}
                            />
                            <Route
                              path="/admin/completed"
                              exact
                              component={AdminCompleted}
                            />
                            <Route
                              path="/admin/completed/report/:id"
                              exact
                              component={AdminCompletedReport}
                            />
                            <Route
                              path="/admin/completed/documentation/:id"
                              exact
                              component={AdminCompletedDocumentation}
                            />
                            <Route
                              path="/admin/completed/view/:id"
                              exact
                              component={AdminCompletedViewDetails}
                            />
                            <Route
                              path="/admin/completed/performance/:id"
                              exact
                              component={AdminCompletedPerformance}
                            />
                            <Route
                              path="/admin/completed/summary/:id"
                              exact
                              component={AdminCompletedSummary}
                            />
                            <Route
                              path="/admin/completed/supervisory/:id"
                              exact
                              component={AdminCompletedSupervisory}
                            />
                            <Route
                              path="/admin/completed/behavioural/:id"
                              exact
                              component={AdminCompletedBehavioural}
                            />
                            <Route
                              path="/requestpage"
                              exact
                              component={RequestPage}
                            />
                            <Route
                              path="/pendingrequests"
                              exact
                              component={PendingRequests}
                            />
                            <Route
                              path="/viewrequest/details/:id"
                              exact
                              component={ViewRequestDetails}
                            />
                            <Route
                              path="/rater/behavioral/section1"
                              exact
                              component={Rater_behavioral_Section1}
                            />
                            <Route
                              path="/behavioral/section1"
                              exact
                              component={behavioral_Section1}
                            />
                            {/* <Route
                              path="/behavioral/section2"
                              exact
                              component={Section2}
                            /> */}
                            <Route
                              path="/view-behavioral/section2"
                              exact
                              component={GetBehavioralSection2Rating}
                            />
                            <Route
                              path="/behavioral/section3"
                              exact
                              component={Section3}
                            />
                            <Route
                              path="/view-behavioral/section3"
                              exact
                              component={GetBehavioralSection3Rating}
                            />
                            {/* <Route
                              path="/supervisory/section1"
                              exact
                              component={Section1__Supervisory}
                            /> */}
                            <Route
                              path="/view-supervisory/section1"
                              exact
                              component={GetSuperVisorySection1}
                            />
                            <Route
                              path="/view-level-supervisory/section1"
                              exact
                              component={Level3HSupervisory}
                            />
                            <Route
                              path="/supervisory/section2"
                              exact
                              component={Section2__Supervisory}
                            />
                            <Route
                              path="/rater/performance/section1"
                              exact
                              component={Rater_Performance_Section1}
                            />
                            <Route
                              path="/rater/performance/welcomePage"
                              exact
                              component={Rater_WelcomePage}
                            />
                            {/* <Route
                              path="/rater/performance/section2"
                              exact
                              component={Rater_Performance_Section2}
                            /> */}
                            <Route
                              path="/performance/section1"
                              exact
                              component={Performance_Section1}
                            />
                            <Route
                              path="/performance/section2"
                              exact
                              component={Performance_Section2}
                            />
                            <Route
                              path="/view-supervisory/linemanager"
                              exact
                              component={LineManagerView}
                            />
                            <Route
                              path="/view-supervisory/reviewer"
                              exact
                              component={ReviewerView}
                            />
                            <Route
                              path="/view/confirmation-summary"
                              exact
                              render={(props) => (
                                <ConfirmationSummary
                                  context={this.props.pageContext}
                                />
                              )}
                            />
                            {/* <Route
                              path="/view-supervisory/employee"
                              exact
                              component={EmployeeView}
                            /> */}
                            <Route
                              path="/view/hr-closeout"
                              exact
                              component={HrCloseOutTable}
                            />
                            <Route
                              path="/view-supervisory/smes"
                              exact
                              component={SMESView}
                            />
                            <Route
                              path="/view-supervisory/chiefhrofficer"
                              exact
                              component={ChiefHROfficer}
                            />
                            {/* <Route
                              path="/view-supervisory/mir"
                              exact
                              component={ManagerIndustrialRelationshipView}
                            /> */}

                            <Route
                              path="/view-supervisory/hradmin"
                              exact
                              component={HRAdminView}
                            />
                            <Route
                              path="/view-supervisory/mhrbp"
                              exact
                              component={MHRBPView}
                            />
                            <Route
                              path="/view-supervisory/gmhr"
                              exact
                              component={GMHRView}
                            />
                            <Route
                              path="/view-supervisory/level-hr"
                              exact
                              component={Level3HHr}
                            />
                            <Route
                              path="/pending/requests/linemanager"
                              exact
                              component={LineManagerPendingPage}
                            />

                            <Route
                              path="/pending/requests/hrbp"
                              exact
                              component={HrbpPendingPage}
                            />
                            <Route
                              path="/pending/requests/hradministrator"
                              exact
                              component={HrAdminstrationPendingPage}
                            />
                            <Route
                              path="/pending/requests/seniormanageremployeeservices"
                              exact
                              component={SeniorManagerESPendingPage}
                            />
                            <Route
                              path="/pending/requests/gmhroperations"
                              exact
                              component={GmHrOperationsPendingPage}
                            />
                            <Route
                              path="/pending/requests/supervisory/level2"
                              exact
                              component={level3Supervisory}
                            />
                            {/* <Route
                              path="/rater/behavioral/section3"
                              exact
                              component={RaterBehavioralTraitTwo}
                            /> */}
                            <Route
                              path="/view/behavioral/section3/linemanager"
                              exact
                              component={ViewLineMangerLevel3}
                            />
                            <Route
                              path="/view/behavioral/section3/hrbp"
                              exact
                              component={ViewHrbpLevel3}
                            />
                            <Route
                              path="/pending/requests/chiefhrofficer"
                              exact
                              component={ChiefHROfficerPendingPage}
                            />
                            <Route
                              path="/view/behavioral/section3/hr"
                              exact
                              component={ViewHrLevel3}
                            />
                            <Route
                              path="/view/behavioral/section3/smes"
                              exact
                              component={ViewSmeLevel3}
                            />
                            <Route
                              path="/view/behavioral/section2Level3"
                              exact
                              component={ViewSection2}
                            />
                            <Route
                              path="/level/summary"
                              exact
                              render={(props) => (
                                <Level3BelowSummary
                                  context={this.props.pageContext}
                                />
                              )}
                            />
                            <Route
                              path="/level3h/summary"
                              exact
                              render={(props) => (
                                <Level3HsummaryHr
                                  context={this.props.pageContext}
                                />
                              )}
                            />
                            <Route
                              path="/level4/summary"
                              exact
                              render={(props) => (
                                <Level4summary
                                  context={this.props.pageContext}
                                />
                              )}
                            />
                            <Route
                              path="/level/chroSummary"
                              exact
                              render={(props) => (
                                <Chrosummary context={this.props.pageContext} />
                              )}
                            />
                            <Route
                              path="/edit/rater/comments"
                              exact
                              component={EditRaterSection1}
                            />
                            <Route
                              path="/edit/rater/comments/section2"
                              exact
                              component={EditRaterSection2}
                            />
                            <Route
                              path="/rejected/pending/requests"
                              exact
                              component={RejectedPendingRequest}
                            />
                            <Route
                              path="/viewrejected/pending/requests/:id"
                              exact
                              component={ViewRejectedDetails}
                            />
                            <Route
                              path="/edit/rater/behavioral/section1"
                              exact
                              component={EditBehavioral}
                            />
                            <Route
                              path="/edit/rater/behavioral/section2"
                              exact
                              component={EditBehavioral2}
                            />
                            <Route
                              path="/edit/rater/behavioral/section3"
                              exact
                              component={EditBehavioral3}
                            />
                            <Route
                              path="/level3confirmation"
                              exact
                              component={level3Summary}
                            />
                            <Route
                              path="/level3confirmationsummary"
                              exact
                              component={level3ConfirmationSummary}
                            />
                            <Route
                              path="/edit/rater/level3behavioral/section3"
                              exact
                              component={Level3EditBehavioral}
                            />
                            <Route
                              path="/edit/rater/supervisory/section1"
                              exact
                              component={EditSupervisory1}
                            />
                            <Route
                              path="/edit/rater/supervisory/section2"
                              exact
                              component={EditSupervisory2}
                            />
                            <Route
                              path="/level2/hr-closeout"
                              exact
                              component={level2HrCloseOut}
                            />
                            <Route
                              path="/level3/hr-closeout"
                              exact
                              component={level3HrCloseOut}
                            />
                            <Route
                              path="/level3h/hr-closeout"
                              exact
                              component={level3HHrCloseOut}
                            />
                            <Route
                              path="/level4/hr-closeout"
                              exact
                              component={level4HrCloseOut}
                            />
                            <Route
                              path="/admin/completed/view/:id"
                              exact
                              component={AdminCompletedView}
                            />
                            <Route
                              path="/hr/view"
                              exact
                              component={HrViewTable}
                            />
                          </Switch>
                        </BehavioralContext1.Provider>
                      </performanceEvaluationContext.Provider>
                    </BehavioralContext.Provider>
                  </SupervisoryEvaluationContext.Provider>
                </EmployeeContext.Provider>
              </RaterContext.Provider>
            </RoleContext.Provider>
          </ActorContext.Provider>
        </HashRouter>
      </>
    );
  }
}
