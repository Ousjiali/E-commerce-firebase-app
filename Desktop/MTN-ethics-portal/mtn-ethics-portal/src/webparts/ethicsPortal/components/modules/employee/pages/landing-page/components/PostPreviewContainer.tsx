import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import styled from "styled-components";
import { MButton } from "../../../../shared/components/buttons/MButton";
import { Box } from "@material-ui/core";
import { MLink } from "../../../../../styles/styles";

type Props = {
  heading: string;
  caption: string;
  background: string;
  link: string;
};

export const PostPreview: React.FC<Props> = ({
  caption,
  heading,
  background,
  link,
}) => {
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
        <p>{caption}</p>
      </Box>

      <MLink
        to={`${link}&PageTitle=${heading}`}
        style={{ textDecoration: "none", color: "#000" }}
      >
        <MButton endIcon={<FaAngleDoubleRight />} text="Read More..." />
      </MLink>
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{ bg: string }>((props) => ({
  backgroundImage: `linear-gradient(95.9deg, rgba(0, 0, 0, 0.2) 36.21%, rgba(0, 0, 0, 0.4) 54.68%),url('${props.bg}')`,
  width: "400px",
  height: "350px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  boxSizing: "border-box",
  padding: "1rem",
  borderRadius: "26px",
}));
