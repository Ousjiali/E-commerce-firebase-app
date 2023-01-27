import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import * as React from "react";
import { FaBook } from "react-icons/fa";
import uuid from "react-uuid";
import { Policy } from "../../../../employee/components/PolicyLandingComponent";
import { CreateSection } from "../../../components/blog-set-up/sections/CreateSection";
import { CreateAdminQuizContextData } from "../context/AdminQuizContext";

type Props = {};

export const QuizTopic = (props: Props) => {
  const { quiz, handleChange, setQuiz, isUpdating } =
    CreateAdminQuizContextData();
  const [quizArea, setQuizArea] = React.useState<Policy>({
    PolicyTitle: quiz?.area,
    ImageUrl: "",
  });
  React.useEffect(() => {
    const id = uuid();
    setQuiz({
      ...quiz,
      QuizId: id.substring(0, 8),
    });
  }, [uuid]);

  return (
    <Box component="form" position="relative" my={2}>
      <Box
        width="70%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        margin="3rem auto"
        style={{ gap: "2rem" }}
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
          label="Quiz ID"
          value={quiz?.QuizId ?? ""}
          name="QuizId"
          // onChange={(e) => handleChange(e)}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          variant="outlined"
          fullWidth
          label="Quiz Topic"
          value={quiz?.topic ?? ""}
          name="topic"
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaBook />
              </InputAdornment>
            ),
          }}
        />

        <Box width="100%">
          <CreateSection
            label="Select Quiz Area"
            section={quizArea}
            onUpdate={(section) => {
              setQuizArea(section);
              setQuiz({
                ...quiz,
                area: section?.PolicyTitle,
              });
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={quiz?.isShuffle || false}
                name="questionShuffle"
                color="primary"
                size="medium"
              />
            }
            label="Shuffle Question"
            value={quiz?.isShuffle}
            onChange={(e, newValue) => {
              setQuiz({
                ...quiz,
                isShuffle: newValue,
              });
            }}
            style={{ marginRight: "auto", marginTop: "20px" }}
          />
        </Box>

        <TextField
          variant="outlined"
          fullWidth
          label="Quiz Instruction"
          value={quiz?.instruction ?? ""}
          name="instruction"
          onChange={(e) => handleChange(e)}
          multiline
          minRows={3}
        />
      </Box>
    </Box>
  );
};
