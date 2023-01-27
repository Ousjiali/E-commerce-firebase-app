import { Box, Dialog, DialogContent } from "@material-ui/core";
import * as React from "react";
import { Course } from "../../Screens/employee/training/components/Courses";
import { ViewerWrapper } from "./ViewerWrapper";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
  course?: Course;
};

export const DocumentViewer: React.FC<Props> = ({
  open,
  onClose,
  url,
  course,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogContent>
        <Box
          sx={{
            width: "100%",
            height: "80vh",
          }}
        >
          <ViewerWrapper course={course} data={url} onClose={onClose}>
            {url && (
              <iframe
                src={url}
                title="file"
                width="100%"
                height="100%"
              ></iframe>
            )}
          </ViewerWrapper>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
