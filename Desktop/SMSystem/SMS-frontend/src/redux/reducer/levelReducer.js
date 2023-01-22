import {
  GET_LEVEL_REQUEST,
  GET_LEVEL_SUCCESS,
  GET_LEVEL_FAIL,
} from "../constants/levelConstant";

export const getLevelReducer = (state = { getLevel: [] }, action) => {
  switch (action.type) {
    case GET_LEVEL_REQUEST:
      return { loading: true };
    case GET_LEVEL_SUCCESS:
      return {
        loading: false,
        success: true,
        getLevelId: action.payload.results,
      };
    case GET_LEVEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
