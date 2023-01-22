import { Table, Tbody, Td, Th, Tr, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  deleteAdminId,
  viewAllAdmindetails,
} from "../redux/actions/userActions";

function ViewAdmin() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewAllAdmindetails());
  }, [dispatch]);

  const getViewAdmins = useSelector((state) => state.getViewAdmins);
  const { getadmin } = getViewAdmins;

  const handlerDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteAdminId(_id));
      window.location.reload(false);
    }
  };

  const arr = getadmin.map((item) => {
    return (
      <Tbody>
        <Tr key={item._id}>
          <Td>{item.firstName}</Td>
          <Td>{item.lastName}</Td>
          <Td>{item.email}</Td>
          <Td>{item.phone}</Td>
          <Td>
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
    );
  });

  return (
    <div>
      <div className="sidebar_view">
        <Sidebar />
      </div>
      <div className="admin_container">
        <Navbar title="View Admin" />
        <Link to="/adminregister">
          <div className="goBack_btn">
            <button type="button" className="btn">
              Go Back
            </button>
          </div>
        </Link>
        <div className="question_table">
          <Table varient="striped" colorScheme="gray" size="md">
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              {/* <Th>Action</Th> */}
            </Tr>
            {arr}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default ViewAdmin;
