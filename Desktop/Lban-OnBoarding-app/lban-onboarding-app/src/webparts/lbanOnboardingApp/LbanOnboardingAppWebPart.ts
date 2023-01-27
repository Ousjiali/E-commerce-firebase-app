import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'LbanOnboardingAppWebPartStrings';
import LbanOnboardingApp from './components/LbanOnboardingApp';
import { ILbanOnboardingAppProps } from './components/ILbanOnboardingAppProps';

export interface ILbanOnboardingAppWebPartProps {
  description: string;
}

export default class LbanOnboardingAppWebPart extends BaseClientSideWebPart<ILbanOnboardingAppWebPartProps> {

  public onInit(): Promise<void> { 
  
    sp.setup({
      spfxContext: this.context
    });
    return Promise.resolve(); 
  }

  // protected onInit(): Promise<void> {
  //   this._environmentMessage = this._getEnvironmentMessage();

  //   return super.onInit();
  // }
  pro
  public render(): void {
    const element: React.ReactElement<ILbanOnboardingAppProps> = React.createElement(
      LbanOnboardingApp,
      {
        description: this.properties.description,
        context: this.context,  
        pageContext: this.context.pageContext
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
