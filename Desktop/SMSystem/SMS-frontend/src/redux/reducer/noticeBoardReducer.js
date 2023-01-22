import {
  POST_NOTICE_REQUEST,
  POST_NOTICE_SUCCESS,
  POST_NOTICE_FAIL,
  POST_NOTICE_RESET,
  GET_NOTICE_REQUEST,
  GET_NOTICE_SUCCESS,
  GET_NOTICE_FAIL,
} from "../constants/noticeBoardConstant";

export const postNoticeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_NOTICE_REQUEST:
      return { loading: true };
    case POST_NOTICE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case POST_NOTICE_FAIL:
      return { loading: false, error: action.payload };
    case POST_NOTICE_RESET:
      return {};
    default:
      return state;
  }
};

export const getNoticeReducer = (state = { getNotice: [] }, action) => {
  switch (action.type) {
    case GET_NOTICE_REQUEST:
      return { loading: true };
    case GET_NOTICE_SUCCESS:
      return {
        loading: false,
        success: true,
        allNotice: action.payload.results,
      };
    case GET_NOTICE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
