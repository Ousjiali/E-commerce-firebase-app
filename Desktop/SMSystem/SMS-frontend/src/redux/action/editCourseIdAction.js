import axios from "axios";
import {
  EDIT_COURSEBYID_REQUEST,
  EDIT_COURSEBYID_SUCCESS,
  EDIT_COURSEBYID_FAIL,
  GET_COURSEBYID_REQUEST,
  GET_COURSEBYID_SUCCESS,
  GET_COURSEBYID_FAIL,
  DELETE_COURSEBYID_REQUEST,
  DELETE_COURSEBYID_SUCCESS,
  DELETE_COURSEBYID_FAIL,
} from "../constants/editCourseIdConstant";

export const getCoursebyId =
  (
    id,
    setSpecialization,
    setCourseName,
    setCourseCode,
    setDescription,
    setCoordinator,
    setIsActive
  ) =>
  async (dispatch, getState) => {
    // console.log(data);
    try {
      dispatch({
        type: GET_COURSEBYID_REQUEST,
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

      const { data } = await axios.get(`/academics/course/${id}/`, config);
      dispatch({
        type: GET_COURSEBYID_SUCCESS,
        payload: data,
      });
      console.log(id);
      console.log(data, "from put request");
      //   console.log(data, "freeman");
      setSpecialization(data.specialization.name);
      setCourseName(data.name);
      setCourseCode(data.code);
      setDescription(data.description);
      setCoordinator(data.coordinator);
      setIsActive(data.is_active.toString());
    } catch (error) {
      dispatch({
        type: GET_COURSEBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteCourseId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COURSEBYID_REQUEST,
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

    const { data } = await axios.delete(`/academics/course/${id}/`, config);
    dispatch({
      type: DELETE_COURSEBYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: DELETE_COURSEBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCourseId = (id, userData) => async (dispatch, getState) => {
  try {
    console.log(userData);
    console.log(id);
    dispatch({
      type: EDIT_COURSEBYID_REQUEST,
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
    const { data } = await axios.patch(
      `/academics/department/${id}/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      }
    );
    //   history.push("/viewquestion");
    dispatch({
      type: EDIT_COURSEBYID_SUCCESS,
      payload: data,
    });
    console.log(data, "from put request");
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_COURSEBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
