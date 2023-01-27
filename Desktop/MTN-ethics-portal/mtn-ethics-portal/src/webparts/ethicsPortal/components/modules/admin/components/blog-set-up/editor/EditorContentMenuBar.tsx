import { MenuItem, Select, Typography } from "@material-ui/core";
import StraightenRoundedIcon from "@material-ui/icons/StraightenRounded";
import * as React from "react";
import { Editor } from "@tiptap/react";
import {
  DoumentEditorButton,
  DoumentEditorButtonGroupWrapper,
} from "./DocumentEditor";
import { ImageMenu } from "./menu/image/ImageMenu";
import { AddTableMenuItem } from "./menu/table/AddTableMenuItem";
import RedoRoundedIcon from "@material-ui/icons/RedoRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import FormatBoldRoundedIcon from "@material-ui/icons/FormatBoldRounded";
import FormatItalicRoundedIcon from "@material-ui/icons/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@material-ui/icons/StrikethroughSRounded";
import FormatClearRoundedIcon from "@material-ui/icons/FormatClearRounded";
import FormatListBulletedRoundedIcon from "@material-ui/icons/FormatListBulletedRounded";
import FormatListNumberedRoundedIcon from "@material-ui/icons/FormatListNumberedRounded";
import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";
import FormatUnderlinedRoundedIcon from "@material-ui/icons/FormatUnderlinedRounded";

export const EditorContentMenuBar = ({ editor }) => {
  const [header, setHeader] = React.useState<string>("0");

  if (!editor) {
    return null;
  }

  const applyHeader = (headerValue) => {};

  // const addImage = React.useCallback(() => {
  //   const url = window.prompt("URL");

  //   if (url) {
  //     editor.chain().focus().setImage({ src: url }).run();
  //   }
  // }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <DoumentEditorButtonGroupWrapper>
        <DoumentEditorButton
          // type="button"
          toolTip="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FormatBoldRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          // type="button"
          toolTip="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FormatItalicRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          // type="button"
          toolTip="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FormatUnderlinedRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          // type="button"
          toolTip="Strike Through"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <StrikethroughSRoundedIcon />
        </DoumentEditorButton>
      </DoumentEditorButtonGroupWrapper>
      <DoumentEditorButtonGroupWrapper>
        <DoumentEditorButton
          toolTip="Clear"
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          <FormatClearRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          toolTip="Clear Nodes"
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          <Typography variant="h6"> clr</Typography>
        </DoumentEditorButton>
      </DoumentEditorButtonGroupWrapper>
      <DoumentEditorButtonGroupWrapper>
        <Select
          style={{
            backgroundColor: "#f0f0f0",
            color: "#353535",
            height: "40px",
            width: "auto",
            borderRadius: "0",
            margin: 0,
            border: "0.5px solid #e2e2e2",
          }}
          defaultValue={header}
          value={header}
          onChange={(e) => {
            setHeader(e.target.value as string);
            applyHeader(header);
          }}
        >
          <MenuItem value={0}>Paragraph</MenuItem>
          <MenuItem value={1}>Header 1</MenuItem>
          <MenuItem value={2}>Header 2</MenuItem>
          <MenuItem value={3}>Header 3</MenuItem>
          <MenuItem value={4}>Header 4</MenuItem>
          <MenuItem value={5}>Header 5</MenuItem>
          <MenuItem value={6}>Header 6</MenuItem>
        </Select>
        {/* </DoumentEditorLongButton> */}
      </DoumentEditorButtonGroupWrapper>
      <DoumentEditorButtonGroupWrapper>
        <DoumentEditorButton
          toolTip="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FormatListBulletedRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          toolTip="Ordered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FormatListNumberedRoundedIcon />
        </DoumentEditorButton>{" "}
        <AddTableMenuItem editor={editor} />
      </DoumentEditorButtonGroupWrapper>
      <DoumentEditorButtonGroupWrapper>
        <DoumentEditorButton
          toolTip="Block Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <FormatQuoteRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          toolTip="Horizontal Rule"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <StraightenRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          toolTip="Hard Break"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          <Typography variant="h6"> {"Br"}</Typography>
        </DoumentEditorButton>{" "}
      </DoumentEditorButtonGroupWrapper>{" "}
      <DoumentEditorButtonGroupWrapper>
        <DoumentEditorButton
          toolTip="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoRoundedIcon />
        </DoumentEditorButton>
        <DoumentEditorButton
          toolTip="Focus"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoRoundedIcon />
        </DoumentEditorButton>{" "}
      </DoumentEditorButtonGroupWrapper>
      <ImageMenu editor={editor} />
    </>
  );
};
