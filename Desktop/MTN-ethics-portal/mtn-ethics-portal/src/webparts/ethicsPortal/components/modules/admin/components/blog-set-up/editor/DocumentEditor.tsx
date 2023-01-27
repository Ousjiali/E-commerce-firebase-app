import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./DocumentEditor.css";
import { EditorContentMenuBar } from "./EditorContentMenuBar";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { TableMenu } from "./menu/table/TableMenu";
import { MouseEventHandler } from "react";
import { Box, IconButton, styled, Tooltip } from "@material-ui/core";
import Blockquote from "@tiptap/extension-blockquote";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
import * as React from "react";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export const extensions = [
  StarterKit,
  Image,
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  Underline,
  Blockquote,
  // Document,
  // Text,
];

export const DocumentEditor: React.FC<{
  initialContent?: string;
  onChange: (content: string, contentType: string) => void;
}> = ({ initialContent, onChange }) => {
  let content = null;
  if (initialContent) {
    try {
      content = JSON.parse(initialContent);
      if (content.doc) {
        content = content.doc;
      }
    } catch (error) {}
  }
  const editor = useEditor({
    extensions: [
      ...extensions,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: (props) =>
      onChange(JSON.stringify(props.editor.getJSON()), "remirror/json"),
    autofocus: true,
    injectCSS: true,
  });

  return (
    <>
      <DoumentEditorButtonWrapper>
        <EditorContentMenuBar editor={editor} />
        <TableMenu editor={editor} />
      </DoumentEditorButtonWrapper>
      <Box
        style={{
          minHeight: "100px",
          overflow: "auto",
          backgroundColor: "#fafafa",
          border: "0.5px solid #e2e2e2",
          display: "flex",
          justifyContent: "center",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <EditorContent editor={editor} style={{ width: "100%" }} />
      </Box>
    </>
  );
};

export const DoumentEditorButtonWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    display: "flex",
    gap: "1rem",
    borderRadius: "1rem, 1rem, 0,0",
    backgroundColor: "#fafafa",
    border: "0.5px solid #e2e2e2",
    padding: "1.5rem",
    flexWrap: "wrap",
  },
}));
export const DoumentEditorButtonGroupWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    borderRadius: "0.4rem",
    overflow: "hidden",
  },
}));

export const DoumentEditorLongButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    backgroundColor: "#f0f0f0",
    color: "#353535",
    height: "40px",
    width: "auto",
    borderRadius: "0",
    margin: 0,
    border: "0.5px solid #e2e2e2",
  },
}));

export const DoumentEditorButton: React.FC<{
  toolTip?: string;
  children: unknown;
  onClick: MouseEventHandler<unknown> | undefined;
  className?: string;
}> = ({ toolTip, children, onClick, className }) => {
  return (
    <Tooltip title={toolTip || ""}>
      <IconButton
        onClick={onClick}
        style={{
          backgroundColor: "#f0f0f0",
          color: "#353535",
          height: "40px",
          width: "40px",
          borderRadius: "0",
          margin: 0,
          border: "0.5px solid #e2e2e2",
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
};
