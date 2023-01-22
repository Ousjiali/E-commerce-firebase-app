import {
  QUESTIONS_FAIL,
  QUESTIONS_SUCCESS,
  QUESTIONS_REQUEST,
  TEST_FAIL,
  TEST_SUCCESS,
  TEST_REQUEST,
  USER_GETALLQUESTIONS_REQUEST,
  USER_GETALLQUESTIONS_SUCCESS,
  USER_GETALLQUESTIONS_FAIL,
  GET_QUESTION_BYID_REQUEST,
  GET_QUESTION_BYID_SUCCESS,
  GET_QUESTION_BYID_FAIL,
  DELETE_CANDIDATE_BYID_REQUEST,
  DELETE_CANDIDATE_BYID_SUCCESS,
  DELETE_CANDIDATE_BYID_FAIL,
  DELETE_QUESTION_BYID_REQUEST,
  DELETE_QUESTION_BYID_SUCCESS,
  DELETE_QUESTION_BYID_FAIL,
  QUESTIONS_RESET,
  DELETE_QUESTION_BYID,
  EDITQUESTION_BYID_REQUEST,
  EDITQUESTION_BYID_SUCCESS,
  EDITQUESTION_BYID_FAIL,
  GET_EACHQUESTION_BYID_REQUEST,
  GET_EACHQUESTION_BYID_FAIL,
  GET_EACHQUESTION_BYID_SUCCESS,
} from "../constants/questionConstants";

export const adminQuestionsReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTIONS_REQUEST:
      return { loading: true };
    case QUESTIONS_SUCCESS:
      return {
        loading: false,
        success: true,
        question: action.payload,
      };
    case QUESTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case QUESTIONS_RESET:
      return {};
    default:
      return state;
  }
};

export const testSelectReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_REQUEST:
      return { loading: true };
    case TEST_SUCCESS:
      return {
        loading: false,
        success: true,
        test: action.payload,
      };
    case TEST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllQuestionsReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case USER_GETALLQUESTIONS_REQUEST:
      return { ...state, loading: true };
    case USER_GETALLQUESTIONS_SUCCESS:
      return {
        loading: false,
        success: true,
        questions: action.payload,
      };
    case USER_GETALLQUESTIONS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getQuestionsByIdReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case GET_QUESTION_BYID_REQUEST:
      return { ...state, loading: true };
    case GET_QUESTION_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        questions: action.payload.data,
      };
    case GET_QUESTION_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_QUESTION_BYID:
      return {
        ...state,
        questions: state.questions.filter((x) => x._id !== action.payload),
      };
    default:
      return state;
  }
};

export const getEacgQuestionByIdReducer = (
  state = { editIdquestions: [] },
  action
) => {
  switch (action.type) {
    case GET_EACHQUESTION_BYID_REQUEST:
      return { ...state, loading: true };
    case GET_EACHQUESTION_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editIdquestions: action.payload.data,
      };
    case GET_EACHQUESTION_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteQuestionByIdReducer = (
  state = { questions: [] },
  action
) => {
  switch (action.type) {
    case DELETE_QUESTION_BYID_REQUEST:
      return {
        ...state,
        questions: state.questions.filter((x) => x._id !== action.payload),
        loading: true,
      };
    case DELETE_QUESTION_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteQuestion: action.payload,
      };
    case DELETE_QUESTION_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editQuestionByIdReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case EDITQUESTION_BYID_REQUEST:
      return {
        ...state,
        questions: state.questions.filter((x) => x._id === action.payload),
        loading: true,
      };
    case EDITQUESTION_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editQuestion: action.payload,
      };
    case EDITQUESTION_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCandidateByIdReducer = (
  state = { candidateId: [] },
  action
) => {
  switch (action.type) {
    case DELETE_CANDIDATE_BYID_REQUEST:
      return {
        ...state,
        candidateId: state.candidateId.filter((x) => x._id !== action.payload),
        loading: true,
      };
    case DELETE_CANDIDATE_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteAllCandidate: action.payload.data,
      };
    case DELETE_CANDIDATE_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// export const editQuestionsReducer = (state = {}, action) => {
//     switch (action.type) {
//       case EDIT_QUESTION_BYID_REQUEST:
//         return { loading: true };
//       case EDIT_QUESTION_BYID_SUCCESS:
//         return {
//           loading: false,
//           success: true,
//           question: action.payload,
//         };
//       case EDIT_QUESTION_BYID_FAIL:
//         return {
//           loading: false,
//           error: action.payload,
//         };
//       case QUESTIONS_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };
