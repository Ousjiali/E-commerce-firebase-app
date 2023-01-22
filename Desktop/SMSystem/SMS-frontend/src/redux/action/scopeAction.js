import axios from "axios";
import {
  GET_SCOPE_REQUEST,
  GET_SCOPE_SUCCESS,
  GET_SCOPE_FAIL,
  POST_SCOPE_REQUEST,
  POST_SCOPE_SUCCESS,
  POST_SCOPE_FAIL,
} from "../constants/scopeConstant";

export const postScope = (scopeData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_SCOPE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.access);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.post("/information/scope/", scopeData, config);
    dispatch({
      type: POST_SCOPE_SUCCESS,
      payload: data,
    });
    console.log(data);
    // localStorage.setItem("postNotice", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_SCOPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getScope = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SCOPE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`/information/scope/`, config);
    dispatch({
      type: GET_SCOPE_SUCCESS,
      payload: data,
    });
    localStorage.setItem("getScopeInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_SCOPE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
