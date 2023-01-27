import { Box, Typography } from "@material-ui/core";
import * as React from "react";

type Props = {};

export const WelcomeVideo = (props: Props) => {
  return (
    <div>
      <Box>
        <Typography>Onboarding Video</Typography>
        <Box
          m="0 auto"
          width="100%"
          height="100%"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video
            src="https://lotusbetaanalytics.sharepoint.com/sites/lban-Onboarding-Portal/assets/video.mp4"
            controls
            width="80%"
            height="350"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};
