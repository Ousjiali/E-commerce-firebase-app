import {
  CREATE_FACULTY_REQUEST,
  CREATE_FACULTY_SUCCESS,
  CREATE_FACULTY_FAIL,
  CREATE_FACULTY_RESET,
  GET_FACULTY_REQUEST,
  GET_FACULTY_SUCCESS,
  GET_FACULTY_FAIL,
  // DELETE_FACULTY_REQUEST,
  // DELETE_FACULTY_SUCCESS,
  // DELETE_FACULTY_FAIL,
} from "../constants/facultyConstant";

export const newFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_FACULTY_REQUEST:
      return { loading: true };
    case CREATE_FACULTY_SUCCESS:
      return { loading: false, success: true, faculty: action.payload };
    case CREATE_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_FACULTY_RESET:
      return {};
    default:
      return state;
  }
};

export const getFacultyReducer = (state = { getFaculty: [] }, action) => {
  switch (action.type) {
    case GET_FACULTY_REQUEST:
      return { loading: true };
    case GET_FACULTY_SUCCESS:
      return {
        loading: false,
        success: true,
        faculty: action.payload.results,
      };
    case GET_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
