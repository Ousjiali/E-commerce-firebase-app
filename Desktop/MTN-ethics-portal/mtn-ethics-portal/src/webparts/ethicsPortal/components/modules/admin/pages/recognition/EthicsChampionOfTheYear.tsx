import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
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
import { EthicsSpotlightTable } from "./components/EthicsSpotlightTable";

type Props = {
  context: WebPartContext;
};

export const EthicsChampionOfTheYear: React.FC<Props> = ({ context }) => {
  const [file, setFile] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [ethicalMessage, setEthicalMessage] = React.useState("");
  const [champion, setChampion] = React.useState<StaffData>({
    DisplayName: "",
    Email: "",
    Department: "",
  });
  const [component, setComponent] = React.useState("form");
  const [spotlights, setSpotLights] = React.useState<any[]>([]);
  const [cannotCreate, setCannotCreate] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const toast = useToasts().addToast;
  const submitHandler = async () => {
    return await sp.web.lists.getByTitle("SPOTLIGHT").items.add({
      ChampionName: champion?.DisplayName,
      ChampionLocation: location,
      ChampionDivision: champion?.Department,
      Year: new Date(Date.now()).getFullYear().toString(),
      ChampionImage: file,
      ChampionMessage: ethicalMessage,
    });
  };

  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["spotlight"]);
      successAlert(toast, "Spotlight Created Successfully").then(() => {
        setFile("");
        setLocation("");
        setEthicalMessage("");
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

  const { isLoading } = useQuery(
    ["spotlight"],
    async () => sp.web.lists.getByTitle("SPOTLIGHT").items.getAll(),
    {
      onSuccess(data) {
        setSpotLights(data);
        setCannotCreate(
          data.filter(
            (it) => it.Year === new Date(Date.now()).getFullYear().toString()
          ).length >= 1
        );
      },
    }
  );

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <Box display="flex" justifyContent="flex-end">
          <Select
            value={component}
            onChange={(e) => setComponent(e.target.value as string)}
            style={{ width: "20%", float: "right" }}
          >
            <MenuItem value="form">Add Champion</MenuItem>
            <MenuItem value="table">Manage Champion</MenuItem>
          </Select>
        </Box>

        {(() => {
          if (component === "form")
            return cannotCreate ? (
              <Typography>
                Champion already created for &nbsp;
                {new Date(Date.now()).getFullYear().toString()}.
              </Typography>
            ) : (
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
                <Typography>Ethics Champion End of the Year</Typography>
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

          return (
            <EthicsSpotlightTable
              recognition={spotlights}
              loading={isLoading}
              title="Spot Lights"
            />
          );
        })()}
      </Container>
    </AdminWrapper>
  );
};
