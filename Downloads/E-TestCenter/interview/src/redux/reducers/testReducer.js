import {
  GET_ALL_TEST_FAIL,
  GET_ALL_TEST_REQUEST,
  GET_ALL_TEST_SUCCESS,
} from "../constants/testConstants";

export const getTestReducer = (state = { test: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TEST_REQUEST:
      return { loading: true };
    case GET_ALL_TEST_SUCCESS:
      return { loading: false, success: true, test: action.payload.data };
    case GET_ALL_TEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
