import { Box, CircularProgress, Typography } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../utils/toast-messages";
import { TrainingCategoryEnum } from "../../../admin/pages/training/enums/TrainingCategoryEnum";
import { TrainingType } from "../../../admin/pages/training/types/TrainingTypes";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { DocumentViewer } from "../../../shared/components/document-viewer/DocumentViewer";
import { PageHeaderWithImage } from "../../../shared/components/PageHeaderWithImage";
import { PaginationContainer } from "../pagination/PaginationContainer";
import { ResourcePreview } from "./ResourcePreview";
import "./styles/styles.css";

type Props = {
  filter: TrainingCategoryEnum;
  backgroundImage: string;
  pageTitle: string;
};

export const ResourcesDisplayComponent: React.FC<Props> = ({
  filter,
  backgroundImage,
  pageTitle,
}) => {
  const toast = useToasts().addToast;
  const [pageSize, setPageSize] = React.useState(null);
  const rowsPerPage = 6;
  const [items, setItems] = React.useState([]);
  const { data, isLoading, isSuccess, isError } = useQuery<TrainingType[]>(
    ["training", filter],
    async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("Training")
          .items.filter(`Category eq '${filter}'`)
          .get();
        setPageSize(Math.floor(res.length / rowsPerPage));
        return res;
      } catch (e) {
        errorAlert(toast);
      }
    }
  );
  const [fileToView, setFileToView] = React.useState<TrainingType>();
  return (
    <EmployeeWrapper>
      <Box width="90%" m="0 auto">
        <PageHeaderWithImage bg={backgroundImage} text={pageTitle ?? ""} />
      </Box>

      {!isLoading && data?.length === 0 && (
        <Box style={{ width: "90%", height: "450px" }} mt={3} ml="5%">
          <Typography variant="h6">
            No <strong>Training Resources</strong> at this time.<br></br> Please
            check back.
          </Typography>
        </Box>
      )}

      <PaginationContainer
        data={data}
        onUpdate={(splicedItems) => setItems(splicedItems)}
        pageSize={pageSize}
        rowsPerPage={rowsPerPage}
      >
        <Box
          minHeight="450px"
          ml="5%"
          mt="5%"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            width: "100%",
            padding: "2% 0",
            boxSizing: "border-box",
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {items?.map((resource) => (
                <ResourcePreview
                  resource={resource}
                  key={resource.Id}
                  onClick={() => setFileToView(resource)}
                />
              ))}
            </>
          )}
        </Box>
      </PaginationContainer>
      {fileToView && (
        <DocumentViewer
          onClose={() => setFileToView(null)}
          open={true}
          url={fileToView?.Video}
        />
      )}
    </EmployeeWrapper>
  );
};
