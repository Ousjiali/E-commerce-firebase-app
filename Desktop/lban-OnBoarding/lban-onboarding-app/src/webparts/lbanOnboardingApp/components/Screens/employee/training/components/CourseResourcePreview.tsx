import { Box } from "@material-ui/core";
import * as React from "react";
import { FaFilePdf, FaImage, FaVideo } from "react-icons/fa";
import { FileInterface } from "../../../../Container/Form/FileInput";

type Props = {
  onClick: () => void;
  file: FileInterface;
};

export const CourseResourcePreview: React.FC<Props> = ({ onClick, file }) => {
  return (
    <Box
      onClick={() => {
        onClick();
      }}
      style={{ cursor: "pointer" }}
    >
      {/image\/.+/i.test(file?.type) ? (
        <FaImage className="icon" />
      ) : /application\/+pdf/i.test(file?.type) ? (
        <FaFilePdf className="icon" />
      ) : (
        <FaVideo className="icon" />
      )}
    </Box>
  );
};
