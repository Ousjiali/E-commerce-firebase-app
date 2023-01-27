import { IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import * as React from "react";
import { CloseSharp } from "@material-ui/icons";
import { UpdateAdminModal } from "../modals/UpdateAdminModal";
import { Data } from "../ManageAdminPage";
import { RemoveAdminModal } from "../modals/RemoveAdminModal";
import { StaffData } from "./PeoplePicker";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  users: StaffData[];
  loading: boolean;
};

export const AdminListTable: React.FC<Props> = ({ users, loading }) => {
  const [itemToUpdate, setItemToUpdate] = React.useState<Data>();
  const [itemToRemove, setItemToRemove] = React.useState<Data>();

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    {
      title: "Name",
      field: "StaffName",
    },
    {
      title: "Email Address",
      field: "StaffEmail",
    },
  ];

  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={``}
        columns={columns}
        data={users}
        isLoading={loading}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [1, 2, 5],
          exportAllData: true,
          exportFileName: "Admins",
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
              setItemToUpdate({
                adminId: rowData.Id,
                data: {
                  Email: rowData.StaffEmail,
                  DisplayName: rowData.StaffName,
                },
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
                adminId: rowData.Id,
                data: {
                  Email: rowData.StaffEmail,
                  DisplayName: rowData.StaffName,
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

      {itemToUpdate && (
        <UpdateAdminModal
          open={true}
          onClose={(item) => {
            setItemToUpdate(null);
          }}
          id={itemToUpdate?.adminId}
          user={itemToUpdate?.data}
        />
      )}
      {itemToRemove && (
        <RemoveAdminModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
          }}
          id={itemToRemove?.adminId}
          user={itemToRemove?.data}
        />
      )}
    </>
  );
};
