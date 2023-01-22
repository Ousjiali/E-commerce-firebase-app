import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
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
import { deleteDepartmentId } from "../../redux/action/editDepartmentIdAction";
import { DELETE_DEPARTMENTBYID_RESET } from "../../redux/constants/editDepartmentIdConstant";
import { getDepartment } from "../../redux/action/departmentAction";
import { BsBuilding } from "react-icons/bs";

function ManageDepartment() {
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const deleteDepartmentById = useSelector(
    (state) => state.deleteDepartmentById
  );
  const { loading, success, error } = deleteDepartmentById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteDepartmentId(id));
      console.log(id);
    }
  };

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  console.log(departmentid);

  // const deactivateHandler = (id, is_active) => {
  //   editStudentId(id, is_active);
  //   setIsActive(!isActive);
  // };
  // console.log(isActive);

  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  if (success) {
    toast({
      title: "Notification",
      description: "Department Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    window.location.reload();
    dispatch({ type: DELETE_DEPARTMENTBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Staff",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_DEPARTMENTBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/department/homepage");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Department" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <BsBuilding />
                <h2>Department</h2>
              </div>
              <h1>|</h1>
              <h4>{departmentid && departmentid.length}</h4>
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
              <span>Department Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="red.500" />
                </Center>
              ) : (
                <Table varient="striped" colorScheme="gray" size="sm">
                  <Tr>
                    <Th>Faculty Name</Th>
                    <Th>Name Of Department</Th>
                    <Th>Department Code</Th>
                    <Th>Head Of Department</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                  {departmentid &&
                    departmentid.map((item, i) => (
                      <Tbody key={i}>
                        <Tr key={item.id}>
                          <Td>{item.faculty.name}</Td>
                          <Td>{item.name}</Td>
                          <Td>{item.code}</Td>
                          <Td>{item.head}</Td>
                          <Td>{item.is_active.toString()}</Td>
                          <Td>
                            <Button
                              className={styles.chakar_btn1}
                              // colorScheme="yellow"
                              borderRadius="10"
                              type="submit"
                            >
                              <Link
                                to={`/admin/manageviewdepartment/${item.id}`}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageDepartment;
