import * as React from "react";

export const TableMenu: React.FC<{
  editor;
}> = ({ editor }) => {
  if (!editor?.can().deleteTable()) {
    return <></>;
  }
  return (
    <>
      <button
        type="button"
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      >
        addColumnBefore
      </button>
      <button
        type="button"
        disabled={!editor.can().addColumnAfter()}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        addColumnAfter
      </button>
      <button
        type="button"
        disabled={!editor.can().deleteColumn()}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        deleteColumn
      </button>
      <button
        type="button"
        disabled={!editor.can().addRowBefore()}
        onClick={() => editor.chain().focus().addRowBefore().run()}
      >
        addRowBefore
      </button>
      <button
        type="button"
        disabled={!editor.can().addRowAfter()}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        addRowAfter
      </button>
      <button
        type="button"
        disabled={!editor.can().deleteRow()}
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        deleteRow
      </button>
      <button
        type="button"
        disabled={!editor.can().mergeCells()}
        onClick={() => editor.chain().focus().mergeCells().run()}
      >
        mergeCells
      </button>
      <button
        type="button"
        disabled={!editor.can().splitCell()}
        onClick={() => editor.chain().focus().splitCell().run()}
      >
        splitCell
      </button>
      <button
        type="button"
        disabled={!editor.can().toggleHeaderColumn()}
        onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
      >
        toggleHeaderColumn
      </button>
      <button
        type="button"
        disabled={!editor.can().toggleHeaderRow()}
        onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      >
        toggleHeaderRow
      </button>
      <button
        type="button"
        disabled={!editor.can().toggleHeaderCell()}
        onClick={() => editor.chain().focus().toggleHeaderCell().run()}
      >
        toggleHeaderCell
      </button>
      <button
        type="button"
        disabled={!editor.can().mergeOrSplit()}
        onClick={() => editor.chain().focus().mergeOrSplit().run()}
      >
        mergeOrSplit
      </button>
      <button
        type="button"
        disabled={!editor.can().goToNextCell()}
        onClick={() => editor.chain().focus().goToNextCell().run()}
      >
        goToNextCell
      </button>
      <button
        type="button"
        disabled={!editor.can().goToPreviousCell()}
        onClick={() => editor.chain().focus().goToPreviousCell().run()}
      >
        goToPreviousCell
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        deleteTable
      </button>
    </>
  );
};
