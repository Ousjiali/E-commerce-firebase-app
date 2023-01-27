import { Box, Typography } from "@material-ui/core";
import * as React from "react";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { QuizWrapper } from "./components/QuizWrapper";
import { getQuizContextState } from "./context/QuizContext";
import "./styles.css";
import { CircularProgress } from "@material-ui/core";
import { isChecked } from "./util";
import {
  ShowNextNavButton,
  ShowPrevNavButton,
  ShowSubmitButton,
} from "./components/showNavButtons";
import { sp } from "@pnp/sp";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { QuizTime } from "./components/QuizTime";
import { LandingPageHeaderWithImage } from "../../../shared/components/LandingPageHeaderWithImage";
import { QuizStatus } from "../../../admin/pages/quiz/modals/EnableQuizPromptModal";
import uuid from "react-uuid";

export const QuizPage = () => {
  const {
    page,
    responses,
    setResponses,
    showSubmit,
    setPoints,
    total,
    questions,
    getting,
    startTimer,
    quizInfo,
    seconds,
    submitQuiz,
    staff,
    setExpectedScore,
  } = getQuizContextState();

  const history = useHistory();

  React.useEffect(() => {
    startTimer();
  }, []);

  React.useMemo(() => {
    if (quizInfo?.duration === 0 && seconds < 1) {
      submitQuiz({
        ...staff,
        responses,
      });
    }
  }, [quizInfo?.duration, seconds]);

  React.useEffect(() => {
    if (!staff) return;
    sp.web.lists
      .getByTitle("QuizResponse")
      .items.select("StaffEmail, Quiz/status")
      .expand("Quiz")
      .filter(
        `StaffEmail eq '${staff?.email}' and Quiz/status eq '${QuizStatus.Is_Enabled}'`
      )
      .get()
      .then((res) => {
        if (res.length) {
          swal("error", "You have taken this Quiz", "Error").then(() => {
            history.push("/");
          });
        }
      });
  }, []);

  return (
    <EmployeeWrapper backButton={false}>
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/ask-question-online-concept-businessman-hand-hold-interface-question-marks-sign-web-question-marks-drawn-black-background-concept-searching-answer-uncertainty-problem-solving%203.png"
        text="Ethics Quiz"
      />

      <QuizWrapper>
        <QuizTime />
        <>
          {getting ? (
            <CircularProgress
              className="center-item"
              style={{ color: "#000" }}
            />
          ) : (
            <>
              {questions?.length > 0 ? (
                <form
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = {
                      ...staff,
                      responses,
                    };
                    submitQuiz(data);
                  }}
                >
                  <Box>
                    <ShowPrevNavButton />
                  </Box>
                  <Box
                    style={{
                      width: "90%",
                      display: "flex",
                      alignItems: "flex-start",
                      flexDirection: "column",
                      boxSizing: "border-box",
                      paddingLeft: "1rem",
                    }}
                  >
                    <Box my={2}>
                      <Typography variant="body2">
                        Question {page + 1} of {total}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "18px",
                          lineHeight: "20px",
                          margin: "5px 0",
                        }}
                        variant="body2"
                      >
                        {questions[page]?.question}
                      </Typography>
                    </Box>
                    <Box>
                      <Box className="options">
                        {questions[page]?.options?.map((option) => {
                          return (
                            <Box className="options-container" key={uuid()}>
                              <input
                                type={questions[page]?.type}
                                name={`option${page}`}
                                value={option}
                                required
                                checked={
                                  option == isChecked(responses, page, option)
                                    ? true
                                    : null
                                }
                                onChange={(e) => {
                                  const value = e?.target?.value;

                                  if (questions[page]?.type === "checkbox") {
                                    setResponses((prev) => {
                                      return prev.filter(
                                        ({ answer }) => answer != option
                                      );
                                    });

                                    if (e?.target?.checked) {
                                      setResponses((prev) => [
                                        ...prev,
                                        {
                                          id: questions[page]?.id,
                                          question: questions[page]?.question,
                                          answer: value,
                                          responseTime: `${quizInfo?.duration}m:${seconds}s`,
                                          isCorrect:
                                            questions[page]?.answer === value,
                                          point: questions[page]?.point,
                                        },
                                      ]);
                                    }
                                  } else if (
                                    questions[page]?.type === "radio"
                                  ) {
                                    setResponses((prev) => {
                                      return prev.filter(
                                        ({ id }) => id != questions[page]?.id
                                      );
                                    });

                                    if (e.target.checked) {
                                      setResponses((prev) => [
                                        ...prev,
                                        {
                                          id: questions[page]?.id,
                                          question: questions[page]?.question,
                                          answer: value,
                                          responseTime: `${quizInfo?.duration}m:${seconds}s`,
                                          isCorrect:
                                            questions[page]?.answer === value,
                                          point: questions[page]?.point,
                                        },
                                      ]);
                                      setExpectedScore((prev: number) => {
                                        let total =
                                          Number(prev) +
                                          Number(questions[page]?.point);

                                        return total;
                                      });
                                      if (questions[page]?.answer === value) {
                                        setPoints((prev: number) => {
                                          let total =
                                            Number(prev) +
                                            Number(questions[page]?.point);

                                          return total;
                                        });
                                      }
                                    }
                                  }
                                }}
                              />
                              <label>{option}</label>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    {!showSubmit(page) ? (
                      <ShowNextNavButton />
                    ) : (
                      <ShowSubmitButton />
                    )}
                  </Box>
                </form>
              ) : (
                <Box className="center-item">
                  <Typography>No Quiz</Typography>
                </Box>
              )}
            </>
          )}
        </>
      </QuizWrapper>
    </EmployeeWrapper>
  );
};
