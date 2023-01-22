import {
  GET_STUDENTGENERAL_DETAILS_REQUEST,
  GET_STUDENTGENERAL_DETAILS_SUCCESS,
  GET_STUDENTGENERAL_DETAILS_FAIL,
} from "../constants/studentGeneralDetailsConstant";

export const getGeneralStudentDetailsReducer = (
  state = { getGeneralDetails: [] },
  action
) => {
  switch (action.type) {
    case GET_STUDENTGENERAL_DETAILS_REQUEST:
      return { loading: true };
    case GET_STUDENTGENERAL_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        getGeneralDetails: action.payload.results,
      };
    case GET_STUDENTGENERAL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
