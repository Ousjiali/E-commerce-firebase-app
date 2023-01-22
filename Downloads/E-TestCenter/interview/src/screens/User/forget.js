import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import AccountHeader from "../../components/UI/AccountHeader";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Alert, AlertIcon, CircularProgress, Center } from "@chakra-ui/react";
import { forgetpassword } from "../../redux/actions/userActions";


const Forget = ({ history }) => {
  const [email, setEmail] = useState("");
  
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetpassword(email));
  };
  const postforgetpassword = useSelector((state) => state.postforgetpassword);
  const { loading, error, success } = postforgetpassword;

  if (success) {
    setTimeout(() => history.push("/login"), [5000]);
  }

  

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
              Check your Email to Retrieve your password
            </Alert>
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
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                />
              </div>
              <div className={styles.inputContainer}>
                <input type="submit" value="Send" className="btn gold" />
              </div>
              <div className={styles.inputContainer}>
                <p className={styles.center}>
                  Remember your password? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forget;
