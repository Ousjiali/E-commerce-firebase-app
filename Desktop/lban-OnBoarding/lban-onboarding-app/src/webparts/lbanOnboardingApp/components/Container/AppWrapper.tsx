import * as React from "react";
import { AppNavigation, Menu } from "./AppNavigation";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  showBackButton: boolean;
  menu: Menu[];
  children: React.ReactNode;
};

export const AppWrapper: React.FC<Props> = ({
  showBackButton,
  menu,
  children,
}) => {
  const history = useHistory();
  return (
    <div>
      <AppNavigation menu={menu} />
      {showBackButton && (
        <LinkButton onClick={() => history.goBack()}>
          <FaArrowLeft />
          <p>Back</p>
        </LinkButton>
      )}
      <div>{children}</div>
    </div>
  );
};

const LinkButton = styled.button`
  outline: none;
  border: none;
  background: none;
  color: #9b1c8d;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
`;
