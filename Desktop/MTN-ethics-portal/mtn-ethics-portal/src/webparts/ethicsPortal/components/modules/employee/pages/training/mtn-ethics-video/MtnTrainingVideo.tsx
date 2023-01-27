import { Box } from "@material-ui/core";
import * as React from "react";
import { TrainingCategoryEnum } from "../../../../admin/pages/training/enums/TrainingCategoryEnum";
import { PageWrapper } from "../../../../shared/components/app-wrapper/employee/PageWrapper";
import { ResourcesDisplayComponent } from "../../../components/resources/ResourcesDisplayComponent";
import "./styles.css";

export const MtnTrainingVideo = () => {
  return (
    <PageWrapper>
      <Box>
        <ResourcesDisplayComponent
          backgroundImage="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-training.png"
          pageTitle="MTN Ethics Training Video"
          filter={TrainingCategoryEnum.Mtn_Ethics}
        />
      </Box>
    </PageWrapper>
  );
};

{
  /* <PageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-training.png"
          text="Training"
        />
        <div className="titleH3">
          <h3>MTN Ethics Training Video</h3>
        </div> */
}
