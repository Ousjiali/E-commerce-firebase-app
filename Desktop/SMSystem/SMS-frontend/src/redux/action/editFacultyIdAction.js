import axios from "axios";
import {
  EDIT_FACULTYBYID_REQUEST,
  EDIT_FACULTYBYID_SUCCESS,
  EDIT_FACULTYBYID_FAIL,
  GET_FACULTYBYID_REQUEST,
  GET_FACULTYBYID_SUCCESS,
  GET_FACULTYBYID_FAIL,
  DELETE_FACULTYBYID_REQUEST,
  DELETE_FACULTYBYID_SUCCESS,
  DELETE_FACULTYBYID_FAIL,
} from "../constants/editFacultyIdConstant";

export const getFacultyId =
  (
    id,
    setFaculty_Name,
    setFaculty_Code,
    setDescription,
    setDeanOfFaculty,
    setIsActive
  ) =>
  async (dispatch, getState) => {
    // console.log(data);
    try {
      dispatch({
        type: GET_FACULTYBYID_REQUEST,
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

      const { data } = await axios.get(`/academics/faculty/${id}/`, config);
      dispatch({
        type: GET_FACULTYBYID_SUCCESS,
        payload: data,
      });
      console.log(id);
      console.log(data, "from put request");
      //   console.log(data, "freeman");
      setFaculty_Name(data.name);
      setFaculty_Code(data.code);
      setDescription(data.description);
      setDeanOfFaculty(data.deanOfFaculty);
      setIsActive(data.is_active.toString());
    } catch (error) {
      dispatch({
        type: GET_FACULTYBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteFacultyId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_FACULTYBYID_REQUEST,
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

    const { data } = await axios.delete(`/academics/faculty/${id}/`, config);
    dispatch({
      type: DELETE_FACULTYBYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    // console.log(error.response.data.message, error.message);
    dispatch({
      type: DELETE_FACULTYBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editFacultyId =
  (id, userData, is_active) => async (dispatch, getState) => {
    try {
      console.log(userData);
      console.log(id);
      dispatch({
        type: EDIT_FACULTYBYID_REQUEST,
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
        `/academics/faculty/${id}/`,
        userData,
        is_active,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      //   history.push("/viewquestion");
      dispatch({
        type: EDIT_FACULTYBYID_SUCCESS,
        payload: data,
      });
      console.log(data, "from put request");
    } catch (error) {
      console.log(error);
      dispatch({
        type: EDIT_FACULTYBYID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
