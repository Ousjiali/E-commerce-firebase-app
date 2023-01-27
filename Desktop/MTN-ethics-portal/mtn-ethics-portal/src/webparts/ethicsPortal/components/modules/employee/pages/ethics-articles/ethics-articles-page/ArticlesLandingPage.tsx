import * as React from "react";
import { sp } from "@pnp/sp";
import { CircularProgress, Box } from "@material-ui/core";
import { useQuery } from "@tanstack/react-query";
import { MLink, PostPreviewContainer } from "../../../../../styles/styles";
import { EmployeeWrapper } from "../../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { LandingPageHeaderWithImage } from "../../../../shared/components/LandingPageHeaderWithImage";
import { PostPreviewItem } from "../../../components/blog/PostPreviewItem";
import { errorAlert } from "../../../../../utils/toast-messages";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import {
  PostOptions,
  PostSection,
} from "../../../../admin/components/blog-set-up/sections/CreateSection";
import { FaAngleDoubleRight } from "react-icons/fa";
import { MButton } from "../../../../shared/components/buttons/MButton";

export const ArticlesLandingPage = () => {
  return (
    <EmployeeWrapper backButton={false} showFooter={true}>
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/article-ethics.png"
        text="Ethics Articles"
      />

      <Box width="90%" mt="3rem" mx="auto" minHeight="450px">
        <Box
          my={4}
          display="flex"
          style={{ gap: "2rem", flexWrap: "nowrap" }}
          width="100%"
        >
          {PostOptions?.map((post) => (
            <PostPreview
              heading={post?.label}
              link={`/posts?postSection=${post.value}&PageTitle=${post?.label}`}
              background={(() => {
                if (post.value === PostSection.Did_You_Know)
                  return "https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/did%20you%20know.png";
                if (post.value === PostSection.Eyes_Wide_Open)
                  return "https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/eyes%20wide%20open.png";
                if (post.value === PostSection.Others)
                  return "https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/eyes%20wide%20open.png";
              })()}
            />
          ))}
        </Box>
      </Box>
    </EmployeeWrapper>
  );
};

const StyledContainer = styled.div<{ bg: string }>((props) => ({
  backgroundImage: `linear-gradient(95.9deg, rgba(0, 0, 0, 0.2) 36.21%, rgba(0, 0, 0, 0.4) 54.68%),url('${props.bg}')`,
  height: "350px",
  backgroundSize: "cover",
  flex: 1,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "1rem",
  borderRadius: "26px",
}));

type Props = {
  heading: string;
  background?: string;
  link: string;
};

const PostPreview: React.FC<Props> = ({ heading, background, link }) => {
  return (
    <StyledContainer bg={background}>
      <Box>
        <h1
          style={{
            fontStyle: "italic",
            fontSize: "30px",
            paddingRight: "1rem",
            width: "100px",
          }}
        >
          {heading}
        </h1>
      </Box>

      <MLink to={`${link}`} style={{ textDecoration: "none", color: "#000" }}>
        <MButton endIcon={<FaAngleDoubleRight />} text="See More..." />
      </MLink>
    </StyledContainer>
  );
};
