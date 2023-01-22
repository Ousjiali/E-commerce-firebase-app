import axios from "axios";
import {
  RESPONSE_FAIL,
  RESPONSE_REQUEST,
  RESPONSE_SUCCESS,
} from "../constants/responseConstant";

export const postResponse =
  (question, selected_answers) => async (dispatch) => {
    try {
      dispatch({ type: RESPONSE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/candidate-response/",
        { question, selected_answers },
        config
      );
      dispatch({
        type: RESPONSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RESPONSE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
