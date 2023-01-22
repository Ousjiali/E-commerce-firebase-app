import {
  EDIT_FACULTYBYID_REQUEST,
  EDIT_FACULTYBYID_SUCCESS,
  EDIT_FACULTYBYID_FAIL,
  EDIT_FACULTYBYID_RESET,
  GET_FACULTYBYID_SUCCESS,
  GET_FACULTYBYID_FAIL,
  GET_FACULTYBYID_REQUEST,
  DELETE_FACULTYBYID_REQUEST,
  DELETE_FACULTYBYID_SUCCESS,
  DELETE_FACULTYBYID_FAIL,
  DELETE_FACULTYBYID_RESET,
} from "../constants/editFacultyIdConstant";

export const editFacultyByIdReducer = (state = { faculty: [] }, action) => {
  switch (action.type) {
    case EDIT_FACULTYBYID_REQUEST:
      return {
        ...state,
        faculty: state.faculty.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_FACULTYBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editFacultyId: action.payload,
      };
    case EDIT_FACULTYBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_FACULTYBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getFacultyByIdReducer = (
  state = { getFacultyById: [] },
  action
) => {
  switch (action.type) {
    case GET_FACULTYBYID_REQUEST:
      return { ...state, loading: true };
    case GET_FACULTYBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        getFacultyById: action.payload.user,
      };
    case GET_FACULTYBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteFacultyByIdReducer = (
  state = { deleteFacultyById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_FACULTYBYID_REQUEST:
      return {
        ...state,
        deleteFacultyById: state.deleteFacultyById.filter(
          (x) => x.id !== action.payload.id
        ),
        loading: true,
      };
    case DELETE_FACULTYBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteFaculty: action.payload,
      };
    case DELETE_FACULTYBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_FACULTYBYID_RESET:
      return {};
    default:
      return state;
  }
};
