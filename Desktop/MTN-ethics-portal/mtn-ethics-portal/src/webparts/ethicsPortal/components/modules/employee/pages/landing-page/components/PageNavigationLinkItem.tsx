import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type Props = {
  label: string;
  link: string;
};

export const PageNavigationLinkItem: React.FC<Props> = ({ label, link }) => {
  const history = useHistory();
  return (
    <StyledContainer onClick={() => history.push(link)}>
      {label}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  box-sizing: border-box;
  width: 307px;
  height: 38px;
  background: #ffffff;
  border: 1px solid rgba(0, 105, 147, 0.8);
  border-radius: 26px;
  display: flex;
  padding-left: 1rem;
  cursor: pointer;
  align-items: center;
`;
