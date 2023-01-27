import * as React from "react";
import { ILbanOnboardingAppProps } from "./ILbanOnboardingAppProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Route, Switch, HashRouter } from "react-router-dom";
import { sp } from "@pnp/sp";
import * as jQuery from "jquery";
import { HomeScreen } from "./Screens";
import "./LbanOnboardingApp.module.scss";

export default class LbanOnboardingApp extends React.Component<
  ILbanOnboardingAppProps,
  {}
> {
  public render(): React.ReactElement<ILbanOnboardingAppProps> {
    jQuery("#workbenchPageContent").prop("style", "max-width: none");
    jQuery(".SPCanvas-canvas").prop("style", "max-width: none");
    jQuery(".CanvasZone").prop("style", "max-width: none");

    return (
      <>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}
