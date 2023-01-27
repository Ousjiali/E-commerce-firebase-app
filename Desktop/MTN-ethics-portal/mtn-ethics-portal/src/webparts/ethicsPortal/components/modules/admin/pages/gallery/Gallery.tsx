import { Box } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { GalleryTable } from "./components/GalleryTable";
import { GalleryData } from "./forms/GalleryForm";

export const Gallery = () => {
  const [gallery, setGalleryData] = React.useState<GalleryData[]>([]);
  const { data, isLoading } = useQuery<GalleryData[]>(
    ["gallery"],
    async () => {
      return await sp.web.lists.getByTitle("Gallery").items.getAll();
    },
    {
      onSuccess(data) {
        setGalleryData(data);
      },
    }
  );
  return (
    <AdminWrapper>
      <Container style={{ height: "100vh" }}>
        <GalleryTable gallery={gallery} isLoading={isLoading} />
      </Container>
    </AdminWrapper>
  );
};
