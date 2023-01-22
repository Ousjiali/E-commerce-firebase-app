import {
  GET_TOTALCANDIDATES_REQUEST,
  GET_TOTALCANDIDATES_SUCCESS,
  GET_TOTALCANDIDATES_FAIL,
  GET_CANDIDATESPASSED_REQUEST,
  GET_CANDIDATESPASSED_SUCCESS,
  GET_CANDIDATESPASSED_FAIL,
  GET_CANDIDATESFAILED_FAIL,
  GET_CANDIDATESFAILED_SUCCESS,
  GET_CANDIDATESFAILED_REQUEST,
  DELETE_EACHCANDIDATE_BYID_REQUEST,
  DELETE_EACHCANDIDATE_BYID_SUCCESS,
  DELETE_EACHCANDIDATE_BYID_FAIL,
} from "../constants/candidateConstants";

export const totalCandidatesReducer = (state = { candidate: [] }, action) => {
  switch (action.type) {
    case GET_TOTALCANDIDATES_REQUEST:
      return { ...state, loading: true };
    case GET_TOTALCANDIDATES_SUCCESS:
      return {
        loading: false,
        success: true,
        candidate: action.payload.data,
      };
    case GET_TOTALCANDIDATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const candidatesPassReducer = (
  state = { candidatepass: [] },
  action
) => {
  switch (action.type) {
    case GET_CANDIDATESPASSED_REQUEST:
      return { ...state, loading: true };
    case GET_CANDIDATESPASSED_SUCCESS:
      return {
        loading: false,
        success: true,
        candidatepass: action.payload.data,
      };
    case GET_CANDIDATESPASSED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const candidatesFailReducer = (
  state = { candidatefail: [] },
  action
) => {
  switch (action.type) {
    case GET_CANDIDATESFAILED_REQUEST:
      return { ...state, loading: true };
    case GET_CANDIDATESFAILED_SUCCESS:
      return {
        loading: false,
        success: true,
        candidatefail: action.payload.data,
      };
    case GET_CANDIDATESFAILED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const candidateByIdDeleteReducer = (
  state = { candidateById: [] },
  action
) => {
  switch (action.type) {
    case DELETE_EACHCANDIDATE_BYID_REQUEST:
      return {
        ...state,
        candidateById: state.candidateById.filter(
          (x) => x._id !== action.payload
        ),
        loading: true,
      };
    case DELETE_EACHCANDIDATE_BYID_SUCCESS:
      return {
        loading: false,
        success: true,
        deleteCandidateId: action.payload.data,
      };
    case DELETE_EACHCANDIDATE_BYID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
