import { Box, Button, Typography } from "@material-ui/core";
import * as React from "react";
import { EmployeeWrapper } from "../../../shared/components/app-wrapper/employee/EmployeeWrapper";
import { QuizWrapper } from "./components/QuizWrapper";
import { getQuizContextState } from "./context/QuizContext";
import "./styles.css";
import { CircularProgress } from "@material-ui/core";
import { sp } from "@pnp/sp";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "react-toast-notifications";
import { errorAlert } from "../../../../utils/toast-messages";
import { QuizResponseType } from "./types/quiz-types";
import { LandingPageHeaderWithImage } from "../../../shared/components/LandingPageHeaderWithImage";
import { QuizStatus } from "../../../admin/pages/quiz/modals/EnableQuizPromptModal";
import { useHistory } from "react-router-dom";

interface Pts {
  staffScore: number;
  expectedScore: number;
}

export const QuizReviewPage = () => {
  const { questions, getting } = getQuizContextState();
  const [loading, setLoading] = React.useState(false);
  const [wrongResponses, setWrongResponses] = React.useState(0);
  const history = useHistory();
  const { data } = useQuery(["pr"], async () => {
    try {
      const res = await sp.profiles.myProperties.get();
      return {
        name: res?.DisplayName,
        email: res?.Email,
      };
    } catch (e) {
      errorAlert(toast);
    }
  });
  const toast = useToasts().addToast;

  const [staffResponses, setStaffResponses] = React.useState<
    QuizResponseType[]
  >([]);
  const [points, setPoints] = React.useState<Pts>();

  React.useEffect(() => {
    setLoading(true);
    if (!data) return;
    sp.web.lists
      .getByTitle("QuizResponse")
      .items.select(
        "StaffEmail, Quiz/status, responses, TotalPoints, ExpectedScore, score"
      )
      .expand("Quiz")
      .filter(
        `StaffEmail eq '${data?.email}' and Quiz/status eq '${QuizStatus.Is_Enabled}'`
      )
      .get()
      .then((items) => {
        setLoading(false);
        let userResponses = items;
        let score = userResponses[0].score;
        if (score) {
          score = JSON.parse(score);
          setWrongResponses(score?.wrong);
        }
        setPoints({
          expectedScore: userResponses[0].ExpectedScore,
          staffScore: userResponses[0].TotalPoints,
        });
        userResponses = JSON.parse(userResponses[0].responses);
        setStaffResponses(
          userResponses.filter((response) => !response?.isCorrect)
        );
      });
  }, [data?.email]);

  return (
    <EmployeeWrapper backButton={false}>
      <LandingPageHeaderWithImage
        bg="https://mtncloud.sharepoint.com/sites/MTNAppDevelopment/ethicsportal/assets/ask-question-online-concept-businessman-hand-hold-interface-question-marks-sign-web-question-marks-drawn-black-background-concept-searching-answer-uncertainty-problem-solving%203.png"
        text="Ethics Quiz"
      />
      <QuizWrapper>
        <>
          {loading ? (
            <CircularProgress
              className="center-item"
              style={{ color: "#000" }}
            />
          ) : (
            <>
              {staffResponses?.length > 0 && wrongResponses > 0 ? (
                <Box>
                  <Box>
                    <Typography variant="body1">
                      Thank you for taking the Quiz. You answered &nbsp;
                      <strong>{questions.length - wrongResponses}</strong> out
                      of &nbsp;
                      <strong>{questions.length}</strong> correct.
                    </Typography>
                    <Typography variant="body1">
                      Your score is {points?.staffScore}/{points?.expectedScore}
                    </Typography>
                    <Typography variant="body2" style={{ fontWeight: "bold" }}>
                      See answers to the questions you missed below
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    style={{ gap: "2rem" }}
                    mt={2}
                  >
                    {staffResponses.map((response, i) => {
                      return (
                        <Box>
                          <Typography>
                            <strong>Q{i + 1}:</strong>&nbsp;{response?.question}
                          </Typography>
                          <Typography>
                            <strong>Answer:</strong>&nbsp;
                            {
                              questions?.filter(
                                (it) => it.id === response?.id
                              )[0]?.answer
                            }
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Box minHeight="300px">
                    <Box>
                      <Typography variant="body1">
                        Thank you for taking the Quiz. You answered &nbsp;
                        <strong>{questions.length - wrongResponses}</strong> out
                        of &nbsp;
                        <strong>{questions.length}</strong> correct.
                      </Typography>
                      <Typography variant="body1">
                        Your score is {points?.staffScore}/
                        {points?.expectedScore}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          )}
        </>
        <Button
          className="submit-button"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
          }}
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          Ok
        </Button>
      </QuizWrapper>
    </EmployeeWrapper>
  );
};
