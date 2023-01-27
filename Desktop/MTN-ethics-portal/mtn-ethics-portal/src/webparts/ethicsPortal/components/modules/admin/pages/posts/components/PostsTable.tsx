import { Box, Button, IconButton } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { CloseSharp } from "@material-ui/icons";

import { useHistory } from "react-router-dom";
import { RemoveBlogPostModal } from "../modals/RemoveBlogPostModal";
import { FaPlusCircle } from "react-icons/fa";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";

type Props = {
  posts: any[];
  loading: boolean;
  showTitle?: boolean;
  showSection?: boolean;
  section?: string;
};

export const PostsTable: React.FC<Props> = ({
  posts,
  loading,
  showTitle = true,
  showSection = true,
  section: type,
}) => {
  const [itemToRemove, setItemToRemove] = React.useState<any>();

  const history = useHistory();

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData.tableData.id + 1}</div>,
    },
    {
      title: "Post Title",
      field: "PostTitle",
    },
    {
      title: "Section",
      field: "SectionId[PolicyTitle]",
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
        title={`Articles`}
        columns={columns}
        data={posts}
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
          showTitle,
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
              if (type) {
                history.push(`/admin/post/${rowData?.ID}/update?type=${type}`);
              } else {
                history.push(`/admin/post/${rowData?.ID}/update`);
              }
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
                data: {
                  PostTitle: rowData.PostTitle,
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
        <RemoveBlogPostModal
          open={true}
          onClose={(item) => {
            setItemToRemove(null);
          }}
          id={itemToRemove?.Id}
          post={itemToRemove?.data}
        />
      )}
    </>
  );
};
