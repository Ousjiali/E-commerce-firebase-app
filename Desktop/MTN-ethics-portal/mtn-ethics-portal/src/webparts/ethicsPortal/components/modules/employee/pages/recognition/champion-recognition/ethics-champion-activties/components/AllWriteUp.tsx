import { Box, Typography } from "@material-ui/core";
import React from "react";
import { ContentType } from "../../../../../../admin/pages/recognition/EthicsActivity";

type Props = {
  EthicsActivitiesTitle: string;
  content: string;
  ActivityType: ContentType;
};

export const AllWriteUp: React.FC<Props> = ({
  content,
  EthicsActivitiesTitle: title,
  ActivityType: type,
}) => {
  const getAllWriteUp = () => {
    switch (type) {
      case ContentType.Write_Up:
        return (
          <div className="contentTypePhoto">
            <div style={{ marginBottom: "20px" }}>{title}</div>
            <Typography
              variant="body2"
              style={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {content}
            </Typography>
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
      {getAllWriteUp()}
    </Box>
  );
};
