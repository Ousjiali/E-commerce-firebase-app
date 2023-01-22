import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaCity } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Center,
  CircularProgress,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
// import { BsPersonFill } from "react-icons/bs";
// import { FaPlay } from "react-icons/fa";
// import { BsPersonXFill } from "react-icons/bs";
// import { BsPersonCheckFill } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
// import { BsFillPersonDashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteFacultyId,
  editFacultyId,
  //   deleteFacultyId,
  //   getFacultyId,
} from "../../redux/action/editFacultyIdAction";
import { getfaculty } from "../../redux/action/facultyAction";
import { DELETE_FACULTYBYID_RESET } from "../../redux/constants/editFacultyIdConstant";

function ManageFaculty() {
  const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getfaculty());
  }, [dispatch]);

  const listFaculty = useSelector((state) => state.listFaculty);
  const { faculty } = listFaculty;

  const deleteFacultyById = useSelector((state) => state.deleteFacultyById);
  const { loading, success, error } = deleteFacultyById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteFacultyId(id));
      console.log(id);
    }
  };

  const deactivateHandler = (id, is_active) => {
    editFacultyId(id, is_active);
    setIsActive(!isActive);
  };
  console.log(isActive);

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Faculty Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    window.location.reload();
    dispatch({ type: DELETE_FACULTYBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Faculty",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_FACULTYBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/faculty/homepage");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Faculties" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <FaCity />
                <h2>Faculities</h2>
              </div>
              <h1>|</h1>
              <h4>{faculty && faculty.length}</h4>
            </div>
          </div>
          <div className={styles.profileContent}>
            <div className={styles.submitButton}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={backHandler}
              >
                <BiArrowBack />
                Back
              </button>
            </div>
          </div>
        </div>
        <div className={styles.statsContainer}>
          <div className={styles.profileBox}>
            <div className={styles.pageTitle}>
              <span>Faculty Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="purple.500" />
                </Center>
              ) : (
                <Table varient="striped" colorScheme="gray" size="sm">
                  <Tr>
                    <Th>Faculty Name</Th>
                    <Th>Faculty Code</Th>
                    <Th>Description</Th>
                    <Th>DOF</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                  {faculty &&
                    faculty.map((item, i) => (
                      <Tbody key={i}>
                        <Tr key={item.id}>
                          <Td>{item.name}</Td>
                          <Td>{item.code}</Td>
                          <Td>{item.description}</Td>
                          <Td>{item.dean}</Td>
                          <Td>{item.is_active.toString()}</Td>
                          <Td>
                            <Button
                              className={styles.chakar_btn1}
                              // colorScheme="yellow"
                              borderRadius="10"
                              type="submit"
                            >
                              <Link to={`/admin/manageviewfaculty/${item.id}`}>
                                <GrView />
                              </Link>
                            </Button>
                            <Button
                              className={styles.chakar_btn2}
                              borderRadius="10"
                              key={item._id}
                              onClick={() => deleteHandler(item.id)}
                              // value={isActive}
                              // disabled={isActive ? "false" : "true"}
                            >
                              <MdDeleteForever />
                            </Button>
                          </Td>
                        </Tr>
                      </Tbody>
                    ))}
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageFaculty;
