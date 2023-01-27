import { Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { styled } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { format } from "timeago.js";
import { CommentAction, PostAction } from "./PostAction";

type Props = {
  comment;
  comments: number;
};

export const PostComment: React.FC<Props> = ({ comment, comments }) => {
  const user = JSON.parse(comment?.user);

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
            src={user?.photoUrl ?? ""}
            style={{
              width: "30px",
              height: "30px",
            }}
          />
          <p style={{ fontWeight: "bold" }}>{user?.name || "N/A"}</p>
        </Box>

        <p>{comment?.comment}</p>
      </Box>
      <Typography
        variant="caption"
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

const PostCommentContainer = styled(Box)({
  background: "#FFFFFF",
  boxShadow: "0px 7px 20px 6px rgba(0, 0, 0, 0.06)",
  borderRadius: "10px",
  width: "100%",
  minHeight: "90px",
  boxSizing: "border-box",
  padding: "1rem",
  position: "relative",
});
