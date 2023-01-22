import {
  EDIT_COURSEBYID_REQUEST,
  EDIT_COURSEBYID_SUCCESS,
  EDIT_COURSEBYID_FAIL,
  EDIT_COURSEBYID_RESET,
  GET_COURSEBYID_REQUEST,
  GET_COURSEBYID_SUCCESS,
  GET_COURSEBYID_FAIL,
  DELETE_COURSEBYID_REQUEST,
  DELETE_COURSEBYID_SUCCESS,
  DELETE_COURSEBYID_FAIL,
  DELETE_COURSEBYID_RESET,
} from "../constants/editCourseIdConstant";

export const editCourseByIdReducer = (state = { course: [] }, action) => {
  switch (action.type) {
    case EDIT_COURSEBYID_REQUEST:
      return {
        ...state,
        course: state.course.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_COURSEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editCourseId: action.payload,
      };
    case EDIT_COURSEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_COURSEBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getCourseByIdReducer = (state = { getCourseById: [] }, action) => {
  switch (action.type) {
    case GET_COURSEBYID_REQUEST:
      return { ...state, loading: true };
    case GET_COURSEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        getCourseById: action.payload.user,
      };
    case GET_COURSEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCourseByIdReducer = (
  state = { deleteCourseById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_COURSEBYID_REQUEST:
      return {
        ...state,
        deleteCourseById: state.deleteCourseById.filter(
          (x) => x.id !== action.payload.id
        ),
        loading: true,
      };
    case DELETE_COURSEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteCourse: action.payload,
      };
    case DELETE_COURSEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_COURSEBYID_RESET:
      return {};
    default:
      return state;
  }
};
