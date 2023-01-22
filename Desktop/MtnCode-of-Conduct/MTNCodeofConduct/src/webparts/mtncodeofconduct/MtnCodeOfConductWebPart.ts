import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "MtnCodeOfConductWebPartStrings";
import MtnCodeOfConduct from "./components/MtnCodeOfConduct";
import { IMtnCodeOfConductProps } from "./components/IMtnCodeOfConductProps";
import { sp } from "@pnp/sp/presets/all";

export interface IMtnCodeOfConductWebPartProps {
  description: string;
}

export default class MtnCodeOfConductWebPart extends BaseClientSideWebPart<IMtnCodeOfConductWebPartProps> {
  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context,
    });
    return Promise.resolve();
  }
  pro;
  public render(): void {
    const element: React.ReactElement<IMtnCodeOfConductProps> =
      React.createElement(MtnCodeOfConduct, {
        description: this.properties.description,
        context: this.context,
        pageContext: this.context.pageContext,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
