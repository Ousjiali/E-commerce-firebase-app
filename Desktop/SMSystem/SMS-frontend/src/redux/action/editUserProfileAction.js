import axios from "axios";

import {
  EDIT_USERPROFILE_REQUEST,
  EDIT_USERPROFILE_SUCCESS,
  EDIT_USERPROFILE_FAIL,
} from "../constants/editUserProfileConstant";

export const editUserProfile = (userData) => async (dispatch, getState) => {
  try {
    console.log(userData);
    dispatch({
      type: EDIT_USERPROFILE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
      data: userData,
    };
    const { data } = await axios.patch(`/user/account/`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
    //   history.push("/viewquestion");
    dispatch({
      type: EDIT_USERPROFILE_SUCCESS,
      payload: data,
    });
    console.log(data, "from put request");
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_USERPROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const editUserProfile = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: EDIT_USERPROFILE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userInfo.access}`,
//       },
//     };
//     const { data } = await axios.patch(`/user/account/`, config);
//     dispatch({
//       type: EDIT_USERPROFILE_SUCCESS,
//       payload: data,
//     });
//     localStorage.setItem("userInfo", JSON.stringify(data));
//     console.log(data);
//   } catch (error) {
//     dispatch({
//       type: EDIT_USERPROFILE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
