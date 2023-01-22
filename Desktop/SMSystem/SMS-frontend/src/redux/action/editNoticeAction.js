import axios from "axios";

import {
  EDIT_NOTICEBYID_REQUEST,
  EDIT_NOTICEBYID_SUCCESS,
  EDIT_NOTICEBYID_FAIL,
  DELETE_NOTICEBYID_REQUEST,
  DELETE_NOTICEBYID_SUCCESS,
  DELETE_NOTICEBYID_FAIL,
  GET_NOTICEBYID_REQUEST,
  GET_NOTICEBYID_SUCCESS,
  GET_NOTICEBYID_FAIL,
} from "../constants/EditNoticeIdConstant";

export const deleteNoticeId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_NOTICEBYID_REQUEST,
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

    const { data } = await axios.delete(`/information/notice/${id}/`, config);
    dispatch({
      type: DELETE_NOTICEBYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: DELETE_NOTICEBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editNoticeId = (id, userData) => async (dispatch, getState) => {
  try {
    console.log(userData);
    console.log(id);
    dispatch({
      type: EDIT_NOTICEBYID_REQUEST,
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
    const { data } = await axios.patch(`/information/notice/${id}/`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
    dispatch({
      type: EDIT_NOTICEBYID_SUCCESS,
      payload: data,
    });
    console.log(data, "from put request");
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_NOTICEBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getNoticeId =
  (id, setTitle, setScope, setMessage, userData) =>
  async (dispatch, getState) => {
    try {
      console.log(userData);
      console.log(id);
      dispatch({
        type: GET_NOTICEBYID_REQUEST,
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
      const { data } = await axios.get(`/information/notice/${id}/`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      dispatch({
        type: GET_NOTICEBYID_SUCCESS,
        payload: data,
      });
      console.log(data, "from put request");
      setTitle(data.title);
      setScope(data.scope);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_NOTICEBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
