import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { sp } from "@pnp/sp/presets/all";
import * as strings from 'MtnvotingWebPartStrings';
import Mtnvoting from './components/Mtnvoting';
import { IMtnvotingProps } from './components/IMtnvotingProps';

export interface IMtnvotingWebPartProps {
  description: string;
}

export default class MtnvotingWebPart extends BaseClientSideWebPart<IMtnvotingWebPartProps> {
  public onInit(): Promise<void> { 
  
    sp.setup({
      spfxContext: this.context
    });
    return Promise.resolve(); 
  }
  protected get isRenderAsync(): boolean {
    return true;
  }
  
  protected renderCompleted(): void {
    super.renderCompleted();
  }
  public render(): void {
    const element: React.ReactElement<IMtnvotingProps> = React.createElement(
      Mtnvoting,
      {
        description: this.properties.description,
        context: this.context,  
        pageContext: this.context.pageContext
      }
    );

    ReactDom.render(element, this.domElement);
        // async rendering completed
        this.renderCompleted();
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
