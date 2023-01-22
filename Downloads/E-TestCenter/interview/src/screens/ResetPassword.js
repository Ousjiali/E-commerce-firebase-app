import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertIcon, CircularProgress, Center } from "@chakra-ui/react";
import { adminResetPassword } from "../redux/actions/forgetPasswordAction";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./ResetPassword.css";

function ResetPassword({ history }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(adminResetPassword(password));
    } else {
      setMsg(true);
    }
  };

  const resetPassword = useSelector((state) => state.resetPassword);
  const { loading, error, userInfo } = resetPassword;

  useEffect(() => {
    if (userInfo) {
      history.push("/start");
    }
  }, [userInfo, history, dispatch]);

  return (
    <div>
      <Sidebar />
      <div className="admin_container">
        <Navbar title="Reset Password" />

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {msg && (
          <div className="inputContainer2">
            <Alert status="error">
              <AlertIcon />
              Password does not match
            </Alert>
          </div>
        )}
        {loading ? (
          <Center>
            <CircularProgress isIndeterminate color="purple.300" />
          </Center>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="inputContainer2">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="inputContainer2">
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm Password"
              />
            </div>
            <div className="login-reset">
              <input type="submit" value="Submit" className="btn" />
            </div>
            <div className="">
              <p className="create_account">
                Don't Have an account?{" "}
                <Link to="/adminregister">
                  <strong>Sign Up</strong>
                </Link>{" "}
                <br></br>
                <span className="sign_up">
                  <Link to="/passwordforgot">Forget password?</Link>
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
