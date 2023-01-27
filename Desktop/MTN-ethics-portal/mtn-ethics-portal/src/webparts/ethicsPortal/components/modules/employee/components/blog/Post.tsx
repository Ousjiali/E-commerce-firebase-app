import { Avatar, Box, Typography } from "@material-ui/core";
import * as React from "react";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { PageHeaderWithImage } from "../../../shared/components/PageHeaderWithImage";
import { useParams } from "react-router-dom";
import * as dayjs from "dayjs";
import { PostComment } from "./PostComment";
import "./styles.css";
import { PostAction } from "./PostAction";
import { EnterComment } from "./EnterComment";
import Button from "@material-ui/core/Button";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { FaShare } from "react-icons/fa";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useToasts } from "react-toast-notifications";
import { errorAlert, successAlert } from "../../../../utils/toast-messages";
import { BlogContent } from "../../../admin/components/blog-set-up/BlogContent";
import * as _ from "lodash";

type User = {
  name: string;
  photoUrl: string;
  Email: string;
};

export const Post = () => {
  const { id } = useParams();
  const [comment, setComment] = React.useState("");
  const { data } = useQuery<User>(["userProfile"], async () => {
    try {
      const res = await sp.profiles.myProperties.get();
      return {
        name: res?.DisplayName,
        photoUrl: res?.PictureUrl,
        Email: res?.Email,
      };
    } catch (e) {
      errorAlert(toast);
    }
  });

  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
  } = useQuery<any>(["singlePost", id], async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("Post")
        .items.getItemByStringId(id)
        .get();
      return res;
    } catch (e) {
      errorAlert(toast);
    }
  });

  const toast = useToasts().addToast;

  if (isError) return <>An error Occured</>;

  const [commenting, setCommenting] = React.useState<boolean>(false);

  const commentHandler = async () => {
    setCommenting(true);
    try {
      const res = await sp.web.lists.getByTitle("Comments").items.add({
        PostId: id,
        comment,
        user: JSON.stringify(data),
      });

      setCommenting(false);
      setPage(-1);
      successAlert(toast, "Comment Added");
      setComment("");
    } catch (e) {
      errorAlert(toast);
      setCommenting(false);
    }
  };

  const [page, setPage] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [likes, setLikes] = React.useState([]);
  const [unLikes, setUnlikes] = React.useState([]);

  React.useEffect(() => {
    setPage(-1);
  }, []);

  React.useEffect(() => {
    if (page == null) return;
    if (page < 0) {
      setPage(0);
      return;
    }
    Promise.all([
      sp.web.lists
        .getByTitle("Comments")
        .items.filter(`PostId eq '${id}'`)
        .get()
        .then((res) => {
          setComments(res.sort((a, b) => Number(b.ID) - Number(a.ID)));
        }),
      sp.web.lists
        .getByTitle("Likes")
        .items.filter(`PostId eq '${id}'`)
        .get()
        .then((res) => {
          setLikes(res);
        }),
      sp.web.lists
        .getByTitle("UnLikes")
        .items.filter(`PostId eq '${id}'`)
        .get()
        .then((res) => {
          setUnlikes(res);
        }),
    ]);
  }, [page]);

  return (
    <EmployeeWrapper showFooter={true} backButton={true}>
      <Box width="90%" m="auto">
        <PageHeaderWithImage
          bg={`${post?.FileUrl}`}
          text={`${post?.PostTitle ?? ""}`}
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <h3>{post?.PostTitle}</h3>
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>
                Posted On: {dayjs(post?.Created).format("MMMM DD, YYYY")}
              </p>
            </Box>
            <Box>
              {post?.content && (
                <BlogContent post={JSON.parse(post?.content)} />
              )}
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              py={3}
              style={{ boxSizing: "border-box" }}
            >
              <PostAction
                comments={comments?.length}
                likes={likes?.length}
                unLikes={unLikes?.length}
                postId={post?.Id}
                setPage={setPage}
                StaffEmail={data?.Email}
              />
            </Box>
            <Box className="comment-container">
              <p style={{ fontWeight: "bold", fontSize: "14px" }}>Comments</p>
              <Box
                display="flex"
                style={{
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                {comments?.map((comment) => (
                  <PostComment comment={comment} comments={comments?.length} />
                ))}
              </Box>
            </Box>
            <Box width="100%" mb={1}>
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
                    src={data?.photoUrl}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                  <p style={{ fontSize: "14px" }}>{data?.name}</p>
                </Box>

                <Box flex="1.4">
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Add Comment
                  </Typography>
                  <EnterComment
                    comment={comment}
                    onUpdate={(comment) => setComment(comment)}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                my={2}
              >
                <Button
                  endIcon={<FaShare />}
                  style={{ borderRadius: "100px" }}
                  color="primary"
                  variant="contained"
                  disabled={!comment?.trim() || commenting}
                  onClick={() => commentHandler()}
                >
                  {commenting ? <CircularProgress size={20} /> : "Add Comment"}
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </EmployeeWrapper>
  );
};
