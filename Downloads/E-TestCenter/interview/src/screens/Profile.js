import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import {
  getAllCandidatesdetails,
  myDetails,
} from "../redux/actions/userActions";
import { Link } from "react-router-dom";
import { deleteViewCandidateId } from "../redux/actions/questionAction";
import Navbar from "../components/Navbar";
import {
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Button,
  CircularProgress,
  Center,
  AlertIcon,
  Alert,
  useToast,
  TableContainer,
} from "@chakra-ui/react";
import { DELETE_EACHCANDIDATE_BYID_RESET } from "../redux/constants/candidateConstants";

function Profile() {
  const dispatch = useDispatch();
  const toast = useToast();
  // let navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCandidatesdetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(myDetails());
  }, [dispatch]);

  const adminDetails = useSelector((state) => state.adminDetails);
  const { user } = adminDetails;

  const getCandidate = useSelector((state) => state.getCandidate);
  const { candidates } = getCandidate;

  const deleteCandidateById = useSelector((state) => state.deleteCandidateById);
  const { success, loading } = deleteCandidateById;

  const handlerDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteViewCandidateId(id));
    }
    console.log(id);
  };

  if (success) {
    window.location.reload();
  }

  // if (success) {
  //   toast({
  //     title: "Notification",
  //     description: "Candidate Deleted Successfully",
  //     status: "success",
  //     duration: 4000,
  //     isClosable: true,
  //   });
  //   dispatch({ type: DELETE_EACHCANDIDATE_BYID_RESET });
  // }

  // if (error) {
  //   toast({
  //     title: "Notification",
  //     description: "Error Deleting candidates",
  //     status: "error",
  //     duration: 4000,
  //     isClosable: true,
  //   });
  //   dispatch({ type: DELETE_EACHCANDIDATE_BYID_RESET });
  // }
  // const deleteQuestion = useSelector((state) => state.deleteQuestion);
  // const { success, loading, error } = deleteQuestion;

  // const submitHandler = (id) => {
  //   if (id) {
  //   } else {
  //     dispatch(allCandidatesDetails(id));
  //   }
  //   console.log(id);
  // };

  return (
    <div>
      <div className="view_question">
        <div className="sidebar_view">
          <Sidebar />
        </div>
        <div className="admin_container">
          <div className="question">
            <Navbar
              title="Exam Candidate Profile"
              name={`${user && user.firstName}`}
            />
            <div className="goBack_btn">
              <Link to="/dashboard">
                <button type="submit" className="btn">
                  Go Back
                </button>
              </Link>
            </div>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="purple.300" />
              </Center>
            ) : (
              <TableContainer>
                <div className="question_table">
                  <Table varient="striped" colorScheme="gray" size="md">
                    <Tr>
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Test</Th>
                      <Th>Score</Th>
                      <Th>Action</Th>
                    </Tr>
                    {candidates &&
                      candidates.map((item, i) => (
                        <Tbody key={i}>
                          <Tr key={item._id}>
                            <Td>{item.candidate.firstName}</Td>
                            <Td>{item.candidate.lastName}</Td>
                            <Td>{item.test.title}</Td>
                            <Td>{item.score}</Td>
                            <Td>
                              <Button
                                className="chakar_btn"
                                colorScheme="teal"
                                borderRadius="10"
                                type="submit"
                              >
                                <Link to={`/viewcandidate/${item._id}`}>
                                  View More
                                </Link>
                              </Button>
                              {/* <Button
                                className="chakar_btn"
                                colorScheme="red"
                                borderRadius="10"
                                key={item._id}
                                onClick={() => handlerDelete(item._id)}
                              >
                                Delete
                              </Button> */}
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                    {/* {arr} */}
                  </Table>
                </div>
              </TableContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
