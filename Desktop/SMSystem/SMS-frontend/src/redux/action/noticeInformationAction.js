import axios from "axios";
import {
  POST_INFORMATION_REQUEST,
  POST_INFORMATION_SUCCESS,
  POST_INFORMATION_FAIL,
  IMAGE_INFORMATION_REQUEST,
  IMAGE_INFORMATION_SUCCESS,
  IMAGE_INFORMATION_FAIL,
  GET_INFORMATION_REQUEST,
  GET_INFORMATION_SUCCESS,
  GET_INFORMATION_FAIL,
} from "../constants/noticeInformationConstant";

export const postInformation = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_INFORMATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    console.log(userInfo.access);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.post(
      "/information/information/",
      formData,
      config
    );
    dispatch({
      type: POST_INFORMATION_SUCCESS,
      payload: data,
    });
    console.log(data);
    //   localStorage.setItem("InfoInformation", JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: POST_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const informationImage = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IMAGE_INFORMATION_REQUEST,
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
    const { data } = await axios.post("/information/image/", formData, config);
    dispatch({
      type: IMAGE_INFORMATION_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: IMAGE_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getInformation = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_INFORMATION_REQUEST,
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
    const { data } = await axios.get(`/information/information/`, config);
    dispatch({
      type: GET_INFORMATION_SUCCESS,
      payload: data,
    });
    // localStorage.setItem("getNoticeInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
