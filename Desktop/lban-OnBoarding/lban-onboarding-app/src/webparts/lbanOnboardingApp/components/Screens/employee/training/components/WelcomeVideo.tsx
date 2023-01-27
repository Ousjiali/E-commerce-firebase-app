import { Box, Typography } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";

export const WelcomeVideo = () => {
  const [video, setVideo] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await sp.web.lists.getByTitle("WelcomeVideo").items.get();
        if (res?.length) {
          setVideo(res[0]?.Video);
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <Typography>Please Wait...</Typography>;
  }

  return (
    <div>
      <Box>
        <Typography variant="h6">Onboarding Video</Typography>
        <Box
          m="1rem auto"
          width="100%"
          height="100%"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <video
            src={
              video ||
              "https://lotusbetaanalytics.sharepoint.com/sites/lban-Onboarding-Portal/assets/video.mp4"
            }
            controls
            width="100%"
            height="350"
            style={{
              objectFit: "cover",
              borderRadius: "20px",
            }}
          />
        </Box>
      </Box>
    </div>
  );
};
