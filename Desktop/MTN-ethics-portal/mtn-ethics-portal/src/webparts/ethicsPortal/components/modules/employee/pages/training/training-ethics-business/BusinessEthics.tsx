import { Box } from "@material-ui/core";
import * as React from "react";
import { TrainingCategoryEnum } from "../../../../admin/pages/training/enums/TrainingCategoryEnum";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageWrapper } from "../../../../shared/components/app-wrapper/employee/PageWrapper";
import { PageHeaderWithImage } from "../../../../shared/components/PageHeaderWithImage";
import { ResourcesDisplayComponent } from "../../../components/resources/ResourcesDisplayComponent";
import "./styles.css";

export const BusinessEthics = () => {
  return (
    <PageWrapper>
      <Box>
        <ResourcesDisplayComponent
          backgroundImage="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-training.png"
          pageTitle="Business Ethics Everyone's Responsibilities Videos"
          filter={TrainingCategoryEnum.Business_Ethics}
        />
      </Box>
    </PageWrapper>
  );
};
