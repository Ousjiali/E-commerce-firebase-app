import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import AccountHeader from "../../components/UI/AccountHeader";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertIcon, CircularProgress, Center } from "@chakra-ui/react";
import { changePassword } from "../../redux/actions/userActions";


const ChangePassword = ({ history }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        changePassword(password)
      );
    } else {
      setMsg(true);
    }
  };
  const changepassword = useSelector((state) => state.changepassword);
  const { loading, error, userInfo } = changepassword;

  useEffect(() => {
    if (userInfo) {
      history.push("/start");
    }
  }, [userInfo, history, dispatch]);

  return (
    <div>
      <Navigation />
      <div className={styles.pagePadding}>
        <AccountHeader
          instruction="Sign in to start your Test"
          title="Welcome to e-Interview"
        />
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {msg && (
            <div className={styles.inputContainer}>
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
          <div className={styles.form}>
            <form onSubmit={submitHandler}>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
              <div className={styles.inputContainer}>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                  />
                </div>
              <div className={styles.inputContainer}>
                <input type="submit" value="Login" className="btn gold" />
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.center}>
                  Don't Have an account? <Link to="/signup">Sign Up</Link>  <span className={styles.inputContainer}><Link to="/forget">Forget password?</Link></span>
                </p>
              </div>
              
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
