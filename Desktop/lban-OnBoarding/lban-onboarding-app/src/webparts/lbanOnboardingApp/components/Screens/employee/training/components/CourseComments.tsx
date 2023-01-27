import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { FaShare } from "react-icons/fa";
import { CourseComment, PostCommentContainer } from "./Comment";
import { EnterComment } from "./EnterComment";

type Props = {
  courseId: number;
};

export interface User {
  DisplayName: string;
  Email: string;
  PictureUrl: string;
}

export const CourseComments: React.FC<Props> = ({ courseId }) => {
  const [user, setUser] = React.useState<User>();
  const [comments, setComments] = React.useState<any[]>([]);
  const [reload, setReload] = React.useState<boolean>();
  const [comment, setComment] = React.useState("");
  const [commenting, setCommenting] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const comments = await sp.web.lists
        .getByTitle("Comments")
        .items.select(
          "Comment, StaffName, StaffPhoto, StaffEmail, Created, CourseId/ID, courseId/Trainer"
        )
        .expand("CourseId")
        .filter(`CourseIdId eq '${courseId}'`)
        .get();
      setComments(
        comments?.sort((a, b) => (Number(b.ID) - Number(a.ID) ? 1 : -1))
      );
    })();
  }, [reload]);

  React.useEffect(() => {
    (async () => {
      const res = await sp.profiles.myProperties.get();
      setUser({
        DisplayName: res?.DisplayName,
        Email: res?.Email,
        PictureUrl: res?.PictureUrl,
      });
    })();
  }, []);

  const commentHandler = async () => {
    setCommenting(true);
    try {
      await sp.web.lists.getByTitle("Comments").items.add({
        StaffName: user?.DisplayName,
        StaffEmail: user?.Email,
        Comment: comment,
        CourseIdId: courseId,
        StaffPhoto: user?.PictureUrl,
      });
      setReload((prev) => !prev);
      setCommenting(false);
      setComment("");
    } catch (err) {
      setCommenting(false);
    }
  };
  return (
    <Box
      minHeight="300px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        my={4}
        style={{
          flexDirection: "column",
          gap: ".5rem",
        }}
        height="100%"
      >
        {comments.length > 0 &&
          comments.map((comment) => (
            <CourseComment
              comment={comment}
              user={{
                DisplayName: comment?.StaffName,
                Email: comment?.StaffEmail,
                PictureUrl: comment?.PictureUrl,
              }}
            />
          ))}
      </Box>
      <PostCommentContainer width="100%" my={2}>
        <Box
          style={{
            display: "flex",
            gap: ".5rem",
          }}
          width="100%"
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              alignItems: "center",
              flex: ".2",
            }}
          >
            <Avatar
              src={`'${user?.PictureUrl}'`}
              style={{
                width: "40px",
                height: "40px",
              }}
            />
            <Typography variant="body2" style={{ fontWeight: "bold" }}>
              {user?.DisplayName}
            </Typography>
          </Box>
          <Box flex="1.4">
            <EnterComment
              comment={comment}
              onUpdate={(comment) => setComment(comment)}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt={3}
        >
          <Box></Box>
          <Button
            style={{ borderRadius: "100px" }}
            color="primary"
            variant="contained"
            disabled={!comment?.trim() || commenting}
            onClick={() => commentHandler()}
          >
            {commenting ? <CircularProgress size={20} /> : "Add Comment"}
          </Button>
        </Box>
      </PostCommentContainer>
    </Box>
  );
};
