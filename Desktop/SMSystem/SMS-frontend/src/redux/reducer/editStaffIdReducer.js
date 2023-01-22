import {
  EDIT_STAFFBYID_REQUEST,
  EDIT_STAFFBYID_SUCCESS,
  EDIT_STAFFBYID_FAIL,
  EDIT_STAFFBYID_RESET,
  GET_STAFFBYID_REQUEST,
  GET_STAFFBYID_FAIL,
  DELETE_STAFFBYID_RESET,
  GET_STAFFBYID_SUCCESS,
  DELETE_STAFFBYID_REQUEST,
  DELETE_STAFFBYID_SUCCESS,
  DELETE_STAFFBYID_FAIL,
} from "../constants/editStaffIdConstant";

export const editStaffByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_STAFFBYID_REQUEST:
      return {
        // ...state,
        // staffs: state.staffs.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_STAFFBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editStaffId: action.payload,
      };
    case EDIT_STAFFBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_STAFFBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getStaffByIdReducer = (
  state = { user: {}, specialization: {} },
  action
) => {
  switch (action.type) {
    case GET_STAFFBYID_REQUEST:
      return { ...state, loading: true };
    case GET_STAFFBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload.user,
        specialization: action.payload.specialization,
      };
    case GET_STAFFBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteStaffByIdReducer = (
  state = { deleteStaffById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_STAFFBYID_REQUEST:
      return {
        ...state,
        deleteStaffById: state.deleteStaffById.filter(
          (x) => x.id !== action.payload.id
        ),
        loading: true,
      };
    case DELETE_STAFFBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteStaffs: action.payload,
      };
    case DELETE_STAFFBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_STAFFBYID_RESET:
      return {};
    default:
      return state;
  }
};
