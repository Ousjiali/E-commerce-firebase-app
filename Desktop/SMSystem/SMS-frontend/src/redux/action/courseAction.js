import axios from "axios";
import {
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAIL,
  POST_COURSE_REQUEST,
  POST_COURSE_SUCCESS,
  POST_COURSE_FAIL,
  //   POST_COURSE_RESET,
  POST_ADDCOURSE_REQUEST,
  POST_ADDCOURSE_SUCCESS,
  POST_ADDCOURSE_FAIL,
} from "../constants/courseConstant";

export const postAddCourses = (addcourseData) => async (dispatch, getState) => {
  // console.log(studentData);
  try {
    dispatch({
      type: POST_ADDCOURSE_REQUEST,
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
    const { data } = await axios.post(
      "/academics/course/",
      addcourseData,
      config
    );
    dispatch({
      type: POST_ADDCOURSE_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    console.log(error.response.data.message, error.message);
    dispatch({
      type: POST_ADDCOURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCourse = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COURSE_REQUEST,
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
    const { data } = await axios.get(`/academics/course/`, config);
    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: data,
    });
    console.log(data.name);
  } catch (error) {
    dispatch({
      type: GET_COURSE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postRegisterCourses =
  (courseData, toast) => async (dispatch, getState) => {
    // console.log(studentData);
    try {
      dispatch({
        type: POST_COURSE_REQUEST,
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
      const { data } = await axios.post(
        "/user/course_registration/",
        courseData,
        config
      );
      dispatch({
        type: POST_COURSE_SUCCESS,
        payload: data,
      });
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 4000,
        description: "Register Course Created",
      });
    } catch (error) {
      console.log(error.response.data.message, error.message);
      dispatch({
        type: POST_COURSE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
