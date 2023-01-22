import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Alert,
    AlertIcon,
    CircularProgress,
    Center,
} from "@chakra-ui/react";
import { adminForgotPassword } from "../redux/actions/forgetPasswordAction";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./PasswordForgot.css";

function PasswordForgot({ history }) {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminForgotPassword(email));
    };

    const forgotPassword = useSelector(
        (state) => state.forgotPassword
    );

    const { loading, error, success } = forgotPassword;

    if (success) {
        setTimeout(
            () => history.push("/adminlogin"),
            [5000]
        );
    }

    return (
        <div>
            <Sidebar />
            <div className="admin_container">
                <Navbar title="Forgot Password" />

                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert status="success">
                        <AlertIcon />
                        Check your Email to Retrieve your
                        password
                    </Alert>
                )}

                {loading ? (
                    <Center>
                        <CircularProgress
                            isIndeterminate
                            color="purple.300"
                        />
                    </Center>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="inputContainer">
                            <input
                                type="email"
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                value={email}
                                placeholder="Email Address"
                            />
                        </div>

                        <div className="btnContainer">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn gold"
                            />
                        </div>
                        <div className="remeber_password">
                            <p className="center">
                                Reset your password?{" "}
                                <Link to="/resetpassword">
                                    <strong>
                                        Reset Password
                                    </strong>
                                </Link>
                            </p>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default PasswordForgot;
