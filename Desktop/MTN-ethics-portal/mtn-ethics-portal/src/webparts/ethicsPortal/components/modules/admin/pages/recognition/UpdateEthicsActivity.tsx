import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";
import { ButtonContainerStyles } from "../../../shared/components/TableCompHelpers";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { editEthicsActivity } from "./apis/EditRecognition";
import { ContentType } from "./EthicsActivity";

interface Activity {
  EthicsActivitiesTitle: string;
  content: string;
  ActivityType: ContentType;
}

export const UpdateEthicsActivity: React.FC<{
  context: WebPartContext;
}> = ({ context }) => {
  const { activityId } = useParams();
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const [activity, setActivity] = React.useState<Activity>();

  const getComponent = () => {
    switch (activity?.ActivityType) {
      case ContentType.Photo:
        return (
          <Box style={{ marginBottom: "20px" }}>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={activity?.content}
              onUpdate={(content) =>
                setActivity({
                  ...activity,
                  content,
                })
              }
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
            value={activity?.content}
            onChange={(e) =>
              setActivity({
                ...activity,
                content: e.target.value,
              })
            }
          />
        );
      case ContentType.Video:
        return (
          <Box style={{ marginBottom: "20px" }}>
            <Typography>Upload Video</Typography>
            <FileUpload
              fileControl={activity?.content}
              onUpdate={(content) =>
                setActivity({
                  ...activity,
                  content,
                })
              }
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

  const { data, isLoading } = useQuery<Activity>(
    ["getEthicsPhotoActivities", activityId],
    async () => {
      return await sp.web.lists
        .getByTitle("EthicsActivities")
        .items.getById(activityId)
        .get();
    },
    {
      enabled: !!activityId,
      onSuccess(data) {
        setActivity(data);
      },
    }
  );

  const history = useHistory();

  const mutation = useMutation(
    () =>
      editEthicsActivity(activityId, {
        EthicsActivitiesTitle: activity?.EthicsActivitiesTitle,
        content: activity?.content,
        ActivityType: activity?.ActivityType,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllEthicsActivities"]);
        successAlert(toast, "Ethics Activities Updated Successfully").then(
          () => {
            history.goBack();
          }
        );
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );

  if (isLoading) return <AdminWrapper>Loading...</AdminWrapper>;

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          style={{
            width: "80%",
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "1.5rem 1rem",
          }}
        >
          <TextField
            variant="outlined"
            value={activity?.EthicsActivitiesTitle}
            onChange={(e) =>
              setActivity({
                ...activity,
                EthicsActivitiesTitle: e.target.value,
              })
            }
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
            my={3}
          >
            <CancelButton isLoading={mutation.isLoading} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={
                mutation.isLoading ? <CircularProgress size={20} /> : <Add />
              }
              disabled={mutation.isLoading}
            >
              Update
            </Button>
          </Box>
        </form>
      </Container>
    </AdminWrapper>
  );
};
