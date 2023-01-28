import React from "react";
import logo from "../../assets/logo.png";
import styles from "./styles.module.css";
import MicrosoftLogin from "react-microsoft-login";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../utils";
import { useLogin } from "./hooks";
import { useIsMutating } from "@tanstack/react-query";
import { InfinitySpin } from "react-loader-spinner";
const Home = () => {
  const isLoading = useIsMutating();
  const { mutate } = useLogin();
  const authHandler = (err, data, msal) => {
    if (err) {
      toast.erorr(err.message, toastOptions);
      sessionStorage.clear();
    }
    if (data) {
      const accessToken = data.accessToken;
      mutate(accessToken);
      sessionStorage.clear();
    }
  };
  return (
    <div className={styles.home}>
      <div className={styles.logo}>
        <img src={logo} alt="NMFB Logo" />
      </div>
      <h1>NMFB OBL</h1>
      <p>Admin's Portal</p>
      {isLoading ? (
        <InfinitySpin width="200" color="#fff" />
      ) : (
        <div className={styles.loginBtn}>
          <p>Click on the Button to sign in with your Microsoft Account</p>
          <MicrosoftLogin
            clientId="ee241df3-3ed6-424f-95cb-2b58de8f5e07"
            authCallback={authHandler}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
