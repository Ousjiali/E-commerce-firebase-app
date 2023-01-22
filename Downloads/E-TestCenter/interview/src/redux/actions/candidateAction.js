import axios from "axios";
import {
  GET_TOTALCANDIDATES_REQUEST,
  GET_TOTALCANDIDATES_SUCCESS,
  GET_TOTALCANDIDATES_FAIL,
  GET_CANDIDATESPASSED_FAIL,
  GET_CANDIDATESPASSED_REQUEST,
  GET_CANDIDATESPASSED_SUCCESS,
  GET_CANDIDATESFAILED_FAIL,
  GET_CANDIDATESFAILED_SUCCESS,
  GET_CANDIDATESFAILED_REQUEST,
  DELETE_EACHCANDIDATE_BYID_REQUEST,
  DELETE_EACHCANDIDATE_BYID_SUCCESS,
  DELETE_EACHCANDIDATE_BYID_FAIL,
} from "../constants/candidateConstants";

export const getTotalCandidates = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_TOTALCANDIDATES_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/candidate/", config);
    dispatch({
      type: GET_TOTALCANDIDATES_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_TOTALCANDIDATES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCandidatesPass = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CANDIDATESPASSED_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/candidate/passed", config);
    dispatch({
      type: GET_CANDIDATESPASSED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CANDIDATESPASSED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCandidatesFail = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CANDIDATESFAILED_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/candidate/failed", config);
    dispatch({
      type: GET_CANDIDATESFAILED_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_CANDIDATESFAILED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCandidateId = (_id) => async (dispatch, getState) => {
  console.log(_id);
  try {
    dispatch({
      type: DELETE_EACHCANDIDATE_BYID_REQUEST,
    });
    const {
      adminLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/candidate/${_id}`, config);
    dispatch({
      type: DELETE_EACHCANDIDATE_BYID_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: DELETE_EACHCANDIDATE_BYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
