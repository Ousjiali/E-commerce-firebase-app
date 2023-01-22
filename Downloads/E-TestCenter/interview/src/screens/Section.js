import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./Section.css";

import { useToast, CircularProgress, Alert, AlertIcon } from "@chakra-ui/react";
import { CREATE_SECTION_RESET } from "../redux/constants/sectionConstants";
import { createSection } from "../redux/actions/sectionActions";
import { getTest } from "../redux/actions/testActions";

function Section({ history }) {
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");
  const [timer, setTimer] = useState("");
  const [test, setTest] = useState("");
  // const [videoUrl, setVideoUrl] = useState("");
  // const [isTraining, setIsTraining] = useState(false);

  // const handleClick = () => {
  //   setIsTraining(!isTraining);
  // };
  // console.log(isTraining);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createSection(title, timer, instruction, test));
  };

  const allTest = useSelector((state) => state.allTest);
  const { test: tests } = allTest;

  const newSection = useSelector((state) => state.newSection);
  const { loading, error, success } = newSection;

  const toast = useToast();

  if (success) {
    toast({
      title: "Notification",
      description: "Section created Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: CREATE_SECTION_RESET });
  }

  if (success) {
    setTimeout(() => history.push("/questionbank"), [2000]);
  }

  useEffect(() => {
    dispatch(getTest());
  }, [dispatch]);

  return (
    <div>
      <Sidebar />
      <div className="admin_container">
        <Navbar title="Section" />

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
            <div className="section_page">
              <div className="sec_top">
                <label>Test</label>
                <select onChange={(e) => setTest(e.target.value)}>
                  <option>Select Test</option>
                  {tests &&
                    tests.map((item, i) => (
                      <option key={i} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="sec_top">
                <label>Section Name</label>
                <input
                  type="text"
                  placeholder="Test"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="test_input3"
                />
              </div>
              <div className="sec_top">
                <label>Section Instruction</label>
                <input
                  type="text"
                  placeholder="Instruction"
                  onChange={(e) => setInstruction(e.target.value)}
                  value={instruction}
                  className="test_input4"
                />
              </div>
              <div className="sec_top">
                <label>Time</label>
                <input
                  type="number"
                  placeholder="Timer"
                  onChange={(e) => setTimer(e.target.value)}
                  value={timer}
                  className="test_input5"
                />
              </div>
              {/* <div className="sec_top">
                <label>Video URL</label>
                <input
                  type="text"
                  placeholder="Video URL"
                  onChange={(e) => setVideoUrl(e.target.value)}
                  value={videoUrl}
                  className="test_input5"
                />
              </div> */}
              {/* <div className="sec_top" onClick={handleClick}>
                <label>Include Training Video</label>
                <input
                  type="Checkbox"
                  value={isTraining}
                  disable={isTraining ? "false" : "true"}
                  className="test_input5"
                />
              </div> */}

              {/* < className="sec_top">
                <label>Training Video</label>
                {/* <EmbedVideo embedId="" /> */}

              <div className="test_btn2">
                <button type="submit" className="section_btn">
                  Add Section
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Section;
