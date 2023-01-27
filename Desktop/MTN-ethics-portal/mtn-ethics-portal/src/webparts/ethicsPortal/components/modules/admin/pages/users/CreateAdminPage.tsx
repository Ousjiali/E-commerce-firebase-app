import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../shared/components/TableCompHelpers";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { fetchAdmins } from "./apis/fetchAdmin";
import { StaffData } from "./components/PeoplePicker";
import { User, UserForm } from "./forms/UserForm";
import { ManageAdminPage } from "./ManageAdminPage";

export const CreateAdminPage = () => {
  const [admin, setAdmin] = React.useState<StaffData>();
  const [component, setComponent] = React.useState("form");
  const res = useQuery<StaffData[]>(["getAdmins"], fetchAdmins);
  const addAdminHandler = async () => {
    if (!admin?.Email && !admin?.DisplayName) return;

    try {
      const res = await sp.web.lists.getByTitle("Admin").items.add({
        StaffName: admin?.DisplayName,
        StaffEmail: admin?.Email,
      });
      return res;
    } catch (e) {
      return e;
    }
  };
  const toast = useToasts().addToast;
  const queryClient = useQueryClient();
  const mutation = useMutation(() => addAdminHandler(), {
    onSuccess: () => {
      setAdmin(null);
      queryClient.invalidateQueries(["getAdmins"], { exact: true });
      successAlert(toast, "Admin Created Successfully");
    },
    onError: () => {
      errorAlert(toast);
    },
  });

  return (
    <AdminWrapper>
      <Container
        style={{
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          height: "100vh",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Select
            value={component}
            onChange={(e) => setComponent(e.target.value as string)}
          >
            <MenuItem value="form">Add Admin</MenuItem>
            <MenuItem value="table">Manage Admins</MenuItem>
          </Select>
          <Box></Box>
        </Box>
        {(() => {
          if (component === "form") {
            return (
              <Box>
                <UserForm user={admin} onUpdate={(user) => setAdmin(user)} />
                <Box
                  style={{
                    ...ButtonContainerStyles,
                  }}
                >
                  <CancelButton />
                  <Button
                    disabled={!admin?.Email && !admin?.DisplayName}
                    onClick={() => mutation.mutate()}
                    endIcon={
                      mutation.isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <></>
                      )
                    }
                    variant="contained"
                    color="primary"
                  >
                    Create Admin
                  </Button>
                </Box>
              </Box>
            );
          }

          return (
            <Box>
              <ManageAdminPage users={res?.data} isLoading={res?.isLoading} />
            </Box>
          );
        })()}
      </Container>
    </AdminWrapper>
  );
};
