import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { myDetails } from "../../redux/actions/userActions";
import {
  deleteQuestionId,
  getQuestionsId,
} from "../../redux/actions/questionAction";
import {
  CircularProgress,
  Alert,
  AlertIcon,
  Center,
  Table,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import "./QuestionTab.css";
import { DELETE_QUESTION_BYID_RESET } from "../../redux/constants/questionConstants";

const QuestionTable = ({ history }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const adminDetails = useSelector((state) => state.adminDetails);
  const { user } = adminDetails;

  useEffect(() => {
    dispatch(myDetails());
  }, [dispatch]);

  const getQuestion = useSelector((state) => state.getQuestion);
  const { questions: question } = getQuestion;

  const deleteQuestion = useSelector((state) => state.deleteQuestion);
  const { success, loading, error } = deleteQuestion;

  useEffect(() => {
    dispatch(getQuestionsId());
  }, [dispatch]);

  const handlerDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteQuestionId(_id));
    }
    console.log(deleteQuestionId);
  };

  if (success) {
    window.location.reload();
  }

  // if (success) {
  //   toast({
  //     title: "Notification",
  //     description: "Question Deleted Successfully",
  //     status: "success",
  //     duration: 4000,
  //     isClosable: true,
  //   });
  //   dispatch({ type: DELETE_QUESTION_BYID_RESET });
  //   // dispatch(getQuestionsId());
  // }

  // if (error) {
  //   toast({
  //     title: "Notification",
  //     description: "Error Deleting Question",
  //     status: "error",
  //     duration: 4000,
  //     isClosable: true,
  //   });
  //   dispatch({ type: DELETE_QUESTION_BYID_RESET });
  // }

  // if (success) {
  //   dispatch(getQuestionsId());
  // }

  return (
    <div className="question">
      <Navbar title="Questions" name={`${user && user.firstName}`} />

      <div className="goBack_btn">
        <Link to="/questionbank">
          <button type="submit" className="btn">
            Go Back
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
          Delete Successfully
        </Alert>
      )}

      {loading ? (
        <Center>
          <CircularProgress isIndeterminate color="purple.300" />
        </Center>
      ) : (
        <div className="question_table">
          <Table varient="striped" colorScheme="gray" size="sm">
            <Tr>
              <Th>Question</Th>
              <Th>Section</Th>
              <Th>Instructions</Th>
              <Th>Timer (Mins)</Th>
              <Th>Action</Th>
            </Tr>
            {question &&
              question.map((item, i) => (
                <Tbody key={i}>
                  <Tr key={item._id}>
                    <Td>{item.question}</Td>
                    <Td>{item.section.title}</Td>
                    <Td>{item.section.instruction}</Td>
                    <Td>{item.section.timer}</Td>
                    <Td>
                      {/* <Button
                        className="chakar_btn2"
                        colorScheme="red"
                        borderRadius="10"
                        key={item._id}
                        onClick={() => handlerDelete(item._id)}
                      >
                        Delete
                      </Button> */}
                      <Button
                        className="chakar_btn"
                        colorScheme="yellow"
                        borderRadius="10"
                      >
                        <Link to={`/editquestion/${item._id}`}>Edit</Link>
                      </Button>
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </div>
      )}
    </div>
  );
};

export default QuestionTable;
