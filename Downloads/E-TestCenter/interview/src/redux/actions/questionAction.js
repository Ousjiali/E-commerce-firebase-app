import axios from "axios";
import {
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  QUESTION_FAIL,
} from "../constants/questionConstant";

//ADMIN CONSTANTS

import {
  GET_QUESTION_BYID_REQUEST,
  GET_QUESTION_BYID_SUCCESS,
  GET_QUESTION_BYID_FAIL,
  QUESTIONS_FAIL,
  QUESTIONS_SUCCESS,
  QUESTIONS_REQUEST,
  USER_GETALLQUESTIONS_REQUEST,
  USER_GETALLQUESTIONS_SUCCESS,
  USER_GETALLQUESTIONS_FAIL,
  GET_EACHQUESTION_BYID_FAIL,
  GET_EACHQUESTION_BYID_SUCCESS,
  GET_EACHQUESTION_BYID_REQUEST,
} from "../constants/questionConstants";

import { DELETE_QUESTION_BYID } from "../constants/questionConstants";

import {
  DELETE_QUESTION_BYID_REQUEST,
  DELETE_QUESTION_BYID_SUCCESS,
  DELETE_QUESTION_BYID_FAIL,
  DELETE_CANDIDATE_BYID_REQUEST,
  DELETE_CANDIDATE_BYID_SUCCESS,
  DELETE_CANDIDATE_BYID_FAIL,
  EDITQUESTION_BYID_SUCCESS,
  EDITQUESTION_BYID_REQUEST,
  EDITQUESTION_BYID_FAIL,
} from "../constants/questionConstants";

export const getTestquestion = () => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTION_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/question/assigned", config);
    dispatch({
      type: QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMIN  QUESTION
export const postQuestion =
  (question, answers, correct_answers, section) => async (dispatch) => {
    try {
      dispatch({ type: QUESTIONS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/question/",
        {
          question,
          answers,
          correct_answers,
          section,
        },
        config
      );
      dispatch({
        type: QUESTIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: QUESTIONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getQuestion = () => async (dispatch, getState) => {
  try {
    dispatch({ type: QUESTIONS_REQUEST });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/question", config);
    dispatch({
      type: QUESTIONS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: QUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_GETALLQUESTIONS_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/question/", config);
    dispatch({
      type: USER_GETALLQUESTIONS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_GETALLQUESTIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getEachQuestionById =
  (_id, setEditQuestion) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_EACHQUESTION_BYID_REQUEST,
      });
      const {
        adminLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/v1/question/${_id}`, config);
      dispatch({
        type: GET_EACHQUESTION_BYID_SUCCESS,
        payload: data,
      });
      localStorage.setItem("question", JSON.stringify(data.data.question));
      setEditQuestion(data.data.question);

      // console.log(data.data.question);
      // onChangeHandler(setEditQuestion(data.data.question))
    } catch (error) {
      dispatch({
        type: GET_EACHQUESTION_BYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteFromItem = (_id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_QUESTION_BYID,
    payload: _id,
  });
};

export const getQuestionsId = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_QUESTION_BYID_REQUEST });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/question/`, config);
    dispatch({
      type: GET_QUESTION_BYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_QUESTION_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteQuestionId = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_QUESTION_BYID_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { questionId } = await axios.delete(
      `/api/v1/question/${_id}`,
      config
    );
    dispatch({
      type: DELETE_QUESTION_BYID_SUCCESS,
      payload: questionId,
    });
    console.log(questionId);
  } catch (error) {
    dispatch({
      type: DELETE_QUESTION_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editQuestionId =
  (_id, data, history) => async (dispatch, getState) => {
    console.log(data);
    try {
      dispatch({
        type: EDITQUESTION_BYID_REQUEST,
      });
      const {
        adminLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.put(`/api/v1/question/${_id}`, data, config);
      console.log(res.data, "from put request");
      history.push("/viewquestion");
      dispatch({
        type: EDITQUESTION_BYID_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: EDITQUESTION_BYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteViewCandidateId = (_id) => async (dispatch, getState) => {
  console.log(_id);
  try {
    dispatch({
      type: DELETE_CANDIDATE_BYID_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/test-score/${_id}`, config);
    dispatch({
      type: DELETE_CANDIDATE_BYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_CANDIDATE_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
