import { Box } from "@material-ui/core";
import * as React from "react";
import { FileInterface } from "../../../../Container/Form/FileInput";
import { Course } from "./Courses";
import "../styles/styles.css";
import { CourseResourcePreview } from "./CourseResourcePreview";
import { DocumentViewer } from "../../../../Container/document-viewer/DocumentViewer";

type Props = {
  course: Course;
};

export const CourseResources: React.FC<Props> = ({ course }) => {
  const [fileToView, setFileToView] = React.useState<FileInterface>();
  const resources = course?.Resources;

  return (
    <Box
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "1rem",
        boxSizing: "border-box",
        padding: "1rem",
        width: "100%",
      }}
    >
      {JSON.parse(resources)?.map((item) => {
        return (
          <CourseResourcePreview
            file={item}
            onClick={() => setFileToView(item)}
          />
        );
      })}
      {fileToView && (
        <DocumentViewer
          course={course}
          onClose={() => setFileToView(null)}
          open={true}
          url={fileToView?.url}
        />
      )}
    </Box>
  );
};
