import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export const LandingActivitiesContainer: React.FC<Props> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

const StyledContainer = styled.div`
  width: 100%;
  height: 450px;
  background: #f2f3f8;
  border-radius: 9px;
  margin: 2.5rem 0;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 2rem 4rem;
`;
