import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import {
  CreateAdminQuizContextData,
  CreateAdminQuizContextProvider,
} from "./context/AdminQuizContext";
import { getStepContent } from "./utils/utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100vh",
    },
  })
);

export const CreateQuizPage = () => {
  const classes = useStyles();
  const {
    activeStep,
    steps,
    isStepOptional,
    isStepSkipped,
    handleReset,
    handleBack,
    handleSkip,
    handleNext,
    getStepContent,
    submitHandler,
    loading,
    isUpdating,
    updateHandler,
    quiz,
  } = CreateAdminQuizContextData();
  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: { optional?: React.ReactNode } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div></div>
            ) : (
              <div style={{ position: "relative", minHeight: "95vh" }}>
                <Box height="80%" my={2} width="100%">
                  {getStepContent(activeStep)}
                </Box>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="contained"
                    color="secondary"
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      isUpdating ? updateHandler(quiz?.ID) : submitHandler();
                    }}
                    style={{ margin: "0 10px" }}
                  >
                    Save for later
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    onClick={() => {
                      if (activeStep === steps.length - 1) {
                        isUpdating ? updateHandler(quiz?.ID) : submitHandler();
                      } else {
                        handleNext();
                      }
                    }}
                  >
                    {activeStep === steps.length - 1
                      ? loading
                        ? "loading.."
                        : "Done"
                      : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      </Container>
    </AdminWrapper>
  );
};
