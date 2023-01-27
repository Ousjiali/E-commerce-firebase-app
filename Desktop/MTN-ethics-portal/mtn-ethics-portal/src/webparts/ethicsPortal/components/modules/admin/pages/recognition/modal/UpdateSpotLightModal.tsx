import {
  DialogActions,
  CircularProgress,
  Dialog,
  DialogContent,
  Button,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../../utils/toast-messages";
import { ModalCloseButton } from "../../../components/ModalCloseButton";
import { editSpotLight } from "../apis/SpotlightApi";
import { PeoplePicker } from "../../users/components/PeoplePicker";
import { Autocomplete } from "@material-ui/lab";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../../shared/components/TableCompHelpers";
import { Add } from "@material-ui/icons";
import { locations } from "../../gallery/forms/GalleryForm";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { WebContext } from "../../../../../EthicsPortal";

type Props = {
  open: boolean;
  onClose: (item?: any) => void;
  recognition: any;
  id: number;
};

export const UpdateSpotLightModal: React.FC<Props> = ({
  open,
  onClose,
  recognition,
  id,
}) => {
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    (id: number) => {
      return editSpotLight(id, champion);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["spotlight"],
        });
        onClose();
        successAlert(toast, "Spotlight Updated Successfully");
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );
  const [champion, setChampion] = React.useState(recognition);
  const { context } = React.useContext(WebContext);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <ModalCloseButton onClose={onClose} />
      <DialogContent>
        <Typography style={{ boxSizing: "border-box" }}>
          Update Champion for the Year
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(id);
          }}
          style={{
            width: "80%",
            margin: "0 auto",
            boxSizing: "border-box",
            padding: "1.5rem 1rem",
          }}
        >
          <Typography>Ethics Champion End of the Year</Typography>
          <PeoplePicker
            staff={{
              DisplayName: champion?.ChampionName,
              Department: champion?.ChampionDivision,
              Email: "",
            }}
            onUpdate={(user) => {
              setChampion({
                ...champion,
                ChampionName: user?.DisplayName,
                ChampionDivision: user?.Department,
              });
            }}
            label="Full Name"
          />

          <TextField
            variant="outlined"
            value={champion?.ChampionDivision}
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
            value={champion?.ChampionLocation}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose Location"
                margin="normal"
                variant="outlined"
                required
              />
            )}
            onChange={(e, newvalue) =>
              setChampion({
                ...champion,
                ChampionLocation: newvalue,
              })
            }
          />

          <Typography>Ethical Message</Typography>
          <TextField
            variant="outlined"
            value={champion?.ChampionMessage}
            minRows={6}
            onChange={(e) =>
              setChampion({
                ...champion,
                ChampionMessage: e.target.value,
              })
            }
            label="Ethical Message"
            fullWidth
            required
            multiline
            style={{ margin: "1rem 0" }}
          />

          <Box style={{ marginBottom: "20px" }}>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={champion?.ChampionImage}
              onUpdate={(fileUrl) =>
                setChampion({
                  ...champion,
                  ChampionImage: fileUrl,
                })
              }
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
              Update
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
