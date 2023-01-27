import { Box, Button, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../trainer/styles/styles";
import { CreateUserRoleModal } from "../modals/CreateUserRoleModal";
import { AssignRoleApiRequest } from "../types/Configuration";
import { UpdateUserRoleModal } from "../modals/UpdateUserRoleModal";
import { DeleteConfiguredUserModal } from "../modals/DeleteConfiguredUserModal";

type Props = {
  roles: any[];
  loading: boolean;
  onUpdate: React.Dispatch<any>;
};

export const RolesTable: React.FC<Props> = ({ roles, loading, onUpdate }) => {
  const [itemToRemove, setItemToRemove] = React.useState<any>();
  const [itemToAdd, setItemToAdd] = React.useState<boolean>(false);
  const [itemToEdit, setItemToEdit] = React.useState<{
    staffData: AssignRoleApiRequest;
    id: number;
  }>();

  const history = useHistory();

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    {
      title: "Staff Name",
      field: "StaffName",
    },
    {
      title: "Email",
      field: "Email",
    },
    {
      title: "Department",
      field: "Department",
    },
    {
      title: "Role",
      field: "role",
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
        title={`All Configured Users`}
        columns={columns}
        data={roles}
        isLoading={loading}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          actionsColumnIndex: -1,
          pageSize: 5,
          pageSizeOptions: [1, 2, 5, 10],
          exportAllData: true,
          exportFileName: "Articles",
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
                id: rowData.ID,
                staffData: rowData,
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
                Id: rowData.ID,
                data: rowData,
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
                >
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<FaPlusCircle />}
                    onClick={() => setItemToAdd(true)}
                  >
                    Configure User
                  </Button>
                </Box>
              </Box>
            );
          },
        }}
      />
      {itemToAdd && (
        <CreateUserRoleModal
          onClose={(status) => {
            setItemToAdd(false);
            if (status) {
              onUpdate(status);
            }
          }}
          open={true}
        />
      )}
      {itemToEdit && (
        <UpdateUserRoleModal
          onClose={(status) => {
            setItemToEdit(null);
            if (status) {
              onUpdate(status);
            }
          }}
          open={true}
          id={itemToEdit?.id}
          staffData={itemToEdit?.staffData}
        />
      )}

      {itemToRemove && (
        <DeleteConfiguredUserModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
            if (item) {
              onUpdate(item);
            }
          }}
          id={itemToRemove?.Id}
          staff={itemToRemove?.data}
        />
      )}
    </>
  );
};
