import * as React from "react";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { sp } from "@pnp/sp";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { successAlert, errorAlert } from "../../../../utils/toast-messages";
import { GalleryData, GalleryForm } from "./forms/GalleryForm";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";

interface ReadOnlyURLSearchParams extends URLSearchParams {
  append: never;
  set: never;
  delete: never;
  sort: never;
}

export const UpdateGalleryPage: React.FC<{ context: WebPartContext }> = ({
  context,
}) => {
  const { search } = useLocation();
  const { uploadId } = useParams();

  const history = useHistory();

  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const [galleryData, setGalleryData] = React.useState<GalleryData>();

  const data = useQuery<GalleryData>(
    ["getUpload"],
    async () => {
      try {
        const data = await sp.web.lists
          .getByTitle("Gallery")
          .items.getById(uploadId)
          .get();
        setGalleryData(data);
      } catch (err) {
        return err;
      }
    },
    {
      enabled: !!uploadId,
    }
  );

  const [type, setType] = React.useState("");
  const queryClient = useQueryClient();
  const toast = useToasts().addToast;
  const mutation = useMutation(
    async () => {
      return await sp.web.lists
        .getByTitle("Gallery")
        .items.getById(uploadId)
        .update(galleryData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["gallery"]);
        successAlert(toast, "Item Updated Successfully").then(() => {
          setGalleryData(null);
          setTimeout(() => {
            history.goBack();
          }, 1000);
        });
      },

      onError: () => {
        errorAlert(toast);
      },
    }
  );

  React.useEffect(() => {
    if (!searchParams) return;
    setType(searchParams.get("type"));
  }, []);

  return (
    <AdminWrapper>
      <Container style={{ height: "100vh" }}>
        <GalleryForm
          galleryData={galleryData}
          buttonLabel="Update"
          onUpdate={(newData) => setGalleryData(newData)}
          context={context}
          isLoading={mutation?.isLoading}
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          accept={
            type === "video"
              ? { "video/mp4": [".mp4"] }
              : { "image/*": [".jpg", ".png", ".jpeg"] }
          }
        />
      </Container>
    </AdminWrapper>
  );
};
