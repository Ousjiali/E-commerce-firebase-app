import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(6),
      backgroundColor: theme.palette.common.black,
      width: "100%",
      height: "200px",
      color: theme.palette.common.white,
      boxSizing: "border-box",
      borderRadius: "26px 26px 0 0",
      margin: "0 auto",
    },
    footerLogoSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${theme.palette.primary.main}`,
      paddingBottom: theme.spacing(2),
      boxSizing: "border-box",
    },
    footerIconsContainer: {
      display: "flex",
      flexDirection: "column",
      gap: theme.spacing(2),
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
    },
  })
);

export const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.paper}>
      <Box className={classes.footerLogoSection}>
        <Typography variant="body2">
          “Tip-Offs Anonymous, with the following information:
        </Typography>
        <img
          src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-logo.png"
          alt=""
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        my={4}
      >
        <Box className={classes.footerIconsContainer}>
          <img
            src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/web-icon.png"
            alt=""
          />
          <Typography variant="body2">www.tip-offs.deloitte.com.ng</Typography>
        </Box>
        <Box className={classes.footerIconsContainer}>
          <img
            src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mail-icon.png"
            alt=""
          />
          <Typography variant="body2">mtntoa@deloitte.com.ng</Typography>
        </Box>
        <Box className={classes.footerIconsContainer}>
          <img
            src="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/whitsle-icon.png"
            alt=""
          />
          <Typography variant="body2"> 0800-862862862</Typography>
        </Box>
      </Box>
    </Box>
  );
};
