import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../redux/action/userAction";
import { USER_LOGIN_RESET } from "../../../redux/constants/userContstant";
import styles from "./styles.module.css";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
    } else {
      dispatch(loginUser(email, password));
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;
  console.log(userInfo);

  const userSignIn = localStorage.getItem("userInfo");
  console.log(userSignIn);

  if (success) {
    navigate("/admin/dashboard");
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // }, [userInfo, navigate]);

  if (success) {
    toast({
      title: "Notification",
      description: "Login Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  if (error) {
    toast({
      title: "Notification",
      description: " Error Login In",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: USER_LOGIN_RESET });
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPageContent}>
        <div className={styles.loginTitle}>
          <h2> Welcome</h2>
          <p>To the School Management System</p>
        </div>
        <div className={styles.loginForm}>
          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
          {success && (
            <Alert status="success">
              <AlertIcon />
              {/* Login Successfully */}
            </Alert>
          )}
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="purple.500" />
            </Center>
          ) : (
            <div className={styles.loginContent}>
              <div className={styles.adminTitle}>Admin Login</div>
              <div className={styles.newForm}>
                {/* <label>Username</label> */}
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                  placeholder="Username"
                />
              </div>
              <div className={styles.newForm}>
                {/* <label>Password</label> */}
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required={true}
                  placeholder="Password"
                />
              </div>
              <div className={styles.forgotpassword_btn}>
                <div className={styles.forgotpassword}>
                  <Link to="/auth/confirmemail">
                    <h5>Forgot Password ?</h5>
                  </Link>
                </div>

                <div className={styles.stBtn}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={submitHandler}
                    // disabled={!email || !password}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
