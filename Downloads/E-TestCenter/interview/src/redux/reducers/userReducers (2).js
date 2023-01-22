// import {
//     USERS_REGISTRATION_FAIL,
//     USERS_REGISTRATION_REQUEST,
//     USERS_REGISTRATION_SUCCESS,
//     USERS_REGISTRATION_RESET,
//     USERS_LOGIN_FAIL,
//     USERS_LOGIN_REQUEST,
//     USERS_LOGIN_SUCCESS,
//     USERS_LOGOUT,
//     USERS_DETAILS_FAIL,
//     USERS_DETAILS_REQUEST,
//     USERS_DETAILS_SUCCESS,
//     USER_SECTION_FAIL,
//     USER_SECTION_REQUEST,
//     USER_SECTION_SUCCESS,
//     GETALLADMIN_FAIL,
//     GETALLADMIN_SUCCESS,
//     GETALLADMIN_REQUEST,
//     GETCANDIDATESDETAILS_FAIL,
//     GETCANDIDATESDETAILS_SUCCESS,
//     GETCANDIDATESDETAILS_REQUEST,
//     USER_VIEWADMIN_FAIL,
//     USER_VIEWADMIN_SUCCESS,
//     USER_VIEWADMIN_REQUEST,
// } from "../constants/userConstants";

// export const adminRegisterReducer = (
//     state = {},
//     action
// ) => {
//     switch (action.type) {
//         case USERS_REGISTRATION_REQUEST:
//             return { loading: true };
//         case USERS_REGISTRATION_SUCCESS:
//             return { loading: false, success: true };
//         case USERS_REGISTRATION_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case USERS_REGISTRATION_RESET:
//             return {};
//         default:
//             return state;
//     }
// };

// export const adminLoginReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USERS_LOGIN_REQUEST:
//             return { loading: true };
//         case USERS_LOGIN_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 userInfo: action.payload,
//             };
//         case USERS_LOGIN_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         case USERS_LOGOUT:
//             return {};
//         default:
//             return state;
//     }
// };

// export const adminDetailsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USERS_DETAILS_REQUEST:
//             return { loading: true };
//         case USERS_DETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 user: action.payload.data,
//             };
//         case USERS_DETAILS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const userSectionsReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USER_SECTION_REQUEST:
//             return { loading: true };
//         case USER_SECTION_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 section: action.payload,
//             };
//         case USER_SECTION_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const getAllAdminReducer = (
//     state = { admin: [] },
//     action
// ) => {
//     switch (action.type) {
//         case GETALLADMIN_REQUEST:
//             return { ...state, loading: true };
//         case GETALLADMIN_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 admin: action.payload.data,
//             };
//         case GETALLADMIN_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const getCandidatesdetailsReducer = (
//     state = { candidates: [] },
//     action
// ) => {
//     switch (action.type) {
//         case GETCANDIDATESDETAILS_REQUEST:
//             return { ...state, loading: true };
//         case GETCANDIDATESDETAILS_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 candidates: action.payload.data,
//             };
//         case GETCANDIDATESDETAILS_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const getViewAdminsReducer = (
//     state = { getadmin: [] },
//     action
// ) => {
//     switch (action.type) {
//         case USER_VIEWADMIN_REQUEST:
//             return { ...state, loading: true };
//         case USER_VIEWADMIN_SUCCESS:
//             return {
//                 loading: false,
//                 success: true,
//                 getadmin: action.payload.data,
//             };
//         case USER_VIEWADMIN_FAIL:
//             return {
//                 loading: false,
//                 error: action.payload,
//             };
//         default:
//             return state;
//     }
// };
