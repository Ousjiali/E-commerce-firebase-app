import { Box } from "@material-ui/core";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AppWrapper } from "../../../Container/AppWrapper";
import { RolesTable } from "../components/RolesTable";
import { RolesConfiguartion } from "../types/Configuration";
import { HRMenu } from "../../Hr/hr-menu";

export const ManageRolesPage = () => {
  const data = new RolesConfiguartion();
  const [staff, setStaff] = React.useState<any[]>();
  const [reload, setReload] = React.useState<any>();
  const query = useQuery<any[]>(
    ["userRoles", reload],
    async () => {
      return await data.getRoles();
    },
    {
      onSuccess(data) {
        setStaff(data);
        return data;
      },
    }
  );

  return (
    <AppWrapper menu={HRMenu} showBackButton={true}>
      <Box>
        <RolesTable
          loading={query?.isLoading}
          roles={staff}
          onUpdate={(value) => setReload((prev) => !prev)}
        />
      </Box>
    </AppWrapper>
  );
};
