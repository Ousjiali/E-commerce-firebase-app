import * as React from "react";
import { FileInterface } from "../../../Container/Form/FileInput";
import { Course } from "../../employee/training/components/Courses";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  FormControlLabel,
} from "@material-ui/core";
import { CourseResources } from "../../employee/training/components/CourseResources";

type Props = {
  open: boolean;
  onUpdate?: React.Dispatch<FileInterface>;
  onClose: (items?: Course) => void;
  courses;
};

export const PreviousCourseModal: React.FC<Props> = ({
  onClose,
  open,
  courses,
}) => {
  const [selection, setSelection] = React.useState<Course>();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box minHeight="450px">
          {courses?.map((course, index) => {
            return (
              <Box
                my={2}
                p={2}
                style={{
                  backgroundColor: "#f9f9f9",
                  boxSizing: "border-box",
                  borderRadius: "10px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ gap: ".5rem" }}
                  my={0.5}
                >
                  <Box>{index + 1}</Box>

                  <input
                    type="radio"
                    value={selection?.Id ?? ""}
                    checked={selection?.Id === course?.Id ? true : null}
                    onChange={(e) => {
                      setSelection(course);
                    }}
                  />
                  <Typography>{course?.Course}</Typography>
                </Box>

                <Box borderTop="1px solid #e6e6e6">
                  <CourseResources course={course} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onClose(selection);
          }}
          disabled={!selection}
          color="primary"
          variant="contained"
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};
