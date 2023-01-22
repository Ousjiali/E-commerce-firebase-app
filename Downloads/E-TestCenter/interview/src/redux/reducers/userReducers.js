import {
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_REGISTRATION_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  // ADMIN
  USERS_REGISTRATION_FAIL,
  USERS_REGISTRATION_REQUEST,
  USERS_REGISTRATION_SUCCESS,
  USERS_REGISTRATION_RESET,
  USERS_LOGIN_FAIL,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  USERS_LOGOUT,
  USERS_DETAILS_FAIL,
  USERS_DETAILS_REQUEST,
  USERS_DETAILS_SUCCESS,
  USER_SECTION_FAIL,
  USER_SECTION_REQUEST,
  USER_SECTION_SUCCESS,
  GETALLADMIN_FAIL,
  GETALLADMIN_SUCCESS,
  GETALLADMIN_REQUEST,
  GETCANDIDATESDETAILS_FAIL,
  GETCANDIDATESDETAILS_SUCCESS,
  GETCANDIDATESDETAILS_REQUEST,
  USER_VIEWADMIN_FAIL,
  USER_VIEWADMIN_SUCCESS,
  USER_VIEWADMIN_REQUEST,
  GETALL_CANDIDATES_DETAILS_REQUEST,
  GETALL_CANDIDATES_DETAILS_SUCCESS,
  GETALL_CANDIDATES_DETAILS_FAIL,
  DELETE_ADMIN_BYID_SUCCESS,
  DELETE_ADMIN_BYID_REQUEST,
  DELETE_ADMIN_BYID_FAIL,
} from "../constants/userConstants";

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTRATION_REQUEST:
      return { loading: true };
    case USER_REGISTRATION_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTRATION_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTRATION_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: action.payload.data };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return { loading: true };
    case FORGET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case FORGET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// ADMIN
export const adminRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_REGISTRATION_REQUEST:
      return { loading: true };
    case USERS_REGISTRATION_SUCCESS:
      return { loading: false, success: true };
    case USERS_REGISTRATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USERS_REGISTRATION_RESET:
      return {};
    default:
      return state;
  }
};

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_LOGIN_REQUEST:
      return { loading: true };
    case USERS_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USERS_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case USERS_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const adminDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USERS_DETAILS_REQUEST:
      return { loading: true };
    case USERS_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload.data,
      };
    case USERS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userSectionsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SECTION_REQUEST:
      return { loading: true };
    case USER_SECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        section: action.payload,
      };
    case USER_SECTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllAdminReducer = (state = { admin: [] }, action) => {
  switch (action.type) {
    case GETALLADMIN_REQUEST:
      return { ...state, loading: true };
    case GETALLADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        admin: action.payload.data,
      };
    case GETALLADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCandidatesdetailsReducer = (
  state = { candidates: [] },
  action
) => {
  switch (action.type) {
    case GETCANDIDATESDETAILS_REQUEST:
      return { ...state, loading: true };
    case GETCANDIDATESDETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        candidates: action.payload.data,
      };
    case GETCANDIDATESDETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getallCandidatesdetailsReducer = (
  state = { candidatesDetails: [] },
  action
) => {
  switch (action.type) {
    case GETALL_CANDIDATES_DETAILS_REQUEST:
      return {
        ...state,
        candidatesDetails: state.candidatesDetails.filter(
          (x) => x.id === action.payload
        ),
        loading: true,
      };
    case GETALL_CANDIDATES_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        candidatesDetails: action.payload.data,
      };
    case GETALL_CANDIDATES_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getViewAdminsReducer = (state = { getadmin: [] }, action) => {
  switch (action.type) {
    case USER_VIEWADMIN_REQUEST:
      return { ...state, loading: true };
    case USER_VIEWADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
        getadmin: action.payload.data,
      };
    case USER_VIEWADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteAdminByIdReducer = (state = { adminId: [] }, action) => {
  switch (action.type) {
    case DELETE_ADMIN_BYID_REQUEST:
      return {
        ...state,
        adminId: state.adminId.filter((x) => x._id !== action.payload),
        loading: true,
      };
    case DELETE_ADMIN_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteAdminid: action.payload.data,
      };
    case DELETE_ADMIN_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
