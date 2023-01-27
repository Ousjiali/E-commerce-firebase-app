import { Box, Typography } from "@material-ui/core";
import * as React from "react";
import { FaFilePdf, FaFilePowerpoint, FaImage, FaVideo } from "react-icons/fa";
import { TrainingType } from "../../../admin/pages/training/types/TrainingTypes";
import styled from "styled-components";

type Props = {
  onClick: () => void;
  resource: TrainingType;
};

export const IconStyle: React.CSSProperties = {
  position: "absolute",
  width: "3rem",
  height: "3rem",
  objectFit: "cover",
  top: "40%",
  left: "10%",
  color: "#FFCC00",
};

export const ResourcePreview: React.FC<Props> = ({ onClick, resource }) => {
  return (
    <ResourcePreviewContainer
      onClick={() => {
        onClick();
      }}
      style={{ cursor: "pointer" }}
      width="auto"
    >
      <ResourceThumbnailContainer bg={resource?.ThumbNail}>
        {/video\/mp4+/i.test(resource?.FileType) ? (
          <FaVideo style={IconStyle} className="ppt" />
        ) : /application\/pdf+/i.test(resource?.FileType) ? (
          <FaFilePdf style={IconStyle} className="ppt" />
        ) : /application\/vnd.openxmlformats-officedocument.presentationml.presentation+/i.test(
            resource?.FileType
          ) ? (
          <img
            style={IconStyle}
            className="ppt"
            src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/Shared%20Documents/pptx-logo.png"
          />
        ) : (
          <></>
        )}
      </ResourceThumbnailContainer>
      <Typography
        variant="body2"
        style={{
          width: "100%",
          height: "25%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {resource?.TrainingTitle}
      </Typography>
    </ResourcePreviewContainer>
  );
};

const ResourceThumbnailContainer = styled.div<{ bg: string }>(({ bg }) => ({
  backgroundImage: `linear-gradient(95.9deg, rgba(0, 0, 0, 0.2) 36.21%, rgba(0, 0, 0, 0) 54.68%),url('${bg}')`,
  width: "100%",
  height: "75%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: "inherit",
  position: "relative",
}));
const ResourcePreviewContainer = styled.div<{ bg?: string }>(({ bg }) => ({
  width: "350px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#fff",
  alignItems: "center",
  boxShadow: "3px 3px 4px #FFCC00",

  "&:hover": {
    backgroundColor: "#FFCC00",
    transition: "backgroundColor,transform .2s ease-in-out",
  },
  "&:hover > div > .ppt": {
    zIndex: "99",
    transform: "scale(2)",
  },
  "&:hover + *": {
    zIndex: "99",
  },
}));

const Image = styled.img``;
