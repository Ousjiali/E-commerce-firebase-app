import axios from "axios";
import {
  GET_ALL_TEST_SUCCESS,
  GET_ALL_TEST_REQUEST,
  GET_ALL_TEST_FAIL,
} from "../constants/testConstants";

export const getTestTyper = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TEST_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/test/", config);
    dispatch({
      type: GET_ALL_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
