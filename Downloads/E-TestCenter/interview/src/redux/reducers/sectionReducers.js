import {
  CREATE_SECTION_FAIL,
  CREATE_SECTION_SUCCESS,
  CREATE_SECTION_REQUEST,
  CREATE_SECTION_RESET,
  GET_SECTION_FAIL,
  GET_SECTION_SUCCESS,
  GET_SECTION_REQUEST,
  GET_SECTION_BYID_REQUEST,
  GET_SECTION_BYID_FAIL,
  GET_SECTION_BYID_SUCCESS,
} from "../constants/sectionConstants";

export const createSectionReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SECTION_REQUEST:
      return { loading: true };
    case CREATE_SECTION_SUCCESS:
      return { loading: false, success: true };
    case CREATE_SECTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_SECTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getSectionReducer = (state = { section: [] }, action) => {
  switch (action.type) {
    case GET_SECTION_REQUEST:
      return { ...state, loading: true };
    case GET_SECTION_SUCCESS:
      return {
        loading: false,
        success: true,
        section: action.payload.data,
      };
    case GET_SECTION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getSectionByIdReducer = (state = { sections: [] }, action) => {
  switch (action.type) {
    case GET_SECTION_BYID_REQUEST:
      return { ...state, loading: true };
    case GET_SECTION_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        sections: action.payload.data,
      };
    case GET_SECTION_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
