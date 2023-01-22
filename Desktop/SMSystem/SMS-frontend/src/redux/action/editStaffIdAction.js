import axios from "axios";
import {
  EDIT_STAFFBYID_REQUEST,
  EDIT_STAFFBYID_SUCCESS,
  EDIT_STAFFBYID_FAIL,
  GET_STAFFBYID_REQUEST,
  GET_STAFFBYID_SUCCESS,
  GET_STAFFBYID_FAIL,
  DELETE_STAFFBYID_REQUEST,
  DELETE_STAFFBYID_SUCCESS,
  DELETE_STAFFBYID_FAIL,
} from "../constants/editStaffIdConstant";

export const getStaffId =
  (
    id
    // setFirst_Name,
    // setMiddle_Name,
    // setLast_Name,
    // setEmail,
    // setSpecialization,
    // setEmployee_id,
    // setIsActive
  ) =>
  async (dispatch, getState) => {
    // console.log(data);
    try {
      dispatch({
        type: GET_STAFFBYID_REQUEST,
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

      const { data } = await axios.get(`/user/staff/${id}/`, config);
      dispatch({
        type: GET_STAFFBYID_SUCCESS,
        payload: data,
      });
      // console.log(id);
      // console.log(data, "from put request");
      console.log(data.user, "freeman");
      // setFirst_Name(data.user.first_name);
      // setMiddle_Name(data.user.middle_name);
      // setLast_Name(data.user.last_name);
      // setEmail(data.user.email);
      // setSpecialization(data.specialization.id);
      // setEmployee_id(data.employee_id);
      // setIsActive(data.is_active.toString());
    } catch (error) {
      dispatch({
        type: GET_STAFFBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteStaffId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_STAFFBYID_REQUEST,
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

    const { data } = await axios.delete(`/user/staff/${id}/`, config);
    dispatch({
      type: DELETE_STAFFBYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: DELETE_STAFFBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editStaffId = (id, userData) => async (dispatch, getState) => {
  try {
    console.log(userData);
    console.log(id);
    dispatch({
      type: EDIT_STAFFBYID_REQUEST,
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
    const { data } = await axios.patch(`/user/staff/${id}/`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
    //   history.push("/viewquestion");
    dispatch({
      type: EDIT_STAFFBYID_SUCCESS,
      payload: data,
    });
    console.log(data, "from put request");
  } catch (error) {
    console.log(error);
    dispatch({
      type: EDIT_STAFFBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
