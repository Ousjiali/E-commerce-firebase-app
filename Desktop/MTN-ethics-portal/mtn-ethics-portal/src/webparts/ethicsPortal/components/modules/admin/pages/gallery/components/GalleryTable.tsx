import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import MaterialTable, { MTableToolbar } from "material-table";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { CloseSharp, RemoveRedEye } from "@material-ui/icons";
import { GalleryData } from "../forms/GalleryForm";
import { DeleteGalleryModal } from "../modals/DeleteGalleryModal";
import {
  TableHeaderStyles,
  TableIcons,
  TableStyles,
} from "../../../../shared/components/TableCompHelpers";
import { FaPlusCircle } from "react-icons/fa";

type Props = {
  gallery: GalleryData[];
  isLoading: boolean;
};

export const GalleryTable: React.FC<Props> = ({ gallery, isLoading }) => {
  const history = useHistory();
  const [data, setData] = React.useState();
  const [item, setItem] = React.useState<string>("Manage Photos");
  const [fileType, setFileType] = React.useState<string>();

  React.useEffect(() => {
    if (item === "Manage Photos") {
      setFileType("Image");
    } else {
      setFileType("Video");
    }
  }, [item]);

  React.useEffect(() => {
    let filtered;
    if (fileType === "Video") {
      filtered = gallery?.filter((it) => /([A-Z])\.mp4/i.test(it?.file));
    } else {
      filtered = gallery?.filter((it) => !/([A-Z])\.mp4/i.test(it?.file));
    }
    setData(filtered);
  }, [fileType, gallery]);

  const columns = [
    {
      title: "SN",
      field: "tableData",
      render: (rowData) => <div>{rowData?.tableData?.id + 1}</div>,
    },
    { title: "Upload Title", field: "imageLabel" },
    { title: "Location", field: "location" },
    {
      title: "File Type",
      field: "file",
      render: (rowData) => (
        <>{/([A-Z])\.mp4/i.test(rowData?.file) ? "Video" : "Image"}</>
      ),
    },
  ];
  const [itemToRemove, setItemToRemove] = React.useState<any>();
  return (
    <>
      <MaterialTable
        icons={TableIcons}
        title={``}
        columns={columns}
        data={data}
        isLoading={isLoading}
        options={{
          exportButton: { csv: true, pdf: false },
          actionsCellStyle: {
            color: "#FF00dd",
          },

          actionsColumnIndex: -1,

          pageSize: 5,
          pageSizeOptions: [5, 10, 20],
          exportAllData: true,
          exportFileName: "Uploads",
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
              history.push(
                `gallery/${rowData.Id}/update?type=${
                  /([A-Z])\.mp4/i.test(rowData?.file) ? "video" : "image"
                }`
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
              console.log(rowData);

              setItemToRemove({
                uploadId: rowData?.ID,
                uploadTitle: rowData?.imageLabel,
              });
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
              <Box my={2}>
                <MTableToolbar {...props} />
                <Box
                  width="100%"
                  height="50px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Select
                    value={item}
                    onChange={(e) => setItem(e.target.value as string)}
                    style={{ fontWeight: "500" }}
                  >
                    <MenuItem
                      value="Manage Photos"
                      style={{ fontWeight: "500" }}
                    >
                      Manage Photos
                    </MenuItem>
                    <MenuItem
                      value="Manage Videos"
                      style={{ fontWeight: "500" }}
                    >
                      Manage Videos
                    </MenuItem>
                  </Select>
                  <Box></Box>
                </Box>
              </Box>
            );
          },
        }}
      />
      {itemToRemove && (
        <DeleteGalleryModal
          onClose={(result) => {
            setItemToRemove(null);
          }}
          open={true}
          uploadId={itemToRemove?.uploadId}
          uploadTitle={itemToRemove?.uploadTitle}
        />
      )}
    </>
  );
};
