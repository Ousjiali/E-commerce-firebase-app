// import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Center } from "@chakra-ui/layout";
import { CircularProgress } from "@chakra-ui/progress";
import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userForgotPassword } from "../../../redux/action/userAction";
import { USER_FORGOTPASSWORD_RESET } from "../../../redux/constants/userContstant";
// import { CONFIRMPASSWORD_RESET } from "../../../redux/constants/userContstant";
// import { USER_LOGIN_RESET } from "../../../redux/constants/userContstant";
import styles from "./styles.module.css";

function ConfirmPassword() {
  const toast = useToast();

  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userForgotPassword(email));
  };

  const forgetPassword = useSelector((state) => state.forgetPassword);
  const { user, loading, error, success } = forgetPassword;
  console.log(user);

  if (success) {
    setEmail("");
    toast({
      title: "Notification",
      description: "Email Sent Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: USER_FORGOTPASSWORD_RESET });
  }

  if (error) {
    setEmail("");
    toast({
      title: "Notification",
      description: error,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: USER_FORGOTPASSWORD_RESET });
  }

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/");
  //   }
  // });

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginPageContent}>
        <div className={styles.loginTitle}>
          <h2> Welcome</h2>
          <p>To the School Management System</p>
        </div>
        <div className={styles.loginForm}>
          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="purple.500" />
            </Center>
          ) : (
            <div className={styles.loginContent}>
              <div className={styles.adminTitle}>Confirm Email</div>
              <div className={styles.newForm}>
                <label>Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required={true}
                />
              </div>
              <div className={styles.forgotpassword_btn}>
                <div className={styles.forgotpassword}>
                  <Link to="/">
                    <h5>Back</h5>
                  </Link>
                </div>

                <div className={styles.stBtn}>
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={submitHandler}
                  >
                    Submit
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

export default ConfirmPassword;
