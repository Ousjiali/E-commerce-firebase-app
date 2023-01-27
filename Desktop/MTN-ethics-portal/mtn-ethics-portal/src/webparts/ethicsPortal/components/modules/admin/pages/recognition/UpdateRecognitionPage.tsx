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
import { editRecognition } from "./apis/EditRecognition";

export const UpdateRecognitionPage: React.FC<{ context: WebPartContext }> = ({
  context,
}) => {
  const { recognitionId } = useParams();

  const queryClient = useQueryClient();
  const toast = useToasts().addToast;

  const [file, setFile] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [ethicalMessage, setEthicalMessage] = React.useState("");

  const { data, isLoading, isError } = useQuery<any>(
    ["getRecognition", recognitionId],
    async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("EthicsRecognition")
          .items.getById(recognitionId)
          .get();
        setDivision(res?.Division);
        setFile(res?.RecognitionImage);
        setLocation(res?.Location);
        setName(res?.Name);
        setEthicalMessage(res?.EthicalMessage);

        return res;
      } catch (err) {
        return err;
      }
    },
    {
      enabled: !!recognitionId,
    }
  );

  const history = useHistory();

  const mutation = useMutation(
    () =>
      editRecognition(recognitionId, {
        Name: name,
        Location: location,
        Division: division,
        EthicalMessage: ethicalMessage,
        RecognitionImage: file,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllRecognition"]);
        successAlert(toast, "Recognition Updated Successfully");
        setTimeout(() => {
          history.goBack();
        });
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );

  if (isError) return <>An error occured</>;

  if (isLoading) return <>Loading...</>;

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
            margin: "auto",
            boxSizing: "border-box",
            padding: "1.5rem 1rem",
          }}
        >
          <Typography>Ethics Champion</Typography>
          <TextField
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />

          <Typography>Location</Typography>
          <TextField
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />
          <Typography>Division</Typography>
          <TextField
            variant="outlined"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            label="Division"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />
          <Typography>Ethical Message</Typography>
          <TextField
            variant="outlined"
            value={ethicalMessage}
            minRows={10}
            onChange={(e) => setEthicalMessage(e.target.value)}
            label="Ethical Message"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
            multiline
          />
          <Box>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={file}
              onUpdate={(fileUrl) => setFile(fileUrl)}
              context={context}
            />
          </Box>

          <Box
            style={{
              ...ButtonContainerStyles,
            }}
            my={2}
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
