import { Box } from "@material-ui/core";
import React from "react";
import { FaAngleDoubleRight } from "react-icons/fa";
import styled from "styled-components";
import { MLink } from "../../../../../styles/styles";
import { MButton } from "../../../../shared/components/buttons/MButton";

export const EthicsChampionBanner = () => {
  return (
    <StyledContainer>
      <Box display="flex" alignItems="center" height="100%">
        <h1
          style={{
            fontStyle: "italic",
            fontSize: "3rem",
            paddingRight: "1rem",
            width: "300px",
          }}
        >
          Meet your Ethics Champions
        </h1>
      </Box>

      <MLink
        to="/recognition/champion"
        style={{ textDecoration: "none", color: "#000" }}
      >
        <MButton endIcon={<FaAngleDoubleRight />} text="See All..." />
      </MLink>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-image: url("https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/PostFiles/banner%20for%20ethics%20champion.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1rem;
  height: 100%;
  flex: 1;
  border-radius: 10px;
`;
