import { Box, Tooltip, IconButton, Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { TrainingType } from "../types/TrainingTypes";
import { DocumentViewer } from "../../../../shared/components/document-viewer/DocumentViewer";
import { DeleteTrainingVideoModal } from "../modals/DeleteTrainingVideoModal";
import { UpdateCourseVideoModal } from "../modals/UpdateCourseVideoModal";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FaPlusCircle } from "react-icons/fa";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";
import { UpdatePolicyTrainingModal } from "../modals/UpdatePolicyTrainingModal";

type Props = {
  trainings: TrainingType[];
  loading: boolean;
  title?: string;
};

export const TrainingTableForPolicy: React.FC<Props> = ({
  trainings,
  loading,
  title = "All Trainings",
}) => {
  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Course Title", field: "TrainingTitle" },
    {
      title: "Category",
      field: "Category",
    },
  ];
  const history = useHistory();
  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToUpdate, setItemToUpdate] = React.useState<any>();
  const [itemToView, setItemToView] = React.useState<any>();

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={title}
        columns={columns}
        data={trainings}
        isLoading={loading}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [5, 10, 20],

          exportAllData: true,
          exportFileName: "Scrolls",
          headerStyle: TableHeaderStyles,
        }}
        style={TableStyles}
        actions={[
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "edit",

            onClick: (event, rowData) => {
              setItemToUpdate(rowData);
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "remove",

            onClick: (event, rowData) => {
              setItemToRemove(rowData);
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "view",

            onClick: (event, rowData) => {
              setItemToView(rowData);
            },
          },
        ]}
        components={{
          Action: (props) => (
            <Tooltip title={props?.action?.tooltip}>
              <IconButton
                onClick={(event) => props?.action?.onClick(event, props?.data)}
                style={{
                  width: "25px",
                  height: "25px",
                  fontSize: ".5rem",
                  padding: "1rem",
                }}
                color={
                  props?.action?.tooltip === "view"
                    ? "primary"
                    : props?.action?.tooltip === "edit"
                    ? "default"
                    : "secondary"
                }
              >
                {props?.action?.tooltip === "view" ? (
                  <RemoveRedEye />
                ) : props?.action?.tooltip === "edit" ? (
                  <Edit />
                ) : (
                  <CloseSharp />
                )}
              </IconButton>
            </Tooltip>
          ),
        }}
      />
      {itemToRemove && (
        <DeleteTrainingVideoModal
          id={itemToRemove?.Id}
          open={true}
          title={itemToRemove?.TrainingTitle}
          onClose={(item) => {
            setItemToRemove(null);
          }}
        />
      )}
      {itemToUpdate && (
        <UpdatePolicyTrainingModal
          id={itemToUpdate?.Id}
          open={true}
          training={itemToUpdate}
          onClose={(item) => {
            setItemToUpdate(null);
          }}
        />
      )}
      {itemToView && (
        <DocumentViewer
          open={true}
          onClose={() => setItemToView(null)}
          url={itemToView?.Video}
        />
      )}
    </>
  );
};
