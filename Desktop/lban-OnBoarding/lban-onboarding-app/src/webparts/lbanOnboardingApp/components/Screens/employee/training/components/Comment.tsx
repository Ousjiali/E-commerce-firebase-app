import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { format } from "timeago.js";
import { User } from "./CourseComments";

type Props = {
  comment;
  user: User;
};

export const CourseComment: React.FC<Props> = ({ comment, user }) => {
  return (
    <PostCommentContainer>
      <Box
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <Avatar
            src={user?.PictureUrl ?? ""}
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            {user?.DisplayName || "N/A"}
          </Typography>
        </Box>

        <Typography variant="body2" style={{ fontWeight: "bold" }}>
          {comment?.Comment}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
      >
        {format(comment?.Created)}
      </Typography>
    </PostCommentContainer>
  );
};

export const PostCommentContainer = styled(Box)({
  background: "#FFFFFF",
  boxShadow: "0px 7px 20px 6px rgba(0, 0, 0, 0.06)",
  borderRadius: "20px",
  width: "100%",
  minHeight: "90px",
  boxSizing: "border-box",
  padding: "1rem",
  position: "relative",
  margin: "10px 0",
});
