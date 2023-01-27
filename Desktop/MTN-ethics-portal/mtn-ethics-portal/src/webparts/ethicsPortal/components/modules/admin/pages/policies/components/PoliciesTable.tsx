import { Box, Button, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp } from "@material-ui/icons";

import { useHistory } from "react-router-dom";
import { RemovePolicyModal } from "../modals/RemovePolicyModal";
import { FaPlusCircle } from "react-icons/fa";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  policies: any[];
  loading: boolean;
  title?: string;
  showSection?: boolean;
};

export const PoliciesTable: React.FC<Props> = ({
  policies,
  loading,
  title,
  showSection = true,
}) => {
  const [itemToRemove, setItemToRemove] = React.useState<any>();

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
      title: "Section",
      field: "PolicySection",
      hidden: showSection,
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
        title={title || "All Policy Content"}
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
              history.push(`/admin/policy/${rowData?.Id}/update`);
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
                  PolicyTitle: rowData.PolicyTitle,
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
        <RemovePolicyModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
          }}
          id={itemToRemove?.Id}
          policy={itemToRemove?.data}
        />
      )}
    </>
  );
};
