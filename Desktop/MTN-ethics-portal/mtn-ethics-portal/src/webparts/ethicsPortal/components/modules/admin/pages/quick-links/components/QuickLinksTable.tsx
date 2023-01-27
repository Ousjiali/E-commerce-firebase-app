import { Box, Tooltip, IconButton, Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { QuickLinkData } from "../forms/QuickLinkForm";
import { FaPlusCircle } from "react-icons/fa";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";
import { AddQuickLinkItemModal } from "../modals/AddQuickLinkItemModal";
import { DeleteQuickLinkItemModal } from "../modals/DeleteQuickLinkItemModal";
import { UpdateQuickLinkItemModal } from "../modals/UpdateQuickLinkItemModal";

type Props = {
  quickLinkItems: QuickLinkData[];
  loading: boolean;
};

export const QuickLinksTable: React.FC<Props> = ({
  quickLinkItems,
  loading,
}) => {
  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Title", field: "QuickLinkTitle" },
    { title: "Link", field: "LinkTo" },
    { title: "Created", field: "Created", type: "date" as const },
  ];

  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToUpdate, setItemToUpdate] = React.useState<any>();
  const [itemToView, setItemToView] = React.useState<QuickLinkData>();
  const [adding, setAdding] = React.useState<boolean>();

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={`Quick Links`}
        columns={columns}
        data={quickLinkItems}
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
          exportFileName: "Quick Links",
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
            tooltip: "view",

            onClick: (event, rowData) => {
              setItemToView(rowData);
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
          Toolbar: (props) => {
            return (
              <Box>
                <MTableToolbar {...props} />
                <Box
                  width="100%"
                  height="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  my={2.5}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<FaPlusCircle />}
                    onClick={() => setAdding(true)}
                  >
                    Add Quick Link
                  </Button>
                </Box>
              </Box>
            );
          },
        }}
      />
      {adding && (
        <AddQuickLinkItemModal open={true} onClose={() => setAdding(false)} />
      )}

      {itemToUpdate && (
        <UpdateQuickLinkItemModal
          open={true}
          onClose={() => setItemToUpdate(null)}
          formData={itemToUpdate}
        />
      )}
      {itemToRemove && (
        <DeleteQuickLinkItemModal
          open={true}
          onClose={() => setItemToRemove(null)}
          item={itemToRemove}
        />
      )}
    </>
  );
};
