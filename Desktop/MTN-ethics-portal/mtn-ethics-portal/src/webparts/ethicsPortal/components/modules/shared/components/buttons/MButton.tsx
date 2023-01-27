import { Button, styled } from "@material-ui/core";
import * as React from "react";
import { theme } from "../../../../themes/themes";

export const MButton: React.FC<{
  text: string;
  startIcon?: any;
  endIcon?: any;
  loading?: boolean;
}> = ({ text, startIcon, loading, endIcon }) => {
  return (
    <StyledButton
      variant="contained"
      color="primary"
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {text}
    </StyledButton>
  );
};

export const StyledButton = styled(Button)({
  borderRadius: "100px",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
});
