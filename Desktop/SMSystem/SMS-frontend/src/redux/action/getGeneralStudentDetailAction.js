import axios from "axios";
import {
  GET_STUDENTGENERAL_DETAILS_REQUEST,
  GET_STUDENTGENERAL_DETAILS_SUCCESS,
  GET_STUDENTGENERAL_DETAILS_FAIL,
} from "../constants/studentGeneralDetailsConstant";

export const getGeneralStudentDetailAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_STUDENTGENERAL_DETAILS_REQUEST,
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
      const { data } = await axios.get(
        `/user/student/?specialization__department__faculty__id=${id}`,
        config
      );
      dispatch({
        type: GET_STUDENTGENERAL_DETAILS_SUCCESS,
        payload: data,
      });
      console.log(data);
    } catch (error) {
      dispatch({
        type: GET_STUDENTGENERAL_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
