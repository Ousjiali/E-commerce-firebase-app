import { WebPartContext } from "@microsoft/sp-webpart-base";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { sp } from "@pnp/sp";
import {
  errorAlert,
  successAlert,
} from "../../../../../../utils/toast-messages";
import { FileUpload } from "../../../../../shared/components/input-fields/FileUpload";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { AdminWrapper } from "../../../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Add } from "@material-ui/icons";
import { ButtonContainerStyles } from "../../../../../shared/components/TableCompHelpers";
import { CancelButton } from "../../../../../shared/components/buttons/CancelButton";
import { Container } from "../../../ethics-policies-management/components/PolicyDetailWrapper";

type Props = {
  context: WebPartContext;
};

export const PolicyBreachesForm: React.FC<Props> = ({ context }) => {
  const [file, setFile] = React.useState("");
  const [policyBreachesTitle, setPolicyBreachesTitle] = React.useState("");
  const [writeUp, setWriteUp] = React.useState("");
  const queryClient = useQueryClient();
  const [policyBreach, setPolicyBreach] = React.useState<any>();
  const toast = useToasts().addToast;

  const submitHandler = async () => {
    return await sp.web.lists.getByTitle("PolicyBreaches").items.add({
      PolicyBreachImage: file,
      PolicyBreachTitle: policyBreachesTitle,
      PolicyBreachWriteUp: writeUp,
    });
  };
  const updateHandler = async () => {
    return await sp.web.lists
      .getByTitle("PolicyBreaches")
      .items.getById(policyBreach?.ID)
      .update({
        PolicyBreachImage: policyBreach?.PolicyBreachImage,
        PolicyBreachTitle: policyBreach?.PolicyBreachTitle,
        PolicyBreachWriteUp: policyBreach?.PolicyBreachWriteUp,
      });
  };

  React.useEffect(() => {
    sp.web.lists
      .getByTitle("PolicyBreaches")
      .items.get()
      .then((items) => {
        setPolicyBreach(items[items?.length - 1]);
      });
  }, []);

  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllPolicyBreaches"]);
      successAlert(toast, "Policy Breach Created Successfully");
      setFile("");
      setPolicyBreachesTitle("");
      setWriteUp("");
    },
    onError: () => {
      errorAlert(toast);
    },
  });
  const update = useMutation(updateHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllPolicyBreaches"]);
      successAlert(toast, "Policy Breach Updated Successfully").then(() => {});
    },
    onError: () => {
      errorAlert(toast);
    },
  });

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        {policyBreach ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              update.mutate();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginTop: "1rem",
              boxSizing: "border-box",
              padding: "1.5rem 2rem",
            }}
          >
            <Typography>Policy Breach Title</Typography>
            <TextField
              variant="outlined"
              value={policyBreach?.PolicyBreachTitle}
              onChange={(e) =>
                setPolicyBreach({
                  ...policyBreach,
                  PolicyBreachTitle: e.target.value,
                })
              }
              label="Enter Policy Breach Title"
              fullWidth
              required
              //   style={{ margin: "1rem 0" }}
            />
            <Box style={{ marginBottom: "20px" }}>
              <Typography>Upload Image File</Typography>
              <FileUpload
                fileControl={policyBreach?.PolicyBreachImage}
                onUpdate={(fileUrl) =>
                  setPolicyBreach({
                    ...policyBreach,
                    PolicyBreachImage: fileUrl,
                  })
                }
                context={context}
              />
            </Box>
            <Typography>Policy Breach Write Up</Typography>
            <TextField
              label="Write Up"
              value={policyBreach?.PolicyBreachWriteUp}
              fullWidth
              required
              variant="outlined"
              onChange={(e) =>
                setPolicyBreach({
                  ...policyBreach,
                  PolicyBreachWriteUp: e.target.value,
                })
              }
              multiline
              minRows={10}
              //   style={{ margin: "1rem 0" }}
            />

            <Box
              style={{
                ...ButtonContainerStyles,
              }}
            >
              <CancelButton />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={
                  update.isLoading ? <CircularProgress size={20} /> : <Add />
                }
                disabled={update.isLoading}
              >
                Update
              </Button>
            </Box>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (policyBreach) {
                update.mutate();
              } else mutation.mutate();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <Typography>Policy Breach Title</Typography>
            <TextField
              variant="outlined"
              value={policyBreach?.PolicyBreachTitle || policyBreachesTitle}
              onChange={(e) => setPolicyBreachesTitle(e.target.value)}
              label="Enter Policy Breach Title"
              fullWidth
              required
              //   style={{ margin: "1rem 0" }}
            />
            <Box style={{ marginBottom: "20px" }}>
              <Typography>Upload Image File</Typography>
              <FileUpload
                fileControl={policyBreach?.PolicyBreachImage || file}
                onUpdate={(fileUrl) => setFile(fileUrl)}
                context={context}
              />
            </Box>
            <Typography>Policy Breach Write Up</Typography>
            <TextField
              label="Write Up"
              value={policyBreach?.PolicyBreachWriteUp || writeUp}
              fullWidth
              required
              variant="outlined"
              onChange={(e) => setWriteUp(e.target.value)}
              multiline
              minRows={10}
              //   style={{ margin: "1rem 0" }}
            />

            <Box
              style={{
                ...ButtonContainerStyles,
              }}
            >
              <CancelButton />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={
                  mutation.isLoading || update.isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Add />
                  )
                }
                disabled={mutation.isLoading || update.isLoading}
              >
                {policyBreach ? "Update" : "Create"}
              </Button>
            </Box>
          </form>
        )}
      </Container>
    </AdminWrapper>
  );
};
