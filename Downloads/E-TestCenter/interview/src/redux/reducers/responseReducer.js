import {
    RESPONSE_REQUEST,
    RESPONSE_SUCCESS,
    RESPONSE_FAIL,
} from  "../constants/responseConstant";

export const ResponseReducer = (state = {}, action) => {
    switch (action.type) {
      case RESPONSE_REQUEST:
        return { loading: true };
      case RESPONSE_SUCCESS:
        return { loading: false, success: true };
      case RESPONSE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };