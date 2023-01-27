import { Box, Button, CircularProgress, styled } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useToasts } from "react-toast-notifications";
import { Menu } from "../../../../Container/AppNavigation";
import { FileInput, FileInterface } from "../../../../Container/Form/FileInput";
import { WebContext } from "../../../../LbanOnboardingApp";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";

type Props = {};

export const WelcomeVideoUploadPage = (props: Props) => {
  const [file, setFile] = React.useState<FileInterface>();
  const { context } = React.useContext(WebContext);
  const toast = useToasts().addToast;

  const query = useQuery(
    ["welcome-video"],
    async () => {
      return await sp.web.lists.getByTitle("WelcomeVideo").items.get();
    },
    {
      onSuccess(data) {
        if (data.length) {
          setFile({
            type: data[0]?.FileType,
            url: data[0]?.Video,
          });
        }
        return data;
      },
    }
  );

  const mutation = useMutation(
    async () => {
      return await sp.web.lists.getByTitle("WelcomeVideo").items.add({
        Video: file?.url,
        FileType: file?.type,
      });
    },
    {
      onSuccess(data, variables, context) {
        successAlert(toast, "Video Uploaded Successfully");
      },
      onError(error, variables, context) {
        errorAlert(toast);
      },
    }
  );
  const updateMutation = useMutation(
    async () => {
      return await sp.web.lists
        .getByTitle("WelcomeVideo")
        .items.getById(query.data[0].ID)
        .update({
          Video: file?.url,
          FileType: file?.type,
        });
    },
    {
      onSuccess(data, variables, context) {
        successAlert(toast, "Video Updated Successfully");
      },
      onError(error, variables, context) {
        errorAlert(toast);
      },
    }
  );

  return (
    <Box my={2} width="80%">
      <FileInput
        context={context}
        fileControl={file}
        onUpdate={(value) => setFile(value)}
        accept={{ "video/mp4": [".mp4"] }}
      />

      {query.data?.length ? (
        <ButtonContainer>
          <Button
            variant="outlined"
            color="primary"
            disabled={updateMutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={
              updateMutation.isLoading ? <CircularProgress size={20} /> : <></>
            }
            disabled={updateMutation.isLoading}
            onClick={() => updateMutation.mutate()}
          >
            Update
          </Button>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <Button
            variant="outlined"
            color="primary"
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={
              mutation.isLoading ? <CircularProgress size={20} /> : <></>
            }
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate()}
          >
            Upload
          </Button>
        </ButtonContainer>
      )}
    </Box>
  );
};

const ButtonContainer = styled(Box)({
  gap: "2rem",
  display: "flex",
  justifyContent: "flex-end",
  margin: "2rem 0",
});
