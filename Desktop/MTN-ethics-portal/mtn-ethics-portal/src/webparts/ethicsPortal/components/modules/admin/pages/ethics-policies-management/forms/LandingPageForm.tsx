import { Box, CircularProgress, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as React from "react";
import { WebContext } from "../../../../../EthicsPortal";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { FileUpload } from "../../../../shared/components/input-fields/FileUpload";
import { PostEditor } from "../../../components/blog-set-up/PostEditor";
import { useHistory } from "react-router-dom";
import { CancelButton } from "../../../../shared/components/buttons/CancelButton";
import { ButtonContainerStyles } from "../../../../shared/components/TableCompHelpers";

type Props = {
  policy: Policy;
  onUpdate: React.Dispatch<Policy>;
  isLoading: boolean;
  label?: string;
  onSubmit: (e: React.FormEvent) => void;
  content?: any;
  setContent?: (content: any) => void;
};

export const LandingPageForm: React.FC<Props> = ({
  policy,
  onUpdate,
  isLoading,
  label = "Update",
  content,
  onSubmit,
  setContent,
}) => {
  const { context } = React.useContext(WebContext);
  const history = useHistory();
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e);
      }}
      style={{
        width: "80%",
        margin: "auto",
        boxSizing: "border-box",
        padding: "1.5rem 1rem",
      }}
    >
      <Box>
        <FileUpload
          fileControl={policy?.ImageUrl ?? ""}
          onUpdate={(fileUrl) => {
            onUpdate({
              ...policy,
              ImageUrl: fileUrl,
            });
          }}
          context={context}
        />
      </Box>
      <Box my={2} style={{ overflowY: "auto" }}>
        <PostEditor
          onUpdate={(content) => setContent(content)}
          initialContent={content}
        />
      </Box>

      <Box
        style={{
          ...ButtonContainerStyles,
        }}
      >
        <CancelButton />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          endIcon={
            isLoading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              <Add />
            )
          }
          disabled={isLoading}
        >
          {label}
        </Button>
      </Box>
    </form>
  );
};
