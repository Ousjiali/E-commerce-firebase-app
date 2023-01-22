import {
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  POST_COURSE_REQUEST,
  POST_COURSE_SUCCESS,
  POST_COURSE_FAIL,
  POST_COURSE_RESET,
  POST_ADDCOURSE_REQUEST,
  POST_ADDCOURSE_SUCCESS,
  POST_ADDCOURSE_FAIL,
  POST_ADDCOURSE_RESET,
} from "../constants/courseConstant";

export const postAddCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ADDCOURSE_REQUEST:
      return { loading: true };
    case POST_ADDCOURSE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case POST_ADDCOURSE_FAIL:
      return { loading: false, error: action.payload };
    case POST_ADDCOURSE_RESET:
      return {};
    default:
      return state;
  }
};

export const getCourseReducer = (state = { getCourseArr: [] }, action) => {
  switch (action.type) {
    case GET_COURSE_REQUEST:
      return { loading: true };
    case GET_COURSE_SUCCESS:
      return {
        loading: false,
        success: true,
        getCourseId: action.payload,
      };
    case GET_COURSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postRegisterCourseReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_COURSE_REQUEST:
      return { loading: true };
    case POST_COURSE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case POST_COURSE_FAIL:
      return { loading: false, error: action.payload };
    case POST_COURSE_RESET:
      return {};
    default:
      return state;
  }
};
