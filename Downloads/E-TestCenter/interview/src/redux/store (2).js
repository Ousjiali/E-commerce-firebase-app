// import {
//     createStore,
//     combineReducers,
//     applyMiddleware,
// } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import {
//     adminLoginReducer,
//     adminDetailsReducer,
//     userSectionsReducer,
//     adminRegisterReducer,
//     getAllAdminReducer,
//     getCandidatesdetailsReducer,
//     getViewAdminsReducer,
// } from "./reducers/userReducers";

// import {
//     adminQuestionsReducer,
//     getAllQuestionsReducer,
//     getQuestionsByIdReducer,
//     testSelectReducer,
//     deleteQuestionByIdReducer,
// } from "./reducers/questionReducers";
// import {
//     createTestReducer,
//     getTestReducer,
// } from "./reducers/testReducers";
// import {
//     createSectionReducer,
//     getSectionReducer,
//     getSectionByIdReducer,
// } from "./reducers/sectionReducers";
// import {
//     candidatesFailReducer,
//     candidatesPassReducer,
//     totalCandidatesReducer,
// } from "./reducers/candidateReducers";
// import {
//     forgetPasswordReducer,
//     resetPasswordReducer,
// } from "./reducers/forgetPasswordReducer";

// const reducer = combineReducers({
//     adminRegister: adminRegisterReducer,
//     adminLogin: adminLoginReducer,
//     adminDetails: adminDetailsReducer,
//     userSections: userSectionsReducer,
//     adminQuestions: adminQuestionsReducer,
//     testOptions: testSelectReducer,
//     newTest: createTestReducer,
//     allTest: getTestReducer,
//     newSection: createSectionReducer,
//     allSection: getSectionReducer,
//     examSection: getSectionByIdReducer,
//     getAllQuestions: getAllQuestionsReducer,
//     myAllAdmin: getAllAdminReducer,
//     getQuestion: getQuestionsByIdReducer,
//     getCandidate: getCandidatesdetailsReducer,
//     totalCandidates: totalCandidatesReducer,
//     getViewAdmins: getViewAdminsReducer,
//     allCandidatePassed: candidatesPassReducer,
//     allCandidateFailed: candidatesFailReducer,
//     deleteQuestion: deleteQuestionByIdReducer,
//     forgotPassword: forgetPasswordReducer,
//     resetPassword: resetPasswordReducer,
// });

// const userInfoFromStorage = localStorage.getItem("userInfo")
//     ? JSON.parse(localStorage.getItem("userInfo"))
//     : null;

// const initialState = {
//     adminLogin: { userInfo: userInfoFromStorage },
// };

// const middleware = [thunk];

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
