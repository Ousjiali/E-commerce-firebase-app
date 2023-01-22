import {
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_FAIL,
  CREATE_DEPARTMENT_RESET,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
  GET_DEPARTMENT_FAIL,
} from "../constants/departmentConstant";

export const createDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DEPARTMENT_REQUEST:
      return { loading: true };
    case CREATE_DEPARTMENT_SUCCESS:
      return { loading: false, success: true, department: action.payload };
    case CREATE_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_DEPARTMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getDepartmentReducer = (state = { getDepartment: [] }, action) => {
  switch (action.type) {
    case GET_DEPARTMENT_REQUEST:
      return { loading: true };
    case GET_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        departmentid: action.payload.results,
      };
    case GET_DEPARTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
