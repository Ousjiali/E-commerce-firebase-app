import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { AppWrapper } from "../../../Container/AppWrapper";
import { HRMenu } from "../hr-menu";
import { WelcomeVideoUploadPage } from "./employee-welcome/WelcomeVideoUploadPage";

type Props = {};

export const AppSettings = (props: Props) => {
  const [tab, setTab] = React.useState<"welcome" | "resources">("resources");
  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      <Box>
        <Paper square>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, v) => {
              setTab(v);
            }}
          >
            <Tab
              label="Welcome Video"
              value="welcome"
              style={{ textTransform: "none", fontSize: "1.09rem" }}
            />
            <Tab
              label="Others"
              value="resources"
              style={{ textTransform: "none", fontSize: "1.09rem" }}
            />
          </Tabs>
        </Paper>
      </Box>
      {(() => {
        if (tab === "welcome") {
          return <WelcomeVideoUploadPage />;
        }
        return <></>;
      })()}
    </AppWrapper>
  );
};
