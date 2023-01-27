import {
  Button,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";

type TableDefinition = {
  row: number;
  column: number;
  withHeaderRow?: boolean;
};

export const TableDefinitionModal: React.FC<{
  open: boolean;
  data?: TableDefinition;
  close: (result?: TableDefinition) => void;
}> = ({ open, data, close }) => {
  const [rowControl, setRowControl] = React.useState<any>(data?.row || 2);
  const [columnControl, setColumnControl] = React.useState<any>(
    data?.column || 2
  );
  const [withHeaderRowControl, setwithHeaderRowControl] = React.useState(
    data?.withHeaderRow
  );

  const save = () => {
    close({
      row: rowControl,
      column: columnControl,
      withHeaderRow: withHeaderRowControl,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => close()}
      scroll={"paper"}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      maxWidth={"sm"}
      fullWidth={true}
    >
      <DialogTitle>
        Table
        <IconButton
          aria-label="close"
          onClick={() => close()}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          id="tableDefinitionForm"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            save();
          }}
        >
          <TextField
            value={rowControl}
            type="number"
            label="Number of Rows"
            autoFocus
            onChange={(e) => setRowControl(e.target.value)}
          />
          <TextField
            value={columnControl}
            type="number"
            label="Number of Columns"
            autoFocus
            onChange={(e) => setColumnControl(e.target.value)}
          />

          <input form="tableDefinitionForm" hidden type="submit" />
        </form>
      </DialogContent>
      <DialogActions style={{ maxHeight: "100px" }}>
        <Button onClick={() => save()}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};
