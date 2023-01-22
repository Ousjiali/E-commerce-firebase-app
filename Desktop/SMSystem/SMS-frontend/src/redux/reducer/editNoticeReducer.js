import {
  EDIT_NOTICEBYID_REQUEST,
  EDIT_NOTICEBYID_SUCCESS,
  EDIT_NOTICEBYID_FAIL,
  EDIT_NOTICEBYID_RESET,
  DELETE_NOTICEBYID_REQUEST,
  DELETE_NOTICEBYID_SUCCESS,
  DELETE_NOTICEBYID_FAIL,
  DELETE_NOTICEBYID_RESET,
  GET_NOTICEBYID_REQUEST,
  GET_NOTICEBYID_SUCCESS,
  GET_NOTICEBYID_FAIL,
} from "../constants/EditNoticeIdConstant";

export const deleteNoticeByIdReducer = (
  state = { deleteNoticeById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_NOTICEBYID_REQUEST:
      return {
        ...state,
        deleteNoticeById: state.deleteNoticeById.filter(
          (x) => x.id !== action.payload.id
        ),
        loading: true,
      };
    case DELETE_NOTICEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteNotice: action.payload,
      };
    case DELETE_NOTICEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case DELETE_NOTICEBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const editNoticeByIdReducer = (state = { editNotice: [] }, action) => {
  switch (action.type) {
    case EDIT_NOTICEBYID_REQUEST:
      return {
        ...state,
        editNotice: state.editNotice.filter((x) => x.id === action.payload),
        loading: true,
      };
    case EDIT_NOTICEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        editNotice: action.payload,
      };
    case EDIT_NOTICEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EDIT_NOTICEBYID_RESET:
      return {};
    default:
      return state;
  }
};

export const getNoticeByIdReducer = (state = { results: {} }, action) => {
  switch (action.type) {
    case GET_NOTICEBYID_REQUEST:
      return { ...state, loading: true };
    case GET_NOTICEBYID_SUCCESS:
      return {
        loading: false,
        success: true,
        results: action.payload,
      };
    case GET_NOTICEBYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
