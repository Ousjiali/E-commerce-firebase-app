import * as React from "react";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import "./styles.css";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../../../../../utils/toast-messages";
import { LandingPageHeaderWithImage } from "../../../../shared/components/LandingPageHeaderWithImage";

const pageMenu = [
  {
    id: 1,
    text: "Ethics Defaulters",
    link: "/policybreaches/ethicsdefaulters",
  },
];

export const PolicyBreaches = () => {
  const toast = useToasts().addToast;

  const {
    data: policyBreach,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<any>(["policyBreaches"], async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("PolicyBreaches")
        .items.getAll();
      if (res.length) {
        return res[res.length - 1];
      }
      return {} as any;
    } catch (e) {
      errorAlert(toast);
    }
  });

  return (
    <EmployeeWrapper
      pageNavigation={true}
      pageMenu={pageMenu}
      backButton={false}
      showFooter={true}
    >
      <LandingPageHeaderWithImage
        bg={policyBreach?.PolicyBreachImage}
        text={policyBreach?.PolicyBreachTitle}
      />

      {!isLoading && !policyBreach?.PolicyBreachTitle && (
        <Box style={{ width: "90%", height: "450px" }} mt={3} ml="5%">
          <Typography variant="h6">
            No <strong>Item</strong> at this time.<br></br> Please check back.
          </Typography>
        </Box>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {policyBreach && (
            <Box minHeight="450px" mt={1}>
              <Typography variant="h5">
                {policyBreach.PolicyBreachTitle}
              </Typography>

              <Box my={2}>
                <Typography variant="body2">
                  {policyBreach.PolicyBreachWriteUp}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      )}
    </EmployeeWrapper>
  );
};
