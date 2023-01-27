import { Box, Typography } from "@material-ui/core";
import * as React from "react";
import { getQuizContextState } from "../context/QuizContext";

export const QuizTime = () => {
  const { quizInfo, seconds } = getQuizContextState();
  return (
    <Box
      className={quizInfo?.duration < 2 ? "running__out timer" : "timer within"}
    >
      <Typography variant="h6">
        {quizInfo?.duration > 9 ? quizInfo?.duration : `0${quizInfo?.duration}`}
      </Typography>
      :
      <Typography variant="h6">
        {seconds > 9 ? seconds : `0${seconds}`}
      </Typography>
    </Box>
  );
};
