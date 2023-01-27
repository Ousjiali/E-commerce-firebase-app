import React from "react";
import { ContentType } from "../../../../../../admin/pages/recognition/EthicsActivity";
import { Box, Typography } from "@material-ui/core";
import "./styles.css";

type Props = {
  EthicsActivitiesTitle: string;
  content: string;
  ActivityType: ContentType;
};

export const ListItem: React.FC<Props> = ({
  content,
  EthicsActivitiesTitle: title,
  ActivityType: type,
}) => {
  const getContentType = () => {
    switch (type) {
      case ContentType.Photo:
        return (
          <div className="contentTypePhoto">
            <img
              src={content}
              width="300px"
              height="250px"
              style={{
                // objectFit: "contain",
                borderRadius: "26px",
                borderBottomColor: "4px solid rgba(243, 226, 103, 0.898)",
              }}
            />
          </div>
        );
      case ContentType.Video:
        return (
          <video
            src={content}
            width="300px"
            height="250px"
            style={{
              objectFit: "cover",
              borderRadius: "26px",
            }}
            controls
            autoPlay={false}
          />
        );
      case ContentType.Write_Up:
        return (
          <Typography
            variant="body2"
            style={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            {content}
          </Typography>
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
      <Typography variant="h6" style={{ fontWeight: "bold", fontSize: "13px" }}>
        {title}
      </Typography>
      {getContentType()}
    </Box>
  );
};
