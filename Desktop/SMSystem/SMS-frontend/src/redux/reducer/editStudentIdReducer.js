import {
  EDIT_STUDENTBYID_REQUEST,
  EDIT_STUDENTBYID_SUCCESS,
  EDIT_STUDENTBYID_FAIL,
  EDIT_STUDENTBYID_RESET,
  GET_STUDENTBYID_REQUEST,
  GET_STUDENTBYID_SUCCESS,
  GET_STUDENTBYID_FAIL,
} from "../constants/editStudentIdConstant";

export const editStudentByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STUDENTBYID_REQUEST:
      return {
        // ...state,
        // students: state.students.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_STUDENTBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editStudentId: action.payload,
      };
    case EDIT_STUDENTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_STUDENTBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getStudentByIdReducer = (
  state = { user: {}, specialization: {} },
  action
) => {
  switch (action.type) {
    case GET_STUDENTBYID_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENTBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        specialization: action.payload.specialization,
      };
    case GET_STUDENTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
