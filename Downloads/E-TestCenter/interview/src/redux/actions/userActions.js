import axios from "axios";
import {
  USER_REGISTRATION_FAIL,
  USER_REGISTRATION_REQUEST,
  USER_REGISTRATION_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
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
  USERS_LOGIN_FAIL,
  USERS_LOGIN_REQUEST,
  USERS_LOGIN_SUCCESS,
  USERS_DETAILS_FAIL,
  USERS_DETAILS_REQUEST,
  USERS_DETAILS_SUCCESS,
  USERS_LOGOUT,
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
  DELETE_ADMIN_BYID_SUCCESS,
  DELETE_ADMIN_BYID_REQUEST,
  DELETE_ADMIN_BYID_FAIL,
} from "../constants/userConstants";

export const registerUser =
  (firstName, lastName, email, phone, password, examType) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTRATION_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/candidate/",
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          examType,
        },
        config
      );
      dispatch({
        type: USER_REGISTRATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: USER_REGISTRATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/auth/",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("candidateDetail");
  localStorage.removeItem("timer");
  localStorage.removeItem("selected_answer");
  localStorage.removeItem("test_training");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const myDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/auth/account", config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("candidateDetail", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const forgetpassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/auth/forgotPassword",
      { email },
      config
    );
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changePassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/auth/resetPassword/:resettoken",
      { email },
      config
    );
    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// ADMIN
export const registerAdmin =
  (firstName, lastName, phone, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USERS_REGISTRATION_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/admin/",
        {
          firstName,
          lastName,
          phone,
          email,
          password,
        },
        config
      );
      dispatch({
        type: USERS_REGISTRATION_SUCCESS,
        payload: data,
      });
      console.log(firstName);
    } catch (error) {
      dispatch({
        type: USERS_REGISTRATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginAdmin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USERS_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/admin/",
      { email, password },
      config
    );

    dispatch({
      type: USERS_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USERS_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: USERS_LOGOUT,
  });
};

export const myAdminDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_DETAILS_REQUEST });
    const {
      adminLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/v1/admin/self", config);
    dispatch({
      type: USERS_DETAILS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userDetails", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USERS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    localStorage.removeItem("userInfo");
    localStorage.removeItem("userDetails");
    dispatch({ type: USER_LOGOUT });
  }
};

export const sectionUser = (section) => async (dispatch) => {
  try {
    dispatch({ type: USER_SECTION_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/section/", { section }, config);

    dispatch({
      type: USER_SECTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SECTION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GETALLADMIN_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/admin/", config);
    dispatch({
      type: GETALLADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GETALLADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllCandidatesdetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GETCANDIDATESDETAILS_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/test-score/`, config);
    dispatch({
      type: GETCANDIDATESDETAILS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("getCandidates", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GETCANDIDATESDETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const viewAllAdmindetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_VIEWADMIN_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/admin/", config);
    dispatch({
      type: USER_VIEWADMIN_SUCCESS,
      payload: data,
    });

    console.log(data);
  } catch (error) {
    dispatch({
      type: USER_VIEWADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAdminId = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ADMIN_BYID_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { adminId } = await axios.delete(`/api/v1/admin/${_id}`, config);
    dispatch({
      type: DELETE_ADMIN_BYID_SUCCESS,
      payload: adminId,
    });
    console.log(adminId);
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const viewAllAdmindetails =
// () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_VIEWADMIN_REQUEST,
//         });
//         const {
//             adminLogin: { userInfo },
//         } = getState();
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "*",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };
//         const { data } = await axios.get(
//             "/api/v1/admin/",
//             config
//         );
//         dispatch({
//             type: USER_VIEWADMIN_SUCCESS,
//             payload: data,
//         });

//         console.log(data);
//     } catch (error) {
//         dispatch({
//             type: USER_VIEWADMIN_FAIL,
//             payload:
//                 error.response &&
//                 error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };
// export const viewAllAdmindetails =
// () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_VIEWADMIN_REQUEST,
//         });
//         const {
//             adminLogin: { userInfo },
//         } = getState();
//         const config = {
//             headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "*",
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };
//         const { data } = await axios.get(
//             "/api/v1/admin/",
//             config
//         );
//         dispatch({
//             type: USER_VIEWADMIN_SUCCESS,
//             payload: data,
//         });

//         console.log(data);
//     } catch (error) {
//         dispatch({
//             type: USER_VIEWADMIN_FAIL,
//             payload:
//                 error.response &&
//                 error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };

// export const allCandidatesDetails = () => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: GETALL_CANDIDATES_DETAILS_REQUEST,
//       });
//       const {
//         adminLogin: { userInfo },
//       } = getState();
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Control-Allow-Origin": "*",
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
//       const { data } = await axios.get(`/api/v1/test-score/self`, config);
//       dispatch({
//         type: GETALL_CANDIDATES_DETAILS_SUCCESS,
//         payload: data,
//       });
//       localStorage.setItem("getCandidates", JSON.stringify(data));
//       console.log(data);
//     } catch (error) {
//       dispatch({
//         type: GETALL_CANDIDATES_DETAILS_FAIL,
//         payload:
//           error.response && error.response.data.error
//             ? error.response.data.message
//             : error.message,
//       });
//     }
//   };
