import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";
import { ButtonContainerStyles } from "../../../shared/components/TableCompHelpers";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { locations } from "../gallery/forms/GalleryForm";
import { PeoplePicker, StaffData } from "../users/components/PeoplePicker";

type Props = {
  context: WebPartContext;
};

export const CreateRecognition: React.FC<Props> = ({ context }) => {
  const [file, setFile] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [ethicalMessage, setEthicalMessage] = React.useState("");
  const [champion, setChampion] = React.useState<StaffData>({
    DisplayName: "",
    Email: "",
    Department: "",
  });
  const queryClient = useQueryClient();

  const toast = useToasts().addToast;
  const submitHandler = async () => {
    return await sp.web.lists.getByTitle("EthicsRecognition").items.add({
      Name: champion?.DisplayName,
      Location: location,
      Division: champion?.Department,
      EthicalMessage: ethicalMessage,
      RecognitionImage: file,
    });
  };

  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllEthicalRecognition"]);
      successAlert(toast, "Recognition Created Successfully").then(() => {
        setFile("");
        setLocation("");
        setDivision("");
        setEthicalMessage("");
        setName("");
        setChampion({
          DisplayName: "",
          Email: "",
          Department: "",
        });
      });
    },
    onError: () => {
      errorAlert(toast);
    },
  });

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
          <PeoplePicker
            staff={champion}
            onUpdate={(user) => {
              setChampion(user);
            }}
            label="Full Name"
          />

          <TextField
            variant="outlined"
            value={champion?.Department}
            label="Division"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
            onChange={() => {}}
          />
          <Autocomplete
            id="type"
            freeSolo={false}
            options={locations?.map((option) => option)}
            fullWidth
            value={location}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Location"
                margin="normal"
                variant="outlined"
                required
              />
            )}
            onChange={(e, newvalue) => setLocation(newvalue)}
          />

          <Typography>Ethical Message</Typography>
          <TextField
            variant="outlined"
            value={ethicalMessage}
            minRows={6}
            onChange={(e) => setEthicalMessage(e.target.value)}
            label="Ethical Message"
            fullWidth
            required
            multiline
            style={{ margin: "1rem 0" }}
          />

          <Box style={{ marginBottom: "20px" }}>
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
          >
            <CancelButton isLoading={mutation.isLoading} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={
                mutation.isLoading ? <CircularProgress size={20} /> : <Add />
              }
              disabled={mutation.isLoading}
            >
              Create
            </Button>
          </Box>
        </form>
      </Container>
    </AdminWrapper>
  );
};
