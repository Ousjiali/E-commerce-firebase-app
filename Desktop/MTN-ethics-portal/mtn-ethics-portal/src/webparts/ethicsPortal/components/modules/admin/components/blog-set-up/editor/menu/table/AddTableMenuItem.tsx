import * as React from "react";
import { DoumentEditorButton } from "../../DocumentEditor";
import { TableDefinitionModal } from "./TableDefinitionModal";
import GridOnRoundedIcon from "@material-ui/icons/GridOnRounded";

export const AddTableMenuItem: React.FC<{
  editor;
}> = ({ editor }) => {
  const [open, setOpen] = React.useState(false);

  const addTable = React.useCallback(() => {
    setOpen(true);
  }, [editor]);

  return (
    <>
      {open && (
        <TableDefinitionModal
          open={open}
          close={(result) => {
            setOpen(false);
            if (!result) return;
            editor.chain().focus().insertTable(result).run();
          }}
        />
      )}
      <DoumentEditorButton
        toolTip="Add Table"
        onClick={addTable}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <GridOnRoundedIcon />
      </DoumentEditorButton>
    </>
  );
};
