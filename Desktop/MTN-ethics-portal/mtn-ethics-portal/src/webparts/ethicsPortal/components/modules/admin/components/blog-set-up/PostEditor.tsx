import { Box } from "@material-ui/core";
import * as React from "react";
import { BlogContent } from "./BlogContent";
import { DocumentEditor } from "./editor/DocumentEditor";
import "../blog-set-up/editor/DocumentEditor.css";

type Props = {
  onUpdate: React.Dispatch<any>;
  initialContent?: any;
};

export const PostEditor: React.FC<Props> = ({ onUpdate, initialContent }) => {
  return (
    <>
      <Box mt={5} height="300px" width="100%">
        <DocumentEditor
          initialContent={initialContent}
          onChange={(data, type) => onUpdate({ data, type })}
        />
      </Box>
    </>
  );
};
