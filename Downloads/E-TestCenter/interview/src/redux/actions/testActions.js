import axios from "axios";
import {
  CREATE_TEST_FAIL,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_REQUEST,
  GET_TEST_FAIL,
  GET_TEST_SUCCESS,
  GET_TEST_REQUEST,
} from "../constants/testConstants";

export const createTest =
  (title, videoUrl, isTraining) => async (dispatch, getState) => {
    //   console.log(token)
    try {
      dispatch({ type: CREATE_TEST_REQUEST });
      const {
        adminLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/v1/test/",
        { title, videoUrl, isTraining },
        config
      );
      dispatch({
        type: CREATE_TEST_SUCCESS,
        payload: data,
      });
      console.log(`videoUrl: ${videoUrl}`);
      console.log(`isTraining: ${isTraining}`);
    } catch (error) {
      dispatch({
        type: CREATE_TEST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTest = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TEST_REQUEST });
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
    const { data } = await axios.get("/api/v1/test", config);
    dispatch({
      type: GET_TEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TEST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
