import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";
import { PostEditor } from "../../components/blog-set-up/PostEditor";
import {
  PostCreateSection,
  PostOptionsInterfacce as PostOptionsInterface,
} from "../../components/blog-set-up/sections/CreateSection";
import { useLocation } from "react-router-dom";
import { ReadOnlyURLSearchParams } from "../policies/ManagePoliciesPage";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";

type Props = {
  context: WebPartContext;
};

export const CreateBlogPost: React.FC<Props> = ({ context }) => {
  const [file, setFile] = React.useState("");
  const [section, setSection] = React.useState<PostOptionsInterface>();
  const [content, setContent] = React.useState<any>();
  const [postTitle, setPostTitle] = React.useState("");
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  const toast = useToasts().addToast;
  const submitHandler = async () => {
    return await sp.web.lists.getByTitle("Post").items.add({
      PostTitle: postTitle,
      content: JSON.stringify(content),
      PostSection: section?.value,
      FileUrl: file,
    });
  };

  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getPosts"],
      });
      setFile(null);
      setPostTitle("");
      setSection(null);
      setContent(null);
      successAlert(toast, "Article Created Successfully");
    },
    onError: () => {
      errorAlert(
        toast,
        "An error occurred while creating the article. Please try again"
      );
    },
  });

  return (
    <AdminWrapper>
      <Container style={{ minHeight: "100vh" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          style={{
            width: "80%",
            margin: "auto",
            boxSizing: "border-box",
            padding: "1.5rem 1rem",
          }}
        >
          <Typography>Create Blog Post</Typography>
          <TextField
            variant="outlined"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            label="Blog Title"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />
          <Box>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={file}
              onUpdate={(fileUrl) => setFile(fileUrl)}
              context={context}
            />
          </Box>

          <Box my={2}>
            <PostCreateSection
              section={section}
              onUpdate={(val) => {
                setSection(val);
              }}
              label="Blog Section"
            />
          </Box>
          <Box my={2} style={{ overflowY: "auto" }}>
            <PostEditor onUpdate={(content) => setContent(content)} />
          </Box>

          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CancelButton isLoading={mutation.isLoading} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={
                mutation.isLoading ? <CircularProgress size={20} /> : <Add />
              }
              disabled={mutation.isLoading}
            >
              Create
            </Button>
          </Box>
        </form>
      </Container>
    </AdminWrapper>
  );
};
