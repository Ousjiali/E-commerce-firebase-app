import { Box, Typography, InputAdornment, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import * as React from "react";
import { FaBook, FaTimes } from "react-icons/fa";
import { CreateAdminQuizContextData } from "../context/AdminQuizContext";
import DateFnsUtils from "@date-io/date-fns";

type Props = {};

export const QuizMetaData = (props: Props) => {
  const { quiz, handleChange, setQuiz } = CreateAdminQuizContextData();
  return (
    <Box component="form" position="relative">
      <Box
        width="70%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        margin="0 auto"
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
          General
        </Typography>

        <TextField
          variant="outlined"
          fullWidth
          label="Quiz Title"
          value={quiz?.title ?? ""}
          name="title"
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaBook />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Quiz Duration (Minutes)"
          value={quiz?.duration}
          name="duration"
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FaTimes />
              </InputAdornment>
            ),
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="Start Date"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker"
            value={quiz?.startDate}
            variant="dialog"
            inputVariant="outlined"
            onChange={(e) =>
              setQuiz({
                ...quiz,
                startDate: e,
              })
            }
            minDate={new Date(Date.now())}
            TextFieldComponent={(props) => (
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                {...props}
                name="startDate"
              />
            )}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            label="End Date"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={quiz?.endDate}
            fullWidth
            variant="dialog"
            inputVariant="outlined"
            minDate={new Date(quiz?.startDate)}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                endDate: e,
              })
            }
            TextFieldComponent={(props) => (
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                {...props}
                name="startDate"
              />
            )}
          />
        </MuiPickersUtilsProvider>
      </Box>
    </Box>
  );
};
