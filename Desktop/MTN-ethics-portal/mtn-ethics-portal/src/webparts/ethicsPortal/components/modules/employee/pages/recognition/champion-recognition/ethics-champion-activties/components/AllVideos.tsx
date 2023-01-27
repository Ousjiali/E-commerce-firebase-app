import { Box, Typography } from "@material-ui/core";
import React from "react";
import { ContentType } from "../../../../../../admin/pages/recognition/EthicsActivity";

type Props = {
  EthicsActivitiesTitle: string;
  content: string;
  ActivityType: ContentType;
};

export const AllVideos: React.FC<Props> = ({
  content,
  EthicsActivitiesTitle: title,
  ActivityType: type,
}) => {
  const getAllVideos = () => {
    switch (type) {
      case ContentType.Video:
        return (
          <div className="contentTypePhoto">
            <div style={{ marginBottom: "20px" }}>{title}</div>
            <video
              src={content}
              width="300px"
              height="250px"
              style={{
                // objectFit: "contain",
                borderRadius: "26px",
                borderBottomColor: "4px solid rgba(243, 226, 103, 0.898)",
              }}
              controls
              autoPlay={false}
            />
          </div>
        );
    }
  };

  return (
    <Box
      style={{
        borderBottom: "1px solid #e6e6e6",
        boxSizing: "border-box",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      {getAllVideos()}
    </Box>
  );
};
