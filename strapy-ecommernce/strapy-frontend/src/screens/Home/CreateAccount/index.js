import React from "react";
import "./createAccount.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { RiArrowGoBackFill } from "react-icons/ri";

// import strapyCreate from "../../../assets/strapyCreate.jpg";

export const CreateAccount = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
          clearInput();
        }
      })
      .catch((error) => alert(error.message));
  };

  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="strapy__landingPage">
      {/* <img src={strapyCreate} alt="Logo" /> */}
      <div className="strapy__FormContainer">
        <form>
          <h2>Create Your Account</h2>

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
          <div className="stb__BtnContainer">
            <button onClick={backHandler} type="button" className="stb__Btn2">
              Go Back
            </button>
            <button onClick={backHandler} type="button" className="stb__Back2">
              <RiArrowGoBackFill />
            </button>
            <button
              type="submit"
              onClick={submitHandler}
              className="stb__Btn22"
            >
              Register Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
