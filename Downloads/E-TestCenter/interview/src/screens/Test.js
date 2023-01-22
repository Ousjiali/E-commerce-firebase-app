import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import jobexam from "../assets/jobexam.jpg";
import "./Test.css";
import { createTest } from "../redux/actions/testActions";
import { useToast, CircularProgress, Alert, AlertIcon } from "@chakra-ui/react";
import { CREATE_TEST_RESET } from "../redux/constants/testConstants";
import { myDetails } from "../redux/actions/userActions";

function Test({ history }) {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isTraining, setIsTraining] = useState(false);

  const handleClick = () => {
    setIsTraining(!isTraining);
  };

  console.log(isTraining);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    // if (success) {
    //   setTimeout(() => history.push("/section"), [3000]);
    // }
    dispatch(createTest(title, videoUrl, isTraining));
  };

  const adminDetails = useSelector((state) => state.adminDetails);
  const { user } = adminDetails;

  useEffect(() => {
    dispatch(myDetails());
  }, [dispatch]);

  const newTest = useSelector((state) => state.newTest);
  const { loading, success, error } = newTest;

  if (success) {
    setTimeout(() => {
      history.push("/section");
    }, [2000]);
  }

  const toast = useToast();

  if (success) {
    toast({
      title: "Notification",
      description: "Test created Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_TEST_RESET });
  }
  if (error) {
    toast({
      title: "Notification",
      description: "Test Not Created",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_TEST_RESET });
  }

  return (
    <div>
      <Sidebar />
      <div className="admin_container">
        <Navbar title="Test" name={`${user && user.firstName}`} />
        {error && (
          <Alert>
            <AlertIcon />
            {error}
          </Alert>
        )}
        {loading ? (
          <CircularProgress isIndeterminate color="green.300" />
        ) : (
          <form onSubmit={submitHandler}>
            <div className="test_image">
              <img src={jobexam} alt="" />
            </div>
            <div className="test_page">
              <input
                type="text"
                placeholder="Test"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="test_inputs"
              />
            </div>
            <div className="test_page">
              <input
                type="text"
                placeholder="Video URL"
                onChange={(e) => setVideoUrl(e.target.value)}
                value={videoUrl}
                className="test_inputs"
              />
            </div>

            <div className="test_btn">
              <div className="test_checkbox" onChange={handleClick}>
                <label>Include Training Video</label>
                <input
                  type="checkbox"
                  value={isTraining}
                  disable={isTraining ? "false" : "true"}
                  className="test_name"
                />
              </div>
              <button type="submit" className="btn2">
                Add Test
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Test;
