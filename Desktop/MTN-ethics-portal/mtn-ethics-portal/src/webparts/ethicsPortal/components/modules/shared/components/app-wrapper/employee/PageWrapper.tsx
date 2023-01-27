import { Box } from "@material-ui/core";
import * as React from "react";

export const PageWrapper = ({ children }) => {
  return (
    <Box
      width="90%"
      m="0 auto"
      display="flex"
      flexDirection="column"
      style={{
        gap: "1rem",
        position: "relative",
        top: "10%",
      }}
    >
      {children}
    </Box>
  );
};
