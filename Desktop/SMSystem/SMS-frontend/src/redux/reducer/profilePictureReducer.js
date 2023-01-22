import {
  PROFILE_PICTURE_REQUEST,
  PROFILE_PICTURE_SUCCESS,
  PROFILE_PICTURE_FAIL,
  PROFILE_PICTURE_RESET,
} from "../constants/profilePictureConstant";

export const profilePictureReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PICTURE_REQUEST:
      return { loading: true };
    case PROFILE_PICTURE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case PROFILE_PICTURE_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_PICTURE_RESET:
      return {};
    default:
      return state;
  }
};
