import { Box } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { locations } from "../../../admin/pages/gallery/forms/GalleryForm";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageHeaderWithImage } from "../../../shared/components/PageHeaderWithImage";
import { PreviewContainer } from "../../components/blog/PostPreviewItem";
import { GalleryContainer } from "./styles";

export const VideoCategories = () => {
  const history = useHistory();
  return (
    <EmployeeWrapper>
      <Box width="90%" m="0 auto">
        <PageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/photopage.png"
          text="Video Categories"
        />
      </Box>

      <GalleryContainer>
        {locations?.map((item) => (
          <Box
            onClick={() => history.push(`/gallery/video?location=${item}`)}
            height="300px"
            style={{ cursor: "pointer" }}
          >
            <PreviewContainer bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mon%202.png">
              {item}
            </PreviewContainer>
          </Box>
        ))}
      </GalleryContainer>
    </EmployeeWrapper>
  );
};
