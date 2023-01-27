import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import * as React from "react";
import { AdminWrapper } from "../../../../shared/components/app-wrapper/admin/AdminWrapper";
import { useHistory } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { locations } from "../../gallery/forms/GalleryForm";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { Add } from "@material-ui/icons";
import { errorAlert, successAlert } from "../../../../../utils/toast-messages";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../../shared/components/TableCompHelpers";
import { ManageDeafulters } from "../manage-defaulters/ManageDeafulters";
import { getAllDefaulters } from "../apis/GetAllDefaulters";
import { ManageDefaulterTable } from "../components/ManageDefaulterTable";
import { LongTextInput } from "../../../../shared/components/input-fields/LongTextInput";
import { Container } from "../../ethics-policies-management/components/PolicyDetailWrapper";

export const AdminEthicsDefaulter = ({ context }) => {
  const [ethicsHandler, setEthicsHandler] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [division, setDivision] = React.useState("");
  const [ethicsMessage, setEthicsMessage] = React.useState("");
  const [ethicsImageUrl, setEthicsImageUrl] = React.useState("");

  const queryClient = useQueryClient();

  const history = useHistory();

  const toast = useToasts().addToast;
  const submitHandler = async () => {
    return await sp.web.lists.getByTitle("EthicsDefaulters").items.add({
      FirstName: firstName,
      LastName: lastName,
      Location: location,
      Division: division,
      EthicsDefaulterMessage: ethicsMessage,
      EthicsFileUrl: ethicsImageUrl,
    });
  };

  const manageHandler = () => {
    history.push("/admin/ethics/managedefaulters");
  };

  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllDefaulters"]);
      successAlert(toast, "Defaulter Created Successfully").then(() => {
        setEthicsImageUrl("");
        setLocation("");
        setDivision("");
        setEthicsMessage("");
        setFirstName("");
        setLastName("");
      });
    },
    onError: () => {
      errorAlert(toast);
    },
  });
  const [component, setComponent] = React.useState("form");
  const { data, isLoading, isError } = useQuery<any>(
    ["getAllDefaulters"],
    getAllDefaulters
  );

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <Box style={{ float: "right" }}>
          <Select
            onChange={(e) => setComponent(e.target.value as string)}
            value={component}
            style={{
              padding: "0.5rem 3rem",
              borderRadius: "26px",
              border: "none",
              outline: "none",
              height: "3rem",
            }}
          >
            <MenuItem value="form">Add Defaulters</MenuItem>
            <MenuItem value="table">Manage Defaulters</MenuItem>
          </Select>
        </Box>
        <Box
          style={{
            width: "90%",
            marginTop: "60px",
          }}
        >
          {(() => {
            if (component === "form") {
              return (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate();
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

                  <Box style={{ marginBottom: "20px" }}>
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
                        mutation.isLoading ? (
                          <CircularProgress size={20} />
                        ) : (
                          <Add />
                        )
                      }
                      disabled={mutation.isLoading}
                    >
                      Create
                    </Button>
                  </Box>
                </form>
              );
            }

            return (
              <ManageDefaulterTable
                manageDefaulters={data}
                loading={isLoading}
                title="Manage Ethics Defaulters"
              />
            );
          })()}
        </Box>
      </Container>
    </AdminWrapper>
  );
};
