import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { AdminWrapper } from "../../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../components/PolicyDetailWrapper";
import { PolicyTable } from "../components/PolicyTable";

export const ManageAdminPolicyPage = () => {
  const [policies, setPolicies] = React.useState<Policy[]>([]);
  const { isLoading } = useQuery<Policy[]>(
    ["adminPolicies"],
    async () => {
      return await sp.web.lists
        .getByTitle("PolicyConfiguration")
        .items.getAll();
    },
    {
      onSuccess(data) {
        setPolicies(data);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  return (
    <AdminWrapper>
      <Container style={{ height: "100vh" }}>
        <PolicyTable policies={policies} loading={isLoading} />
      </Container>
    </AdminWrapper>
  );
};
