import axios from "axios";
import {
  CREATE_SECTION_FAIL,
  CREATE_SECTION_SUCCESS,
  CREATE_SECTION_REQUEST,
  GET_SECTION_FAIL,
  GET_SECTION_SUCCESS,
  GET_SECTION_REQUEST,
  GET_SECTION_BYID_SUCCESS,
  GET_SECTION_BYID_REQUEST,
  GET_SECTION_BYID_FAIL,
} from "../constants/sectionConstants";

export const createSection =
  (title, timer, instruction, test) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_SECTION_REQUEST });
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
        "/api/v1/section/",
        { title, timer, instruction, test },
        config
      );
      dispatch({
        type: CREATE_SECTION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_SECTION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSection = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SECTION_REQUEST });
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
    const { data } = await axios.get("/api/v1/section/", config);
    dispatch({
      type: GET_SECTION_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_SECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExamSection = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SECTION_BYID_REQUEST });
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
    const { data } = await axios.get(`/api/v1/section/test/${id}`, config);
    dispatch({
      type: GET_SECTION_BYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_SECTION_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
