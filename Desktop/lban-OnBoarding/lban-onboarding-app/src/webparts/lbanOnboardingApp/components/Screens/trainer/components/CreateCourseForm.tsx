import { Box, TextField, Typography, Button } from "@material-ui/core";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as React from "react";
import { FaImage, FaFilePdf, FaVideo } from "react-icons/fa";

import {
  FileInput,
  FileInputImage,
  FileInterface,
} from "../../../Container/Form/FileInput";

import { Course } from "../../employee/training/components/Courses";
import { PreviousCourseModal } from "../modals/PreviousCourseModal";

type Props = {
  course: Course;
  onUpdate: React.Dispatch<Course>;
  context: WebPartContext;
  courses?: any[];
};

export const CreateCourseForm: React.FC<Props> = ({
  course,
  onUpdate,
  context,
  courses,
}) => {
  const [courseResources, setCourseResources] = React.useState<FileInterface[]>(
    []
  );
  const [resource, setResource] = React.useState<FileInterface>();
  const [thumbnail, setThumbnail] = React.useState<string>("");

  React.useMemo(() => {
    if (!courseResources?.length) return;
    onUpdate({
      ...course,
      Resources: courseResources,
    });
    setResource(null);
  }, [courseResources]);

  const [selectPreviousCourse, setSelectPreviousCourse] =
    React.useState<boolean>(false);

  return (
    <Box display="flex" flexDirection="column" style={{ gap: "2rem" }}>
      <Box display="flex" justifyContent="flex-end" my={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setSelectPreviousCourse(true)}
          disabled={courses?.length < 1}
        >
          Course Bank
        </Button>
      </Box>
      <TextField
        label="Course Name"
        fullWidth
        value={course?.Course ?? ""}
        onChange={(e) => {
          onUpdate({
            ...course,
            Course: e.target.value,
          });
        }}
        variant="outlined"
      />
      {courseResources?.length < 7 && (
        <Box my={2}>
          <Typography>Add Course Resources</Typography>
          <FileInput
            context={context}
            fileControl={resource}
            onUpdate={(newResource) => {
              setResource(newResource);
            }}
          />
          {resource && (
            <Box display="flex" justifyContent="flex-end" my={2}>
              <Button
                onClick={() => {
                  setCourseResources([resource, ...courseResources]);
                }}
                variant="contained"
                color="primary"
              >
                Add Resource
              </Button>
            </Box>
          )}
        </Box>
      )}

      {courseResources?.length > 0 && (
        <Box
          style={{
            display: "flex",
            gap: ".5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
          my={2}
        >
          {courseResources.map((file) => {
            return (
              <Box>
                {/image\/.+/i.test(file?.type) ? (
                  <FaImage className="icon" />
                ) : /application\/+pdf/i.test(file?.type) ? (
                  <FaFilePdf className="icon" />
                ) : (
                  <FaVideo className="icon" />
                )}
              </Box>
            );
          })}
        </Box>
      )}
      <Box my={1}>
        <Typography>Choose Course Thumbnail</Typography>
        <FileInputImage
          context={context}
          file={thumbnail}
          onUpdate={(newThumbNail) => {
            setThumbnail(newThumbNail);
            onUpdate({
              ...course,
              ThumbNail: newThumbNail,
            });
          }}
        />
      </Box>
      {selectPreviousCourse && (
        <PreviousCourseModal
          open={true}
          onClose={(items) => {
            setSelectPreviousCourse(false);
            if (!!items) {
              onUpdate(items);
            }
          }}
          courses={courses}
        />
      )}
    </Box>
  );
};
