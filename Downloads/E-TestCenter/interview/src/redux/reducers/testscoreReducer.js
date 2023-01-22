import {
  TESTSCORE_FAIL,
  TESTSCORE_REQUEST,
  TESTSCORE_SUCCESS,
  TEST_TIME_FAIL,
  TEST_TIME_REQUEST,
  TEST_TIME_SUCCESS,
} from "../constants/testscoreConstants";

export const getTestscoreReducer = (state = { testscore: 0 }, action) => {
  switch (action.type) {
    case TESTSCORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TESTSCORE_SUCCESS:
      return {
        loading: false,
        success: true,
        testscore: action.payload.data[0].score,
      };
    case TESTSCORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTestTimeReducer = (state = { testTime: 0 }, action) => {
  switch (action.type) {
    case TEST_TIME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEST_TIME_SUCCESS:
      return { loading: false, success: true, testTime: action.payload };
    case TEST_TIME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
