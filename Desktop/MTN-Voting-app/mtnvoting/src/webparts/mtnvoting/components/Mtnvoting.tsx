import * as React from "react";
import { IMtnvotingProps } from "./IMtnvotingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import * as jQuery from "jquery";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import * as pnp from "sp-pnp-js";
import {
  AdminApproved,
  AdminDashboard,
  AdminDeclined,
  AdminPending,
  AdminViewApproved,
  AdminViewPending,
  AdminRevoked,
  Administrator,
  ErrorScreen,
  AdminViewDeclined,
  AdminConfig,
  LandingPage,
  EmployeeRegistration,
  CandidateDashboard,
  CandidateRegister,
  CandidateEdit,
  CandidateViewRequest,
  AdminRegion,
  AdminLocation,
  AdminReason,
  AdminReport,
  AdminViewRevoked,
  AdminResult,
  Voting,
  Aspirant,
} from "./screens";
import "./global.scss";
import "./assets/icon.scss";

import {
  SPHttpClient,
  SPHttpClientConfiguration,
  SPHttpClientResponse,
} from "@microsoft/sp-http";
import Guideline from "./screens/Admin/Guideline";

export default class Mtnvoting extends React.Component<IMtnvotingProps, {}> {
  public render(): React.ReactElement<IMtnvotingProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");
    this.props.context.spHttpClient
      .get(
        `https://mtncloud.sharepoint.com/sites/MTNNigeriaComplianceUniverse/testenv/_api/lists/GetByTitle('CURRENT HCM STAFF LIST')/items?$skiptoken=Paged=TRUE`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          // console.log(responseJSON);
        });
      });

    return (
      <Context.Provider
        value={{
          spHttpClient: this.props.context.spHttpClient,
        }}
      >
        <HashRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route
              path="/registration"
              exact
              component={EmployeeRegistration}
            />
            <Route
              path="/vote"
              exact
              render={() => <Voting pageContext={this.props.pageContext} />}
            />
            <Route path="/admin" exact component={AdminDashboard} />
            <Route
              path="/admin/add"
              exact
              render={(props) => <Administrator context={this.props.context} />}
            />
            <Route path="/admin/reports" exact component={AdminReport} />
            <Route path="/admin/reports/:title" exact component={AdminResult} />
            <Route path="/admin/reason" exact component={AdminReason} />
            <Route path="/admin/region" exact component={AdminRegion} />
            <Route path="/admin/location" exact component={AdminLocation} />
            <Route path="/admin/aspirant" exact component={Aspirant} />
            <Route path="/admin/pending" exact component={AdminPending} />
            <Route
              path="/admin/pending/:id"
              exact
              render={(props) => (
                <AdminViewPending context={this.props.context} />
              )}
            />
            <Route path="/admin/approved" exact component={AdminApproved} />
            <Route
              path="/admin/approved/:id"
              exact
              render={(props) => (
                <AdminViewApproved context={this.props.context} />
              )}
            />
            <Route path="/admin/declined" exact component={AdminDeclined} />
            <Route
              path="/admin/declined/:id"
              exact
              component={AdminViewDeclined}
            />
            <Route path="/admin/revoked" exact component={AdminRevoked} />
            <Route
              path="/admin/revoked/:id"
              exact
              component={AdminViewRevoked}
            />
            <Route path="/admin/guideline" exact component={Guideline} />
            <Route path="/admin/config" exact component={AdminConfig} />
            <Route path="/candidate" exact component={CandidateDashboard} />
            <Route
              path="/candidate/register"
              exact
              render={(props) => (
                <CandidateRegister context={this.props.pageContext} />
              )}
            />
            <Route
              path="/candidate/edit"
              exact
              render={(props) => (
                <CandidateEdit context={this.props.pageContext} />
              )}
            />
            <Route
              path="/candidate/view"
              exact
              component={CandidateViewRequest}
            />
            <Route component={ErrorScreen} />
          </Switch>
        </HashRouter>
      </Context.Provider>
    );
  }
}

export const Context = React.createContext({
  spHttpClient: null,
});
