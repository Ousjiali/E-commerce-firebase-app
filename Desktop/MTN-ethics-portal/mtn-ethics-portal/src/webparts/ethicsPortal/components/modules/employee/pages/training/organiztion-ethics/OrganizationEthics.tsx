import { Box } from "@material-ui/core";
import * as React from "react";
import { TrainingCategoryEnum } from "../../../../admin/pages/training/enums/TrainingCategoryEnum";
import { PageWrapper } from "../../../../shared/components/app-wrapper/employee/PageWrapper";
import { ResourcesDisplayComponent } from "../../../components/resources/ResourcesDisplayComponent";
import "./styles.css";

export const OrganizationEthics = () => {
  return (
    <PageWrapper>
      <Box>
        <ResourcesDisplayComponent
          backgroundImage="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-training.png"
          pageTitle="Organization Ethics Video"
          filter={TrainingCategoryEnum.Organisation_Ethics}
        />
      </Box>
    </PageWrapper>
  );
};
