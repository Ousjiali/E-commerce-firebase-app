import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useParams, useHistory } from "react-router-dom";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import { EditDefaulters } from "../apis/EditDefaulters";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { AdminWrapper } from "../../../../shared/components/app-wrapper/admin/AdminWrapper";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { Add } from "@material-ui/icons";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../../shared/components/TableCompHelpers";
import { LongTextInput } from "../../../../shared/components/input-fields/LongTextInput";
import { Container } from "../../ethics-policies-management/components/PolicyDetailWrapper";

export const UpdateEthicsDefaulters: React.FC<{ context: WebPartContext }> = ({
  context,
}) => {
  const { defaultersId } = useParams();

  const queryClient = useQueryClient();
  const toast = useToasts().addToast;

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [ethicsMessage, setEthicsMessage] = React.useState("");
  const [ethicsImageUrl, setEthicsImageUrl] = React.useState("");

  const { data, isLoading, isError } = useQuery<any>(
    ["getDefaulters", defaultersId],
    async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("EthicsDefaulters")
          .items.getById(defaultersId)
          .get();
        setDivision(res?.Division);
        setLastName(res?.LastName);
        setEthicsImageUrl(res?.EthicsFileUrl);
        setLocation(res?.Location);
        setFirstName(res?.FirstName);
        setEthicsMessage(res?.EthicsDefaulterMessage);

        return res;
      } catch (err) {
        return err;
      }
    },
    {
      enabled: !!defaultersId,
    }
  );

  const history = useHistory();

  const mutation = useMutation(
    () =>
      EditDefaulters(defaultersId, {
        FirstName: firstName,
        LastName: lastName,
        Location: location,
        Division: division,
        EthicsDefaulterMessage: ethicsMessage,
        EthicsFileUrl: ethicsImageUrl,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllDefaulters"]);
        successAlert(toast, "Defaulter Updated Successfully");
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
          <Typography>First Name</Typography>
          <TextField
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />
          <Typography>Last Name</Typography>
          <TextField
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
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
          <Box>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={ethicsImageUrl}
              onUpdate={(fileUrl) => setEthicsImageUrl(fileUrl)}
              context={context}
            />
          </Box>
          <Typography>Ethics Message</Typography>
          <LongTextInput
            control={ethicsMessage}
            onUpdate={(value) => setEthicsMessage(value)}
            label="Ethics Message"
          />
          <Box
            style={{
              ...ButtonContainerStyles,
            }}
          >
            <CancelButton isLoading={mutation.isLoading} />
            <Button
              color="primary"
              type="submit"
              variant="contained"
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
