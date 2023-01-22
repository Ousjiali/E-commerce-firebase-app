import React, { useState, useEffect } from "react";
import Navigation from "../../components/Navigation";
import AccountHeader from "../../components/UI/AccountHeader";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertIcon, CircularProgress, Center } from "@chakra-ui/react";
import { loginUser, myDetails} from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password,history));
  };

 const userLogin = useSelector((state) => state.userLogin);
 const { loading, error,success, userInfo } = userLogin;
  


  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        history.push("/start");
        dispatch(myDetails())
      }, 1000);
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
        {success && (
        <Alert status="success">
          <AlertIcon />
          {"Login successfully"}
        </Alert>
      )}
        {loading ? (
          <Center>
            <CircularProgress isIndeterminate color="purple.500" />
          </Center>
        ) : (
          <div className={styles.form}>
            <form onSubmit={submitHandler}>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                />
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                />
              </div>
              <div className={styles.inputContainer}>
                <input type="submit" value="Login" className="btn gold" />
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.center}>
                  Don't Have an account? <Link to="/signup">Sign Up</Link>{" "}
                  <span className={styles.inputContainer}>
                    <Link to="/forget">Forget password?</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
