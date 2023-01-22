import React from "react";
import Sidebar from "../components/Sidebar";
import "./ViewQuestionn.css";
import QuestionTable from "../components/QuestionTable";

const ViewQuestion = () => {
  return (
    <div>
      <div className="sidebar_view">
        <Sidebar />
      </div>

      <div className="viewQuestion_container">
        <div className="question">
          <QuestionTable />
        </div>
      </div>
    </div>
  );
};

export default ViewQuestion;
