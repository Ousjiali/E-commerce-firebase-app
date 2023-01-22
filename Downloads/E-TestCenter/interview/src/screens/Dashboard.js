import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import user12 from "../assets/user12.png";
import Infobox from "../components/Userfeed/Infobox";
import Widgetfeed from "../components/Widgetfeed";
import { AiOutlineBars } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myAdminDetails } from "../redux/actions/userActions";
import { getAllAdmin } from "../redux/actions/userActions";
import { getQuestionsId } from "../redux/actions/questionAction";
import {
  getCandidatesFail,
  getCandidatesPass,
  getTotalCandidates,
} from "../redux/actions/candidateAction";

const Dashboard = ({ history }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(myAdminDetails());
  // });
  // const adminDetails = useSelector((state) => state.adminDetails);
  // const { person1 } = adminDetails;
  // console.log(person1);
  const [person, setPerson] = React.useState("");
  const user = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (user) setPerson(user.data.firstName);
  }, [user]);

  const userName = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userName);

  useEffect(() => {
    if (!userName && !user) {
      history.push("/adminlogin");
    }
    // dispatch(myAdminDetails());
  }, [userName, history, user, dispatch]);

  useEffect(() => {
    dispatch(myAdminDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getQuestionsId());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllAdmin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTotalCandidates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCandidatesPass());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCandidatesFail());
  }, [dispatch]);

  // const adminDetails = useSelector((state) => state.adminDetails);
  // const { user } = adminDetails;
  // console.log(user);

  const getQuestion = useSelector((state) => state.getQuestion);
  const { questions } = getQuestion;

  const myAllAdmin = useSelector((state) => state.myAllAdmin);
  const { admin } = myAllAdmin;

  const totalCandidates = useSelector((state) => state.totalCandidates);
  const { candidate } = totalCandidates;

  const allCandidatePassed = useSelector((state) => state.allCandidatePassed);
  const { candidatepass } = allCandidatePassed;

  const allCandidateFailed = useSelector((state) => state.allCandidateFailed);
  const { candidatefail } = allCandidateFailed;

  return (
    <>
      <Sidebar />
      <Navbar title="Dashboard" name={`Hello ${person}`} />

      <div className="container">
        <div className="feed">
          <div className="feed_user">
            <h2 className="feed_title">
              {`Hello ${person}`}
              👍👍🥇
            </h2>
            <br></br>
            <span className="feed_subtitle">
              <p>Good to see you again!</p>
            </span>
            <Link to="/questionbank">
              <div className="feed_btn">
                <button className="btn">Get Started</button>
              </div>
            </Link>
          </div>
          <div className="feed_img">
            <img src={user12} alt="User Detail" />
          </div>
        </div>

        <div className="cardGrid">
          <Infobox
            title="Questions"
            count={questions && questions.length}
            Icon={AiOutlineBars}
            color="Green"
          />

          <Infobox
            title="Admin"
            count={admin && admin.length}
            Icon={RiAdminFill}
            color="#7070db"
          />
          <Infobox
            title="Registered Candidates"
            count={candidate && candidate.length}
            Icon={FaUserGraduate}
            color="cyan"
          />
          <Infobox
            title="Candidates that Passed"
            count={candidatepass && candidatepass.length}
            Icon={BsCheckCircleFill}
            color="#40ff00"
          />
          <Infobox
            title="Candidates that Failed"
            count={candidatefail && candidatefail.length}
            Icon={MdCancel}
            color="#d92626"
          />
        </div>
      </div>
      <Widgetfeed />
    </>
  );
};

export default Dashboard;
