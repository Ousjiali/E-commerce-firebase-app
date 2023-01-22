import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAdmin } from "../redux/actions/userActions";
import {
  Alert,
  AlertIcon,
  Center,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { USERS_REGISTRATION_RESET } from "../redux/constants/userConstants";

const AdminRegister = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Oops Password and Confirm Password don't match ");
    } else {
      dispatch(registerAdmin(firstName, lastName, phone, email, password));
      setMsg(true);
    }
  };

  const adminRegister = useSelector((state) => state.adminRegister);
  const { loading, error, success } = adminRegister;

  const toast = useToast();

  if (success) {
    toast({
      title: "Notification",
      description: "Resigtration created Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setTimeout(() => history.push("/adminlogin"), [3000]);
    dispatch({ type: USERS_REGISTRATION_RESET });
  }

  return (
    <div>
      <Sidebar />
      <div className="admin_container">
        <Navbar title="Admin" />

        <div className="admin">
          <div className="admin_btn">
            <Link to="/viewadmin">
              <button type="submit" className="btn">
                View Admin
              </button>
            </Link>
          </div>

          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {success && (
            <Alert status="success">
              <AlertIcon />
            </Alert>
          )}

          {loading ? (
            <Center>
              <CircularProgress isIndeterminate color="purple.300" />
            </Center>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="admin_form">
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  placeholder="First Name"
                  required={true}
                />

                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  placeholder="Last Name"
                  required={true}
                />

                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                  required={true}
                />

                <input
                  type="number"
                  onChange={(e) => setPhone(e.currentTarget.value.slice(0, 11))}
                  value={phone}
                  placeholder="Phone Number"
                  required={true}
                />

                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required={true}
                />

                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required={true}
                />
              </div>

              <div className="admin_btn">
                <button type="submit" className="btn">
                  Add Admin
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
