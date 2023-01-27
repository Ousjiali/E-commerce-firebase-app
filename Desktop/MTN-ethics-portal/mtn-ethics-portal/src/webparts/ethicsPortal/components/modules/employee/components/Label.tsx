import { Box, Typography } from "@material-ui/core";
import React from "react";

type Props = {
  header: string;
  content: string;
};

export const Label: React.FC<Props> = ({ header, content }) => {
  return (
    <Box
      display="grid"
      style={{ gap: ".2rem", gridTemplateColumns: ".5fr 1fr" }}
      width="100%"
      color="#000"
    >
      <Typography
        variant="body2"
        style={{ fontWeight: "bold", fontSize: "12px", marginLeft: "15px" }}
      >
        {header}:
      </Typography>
      {(() => {
        if (content?.length < 251) {
          return (
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              {content}
            </Typography>
          );
        }
        return (
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", fontSize: "13px" }}
          >
            {content?.substring(0, 250)}...
          </Typography>
        );
      })()}
    </Box>
  );
};
