import axios from "axios";

import {
  GET_DEPARTMENTBYID_REQUEST,
  GET_DEPARTMENTBYID_SUCCESS,
  GET_DEPARTMENTBYID_FAIL,
  EDIT_DEPARTMENTBYID_REQUEST,
  EDIT_DEPARTMENTBYID_SUCCESS,
  EDIT_DEPARTMENTBYID_FAIL,
  DELETE_DEPARTMENTBYID_REQUEST,
  DELETE_DEPARTMENTBYID_SUCCESS,
  DELETE_DEPARTMENTBYID_FAIL,
} from "../constants/editDepartmentIdConstant";

export const getDepartmentId =
  (
    id,
    setFacultyName,
    setNameOfDepartment,
    setDepartmentCode,
    setHeadOfDepartment,
    setDescription,
    setIsActive
  ) =>
  async (dispatch, getState) => {
    // console.log(data);
    try {
      dispatch({
        type: GET_DEPARTMENTBYID_REQUEST,
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

      const { data } = await axios.get(`/academics/department/${id}/`, config);
      dispatch({
        type: GET_DEPARTMENTBYID_SUCCESS,
        payload: data,
      });
      console.log(id);
      console.log(data, "from put request");
      //   console.log(data, "freeman");
      setDepartmentCode(data.code);
      setDescription(data.description);
      setFacultyName(data.faculty.name);
      setHeadOfDepartment(data.head);
      setNameOfDepartment(data.name);
      setIsActive(data.is_active.toString());
    } catch (error) {
      dispatch({
        type: GET_DEPARTMENTBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteDepartmentId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_DEPARTMENTBYID_REQUEST,
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

    const { data } = await axios.delete(`/academics/department/${id}/`, config);
    dispatch({
      type: DELETE_DEPARTMENTBYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: DELETE_DEPARTMENTBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editDepartmentId =
  (id, userData) => async (dispatch, getState) => {
    try {
      console.log(userData);
      console.log(id);
      dispatch({
        type: EDIT_DEPARTMENTBYID_REQUEST,
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
        type: EDIT_DEPARTMENTBYID_SUCCESS,
        payload: data,
      });
      console.log(data, "from put request");
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_DEPARTMENTBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
