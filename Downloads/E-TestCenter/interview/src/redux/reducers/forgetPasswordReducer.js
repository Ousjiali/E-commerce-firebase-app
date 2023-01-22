import {
    ADMIN_FORGETPASSWORD_REQUEST,
    ADMIN_FORGETPASSWORD_SUCCESS,
    ADMIN_FORGETPASSWORD_FAIL,
    ADMIN_RESETPASSWORD_REQUEST,
    ADMIN_RESETPASSWORD_SUCCESS,
    ADMIN_RESETPASSWORD_FAIL,
} from "../constants/adminForgetPassword";

export const forgetPasswordReducers = (
    state = {},
    action
) => {
    switch (action.type) {
        case ADMIN_FORGETPASSWORD_REQUEST:
            return { loading: true };
        case ADMIN_FORGETPASSWORD_SUCCESS:
            return { loading: false, success: true };
        case ADMIN_FORGETPASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const resetPasswordReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case ADMIN_RESETPASSWORD_REQUEST:
            return { loading: true };
        case ADMIN_RESETPASSWORD_SUCCESS:
            return { loading: false, success: true };
        case ADMIN_RESETPASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
