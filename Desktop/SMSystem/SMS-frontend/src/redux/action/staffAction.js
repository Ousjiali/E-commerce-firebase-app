import axios from "axios";
import {
  NEWSTAFF_REQUEST,
  NEWSTAFF_SUCCESS,
  NEWSTAFF_FAIL,
  TOTAL_STAFF_REQUEST,
  TOTAL_STAFF_SUCCESS,
  TOTAL_STAFF_FAIL,
} from "../constants/staffConstant";

export const newStaff = (staffData, toast) => async (dispatch, getState) => {
  // console.log(staffData);
  try {
    dispatch({
      type: NEWSTAFF_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    //   console.log(userInfo.access);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.post("/user/staff/", staffData, config);
    dispatch({
      type: NEWSTAFF_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: NEWSTAFF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const totalStaff = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOTAL_STAFF_REQUEST,
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
    const { data } = await axios.get("/user/staff/", config);
    dispatch({
      type: TOTAL_STAFF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: TOTAL_STAFF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
