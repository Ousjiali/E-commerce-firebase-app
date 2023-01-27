import React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { useQuery } from "@tanstack/react-query";
import { sp } from "@pnp/sp";
import { QuickLinksTable } from "./components/QuickLinksTable";

export const QuickLinkSetUpPage = () => {
  const [items, setItems] = React.useState([]);
  const { isLoading } = useQuery(
    ["quickLinks"],
    () => {
      return sp.web.lists.getByTitle("QuickLinks").items.getAll();
    },
    {
      onSuccess(data) {
        setItems(data);
      },
    }
  );
  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <QuickLinksTable loading={isLoading} quickLinkItems={items} />
      </Container>
    </AdminWrapper>
  );
};
