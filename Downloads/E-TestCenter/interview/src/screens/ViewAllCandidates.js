import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./ViewAllCandidates.css";
import { Table, Tbody, Td, Th, Tr, Button } from "@chakra-ui/react";
import {
  deleteCandidateId,
  getTotalCandidates,
} from "../redux/actions/candidateAction";
import { useDispatch, useSelector } from "react-redux";

function ViewAllCandidates() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotalCandidates());
  }, [dispatch]);

  const totalCandidates = useSelector((state) => state.totalCandidates);
  const { candidate } = totalCandidates;
  console.log(candidate);

  const handlerDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteCandidateId(id));
      window.location.reload(false);
    }
    console.log(id);
  };

  return (
    <div>
      <Sidebar />
      <div className="candidateById_container">
        <Navbar title="Registered Candidates" />
        <div>
          <Link to="/dashboard">
            <button className="candidateBtn">Go Back</button>
          </Link>
        </div>
        <div className="question_table">
          <Table varient="striped" colorScheme="gray" size="md">
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              {/* <Th>Action</Th> */}
            </Tr>
            {candidate &&
              candidate.map((item) => (
                <Tbody>
                  <Tr key={item._id}>
                    <Td>{item.firstName}</Td>
                    <Td>{item.lastName}</Td>
                    <Td>{item.phone}</Td>
                    <Td>{item.email}</Td>
                    <Td>
                      {/* <Button
                        className="chakar_btn"
                        colorScheme="teal"
                        borderRadius="10"
                        type="submit"
                      >
                        <Link to={`${item._id}`}>View More</Link>
                      </Button> */}
                      {/* <Button
                        className="chakar_btn"
                        colorScheme="red"
                        borderRadius="10"
                        width="full"
                        key={item._id}
                        onClick={() => handlerDelete(item._id)}
                      >
                        Delete
                      </Button> */}
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ViewAllCandidates;
