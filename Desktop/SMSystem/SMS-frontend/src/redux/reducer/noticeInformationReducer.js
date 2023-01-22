import {
  POST_INFORMATION_REQUEST,
  POST_INFORMATION_SUCCESS,
  POST_INFORMATION_FAIL,
  POST_INFORMATION_RESET,
  IMAGE_INFORMATION_REQUEST,
  IMAGE_INFORMATION_SUCCESS,
  IMAGE_INFORMATION_FAIL,
  IMAGE_INFORMATION_RESET,
  GET_INFORMATION_REQUEST,
  GET_INFORMATION_SUCCESS,
  GET_INFORMATION_FAIL,
} from "../constants/noticeInformationConstant";

export const postInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_INFORMATION_REQUEST:
      return { loading: true };
    case POST_INFORMATION_SUCCESS:
      return { loading: false, success: true, information: action.payload };
    case POST_INFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case POST_INFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const informationImageReducer = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_INFORMATION_REQUEST:
      return { loading: true };
    case IMAGE_INFORMATION_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case IMAGE_INFORMATION_FAIL:
      return { loading: false, error: action.payload };
    case IMAGE_INFORMATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getInformationReducer = (
  state = { getInformation: [] },
  action
) => {
  switch (action.type) {
    case GET_INFORMATION_REQUEST:
      return { loading: true };
    case GET_INFORMATION_SUCCESS:
      return {
        loading: false,
        success: true,
        getInforImage: action.payload.results,
      };
    case GET_INFORMATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
