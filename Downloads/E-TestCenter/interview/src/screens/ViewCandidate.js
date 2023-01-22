import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { getAllCandidatesdetails } from "../redux/actions/userActions";
import "./ViewCandidate.css";

function ViewCandidate({ match }) {
  const dispatch = useDispatch();

  const id = match.params.id;

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setlastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [testTimer, setTestTimer] = useState("");
  // const [testTitle, setTestTitle] = useState("");
  // const [score, setScore] = useState("");

  const candidate = JSON.parse(localStorage.getItem("getCandidates"));
  const candidateDetails = candidate;
  console.log(candidateDetails.data[0].candidate.firstName);

  // const candidatesDetails = JSON.parse(localStorage.getItem("candidateUser"));
  // console.log(candidatesDetails.data.firstName);
  useEffect(() => {
    dispatch(getAllCandidatesdetails());
  }, [dispatch]);

  const getCandidate = useSelector((state) => state.getCandidate);
  const { candidates = [] } = getCandidate;
  const data = candidates.filter((x) => x._id === id);

  console.log(data);

  return (
    <div>
      <Sidebar />
      <div className="candidate_container">
        <Navbar title="View Candidates Details" />
        <div>
          <Link to="/profile">
            <button class="candidateBtn">Go Back</button>
          </Link>
        </div>
        <div className="viewcandidate">
          <div className="gridBox">
            <div className="eachGridBox">
              <header>First Name</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails &&
                    candidateDetails.data &&
                    data[0].candidate.firstName}
                </p>
              </span>
            </div>

            <div className="eachGridBox">
              <header>Last Name</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails &&
                    candidateDetails.data &&
                    data[0].candidate.lastName}
                </p>
              </span>
            </div>

            <div className="eachGridBox">
              <header>Email</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails &&
                    candidateDetails.data &&
                    data[0].candidate.email}
                </p>
              </span>
            </div>

            <div className="eachGridBox">
              <header>Test Title</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails &&
                    candidateDetails.data &&
                    data[0].test.title}
                </p>
              </span>
            </div>

            <div className="eachGridBox">
              <header>Test Timer</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails &&
                    candidateDetails.data &&
                    data[0].test.timer}
                </p>
              </span>
            </div>

            <div className="eachGridBox">
              <header>Test Score</header>
              <span className="titleContainer">
                <p className="titleName">
                  {candidateDetails && candidateDetails.data && data[0].score}
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCandidate;
