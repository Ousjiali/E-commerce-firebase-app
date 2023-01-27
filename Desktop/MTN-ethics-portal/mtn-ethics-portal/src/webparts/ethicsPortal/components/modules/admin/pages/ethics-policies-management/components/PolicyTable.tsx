import { Box, Button, IconButton, Tooltip } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import { AddPolicyModal } from "../modals/AddPolicyModal";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { UpdatePolicyModal } from "../modals/UpdatePolicyModal";
import { DeletePolicyModal } from "../modals/DeletePolicyModal";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  policies: any[];
  loading: boolean;
  title?: string;
};

export const PolicyTable: React.FC<Props> = ({ policies, loading, title }) => {
  const [itemToRemove, setItemToRemove] = React.useState<Policy>();
  const [itemToUpdate, setItemToUpdate] = React.useState<Policy>();
  const [adding, setAdding] = React.useState<boolean>(false);

  const history = useHistory();

  const columns = [
    {
      title: "SN",
      field: "tableData[id]",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    {
      title: "Policy Title",
      field: "PolicyTitle",
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
        title={"All Policies"}
        columns={columns}
        data={policies}
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
          exportFileName: "Policies",
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
              history.push(
                `/admin/policy/${rowData.Id}?filter=${rowData?.PolicyTitle}`
              );
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
          Action: (props) => {
            return (
              <Tooltip title={props.action.tooltip}>
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
                  {(() => {
                    if (props.action.tooltip === "edit") {
                      return <Edit />;
                    } else if (props.action.tooltip === "view") {
                      return <RemoveRedEye />;
                    } else {
                      return <CloseSharp />;
                    }
                  })()}
                </IconButton>
              </Tooltip>
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
                  my={2.5}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<FaPlusCircle />}
                    onClick={() => setAdding(true)}
                  >
                    Add Policy
                  </Button>
                </Box>
              </Box>
            );
          },
        }}
      />

      {itemToRemove && (
        <DeletePolicyModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
          }}
          policy={itemToRemove}
        />
      )}
      {adding && (
        <AddPolicyModal onClose={() => setAdding(false)} open={true} />
      )}
      {itemToUpdate && (
        <UpdatePolicyModal
          onClose={() => setItemToUpdate(null)}
          open={true}
          policy={itemToUpdate}
        />
      )}
    </>
  );
};
