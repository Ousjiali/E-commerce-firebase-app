import { Typography } from "@material-ui/core";
import * as React from "react";
import { LandingTopContainer, TopContainer } from "../../../styles/styles";
import { theme } from "../../../themes/themes";

type Props = {
  text: string;
  bg: string;
};

export const LandingPageHeaderWithImage: React.FC<Props> = ({ bg, text }) => {
  return (
    <LandingTopContainer bg={bg}>
      <Typography
        variant="h1"
        style={{
          color: theme.palette.common.white,
          fontStyle: "italic",
          boxSizing: "border-box",
          paddingRight: "20px",
          fontWeight: "bold",
        }}
      >
        {text}
      </Typography>
    </LandingTopContainer>
  );
};
