import {
  GET_SCOPE_REQUEST,
  GET_SCOPE_SUCCESS,
  GET_SCOPE_FAIL,
  // GET_INFORMATION_REQUEST,
  // GET_INFORMATION_SUCCESS,
  // GET_INFORMATION_FAIL,
  POST_SCOPE_REQUEST,
  POST_SCOPE_SUCCESS,
  POST_SCOPE_FAIL,
  POST_SCOPE_RESET,
} from "../constants/scopeConstant";

export const getScopeReducer = (state = { getScope: [] }, action) => {
  switch (action.type) {
    case GET_SCOPE_REQUEST:
      return { loading: true };
    case GET_SCOPE_SUCCESS:
      return {
        loading: false,
        success: true,
        getScopeId: action.payload.results,
      };
    case GET_SCOPE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postScopeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_SCOPE_REQUEST:
      return { loading: true };
    case POST_SCOPE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case POST_SCOPE_FAIL:
      return { loading: false, error: action.payload };
    case POST_SCOPE_RESET:
      return {};
    default:
      return state;
  }
};
