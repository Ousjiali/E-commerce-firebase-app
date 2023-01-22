import {
    QUESTION_REQUEST,
    QUESTION_SUCCESS,
    QUESTION_FAIL,
    SCORE_REQUEST,
    SCORE_SUCCESS,
    SCORE_FAIL,
} from  "../constants/questionConstant";

export const questionsReducer = (state = {questions:[]}, action) => {
    switch (action.type) {
      case QUESTION_REQUEST:
        return { loading: true };
      case QUESTION_SUCCESS:
        return { loading: false, success: true, questions: action.payload.data };
      case QUESTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const scoreReducer = (state = 0, action) => {
  switch (action.type) {
    case SCORE_REQUEST:
      return { loading: true };
    case SCORE_SUCCESS:
      return { loading: false, success: true};
    case SCORE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


