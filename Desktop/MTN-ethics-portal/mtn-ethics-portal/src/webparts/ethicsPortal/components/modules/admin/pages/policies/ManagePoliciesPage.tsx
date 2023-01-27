import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { getAllPolicies } from "./apis/getAllPolicies";
import { PoliciesTable } from "./components/PoliciesTable";
import { useLocation } from "react-router-dom";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";

export interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export const ManagePoliciesPage = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const [policies, setPolicies] = React.useState([]);

  const { data, isLoading, isError } = useQuery<any[]>(
    ["getAllPolicies", searchParams.get("section")],
    getAllPolicies,
    {
      onSuccess: (dt) => {
        if (searchParams.get("section")) {
          const filter = dt?.filter(
            (it) => it?.PolicySection == searchParams.get("section")
          );
          setPolicies(filter);
        } else {
          setPolicies(dt);
        }
      },
    }
  );

  if (isError) return <>An Error Occured...</>;
  return (
    <AdminWrapper>
      <Container style={{ height: "100vh" }}>
        <PoliciesTable
          policies={policies}
          loading={isLoading}
          title={searchParams.get("section")}
        />
      </Container>
    </AdminWrapper>
  );
};
