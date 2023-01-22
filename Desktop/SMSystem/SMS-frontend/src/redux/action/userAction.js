import axios from "axios";

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FORGOTPASSWORD_REQUEST,
  USER_FORGOTPASSWORD_SUCCESS,
  USER_FORGOTPASSWORD_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CONFIRMPASSWORD_REQUEST,
  CONFIRMPASSWORD_SUCCESS,
  CONFIRMPASSWORD_FAIL,
} from "../constants/userContstant";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/user/token/",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const userForgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOTPASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/password_reset/",
      {
        email,
      },
      config
    );
    dispatch({
      type: USER_FORGOTPASSWORD_SUCCESS,
      payload: data,
    });
    console.log(data);
    console.log(email);
  } catch (error) {
    dispatch({
      type: USER_FORGOTPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get("/user/account/", config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userProfileName", JSON.stringify(data));
    console.log(data.first_name);
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  }
};

export const postResetPassword = (password, token) => async (dispatch) => {
  try {
    dispatch({
      type: CONFIRMPASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/password_reset/confirm/",
      {
        password,
        token,
      },
      config
    );
    dispatch({
      type: CONFIRMPASSWORD_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: CONFIRMPASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
