import { Box } from "@material-ui/core";
import * as React from "react";
import { useFormContextData } from "../../../../Context";
import { BankDetails } from "./bankDetails";
import { BioData } from "./BioData";
import { Confidentiality } from "./confidentiality";
import { EmergencyContact } from "./emergencyContact";
import { Guarantor } from "./guarantor";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { AppWrapper } from "../../../../Container/AppWrapper";
import { Menu } from "../../../../Container/AppNavigation";

export const ProfilePage = () => {
  const pages = [
    <BioData />,
    <BankDetails />,
    <EmergencyContact />,
    <Confidentiality />,
    <Guarantor />,
  ];
  const { page } = useFormContextData();
  const pageLabels = [
    "Bio Data",
    "Bank Details",
    "Emergency Contact",
    "Confidentiality",
    "Guarantor",
  ];

  function getStepContent() {
    switch (page) {
      case 0:
        return "Bio Data";
      case 1:
        return "Bank Details";
      case 2:
        return "Emergency Contact";
      case 3:
        return "Confidentiality";
      case 4:
        return "Guarantor";
      default:
        return "Bio Data";
    }
  }

  return (
    <Box>
      <AppWrapper menu={menu} showBackButton={true}>
        <Stepper activeStep={page}>
          {pageLabels.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box>{pages[page]}</Box>
      </AppWrapper>
    </Box>
  );
};
const menu: Menu[] = [
  { title: "Profile Update", link: "/employee/profile" },
  { title: "Training", link: "/employee/training" },
];
