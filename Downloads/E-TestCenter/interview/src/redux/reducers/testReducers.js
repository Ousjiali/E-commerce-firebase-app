import {
    CREATE_TEST_FAIL,
    CREATE_TEST_SUCCESS,
    CREATE_TEST_REQUEST,
    CREATE_TEST_RESET,
    GET_TEST_FAIL,
    GET_TEST_SUCCESS,
    GET_TEST_REQUEST,
} from "../constants/testConstants";

export const createTestReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_TEST_REQUEST:
            return { loading: true };
        case CREATE_TEST_SUCCESS:
            return { loading: false, success: true };
        case CREATE_TEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CREATE_TEST_RESET:
            return {};
        default:
            return state;
    }
};

export const getTestReducers = (
    state = { test: [] },
    action
) => {
    switch (action.type) {
        case GET_TEST_REQUEST:
            return { ...state, loading: true };
        case GET_TEST_SUCCESS:
            return {
                loading: false,
                success: true,
                test: action.payload.data,
            };
        case GET_TEST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
