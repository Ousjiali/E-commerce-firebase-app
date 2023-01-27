import {
  Box,
  Typography,
  TextField,
  IconButton,
  colors,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import uuid from "react-uuid";
import * as React from "react";
import { FaBook, FaEdit, FaTrash } from "react-icons/fa";
import { QuestionsTable } from "../components/QuestionsTable";
import { CreateAdminQuizContextData } from "../context/AdminQuizContext";
import { QuizQuestion } from "../types/admin-quiz-create-type";
import "./style.css";

type Props = {};

export const QuizQuestionSetUp = (props: Props) => {
  const { quiz, handleChange, setQuiz } = CreateAdminQuizContextData();
  const [option, setOption] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [indextoUpdate, setIndextoUpdate] = React.useState(null);
  const [question, setQuestion] = React.useState<QuizQuestion>({
    options: [],
    answer: "",
    question: "",
    type: "",
    point: null,
    id: "",
  });

  //delete an option
  const onDeleteOption = (i: number) => {
    const newOptions = question?.options.filter((_, index) => index !== i);
    setQuestion({
      ...question,
      options: newOptions,
    });
  };

  const onEditOption = (i: number) => {
    setIndextoUpdate(i);
    setIsUpdating(true);
    setOption(question?.options[i]);
  };

  const updateOptionHandler = () => {
    question?.options.splice(indextoUpdate, 1, option);
    setOption("");
    setIsUpdating(false);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setQuestion({
      ...question,
      [name as keyof QuizQuestion]: value,
    });
  };

  return (
    <Box
      component="form"
      style={{
        overflowY: "auto",
        maxHeight: "80%",
        display: "flex",
        flexDirection: "column",
      }}
      mb={10}
    >
      <Box
        width="70%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        margin="0 auto"
        style={{ gap: "1rem" }}
        flex={1}
      >
        <Typography
          variant="h5"
          style={{
            marginRight: "auto",
            borderBottom: "1px solid #e6e6e6",
            width: "100%",
            paddingBottom: "4px",
          }}
        >
          Quiz Topic
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          label="Question"
          value={question?.question ?? ""}
          name="question"
          onChange={(e) => changeHandler(e)}
          multiline
          minRows={3}
        />
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{ gap: "2rem" }}
        >
          <Autocomplete
            id="type"
            freeSolo={false}
            options={questionTypes?.map((option) => option)}
            fullWidth
            value={question?.type}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Question Type"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, newvalue) =>
              setQuestion({
                ...question,
                type: newvalue,
              })
            }
          />
          <TextField
            name="point"
            type="number"
            label="Question Point"
            InputProps={{
              inputProps: {
                min: 1,
              },
            }}
            value={question?.point ?? ""}
            onChange={(e) => changeHandler(e)}
            variant="outlined"
            fullWidth
          />
        </Box>

        <Box width="100%">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ gap: "2rem" }}
          >
            <TextField
              variant="outlined"
              fullWidth
              label="Answer Option"
              value={option}
              name="option"
              onChange={(e) => setOption(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              size="large"
              disabled={!option}
              onClick={() => {
                if (!option) return;

                if (isUpdating) {
                  updateOptionHandler();
                  return;
                }

                setQuestion({
                  ...question,
                  options: [option, ...question?.options],
                });

                setOption("");
              }}
            >
              {isUpdating ? "Update" : "Add"}
            </Button>
          </Box>
          <Box width="100%" display="flex" flexDirection="column">
            {question?.options?.length > 0 &&
              question?.options?.map((option, i) => (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                  className={
                    question?.answer === option ? "correct-answer" : ""
                  }
                >
                  <Typography>{option}</Typography>
                  <Box display="flex" alignItems="center" gridGap={2}>
                    <IconButton onClick={() => onEditOption(i)}>
                      <FaEdit
                        fontSize="1rem"
                        style={{
                          color: colors.blue["200"],
                        }}
                      />
                    </IconButton>
                    <IconButton onClick={() => onDeleteOption(i)}>
                      <FaTrash
                        fontSize="1rem"
                        style={{
                          color: colors.red["200"],
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
        {question?.options.length > 0 && (
          <Autocomplete
            id="answer"
            freeSolo={false}
            options={question?.options?.map((option) => option)}
            fullWidth
            value={question?.answer ?? ""}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Correct Answer"
                margin="normal"
                variant="outlined"
              />
            )}
            onChange={(e, newvalue) =>
              setQuestion({
                ...question,
                answer: newvalue,
              })
            }
          />
        )}

        <Box width="100%" display="flex" justifyContent="flex-end" my={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (
                !question?.answer &&
                !question?.options?.length &&
                !question?.type
              ) {
                return;
              }

              setQuiz({
                ...quiz,
                questions: [
                  ...(quiz?.questions ?? []),
                  {
                    ...question,
                    id: uuid(),
                  },
                ],
              });

              setQuestion({
                answer: "",
                options: [],
                question: "",
                type: "",
                point: null,
                id: "",
              });
            }}
          >
            Add Question
          </Button>
        </Box>
      </Box>
      <Box mb={10}>
        {quiz?.questions && (
          <QuestionsTable
            questions={quiz?.questions}
            onUpdate={(res) => {
              setQuiz({
                ...quiz,
                questions: [
                  ...quiz?.questions.filter(
                    //@ts-ignore
                    (it) => it.tableData.id !== res.tableData.id
                  ),
                ],
              });
              setQuestion(res);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const questionTypes = ["radio"];
