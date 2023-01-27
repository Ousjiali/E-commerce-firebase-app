import {
  Typography,
  Box,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { sp } from "@pnp/sp";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React from "react";
import { WebContext } from "../../../../EthicsPortal";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { PostEditor } from "../../components/blog-set-up/PostEditor";
import { ReadOnlyURLSearchParams } from "../policies/ManagePoliciesPage";
import { PostsTable } from "./components/PostsTable";
import { useLocation } from "react-router-dom";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";

type Props = {
  posts: any[];
  isLoading: boolean;
  policyId: number;
};

interface Post {
  Title: string;
  content: any;
  File: string;
}

export const CreatePostInPolicy: React.FC<Props> = ({
  posts,
  isLoading,
  policyId,
}) => {
  const { context } = React.useContext(WebContext);
  const [component, setComponent] = React.useState("form");
  const [post, setPost] = React.useState<Post>();
  const [content, setContent] = React.useState<any>();
  const queryClient = useQueryClient();
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );
  if (!searchParams.get("filter")) {
    return <></>;
  }
  const submitHandler = async () => {
    return sp.web.lists.getByTitle("Post").items.add({
      ["SectionIdId"]: policyId,
      PostTitle: post?.Title,
      content: JSON.stringify(content),
      PostSection: searchParams.get("filter"),
      FileUrl: post?.File,
    });
  };
  const mutation = useMutation(submitHandler, {
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ["policyWriteUps"],
        })
        .then(() => {
          successAlert(null, "Article Created Successfully").then(() => {
            setComponent("table");
            setPost(null);
          });
        });
    },
    onError: () => {
      errorAlert();
    },
  });
  return (
    <Box minHeight="100vh">
      <Box display="flex" justifyContent="flex-start">
        <Select
          value={component}
          onChange={(e) => setComponent(e.target.value as string)}
        >
          <MenuItem value="form">Upload Article</MenuItem>
          <MenuItem value="table">Manage Articles</MenuItem>
        </Select>
      </Box>
      {(() => {
        if (component === "form") {
          return (
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
              <TextField
                variant="outlined"
                value={post?.Title || ""}
                onChange={(e) =>
                  setPost({
                    ...post,
                    Title: e.target.value,
                  })
                }
                label="Article Title"
                fullWidth
                required
                style={{ margin: "1rem 0" }}
              />
              <Box>
                <Typography>Upload Image</Typography>
                <FileUpload
                  fileControl={post?.File || ""}
                  onUpdate={(fileUrl) => {
                    setPost({
                      ...post,
                      File: fileUrl,
                    });
                  }}
                  context={context}
                />
              </Box>

              <Box my={2} style={{ overflowY: "auto" }}>
                <PostEditor
                  onUpdate={(content) => {
                    setContent(content);
                  }}
                />
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
                    mutation.isLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <Add />
                    )
                  }
                  disabled={mutation.isLoading}
                >
                  Create
                </Button>
              </Box>
            </form>
          );
        } else {
          return (
            <PostsTable
              posts={posts}
              loading={isLoading}
              showTitle={false}
              showSection={false}
              section="policy"
            />
          );
        }
      })()}
    </Box>
  );
};
