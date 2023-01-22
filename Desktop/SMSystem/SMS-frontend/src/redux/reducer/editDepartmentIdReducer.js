import {
  EDIT_DEPARTMENTBYID_REQUEST,
  EDIT_DEPARTMENTBYID_SUCCESS,
  EDIT_DEPARTMENTBYID_FAIL,
  EDIT_DEPARTMENTBYID_RESET,
  DELETE_DEPARTMENTBYID_RESET,
  DELETE_DEPARTMENTBYID_FAIL,
  DELETE_DEPARTMENTBYID_SUCCESS,
  DELETE_DEPARTMENTBYID_REQUEST,
  GET_DEPARTMENTBYID_FAIL,
  GET_DEPARTMENTBYID_SUCCESS,
  GET_DEPARTMENTBYID_REQUEST,
} from "../constants/editDepartmentIdConstant";

export const editDepartmentByIdReducer = (
  state = { department: [] },
  action
) => {
  switch (action.type) {
    case EDIT_DEPARTMENTBYID_REQUEST:
      return {
        ...state,
        department: state.department.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_DEPARTMENTBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editDepartmentId: action.payload,
      };
    case EDIT_DEPARTMENTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_DEPARTMENTBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getDepartmentByIdReducer = (
  state = { getDeparmentById: [] },
  action
) => {
  switch (action.type) {
    case GET_DEPARTMENTBYID_REQUEST:
      return { ...state, loading: true };
    case GET_DEPARTMENTBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        getDepartmentById: action.payload.user,
      };
    case GET_DEPARTMENTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteDepartmentByIdReducer = (
  state = { deleteDepartmentById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_DEPARTMENTBYID_REQUEST:
      return {
        ...state,
        deleteDepartmentById: state.deleteDepartmentById.filter(
          (x) => x.id !== action.payload.id
        ),
        loading: true,
      };
    case DELETE_DEPARTMENTBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteDepartment: action.payload,
      };
    case DELETE_DEPARTMENTBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_DEPARTMENTBYID_RESET:
      return {};
    default:
      return state;
  }
};
