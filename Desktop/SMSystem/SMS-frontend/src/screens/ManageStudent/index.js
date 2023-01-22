import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaUserGraduate } from "react-icons/fa";
import {
  deleteStudentId,
  // deleteStudentId,
  totalStudent,
} from "../../redux/action/studentAction";
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
  TableContainer,
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
// import { editStudentId } from "../../redux/action/editStudentIdAction";
import { DELETE_STUDENTBYID_RESET } from "../../redux/constants/studentConstant";
// import { EDIT_STUDENTBYID_RESET } from "../../redux/constants/editStudentIdConstant";

function ManageStudent() {
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(totalStudent());
  }, [dispatch]);

  const totalStudentNo = useSelector((state) => state.totalStudentNo);
  const { allStudent } = totalStudentNo;
  console.log(allStudent);

  const deleteStudentById = useSelector((state) => state.deleteStudentById);
  const { loading, success, error } = deleteStudentById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteStudentId(id));
      console.log(id);
    }
  };

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  // const deactivateHandler = (id, is_active) => {
  //   editStudentId(id, is_active);
  //   setIsActive(!isActive);
  // };
  // console.log(isActive);

  if (success) {
    dispatch(totalStudent());
  }

  if (success) {
    toast({
      title: "Notification",
      description: "Student Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_STUDENTBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Student",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_STUDENTBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/student/homepage");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Students" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetails}>
              <div className={styles.staffIcon}>
                <FaUserGraduate />
                <h2>Students</h2>
              </div>
              <h1>|</h1>
              <h4>{allStudent && allStudent.length}</h4>
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
              <span>Student Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="purple.500" />
                </Center>
              ) : (
                <TableContainer>
                  <Table varient="striped" colorScheme="gray" size="sm">
                    <Tr colorScheme="green">
                      <Th>First Name</Th>
                      <Th>Last Name</Th>
                      <Th>Matric No</Th>
                      <Th>Email</Th>
                      <Th>Spec.</Th>
                      <Th>Status</Th>

                      <Th>Action</Th>
                    </Tr>
                    {allStudent &&
                      allStudent.map((item, i) => (
                        <Tbody key={i}>
                          <Tr key={item.id}>
                            <Td>{item.user.first_name}</Td>
                            <Td>{item.user.last_name}</Td>
                            <Td>{item.matric_no}</Td>
                            <Td>{item.user.email}</Td>
                            <Td>{item.specialization.name}</Td>
                            <Td>{item.is_active.toString()}</Td>
                            <Td>
                              <Button
                                className={styles.chakar_btn1}
                                // colorScheme="yellow"
                                borderRadius="10"
                                type="submit"
                              >
                                <Link
                                  to={`/admin/manageviewstudent/${item.id}`}
                                >
                                  <GrView />
                                </Link>
                              </Button>
                              <Button
                                className={styles.chakar_btn2}
                                borderRadius="10"
                                key={item._id}
                                onClick={() => deleteHandler(item.id)}
                                // value={isActive}
                                // disabled={isActive ? "true" : "false"}
                              >
                                <MdDeleteForever />
                              </Button>
                            </Td>
                          </Tr>
                        </Tbody>
                      ))}
                  </Table>
                </TableContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStudent;
