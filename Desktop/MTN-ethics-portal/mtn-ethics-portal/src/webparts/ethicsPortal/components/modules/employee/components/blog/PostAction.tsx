import { Box, Button, CircularProgress, IconButton } from "@material-ui/core";
import { sp } from "@pnp/sp";
import * as React from "react";
import { FaComment, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useToasts } from "react-toast-notifications";

type Props = {
  likes: number;
  unLikes: number;
  comments?: number;
  postId?: number | string;
  commentId?: number | string;
  setPage: (page: number) => void;
  StaffEmail: string;
};

export const PostAction: React.FC<Props> = ({
  comments,
  likes,
  unLikes,
  postId,
  setPage,
  StaffEmail,
}) => {
  const [likePostSet, setLikePostset] = React.useState<Set<number | string>>();
  const [unLikePostSet, setUnLikePostset] =
    React.useState<Set<number | string>>();
  const toast = useToasts().addToast;
  const postLikeHandler = async () => {
    try {
      const resPost = await sp.web.lists
        .getByTitle("Likes")
        .items.filter(`PostId eq '${postId}' and StaffEmail eq '${StaffEmail}'`)
        .get();
      if (resPost.length > 0) {
        return;
      }
      postId && setLikePostset(new Set([postId]));
      await sp.web.lists.getByTitle("Likes").items.add({
        PostId: String(postId),
        StaffEmail,
        ["POSTID0Id"]: postId,
      });
      setLikePostset(new Set());
      setPage(-1);
    } catch (e) {
      setLikePostset(new Set());
      toast("An error occurred", {
        appearance: "error",
      });
    }
  };

  const postUnlikeHandler = async () => {
    try {
      const resPost = await sp.web.lists
        .getByTitle("Likes")
        .items.filter(`PostId eq '${postId}' and StaffEmail eq '${StaffEmail}'`)
        .get();
      if (resPost.length > 0) {
        await sp.web.lists
          .getByTitle("Likes")
          .items.getById(Number(resPost[0].Id))
          .delete();

        const findPostId = await sp.web.lists
          .getByTitle("UnLikes")
          .items.filter(`PostId eq '${postId}'`)
          .get();

        if (findPostId.length > 0) {
          await sp.web.lists
            .getByTitle("unLikes")
            .items.getById(Number(findPostId[0].Id))
            .delete();
          return;
        }

        setUnLikePostset(new Set([postId]));
        await sp.web.lists.getByTitle("UnLikes").items.add({
          PostId: String(postId),
          StaffEmail,
        });
        setPage(-1);
        setUnLikePostset(new Set());
      } else {
        return;
      }
    } catch (e) {
      setUnLikePostset(new Set());
      toast("An error occurred", {
        appearance: "error",
      });
    }
  };

  return (
    <Box>
      {likePostSet?.has(postId) ? (
        <IconButton>
          <CircularProgress size={20} />
        </IconButton>
      ) : (
        <IconButton onClick={() => postLikeHandler()}>
          <FaThumbsUp className="action-icon" />
          {likes}
        </IconButton>
      )}

      {unLikePostSet?.has(postId) ? (
        <IconButton>
          <CircularProgress size={20} />
        </IconButton>
      ) : (
        <IconButton onClick={() => postUnlikeHandler()}>
          <FaThumbsDown className="action-icon" />
          {unLikes}
        </IconButton>
      )}

      {comments > 0 && (
        <IconButton disableFocusRipple={true} focusRipple={false}>
          <FaComment className="action-icon" />
          {comments}
        </IconButton>
      )}
    </Box>
  );
};

export const CommentAction: React.FC<Props> = ({
  comments,
  likes,
  unLikes,
  commentId,
}) => {
  const [likeCommentSet, setLikeCommentset] =
    React.useState<Set<number | string>>();
  const [unLikeCommentSet, setUnLikeCommentset] =
    React.useState<Set<number | string>>();
  const toast = useToasts().addToast;
  const commentLikeHandler = async () => {
    try {
      const resComment = await sp.web.lists
        .getByTitle("Likes")
        .items.filter(`CommentId eq '${commentId}'`)
        .get();
      if (resComment.length > 0) {
        return;
      }
      setLikeCommentset(new Set([commentId]));
      await sp.web.lists.getByTitle("Likes").items.add({
        CommentId: String(commentId),
      });
      setLikeCommentset(new Set());
    } catch (e) {
      setLikeCommentset(new Set());
      toast("An error occurred", {
        appearance: "error",
      });
    }
  };

  const commentUnlikeHandler = async () => {
    try {
      const resComment = await sp.web.lists
        .getByTitle("Likes")
        .items.filter(`CommentId eq '${commentId}'`)
        .get();
      if (resComment.length > 0) {
        await sp.web.lists
          .getByTitle("Likes")
          .items.getById(Number(resComment[0].Id))
          .delete();
      }

      const findCommentId = await sp.web.lists
        .getByTitle("UnLikes")
        .items.filter(`PostId eq '${commentId}'`)
        .get();

      if (findCommentId.length > 0) {
        await sp.web.lists
          .getByTitle("unLikes")
          .items.getById(Number(findCommentId[0].Id))
          .delete();
        return;
      }

      setUnLikeCommentset(new Set([commentId]));
      await sp.web.lists.getByTitle("UnLikes").items.add({
        CommentId: String(commentId),
      });

      setUnLikeCommentset(new Set());
    } catch (e) {
      setUnLikeCommentset(new Set());
      toast("An error occurred", {
        appearance: "error",
      });
    }
  };

  return (
    <Box>
      {likeCommentSet?.has(commentId) ? (
        <IconButton className="action-btn">
          <CircularProgress size={20} />
        </IconButton>
      ) : (
        <IconButton className="action-btn" onClick={() => commentLikeHandler()}>
          <FaThumbsUp className="action-icon" />
          {likes}
        </IconButton>
      )}
      {unLikeCommentSet?.has(commentId) ? (
        <IconButton className="action-btn">
          <CircularProgress size={20} />
        </IconButton>
      ) : (
        <IconButton
          className="action-btn"
          onClick={() => commentUnlikeHandler()}
        >
          <FaThumbsDown className="action-icon" />
          {unLikes}
        </IconButton>
      )}

      {comments && (
        <IconButton
          className="action-btn"
          disableFocusRipple={true}
          focusRipple={false}
        >
          <FaComment className="action-icon" />
          {comments}
        </IconButton>
      )}
    </Box>
  );
};
