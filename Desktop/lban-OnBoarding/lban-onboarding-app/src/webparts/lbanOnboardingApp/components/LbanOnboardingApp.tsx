import * as React from "react";
import { ILbanOnboardingAppProps } from "./ILbanOnboardingAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import "./global.scss";
import * as jQuery from "jquery";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ToastProvider } from "react-toast-notifications";
import { NotFound } from "./Screens/notFound/NotFound";
import { EmployeeTrainingPage } from "./Screens/employee/training/pages/EmployeeTrainingPage";
import { HomeScreen } from "./Screens/HomeScreen";
import { TakeCoursePage } from "./Screens/employee/training/pages/TakeCoursePage";

import { BioData } from "./Screens/employee/Profile/Pages/BioData";
import { TrainerPage } from "./Screens/trainer/pages/TrainerPage";
import { ViewPendingRequest } from "./Screens/headOfDepartment/ViewPendingRequest";
import HRViewRequest from "./Screens/Hr/RequestTable";
import { HRBankDetails } from "./Screens/Hr/Pages/bankDetails";
import { HRBioData } from "./Screens/Hr/Pages/bioData";
import { HRConfidentiality } from "./Screens/Hr/Pages/confidentiality";
import { HREmergencyContact } from "./Screens/Hr/Pages/emergencyContact";
import { HRGuarantor } from "./Screens/Hr/Pages/guarantor";
import { HeadOfDepartment } from "./Screens/headOfDepartment/HeadOfDepartment";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AssignedStaffList } from "./Screens/trainer/pages/AssignedStaffList";
import { AssignedTrainings } from "./Screens/trainer/pages/AssignedTrainings";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./themes/themes";
import { ManageRolesPage } from "./Screens/roles-configuration/pages/ManageRolesPage";
import { sp } from "@pnp/sp";
import { Roles } from "./Screens/roles-configuration/types/Configuration";
import { UseFormContextProvider } from "./Context";
import { ProfilePage } from "./Screens/employee/Profile/Pages/ProfilePage";
import HRApprovedTable from "./Screens/Hr/HrApproveTable";
import { HRViewApprovedStaff } from "./Screens/Hr/Pages/viewApproved";
import { AppSettings } from "./Screens/Hr/settings/AppSettings";

export default class LbanOnboardingApp extends React.Component<
  ILbanOnboardingAppProps,
  {
    isHr: boolean;
    isHod: boolean;
    isTrainer: boolean;
  }
> {
  constructor(props: ILbanOnboardingAppProps) {
    super(props);
    this.state = {
      isHr: false,
      isHod: false,
      isTrainer: false,
    };
  }
  componentDidMount(): void {
    (async () => {
      try {
        const email = await sp.utility.getCurrentUserEmailAddresses();

        const findHr = await sp.web.lists
          .getByTitle("Roles")
          .items.filter(`Email eq '${email}' and role eq '${Roles.Hr}'`)
          .get();
        const findHod = await sp.web.lists
          .getByTitle("Roles")
          .items.filter(
            `Email eq '${email}' and role eq '${Roles.Department_Manager}'`
          )
          .get();
        const findTrainer = await sp.web.lists
          .getByTitle("Roles")
          .items.filter(`Email eq '${email}' and role eq '${Roles.Trainer}'`)
          .get();

        this.setState({
          isHr: findHr?.length > 0,
          isHod: findHod?.length > 0,
          isTrainer: findTrainer?.length > 0,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  public render(): React.ReactElement<ILbanOnboardingAppProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    const queryClient = new QueryClient();
    const { isHod, isHr, isTrainer } = this.state;
    return (
      <ToastProvider>
        <WebContext.Provider
          value={{
            context: this.props.context,
            role: {
              isHod,
              isHr,
              isTrainer,
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
              <UseFormContextProvider>
                <HashRouter>
                  <Switch>
                    <Route
                      path="/"
                      exact
                      render={() => (
                        <HomeScreen
                          isHod={isHod}
                          isHr={isHr}
                          isTrainer={isTrainer}
                        />
                      )}
                    />
                    <Route
                      path="/employee/profile"
                      exact
                      component={ProfilePage}
                    />

                    <Route
                      path="/employee/training"
                      exact
                      component={EmployeeTrainingPage}
                    />

                    <Route
                      path="/employee/:courseId/training"
                      exact
                      component={TakeCoursePage}
                    />
                    <Route
                      path="/trainings"
                      exact
                      component={AssignedTrainings}
                    />
                    <Route
                      path="/trainer"
                      exact
                      render={() => (
                        <TrainerPage context={this.props.context} />
                      )}
                    />
                    <Route
                      path="/trainer-list"
                      exact
                      render={() => <AssignedStaffList />}
                    />

                    <Route
                      path="/employee/HOD/viewpendingrequest/:id"
                      exact
                      component={ViewPendingRequest}
                    />

                    <Route
                      path="/assign/trainer/hod"
                      exact
                      component={HeadOfDepartment}
                    />

                    <Route
                      path="/hr/viewrequest"
                      exact
                      component={HRViewRequest}
                    />
                    <Route
                      path="/hr/approved"
                      exact
                      component={HRApprovedTable}
                    />
                    <Route
                      path="/hr/approved-staff/:id"
                      exact
                      component={HRViewApprovedStaff}
                    />
                    <Route
                      path="/hr/profile-bankdetails/:id"
                      exact
                      component={HRBankDetails}
                    />
                    <Route
                      path="/hr/profile-biodata/:id"
                      exact
                      component={HRBioData}
                    />
                    <Route
                      path="/hr/profile-confidentiality/:id"
                      exact
                      component={HRConfidentiality}
                    />
                    <Route
                      path="/hr/profile-emergency/:id"
                      exact
                      component={HREmergencyContact}
                    />
                    <Route
                      path="/hr/profile-guarantor/:id"
                      exact
                      component={HRGuarantor}
                    />
                    <Route path="/hr/request" exact component={HRViewRequest} />
                    <Route path="/app-setting" exact component={AppSettings} />
                    <Route
                      path="/manage-roles"
                      exact
                      component={ManageRolesPage}
                    />

                    <Route path="*" component={NotFound} />
                  </Switch>
                </HashRouter>
              </UseFormContextProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </WebContext.Provider>
      </ToastProvider>
    );
  }
}

export const WebContext = React.createContext<{
  context: WebPartContext;
  role: any;
}>(null);
