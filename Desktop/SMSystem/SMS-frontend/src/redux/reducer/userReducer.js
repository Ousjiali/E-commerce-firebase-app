import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_RESET,
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
  CONFIRMPASSWORD_RESET,
  USER_FORGOTPASSWORD_RESET,
} from "../constants/userContstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGIN_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOTPASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOTPASSWORD_SUCCESS:
      return { loading: false, success: true, user: action.payload.data };
    case USER_FORGOTPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case USER_FORGOTPASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        username: action.payload,
      };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const confirmPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRMPASSWORD_REQUEST:
      return { loading: true };
    case CONFIRMPASSWORD_SUCCESS:
      return { loading: false, success: true, user: action.payload.data };
    case CONFIRMPASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case CONFIRMPASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
