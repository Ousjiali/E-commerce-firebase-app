import axios from "axios";
import {
  GET_LEVEL_REQUEST,
  GET_LEVEL_SUCCESS,
  GET_LEVEL_FAIL,
} from "../constants/levelConstant";

export const getLevelAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_LEVEL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get(`/academics/level/`, config);
    dispatch({
      type: GET_LEVEL_SUCCESS,
      payload: data,
    });
    localStorage.setItem("getLevelInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_LEVEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
