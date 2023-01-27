import { Box, Typography } from "@material-ui/core";
import React from "react";
import { ContentType } from "../../../../../../admin/pages/recognition/EthicsActivity";

type Props = {
  EthicsActivitiesTitle: string;
  content: string;
  ActivityType: ContentType;
};

export const AllPhotos: React.FC<Props> = ({
  content,
  EthicsActivitiesTitle: title,
  ActivityType: type,
}) => {
  const [titleName, setTitleName] = React.useState("title");
  const getAllPhotos = () => {
    switch (type) {
      case ContentType.Photo:
        return (
          <div className="contentTypePhoto">
            <div style={{ marginBottom: "20px" }}>{title}</div>
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
      {/* <Typography variant="h6" style={{ fontWeight: "bold", fontSize: "13px" }}>
        {title}
      </Typography> */}
      {getAllPhotos()}
    </Box>
  );
};
