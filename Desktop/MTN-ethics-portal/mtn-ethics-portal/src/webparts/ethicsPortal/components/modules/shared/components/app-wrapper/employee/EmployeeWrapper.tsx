import { Box } from "@material-ui/core";
import * as React from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { AppContainer } from "../../../../../styles/styles";
import { theme } from "../../../../../themes/themes";
import { Footer } from "../../Footer";
import { PageNavigation } from "../../Navigation/page-navigation/PageNavigation";
import { TopNavigation } from "../../Navigation/top-navigation/TopNavigation";
import { useHistory } from "react-router-dom";
import { StyledButton } from "../../buttons/MButton";
import { PolicyContextProvider } from "../../../../../contexts/EmployeePolicyContext";

export const EmployeeWrapper: React.FC<{
  children;
  pageNavigation?: boolean;
  pageMenu?: any[];
  backButton?: boolean;
  showFooter?: boolean;
}> = ({
  children,
  pageNavigation = false,
  pageMenu = [],
  backButton = true,
  showFooter = true,
}) => {
  const history = useHistory();
  return (
    <PolicyContextProvider>
      <AppContainer>
        {pageNavigation && <PageNavigation nav={pageMenu} />}
        <TopNavigation />

        {backButton && (
          <Box
            style={{
              cursor: "pointer",
              width: "100px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "8% 2% 2%",
            }}
            onClick={() => history.goBack()}
          >
            <FaAngleDoubleLeft
              color={theme.palette.common.black}
              fontSize="20px"
            />
          </Box>
        )}
        <Box>{children}</Box>
        {showFooter && <Footer />}
      </AppContainer>
    </PolicyContextProvider>
  );
};
