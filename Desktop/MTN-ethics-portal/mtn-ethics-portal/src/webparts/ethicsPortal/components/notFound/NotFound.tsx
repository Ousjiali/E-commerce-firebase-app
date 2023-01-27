import { Box, Button, Typography } from "@material-ui/core";
import * as React from "react";
import { useHistory } from "react-router-dom";

export const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <Box
        style={{
          backgroundSize: "contain",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "0.5rem",
        }}
      >
        <Box
          style={{
            background: "#fff",
            boxShadow: "#00000029 0px 3px 6px",
            width: "40%",
            height: "80%",
            margin: "10%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid #ccc",
              mb: "1",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              style={{
                margin: ".7rem 3rem",
                marginBottom: 0,
                fontWeight: "500",
              }}
            >
              404
            </Typography>
          </Box>
          <Box
            style={{
              background: "#fff",
              padding: ".7rem 3rem",
            }}
          >
            <Typography variant="h6">Ooops!, Page Not Found </Typography>

            <Button
              style={{ marginBottom: "0.5rem" }}
              onClick={() => history.push("/")}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
