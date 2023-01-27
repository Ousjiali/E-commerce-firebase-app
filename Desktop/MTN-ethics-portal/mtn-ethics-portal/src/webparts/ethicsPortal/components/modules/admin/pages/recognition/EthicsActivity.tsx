import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import {
  getAllEthicsActivities,
} from "./apis/GetAllRecognition";
import { EthicsActivitiesTable } from "./components/EthicsActivitiesTable";
import "./styles.css";
import { Typography, Button } from "@material-ui/core";
import { useToasts } from "react-toast-notifications";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../shared/components/TableCompHelpers";
import { Add } from "@material-ui/icons";
import { sp } from "@pnp/sp/presets/all";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";

export enum ContentType {
  Photo = "photo",
  Video = "video",
  Write_Up = "write_up",
}

export const EthicsActivity = ({ context }) => {
  const [component, setComponent] = React.useState("table");
  const [contentType, setContentType] = React.useState<ContentType>(
    ContentType.Photo
  );

  const [activityTitle, setActivityTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const queryClient = useQueryClient();

  const toast = useToasts().addToast;

  const {
    data = [],
    isLoading,

  } = useQuery<any[]>(["getAllEthicsActivities", contentType], () =>
    getAllEthicsActivities(contentType)
  );

  const handlerSubmit = async () => {
    return await sp.web.lists.getByTitle("EthicsActivities").items.add({
      EthicsActivitiesTitle: activityTitle,
      content,
      ActivityType: contentType,
    });
  };

  const mutations = useMutation(handlerSubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllEthicsActivities", contentType]);
      successAlert(toast, "Ethics Activity Created Successfully").then(()=>{
        setActivityTitle("")
        setContent("")
      });
    },
    onError: () => {
      errorAlert(toast);
    },
  });

  const getComponent = () => {
    switch (contentType) {
      case ContentType.Photo:
        return (
          <Box style={{ marginBottom: "20px" }}>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={content}
              onUpdate={(fileUrl) => setContent(fileUrl)}
              context={context}
            />
          </Box>
        );

      case ContentType.Write_Up:
        return (
          <TextField
            variant="outlined"
            multiline={true}
            minRows={5}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        );
      case ContentType.Video:
        return (
          <Box style={{ marginBottom: "20px" }}>
            <Typography>Upload Video</Typography>
            <FileUpload
              fileControl={content}
              onUpdate={(fileUrl) => setContent(fileUrl)}
              context={context}
              accept={{
                "video/mp4": [".mp4"],
              }}
            />
          </Box>
        );
      default:
        return <></>;
    }
  };

  return (
    <AdminWrapper>
      <Container
        styles={{
          minHeight: "100vh",
        }}
      >
        <div className="table__title">
          <Select
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentType)}
          >
            <MenuItem value={ContentType.Photo}>Photos</MenuItem>
            <MenuItem value={ContentType.Video}>Videos</MenuItem>
            <MenuItem value={ContentType.Write_Up}>Write-Ups</MenuItem>
          </Select>

          {(() => {
            if (contentType === ContentType.Photo) {
              return (
                <Select
                  value={component}
                  onChange={(e) => setComponent(e.target.value as string)}
                >
                  <MenuItem value="table">Manage Photos</MenuItem>
                  <MenuItem value="form">Add Photo</MenuItem>
                </Select>
              );
            }
            if (contentType === ContentType.Video) {
              return (
                <Select
                  value={component}
                  onChange={(e) => setComponent(e.target.value as string)}
                >
                  <MenuItem value="table">Manage Videos</MenuItem>
                  <MenuItem value="form">Add Video</MenuItem>
                </Select>
              );
            }
            if (contentType === ContentType.Write_Up) {
              return (
                <Select
                  value={component}
                  onChange={(e) => setComponent(e.target.value as string)}
                >
                  <MenuItem value="table">Manage Write-Ups</MenuItem>
                  <MenuItem value="form">Add Write-Up</MenuItem>
                </Select>
              );
            }
          })()}
        </div>

        <Box>
          {(() => {
            if (component === "table" && contentType === ContentType.Photo) {
              return (
                <EthicsActivitiesTable
                  recognition={data}
                  loading={isLoading}
                  title="Ethics Champions Activities Photo"
                />
              );
            }

            if (component === "table" && contentType === ContentType.Video) {
              return (
                <EthicsActivitiesTable
                  recognition={data}
                  loading={isLoading}
                  title="Ethics Champions Activities Video"
                />
              );
            }
            if (component === "table" && contentType === ContentType.Write_Up) {
              return (
                <EthicsActivitiesTable
                  recognition={data}
                  loading={isLoading}
                  title="Ethics Champions Activities Write Ups"
                />
              );
            }
          })()}
        </Box>

        <Box>
          {(() => {
            if (component === "form")
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutations.mutate();
                  }}
                >
                  <TextField
                    variant="outlined"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    label="Ethics Activity Title"
                    fullWidth
                    required
                    style={{ margin: "1rem 0" }}
                  />

                  {getComponent()}

                  <Box
                    style={{
                      ...ButtonContainerStyles,
                    }}
                    mt={3}
                  >
                    <CancelButton />
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      endIcon={
                        mutations.isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Add />
                        )
                      }
                      disabled={mutations.isLoading}
                    >
                      {" "}
                      Create
                    </Button>
                  </Box>
                </form>
              );
          })()}
        </Box>
      </Container>
    </AdminWrapper>
  );
};
