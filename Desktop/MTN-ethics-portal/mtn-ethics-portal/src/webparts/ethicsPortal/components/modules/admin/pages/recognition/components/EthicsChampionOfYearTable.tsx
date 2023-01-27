import { IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import * as React from "react";
import { CloseSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";
import { RemoveSpotlightModal } from "../modal/RemoveSpotlightModal";
import { UpdateSpotLightModal } from "../modal/UpdateSpotLightModal";

type Props = {
  recognition?: any[];
  loading?: boolean;
  title?: string;
};

export const EthicsSpotlightTable: React.FC<Props> = ({
  recognition,
  loading,
  title,
}) => {
  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToEdit, setItemToEdit] = React.useState<any>();

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    {
      title: "Name",
      field: "ChampionName",
    },
    {
      title: "Division",
      field: "ChampionDivision",
    },
    {
      title: "Location",
      field: "ChampionLocation",
    },
    {
      title: "Year",
      field: "Year",
    },
    {
      title: "Date created",
      field: "Created",
      render: (rowData) => (
        <div>{new Date(rowData.Created).toDateString()}</div>
      ),
    },
  ];

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={title || "Spot Lights"}
        columns={columns}
        data={recognition}
        isLoading={loading}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          draggable: true,
          showSelectAllCheckbox: true,

          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [1, 2, 5],
          exportAllData: true,
          exportFileName: "Champions",
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
              setItemToEdit({
                ChampionName: rowData.ChampionName,
                ChampionDivision: rowData.ChampionDivision,
                ChampionImage: rowData.ChampionImage,
                ChampionLocation: rowData.ChampionLocation,
                ChampionMessage: rowData.ChampionMessage,
                Id: rowData.Id,
              });
            },
          },
          {
            icon: "visibility",
            iconProps: {
              style: { fontSize: "20px", color: "gold" },
            },
            tooltip: "remove",

            onClick: (event, rowData) => {
              setItemToRemove({
                Id: rowData.Id,
                data: {
                  Name: rowData.ChampionName,
                },
              });
            },
          },
        ]}
        components={{
          Action: (props) => {
            return (
              <IconButton
                onClick={(event) => props.action.onClick(event, props.data)}
                style={{
                  width: "25px",
                  height: "25px",
                  fontSize: ".5rem",
                  padding: "1rem",
                  position: "relative",
                }}
                color={
                  props.action.tooltip === "view"
                    ? "primary"
                    : props.action.tooltip === "edit"
                    ? "secondary"
                    : "default"
                }
              >
                {props.action.tooltip === "edit" ? <Edit /> : <CloseSharp />}
              </IconButton>
            );
          },
        }}
      />

      {itemToRemove && (
        <RemoveSpotlightModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
          }}
          id={itemToRemove?.Id}
          recognition={itemToRemove?.data}
        />
      )}
      {itemToEdit && (
        <UpdateSpotLightModal
          open={true}
          onClose={(item) => {
            setItemToEdit(null);
          }}
          id={itemToEdit?.Id}
          recognition={itemToEdit}
        />
      )}
    </>
  );
};
