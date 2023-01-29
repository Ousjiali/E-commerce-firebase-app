import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Header } from "../../../components/Header/Header";
import { AuthContext } from "../../../context/AuthContext";
import { auth } from "../../../firebase";
import "./landingPage.css";

export const LandingPage = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const { dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        if (userCredential) {
          navigate("/create/postad");
          clearInput();
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="strapy__landingPage">
      <Header />
      <div className="strapy__FormContainer">
        <div className="strapy__title">
          <h1>Welcome to</h1>
          <h3>
            the <b>Strapy</b> MarketPlace, Shop as you <b>Like</b>.
          </h3>
        </div>

        <form onSubmit={submitHandler}>
          <div className="strapy__inputContainer">
            <div className="strapy__inputBox1">
              <label>Enter Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                required={true}
              />
            </div>

            <div className="strapy__inputBox1">
              <label>Enter Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required={true}
              />
            </div>
          </div>
          <div className="stb__BtnContainer1">
            <button type="submit" className="stb__Btn">
              Login
            </button>
          </div>

          <div className="strapy__createAccount">
            <Link to="/create/account">
              <span>Don't Have an Account, Create One!!!</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
