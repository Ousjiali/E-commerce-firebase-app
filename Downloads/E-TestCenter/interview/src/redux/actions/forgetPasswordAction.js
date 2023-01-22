import axios from "axios";
import {
    ADMIN_FORGETPASSWORD_REQUEST,
    ADMIN_FORGETPASSWORD_SUCCESS,
    ADMIN_FORGETPASSWORD_FAIL,
    ADMIN_RESETPASSWORD_FAIL,
    ADMIN_RESETPASSWORD_SUCCESS,
    ADMIN_RESETPASSWORD_REQUEST,
} from "../constants/adminForgetPassword";

export const adminForgotPassword =
    (email) => async (dispatch) => {
        try {
            dispatch({
                type: ADMIN_FORGETPASSWORD_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/auth/admin/forgotPassword",
                {
                    email,
                },
                config
            );
            dispatch({
                type: ADMIN_FORGETPASSWORD_SUCCESS,
                payload: data,
            });
            // console.log(data);
            console.log(email);
        } catch (error) {
            dispatch({
                type: ADMIN_FORGETPASSWORD_FAIL,
                payload:
                    error.response &&
                    error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const adminResetPassword =
    (email) => async (dispatch) => {
        try {
            dispatch({
                type: ADMIN_RESETPASSWORD_REQUEST,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/v1/auth/admin/resetPassword/:resettoken",
                {
                    email,
                },
                config
            );
            dispatch({
                type: ADMIN_RESETPASSWORD_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ADMIN_RESETPASSWORD_FAIL,
                payload:
                    error.response &&
                    error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
