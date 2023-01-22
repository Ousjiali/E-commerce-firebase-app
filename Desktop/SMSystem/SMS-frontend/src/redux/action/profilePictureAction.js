import axios from "axios";
import {
  PROFILE_PICTURE_REQUEST,
  PROFILE_PICTURE_SUCCESS,
  PROFILE_PICTURE_FAIL,
} from "../constants/profilePictureConstant";

export const profileImage = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_PICTURE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.access);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.patch(
      `/user/biodata/${id}/`,
      formData,
      config
    );
    dispatch({
      type: PROFILE_PICTURE_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PROFILE_PICTURE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
