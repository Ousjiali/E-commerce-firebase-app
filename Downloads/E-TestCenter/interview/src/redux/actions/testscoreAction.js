import axios from "axios";
import {
  TESTSCORE_SUCCESS,
  TESTSCORE_REQUEST,
  TESTSCORE_FAIL,
  TEST_TIME_SUCCESS,
  TEST_TIME_REQUEST,
  TEST_TIME_FAIL,
} from "../constants/testscoreConstants";

export const getTestscore = () => async (dispatch) => {
  try {
    dispatch({ type: TESTSCORE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/test-score/self", config);
    dispatch({
      type: TESTSCORE_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: TESTSCORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTestTime = () => async (dispatch) => {
  try {
    dispatch({ type: TEST_TIME_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/test/assigned", config);

    dispatch({
      type: TEST_TIME_SUCCESS,
      payload: data.data,
    });
    localStorage.setItem("timer", JSON.stringify(data.data.timer));
    localStorage.setItem("test_training", JSON.stringify(data && data.data));
  
  } catch (error) {
    dispatch({
      type: TEST_TIME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
