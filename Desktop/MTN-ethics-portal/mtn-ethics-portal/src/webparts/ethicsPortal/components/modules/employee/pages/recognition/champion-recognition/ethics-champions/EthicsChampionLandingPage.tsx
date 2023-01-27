import * as React from "react";
import { Box } from "@material-ui/core";
import { EmployeeWrapper } from "../../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import styled from "styled-components";
import { PaginationContainer } from "../../../../components/pagination/PaginationContainer";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { errorAlert } from "../../../../../../utils/toast-messages";
import { useToasts } from "react-toast-notifications";
import { Label } from "../../../../components/Label";
import { LandingPageHeaderWithImage } from "../../../../../shared/components/LandingPageHeaderWithImage";
const pageMenu = [
  { id: 1, text: "Activities", link: "/recognition/activities" },
];

export const EthicsChampionLandingPage = () => {
  const [pageSize, setPageSize] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const rowsPerPage = 6;

  const { data, isLoading } = useQuery<any>(["item"], async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("EthicsRecognition")
        .items.getAll();
      setPageSize(Math.ceil(res.length / rowsPerPage));
      return res;
    } catch (e) {
      errorAlert(toast);
    }
  });
  const toast = useToasts().addToast;
  return (
    <EmployeeWrapper
      pageNavigation={true}
      pageMenu={pageMenu}
      backButton={false}
      showFooter={true}
    >
      <>
        <LandingPageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-ethicslogo.png"
          text="Champion Recognition"
        />

        <PaginationContainer
          data={data}
          onUpdate={(splicedItems) => setItems(splicedItems)}
          pageSize={pageSize}
          rowsPerPage={rowsPerPage}
        >
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              minHeight: "250px",
              margin: "auto",
              padding: "0.5rem",
              gap: "1rem",
              width: "95%",
              boxSizing: "border-box",
            }}
          >
            {items?.map((item) => (
              <StyledContainer>
                <CurvedImageContainer
                  bg={item?.RecognitionImage}
                ></CurvedImageContainer>
                <Box
                  display="flex"
                  flexDirection="column"
                  style={{
                    gap: "1rem",
                    boxSizing: "border-box",
                    paddingTop: ".5rem",
                  }}
                  height="220px"
                >
                  <Label header="Name" content={item?.Name} />
                  <Label header="Division" content={item?.Division} />
                  <Label header="Location" content={item?.Location} />
                  <Label
                    header="Ethics Message"
                    content={item?.EthicalMessage}
                  />
                </Box>
              </StyledContainer>
            ))}
          </Box>
        </PaginationContainer>
      </>
    </EmployeeWrapper>
  );
};

export const StyledContainer = styled.div<{ bg: string }>((props) => ({
  width: "100%",
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  borderRadius: "26px",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.4)",
  paddingBottom: "1rem",
}));
export const CurvedImageContainer = styled.div<{ bg: string }>((props) => ({
  backgroundImage: `url('${props.bg}')`,
  width: "100%",
  height: "230px",
  backgroundSize: "cover",
  backgroundPosition: "top",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  borderRadius: "0 0 65% 65%",
}));
