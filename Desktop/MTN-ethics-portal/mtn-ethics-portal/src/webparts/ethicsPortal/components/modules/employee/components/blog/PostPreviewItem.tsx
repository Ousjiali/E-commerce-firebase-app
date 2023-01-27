import { Box, Typography } from "@material-ui/core";
import * as React from "react";
import styled from "styled-components";
import { MLink } from "../../../../styles/styles";
import { MButton } from "../../../shared/components/buttons/MButton";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FontSizes } from "office-ui-fabric-react";

type Props = {
  post: any;
};

export const PostPreviewItem: React.FC<Props> = ({ post }) => {
  return (
    <Box
      width="auto"
      height="350px"
      mb={1}
      marginTop="30px"
      marginBottom="30px"
      marginLeft="20%"
    >
      <PreviewContainer bg={post?.FileUrl}>
        <Typography
          style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}
        >
          {post?.PostTitle}
        </Typography>
        <MLink to={`/blog/post/${post.Id}`}>
          <MButton text="Read More" endIcon={<FaAngleDoubleRight />} />
        </MLink>
      </PreviewContainer>
      <p style={{ fontWeight: "bold" }}>
        Posted on {new Date(post?.Created).toDateString()}
      </p>
    </Box>
  );
};

export const PreviewContainer = styled.div<{
  bg: string;
  height: string;
}>((props) => ({
  backgroundImage: `linear-gradient(95.9deg, rgba(0, 0, 0, 0.2) 36.21%, rgba(0, 0, 0, 0) 54.68%),url('${props.bg}')`,
  width: "300px",
  height: "90%",
  display: "flex",
  // alignItems: "center",
  padding: "1rem",
  boxSizing: "border-box",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "10px",
  transition: "transform 0.5s",
  "&:hover": {
    backgroundImage: `linear-gradient(95.9deg, rgba(0, 0, 0, 0.2) 36.21%, rgba(0, 0, 0, 0) 54.68%),url('${props.bg}')`,
    backgroundSize: "cover",
    borderRadius: "10px",
    transform: "scale(1.1)",
  },
}));
