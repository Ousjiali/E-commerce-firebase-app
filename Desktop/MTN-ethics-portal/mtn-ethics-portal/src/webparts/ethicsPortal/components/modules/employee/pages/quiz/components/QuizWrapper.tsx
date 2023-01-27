import * as React from "react";
import styled from "styled-components";

export const QuizWrapper = ({ children }) => {
  return <QuizWrapperContainer>{children}</QuizWrapperContainer>;
};

const QuizWrapperContainer = styled.div`
  width: 93%;
  min-height: 500px;
  border: 5px solid #ffcc00;
  padding: 3rem;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
`;
