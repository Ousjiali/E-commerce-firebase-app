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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { Policy } from "../../../employee/components/PolicyLandingComponent";
import { AdminWrapper } from "../../../shared/components/app-wrapper/admin/AdminWrapper";
import { CancelButton } from "../../../shared/components/buttons/CancelButton";
import { FileUpload } from "../../../shared/components/input-fields/FileUpload";
import { ButtonContainerStyles } from "../../../shared/components/TableCompHelpers";
import { PostEditor } from "../../components/blog-set-up/PostEditor";
import { BlogSectionEnums } from "../../components/blog-set-up/sections/blog-section-enums/blog-section-enums";
import {
  CreateSection,
  PostCreateSection,
  PostOptions,
  PostOptionsInterfacce,
} from "../../components/blog-set-up/sections/CreateSection";
import { Container } from "../ethics-policies-management/components/PolicyDetailWrapper";
import { editPost } from "./apis/editPost";
import { getPost } from "./apis/getAllPosts";
import { ReadOnlyURLSearchParams } from "../policies/ManagePoliciesPage";
import { useLocation } from "react-router-dom";

export const UpdateBlogPostPage: React.FC<{ context: WebPartContext }> = ({
  context,
}) => {
  const { postId } = useParams();

  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search) as ReadOnlyURLSearchParams,
    [search]
  );

  const queryClient = useQueryClient();
  const toast = useToasts().addToast;

  const [file, setFile] = React.useState("");
  const [policySection, setPolicySection] = React.useState<Policy>();
  const [postSection, setPostSection] = React.useState<PostOptionsInterfacce>();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState<any>();
  const [postTitle, setPostTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await sp.web.lists
          .getByTitle("Post")
          .items.getById(postId)
          .select(
            "content, PostTitle, PostSection, FileUrl, SectionId/ID, SectionId/PolicyTitle"
          )
          .expand("SectionId")
          .get();
        setPostTitle(res?.PostTitle);
        setTitle(res?.PostTitle);
        setFile(res?.FileUrl);
        setPolicySection({
          Content: "",
          Id: res?.SectionId["ID"],
          ImageUrl: "",
          PolicyTitle: res?.SectionId["PolicyTitle"],
        });
        setPostSection({
          label: PostOptions.find((it) => it.value === res?.PostSection)?.label,
          value: res?.PostSection,
        });
        const con = JSON.parse(res?.content);
        if (con?.data) {
          setContent(con?.data);
        } else {
          setContent(con);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [postId]);

  const history = useHistory();

  const mutation = useMutation(
    () =>
      editPost(postId, {
        PostTitle: postTitle,
        content: JSON.stringify(content),
        PostSection: postSection?.value,
        FileUrl: file,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["policyWriteUps"],
        });

        successAlert(toast, "Article Updated Successfully").then(() => {
          history.goBack();
        });
      },
      onError: () => {
        errorAlert(toast);
      },
    }
  );

  if (loading) return <>Loading...</>;

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
          <Typography>
            Update Blog Post | <strong>{title}</strong>
          </Typography>
          <TextField
            variant="outlined"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            label="Post Title"
            fullWidth
            required
            style={{ margin: "1rem 0" }}
          />
          <Box>
            <Typography>Upload Image</Typography>
            <FileUpload
              fileControl={file ?? ""}
              onUpdate={(fileUrl) => setFile(fileUrl)}
              context={context}
            />
          </Box>

          {/* <Box my={2}>
            <CreateSection
              section={policySection}
              onUpdate={(section) => setPolicySection(section)}
              label="Article Section"
            />
          </Box> */}
          <Box my={2}>
            {(() => {
              if (searchParams.get("type") === "policy") return <></>;
              return (
                <PostCreateSection
                  label="Article Section"
                  section={postSection}
                  onUpdate={(val) => setPostSection(val)}
                />
              );
            })()}
          </Box>
          <Box my={2} style={{ overflowY: "auto" }}>
            <PostEditor
              initialContent={content}
              onUpdate={(content) => setContent(content)}
            />
          </Box>

          <Box
            style={{
              ...ButtonContainerStyles,
            }}
          >
            <CancelButton isLoading={mutation.isLoading} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={
                mutation.isLoading ? <CircularProgress size={20} /> : <Add />
              }
              disabled={mutation.isLoading}
            >
              Update
            </Button>
          </Box>
        </form>
      </Container>
    </AdminWrapper>
  );
};
