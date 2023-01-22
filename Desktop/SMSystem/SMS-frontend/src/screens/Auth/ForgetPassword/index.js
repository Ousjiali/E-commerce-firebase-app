// import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postResetPassword } from "../../../redux/action/userAction";
import { CONFIRMPASSWORD_RESET } from "../../../redux/constants/userContstant";
// import { USER_LOGIN_RESET } from "../../../redux/constants/userContstant";
import styles from "./styles.module.css";

function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [msg, setMsg] = useState(false);
  // const [successMsg, setSuccessMsg] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let url = window.location;

  let token = new URLSearchParams(url.search).get("token");
  console.log(token);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
    } else {
      dispatch(postResetPassword(password, token));
    }
  };

  const resetPassword = useSelector((state) => state.resetPassword);
  const { loading, error, success, user } = resetPassword;
  console.log(user);

  if (success) {
    navigate("/");
  }

  if (success) {
    toast({
      title: "Success",
      description: "Password Successfully Changed",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CONFIRMPASSWORD_RESET });
  }

  if (error) {
    toast({
      title: "Error",
      description: error,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CONFIRMPASSWORD_RESET });
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPageContent}>
        <div className={styles.loginTitle}>
          <h2> Welcome</h2>
          <p>To the Student Management System</p>
        </div>
        <div className={styles.loginForm}>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="purple.500" />
            </Center>
          ) : (
            <div className={styles.loginContent}>
              <div className={styles.adminTitle}>Reset Password</div>
              <div className={styles.newForm}>
                <label>New Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                />
              </div>
              <div className={styles.newForm}>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required={true}
                />
              </div>
              <div className={styles.forgotpassword_btn}>
                <div className={styles.forgotpassword}>
                  <Link to="/auth/confirmpassword">
                    <h5>Back</h5>
                  </Link>
                </div>

                <div className={styles.stBtn}>
                  {loading ? (
                    <Button
                      isLoading
                      loadingText="Validating Credentials..."
                      colorScheme="teal"
                      variant="outline"
                      isfullWidth
                      style={{ height: "5rem" }}
                    />
                  ) : (
                    <button
                      type="submit"
                      className={styles.btn}
                      onClick={submitHandler}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
