import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  forgetPasswordReducer,
  changePasswordReducer,
  adminLoginReducer,
  adminDetailsReducer,
  userSectionsReducer,
  adminRegisterReducer,
  getAllAdminReducer,
  getCandidatesdetailsReducer,
  getViewAdminsReducer,
  getallCandidatesdetailsReducer,
  deleteAdminByIdReducer,
} from "./reducers/userReducers";
import { questionsReducer } from "./reducers/questionReducer";
import { getTestReducer } from "./reducers/testReducer";
import { ResponseReducer } from "./reducers/responseReducer";

import {
  getTestscoreReducer,
  getTestTimeReducer,
} from "./reducers/testscoreReducer";

/* admin reducer */
import {
  adminQuestionsReducer,
  getAllQuestionsReducer,
  getQuestionsByIdReducer,
  testSelectReducer,
  deleteQuestionByIdReducer,
  editQuestionByIdReducer,
  getEacgQuestionByIdReducer,
  deleteCandidateByIdReducer,
} from "./reducers/questionReducers";
import { createTestReducer, getTestReducers } from "./reducers/testReducers";
import {
  createSectionReducer,
  getSectionReducer,
  getSectionByIdReducer,
} from "./reducers/sectionReducers";
import {
  candidateByIdDeleteReducer,
  candidatesFailReducer,
  candidatesPassReducer,
  totalCandidatesReducer,
} from "./reducers/candidateReducers";
import {
  forgetPasswordReducers,
  resetPasswordReducer,
} from "./reducers/forgetPasswordReducer";

const reducer = combineReducers({
  registration: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  getquestion: questionsReducer,
  getTest: getTestReducer,
  Response: ResponseReducer,
  Myscore: getTestscoreReducer,
  postforgetpassword: forgetPasswordReducer,
  changepassword: changePasswordReducer,
  getTime: getTestTimeReducer,
  // admin  reducer
  adminRegister: adminRegisterReducer,
  adminLogin: adminLoginReducer,
  adminDetails: adminDetailsReducer,
  userSections: userSectionsReducer,
  adminQuestions: adminQuestionsReducer,
  testOptions: testSelectReducer,
  newTest: createTestReducer,
  allTest: getTestReducers,
  newSection: createSectionReducer,
  allSection: getSectionReducer,
  examSection: getSectionByIdReducer,
  getAllQuestions: getAllQuestionsReducer,
  myAllAdmin: getAllAdminReducer,
  getQuestion: getQuestionsByIdReducer,
  getCandidate: getCandidatesdetailsReducer,
  getAllCandidate: getallCandidatesdetailsReducer,
  totalCandidates: totalCandidatesReducer,
  getViewAdmins: getViewAdminsReducer,
  allCandidatePassed: candidatesPassReducer,
  allCandidateFailed: candidatesFailReducer,
  deleteQuestion: deleteQuestionByIdReducer,
  deleteCandidate: deleteCandidateByIdReducer,
  deleteCandidateById: candidateByIdDeleteReducer,
  deleteAdmin: deleteAdminByIdReducer,
  editQuestion: editQuestionByIdReducer,
  forgotPassword: forgetPasswordReducers,
  resetPassword: resetPasswordReducer,
  editIdQuestions: getEacgQuestionByIdReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  adminLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
