import { Tooltip, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import * as React from "react";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import {
  ScrollingTextInterface,
  UpdateScrollingTextModal,
} from "../modals/UpdateScrollingTextModal";
import { DeleteScrollingTextModal } from "../modals/DeleteScrollingTextModal";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  scrollingTexts: ScrollingTextInterface[];
  loading: boolean;
};

export const ScrollingTextsTable: React.FC<Props> = ({
  scrollingTexts,
  loading,
}) => {
  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Texts", field: "scrollingText" },
    {
      title: "Status",
      field: "isEnabled",
      render: (rowData) => <>{rowData?.isEnabled ? "Running" : "Stopped"}</>,
    },
  ];

  const [canEnable, setCanEnable] = React.useState(false);

  React.useMemo(() => {
    setCanEnable(scrollingTexts?.filter((text) => text?.isEnabled).length > 0);
  }, [scrollingTexts]);

  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToUpdate, setItemToUpdate] = React.useState<any>();

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={``}
        columns={columns}
        data={scrollingTexts}
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
        <DeleteScrollingTextModal
          Id={itemToRemove?.Id}
          open={true}
          text={itemToRemove?.scrollingText}
          onClose={(item) => {
            setItemToRemove(null);
          }}
        />
      )}
      {itemToUpdate && (
        <UpdateScrollingTextModal
          id={itemToUpdate?.Id}
          open={true}
          scrollText={itemToUpdate}
          canEnable={canEnable}
          onClose={(item) => {
            setItemToUpdate(null);
          }}
        />
      )}
    </>
  );
};
