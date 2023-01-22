import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./EditAdmin.css";
import {
  editQuestionId,
  getEachQuestionById,
} from "../redux/actions/questionAction";

function EditAdmin() {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getEachQuestionById(id, setEditQuestion, onChangeHandler));
  }, [id, dispatch]);
  const [editQuestion, setEditQuestion] = useState("");

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editQuestionId(id, { question: editQuestion }, history));
  };

  const onChangeHandler = (e) => {
    setEditQuestion(e.target.value);
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div className="admin_container">
        <Navbar title="Edit Question" />
        <form onSubmit={submitHandler}>
          <div className="editform_conatiner">
            <input
              type="text"
              value={editQuestion}
              onChange={onChangeHandler}
              className="test_input"
              placeholder="Question"
            />
          </div>
          <button className="edit_btn" type="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAdmin;
