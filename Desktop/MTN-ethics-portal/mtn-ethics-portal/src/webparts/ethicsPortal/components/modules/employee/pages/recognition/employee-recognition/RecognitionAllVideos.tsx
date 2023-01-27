import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../../utils/toast-messages";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageHeaderWithImage } from "../../../../shared/components/PageHeaderWithImage";
import { PaginationContainer } from "../../../components/pagination/PaginationContainer";
import { AllVideos } from "../champion-recognition/ethics-champion-activties/components/AllVideos";
import { ContentType } from "../../../../admin/pages/recognition/EthicsActivity";

export const RecognitionAllVideos = () => {
  const [items, setItems] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(null);
  const rowsPerPage = 5;

  const { data, isLoading } = useQuery<any>(["item"], async () => {
    try {
    const res = await sp.web.lists
      .getByTitle("EthicsActivities")
      .items.filter(`ActivityType eq '${ContentType.Video}'`)
      .getAll();
      setPageSize(Math.ceil(res.length / rowsPerPage));
      console.log(data);
      return res;
    } catch (e) {
      errorAlert(toast);
    }
  });
  const toast = useToasts().addToast;

  return (
    <EmployeeWrapper pageNavigation={false} backButton={true} showFooter={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-ethicslogo.png`}
          text="Champion Recognition Activities"
        />
      </Box>

      <Box>
        <h4 style={{ textAlign: "center" }}>Ethics Champion Activities</h4>
        <PaginationContainer
          data={data}
          onUpdate={(splicedItems) => setItems(splicedItems)}
          pageSize={pageSize}
          rowsPerPage={rowsPerPage}
        >
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              minHeight: "250px",
              margin: "auto",
              padding: "0.5rem",
              gap: "1rem",
              width: "95%",
              boxSizing: "border-box",
            }}
          >
            {items?.map((item) => (
              <AllVideos {...item} />
            ))}
          </Box>
        </PaginationContainer>
      </Box>
    </EmployeeWrapper>
  );
};
