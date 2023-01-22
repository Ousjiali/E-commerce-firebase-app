import * as React from "react";
import "./styles.scss";
import { IMtnCodeOfConductProps } from "./IMtnCodeOfConductProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";
import {
  AdminDashboard,
  HomeScreen,
  ReportLog,
  ViewDivisionDetails,
} from "./screens";
import EmployeeRegisterForm from "./screens/EmployeeRegisterForm";
import AdminRegistrationForm from "./screens/AdminRegistrationForm";
import CompalianceStatus from "./screens/ComplianceStatus";
import Roles from "./screens/Config";
import Role from "./screens/Config/Role";
import AdminLocation from "./screens/Config/AdminLocation";
import Division from "./screens/Config/Division";
import ViewDivisionIDs from "./screens/ViewDivisionIDs";

// import EditRaterSection2 from "./screens/ConfirmationForm/EditRaterComments/EditRater1to3/EditRaterSection2";

export default class MtnCodeOfConduct extends React.Component<
  IMtnCodeOfConductProps,
  {}
> {
  public render(): React.ReactElement<IMtnCodeOfConductProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route
              path="/register/pledge"
              exact
              render={(props) => (
                <EmployeeRegisterForm context={this.props.context} />
              )}
            />
            <Route
              path="/admin/pledge/dashboard"
              exact
              component={AdminDashboard}
            />
            <Route
              path="/admin/conduct/pledge"
              exact
              render={(props) => (
                <AdminRegistrationForm context={this.props.context} />
              )}
            />
            <Route
              path="/admin/compliance/status"
              exact
              component={CompalianceStatus}
            />
            <Route
              path="/admin/config/roles/add"
              exact
              render={(props) => <Roles context={this.props.context} />}
            />
            <Route path="/admin/config/roles" exact component={Role} />
            <Route
              path="/admin/config/location"
              exact
              component={AdminLocation}
            />
            <Route path="/admin/config/division" exact component={Division} />
            <Route path="/admin/report/log" exact component={ReportLog} />
            <Route
              path="/admin/viewdivisions/:id"
              exact
              component={ViewDivisionDetails}
            />
            <Route
              path="/admin/viewdivisions/list/:id"
              exact
              component={ViewDivisionIDs}
            />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
