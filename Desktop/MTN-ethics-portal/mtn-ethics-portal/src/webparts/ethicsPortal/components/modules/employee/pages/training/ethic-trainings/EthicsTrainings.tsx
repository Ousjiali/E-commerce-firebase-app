import MaterialTable from "material-table";
import * as React from "react";
import { sp } from "@pnp/sp";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { LandingPageHeaderWithImage } from "../../../../shared/components/LandingPageHeaderWithImage";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import { GrView } from "react-icons/gr";
import { TrainingType } from "../../../../admin/pages/training/types/TrainingTypes";
import { DocumentViewer } from "../../../../shared/components/document-viewer/DocumentViewer";
import { TrainingCategoryEnum } from "../../../../admin/pages/training/enums/TrainingCategoryEnum";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

const pageMenu = [
  {
    id: 1,
    text: "Business Ethics Everyone's Responsibilities",
    link: "/ethics/training/businessethics",
  },
  {
    id: 2,
    text: "MTN Ethics training Videos",
    link: "/ethics/training/mtnethicstrainingvideos",
  },
  {
    id: 3,
    text: "Organizational Ethics",
    link: "/ethics/training/organizationalethics",
  },
];

export const EthicsTrainings = ({ match }) => {
  let itemID = match.params.id;
  console.log(itemID);

  const history = useHistory();

  const [columns, setColumns] = React.useState([
    { title: "Title", field: "TrainingTitle", type: "string" as const },
    { title: "Category", field: "Category", type: "string" as const },
    // { title: "Training Video", field: "Video", type: "string" as const },
  ]);

  const [itemsVideo, setItemsVideo] = React.useState<TrainingType>();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    sp.web.lists
      .getByTitle(`Training`)
      .items.filter(
        `Category eq '${TrainingCategoryEnum.Business_Ethics}' or Category eq '${TrainingCategoryEnum.Mtn_Ethics}' or Category eq '${TrainingCategoryEnum.Organisation_Ethics}'`
      )
      .getAll()
      .then((res) => {
        setData(res);
      });
  }, []);

  return (
    <EmployeeWrapper
      pageNavigation={true}
      pageMenu={pageMenu}
      backButton={false}
      showFooter={false}
    >
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/mtn-training.png"
        text="Trainings"
      />

      <Box padding="2rem">
        <div className="view__Container">
          <MaterialTable
            icons={TableIcons}
            title=""
            columns={columns}
            data={data}
            options={{
              exportButton: true,
              actionsCellStyle: {
                backgroundColor: "none",
                color: "black",
              },
              actionsColumnIndex: -1,
              headerStyle: TableHeaderStyles,
              rowStyle: {
                fontSize: 13,
              },
            }}
            style={TableStyles}
            actions={[
              {
                icon: GrView,
                iconProps: { style: { fontSize: "15px" } },
                tooltip: "View Video",

                onClick: (event, rowData) => {
                  setItemsVideo(rowData);
                },
              },
            ]}
          />
          {itemsVideo && (
            <DocumentViewer
              onClose={() => setItemsVideo(null)}
              open={true}
              url={itemsVideo?.Video}
            />
          )}
        </div>
      </Box>
    </EmployeeWrapper>
  );
};
