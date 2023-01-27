import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { CarouselTable } from "./components/CarouselTable";

export const ManageCarouselPage = () => {
  const [items, setItems] = React.useState([]);
  const { isLoading } = useQuery(
    ["carouselItems"],
    () => {
      return sp.web.lists.getByTitle("CarouselItems").items.getAll();
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
        <CarouselTable loading={isLoading} carouselItems={items} />
      </Container>
    </AdminWrapper>
  );
};
