import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import adminpic from "../../assets/adminpic.png";
import icon from "../../assets/icon.jpg";
import "./Widget.css";
import { Link } from "react-router-dom";
import {
  getAllCandidatesdetails,
  myDetails,
} from "../../redux/actions/userActions";

function Widgetfeed() {
  const dispatch = useDispatch();

  const [person, setPerson] = React.useState("");
  const user = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (user) setPerson(user.data.firstName);
  }, [user]);

  useEffect(() => {
    dispatch(myDetails());
  }, [dispatch]);
  // const adminDetails = useSelector((state) => state.adminDetails);
  // const { user } = adminDetails;

  useEffect(() => {
    dispatch(getAllCandidatesdetails());
  }, [dispatch]);
  const getCandidate = useSelector((state) => state.getCandidate);
  const { candidates } = getCandidate;

  return (
    <div className="widget">
      <div className="widget_container">
        <div className="widget_box">
          <div className="widget_img">
            <img src={adminpic} alt="" />
          </div>
          <div className="widgetadmin">
            <div className="widget_username">{`${person}`}</div>
            <Link to="/adminlogin">
              <button className="widget_btn">Admin</button>
            </Link>
          </div>
        </div>

        <div className="widget_post">
          <div className="widget_title">
            <h4>Most Recent Test</h4>
          </div>

          {candidates &&
            candidates.map((item, i) => (
              <div key={i} className="post_card">
                <div className="user1_img">
                  <img src={icon} alt="" />
                </div>
                <div className="user1_id">
                  <h3>{item.candidate.firstName}</h3>
                  <h6>{item.test.title}</h6>
                </div>
                <div className="user1_score">{item.score}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Widgetfeed;
