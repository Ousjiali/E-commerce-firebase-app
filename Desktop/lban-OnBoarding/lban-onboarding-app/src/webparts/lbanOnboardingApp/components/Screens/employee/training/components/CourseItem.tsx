import {
  Avatar,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  colors,
  Typography,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import * as React from "react";
import { Course } from "./Courses";

type Props = {
  course: Course;
};

export const CourseItem: React.FC<Props> = ({ course }) => {
  const history = useHistory();
  return (
    <CourseItemContainer>
      <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar
          src={`${course?.ThumbNail}`}
          style={{
            width: "80px",
            height: "80px",
          }}
        />
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {course?.Course}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ItemButton
          onClick={() => history.push(`/employee/${course?.Id}/training`)}
          size="large"
        >
          Start Course
        </ItemButton>
      </Box>
    </CourseItemContainer>
  );
};

const CourseItemContainer = styled(Box)<BoxProps>(() => ({
  background: "#FFFFFF",
  boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "26px",
  width: "auto",
  height: "250px",
  display: "flex",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "1rem",
  justifyContent: "space-between",
}));
const ItemButton = styled(Button)<ButtonProps>(() => ({
  background: colors.purple[400],
  boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "26px",
  textTransform: "none",
  color: "#fff",
  "&:hover": {
    background: colors.purple[600],
  },
}));
