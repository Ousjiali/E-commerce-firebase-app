import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  confirmPasswordReducer,
  userDetailsReducer,
  userForgotPasswordReducer,
  userLoginReducer,
} from "./reducer/userReducer";
import {
  getNoticeReducer,
  postNoticeReducer,
} from "./reducer/noticeBoardReducer";
import {
  getSpecializationReducer,
  postAcademicDataReducer,
  postFamilyDataReducer,
  postHealthDataReducer,
  postSpecilizationReducer,
  postUserDataReducer,
} from "./reducer/userProfileDataReducer";
import { newStaffReducer, totalStaffReducer } from "./reducer/staffReducer";
import {
  createNewStudentReducer,
  deleteStudentByIdReducer,
  totalStudentReducer,
} from "./reducer/studentReducer";
import { getFacultyReducer, newFacultyReducer } from "./reducer/facultyReducer";
import {
  createDepartmentReducer,
  getDepartmentReducer,
} from "./reducer/departmentReducer";
import {
  getCourseReducer,
  postAddCourseReducer,
} from "./reducer/courseReducer";
import { getScopeReducer, postScopeReducer } from "./reducer/scopeReducer";
import { editUserProfileReducer } from "./reducer/editUserProfileReducer";
import {
  editStudentByIdReducer,
  getStudentByIdReducer,
} from "./reducer/editStudentIdReducer";
import {
  getInformationReducer,
  informationImageReducer,
  postInformationReducer,
} from "./reducer/noticeInformationReducer";
import { getLevelReducer } from "./reducer/levelReducer";
import {
  deleteStaffByIdReducer,
  editStaffByIdReducer,
  getStaffByIdReducer,
} from "./reducer/editStaffIdReducer";
import {
  deleteFacultyByIdReducer,
  editFacultyByIdReducer,
  getFacultyByIdReducer,
} from "./reducer/editFacultyIdReducer";
import {
  deleteDepartmentByIdReducer,
  editDepartmentByIdReducer,
  getDepartmentByIdReducer,
} from "./reducer/editDepartmentIdReducer";
import {
  deleteCourseByIdReducer,
  editCourseByIdReducer,
  getCourseByIdReducer,
} from "./reducer/editCourseIdReducer";
import { profilePictureReducer } from "./reducer/profilePictureReducer";
import {
  deleteNoticeByIdReducer,
  editNoticeByIdReducer,
  getNoticeByIdReducer,
} from "./reducer/editNoticeReducer";
import { getGeneralStudentDetailsReducer } from "./reducer/studentGeneralDetailsReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetail: userDetailsReducer,
  forgetPassword: userForgotPasswordReducer,
  resetPassword: confirmPasswordReducer,
  noticeGet: getNoticeReducer,
  postBioDataInfo: postUserDataReducer,
  postNewStaff: newStaffReducer,
  getSpecilize: getSpecializationReducer,
  totalStaffNo: totalStaffReducer,
  postNewStudent: createNewStudentReducer,
  totalStudentNo: totalStudentReducer,
  postAcademic: postAcademicDataReducer,
  postHealth: postHealthDataReducer,
  postFamily: postFamilyDataReducer,
  postNewFaculty: newFacultyReducer,
  listFaculty: getFacultyReducer,
  departmentPost: createDepartmentReducer,
  departmentGet: getDepartmentReducer,
  courseGet: getCourseReducer,
  postNewCourse: postAddCourseReducer,
  noticeBoard: postNoticeReducer,
  scopeId: getScopeReducer,
  editProfileUser: editUserProfileReducer,
  deleteStudentById: deleteStudentByIdReducer,
  editStudent: editStudentByIdReducer,
  getStudentById: getStudentByIdReducer,
  postInfo: postInformationReducer,
  postSpecializations: postSpecilizationReducer,
  levelGet: getLevelReducer,
  postImageInfo: informationImageReducer,
  getInformationImage: getInformationReducer,
  editStaff: editStaffByIdReducer,
  getStaffById: getStaffByIdReducer,
  deleteStaffById: deleteStaffByIdReducer,
  editFaculty: editFacultyByIdReducer,
  getFacultyId: getFacultyByIdReducer,
  deleteFacultyById: deleteFacultyByIdReducer,
  deleteDepartmentById: deleteDepartmentByIdReducer,
  getDepartmentId: getDepartmentByIdReducer,
  editDepartment: editDepartmentByIdReducer,
  editCourse: editCourseByIdReducer,
  getCourseId: getCourseByIdReducer,
  deleteCourseById: deleteCourseByIdReducer,
  editProfilePicture: profilePictureReducer,
  editNoticeById: editNoticeByIdReducer,
  deleteNoticeById: deleteNoticeByIdReducer,
  getNoticeById: getNoticeByIdReducer,
  getGeneralStudentDetail: getGeneralStudentDetailsReducer,
  postScopeData: postScopeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  // adminLogin: { adminInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
