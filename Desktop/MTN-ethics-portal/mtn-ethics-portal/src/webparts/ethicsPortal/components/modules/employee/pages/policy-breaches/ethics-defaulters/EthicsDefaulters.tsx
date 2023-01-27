import * as React from "react";
import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../../utils/toast-messages";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageWrapper } from "../../../../shared/components/app-wrapper/employee/PageWrapper";
import { PageHeaderWithImage } from "../../../../shared/components/PageHeaderWithImage";
import { PaginationContainer } from "../../../components/pagination/PaginationContainer";
import { Label } from "../../../components/Label";
import {
  CurvedImageContainer,
  StyledContainer,
} from "../../recognition/champion-recognition/ethics-champions/EthicsChampionLandingPage";

export const EthicsDefaulters = () => {
  const [pageSize, setPageSize] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const rowsPerPage = 6;

  const { data, isLoading } = useQuery<any>(["item"], async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("EthicsDefaulters")
        .items.getAll();
      setPageSize(Math.ceil(res.length / rowsPerPage));
      return res;
    } catch (e) {
      errorAlert(toast);
    }
  });
  const toast = useToasts().addToast;

  if (isLoading)
    return (
      <EmployeeWrapper>
        <></>
      </EmployeeWrapper>
    );

  return (
    <EmployeeWrapper>
      <PageWrapper>
        <PageHeaderWithImage
          bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-policy.png"
          text="Ethics Defaulters"
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
                  bg={item?.EthicsFileUrl}
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
                  <Label header="Name" content={item?.FirstName} />
                  <Label header="Division" content={item?.Division} />
                  <Label header="Location" content={item?.Location} />
                  <Label
                    header="Ethics Message"
                    content={item?.EthicsDefaulterMessage}
                  />
                </Box>
              </StyledContainer>
            ))}
          </Box>
        </PaginationContainer>
      </PageWrapper>
    </EmployeeWrapper>
  );
};
