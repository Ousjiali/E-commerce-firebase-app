import { Box, CircularProgress, colors } from "@material-ui/core";
import TTLink from "@tiptap/extension-link";
import { Editor, EditorContent } from "@tiptap/react";
import * as React from "react";
import { extensions } from "./editor/DocumentEditor";

export const BlogContent: React.FC<{ post }> = ({ post }) => {
  const [editor, setEditor] = React.useState<Editor>();

  React.useEffect(() => {
    try {
      let doc = JSON.parse(post?.data);
      if (doc.doc) {
        doc = doc.doc;
      }
      editor?.destroy();
      setEditor(
        new Editor({
          extensions: [
            ...extensions,
            TTLink.configure({
              openOnClick: false,
              HTMLAttributes: {
                target: "_blank",
              },
            }),
          ],
          editable: false,
          content: doc,
        })
      );
    } catch (error) {
      console.error(error);
    }
    return () => {
      editor?.destroy();
    };
  }, [post]);

  if (!editor) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{ mt: 1, mb: 2 }}
      style={{
        boxSizing: "border-box",
      }}
    >
      <EditorContent editor={editor} />
    </Box>
  );
};
