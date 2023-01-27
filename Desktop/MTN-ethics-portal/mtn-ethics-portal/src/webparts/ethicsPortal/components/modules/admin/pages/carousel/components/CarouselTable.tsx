import { Box, Tooltip, IconButton, Button } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { CarouselData } from "../forms/CarouselItemForm";
import { FaPlusCircle } from "react-icons/fa";
import { AddCarouselItemModal } from "../modals/AddCarouselItemModal";
import { UpdateCarouselItemModal } from "../modals/UpdateCarouselItemModal";
import { DeleteCarouselItemModal } from "../modals/DeleteCarouselItemModal";
import { DocumentViewer } from "../../../../shared/components/document-viewer/DocumentViewer";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";
import { ViewItem } from "../modals/ViewItem";

type Props = {
  carouselItems: CarouselData[];
  loading: boolean;
};

export const CarouselTable: React.FC<Props> = ({ carouselItems, loading }) => {
  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Title", field: "CarouselTitle" },
    { title: "Link", field: "LinkTo" },
    { title: "Created", field: "Created", type: "date" as const },
  ];

  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToUpdate, setItemToUpdate] = React.useState<any>();
  const [itemToView, setItemToView] = React.useState<CarouselData>();
  const [adding, setAdding] = React.useState<boolean>();

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={`Carousel Items`}
        columns={columns}
        data={carouselItems}
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
                    Add Carousel Item
                  </Button>
                </Box>
              </Box>
            );
          },
        }}
      />
      {adding && (
        <AddCarouselItemModal open={true} onClose={() => setAdding(false)} />
      )}

      {itemToUpdate && (
        <UpdateCarouselItemModal
          open={true}
          onClose={() => setItemToUpdate(null)}
          formData={itemToUpdate}
        />
      )}
      {itemToRemove && (
        <DeleteCarouselItemModal
          open={true}
          onClose={() => setItemToRemove(null)}
          item={itemToRemove}
        />
      )}
      {itemToView && (
        <ViewItem
          open={true}
          onClose={() => setItemToView(null)}
          url={itemToView?.CarouselImage}
        />
      )}
    </>
  );
};
