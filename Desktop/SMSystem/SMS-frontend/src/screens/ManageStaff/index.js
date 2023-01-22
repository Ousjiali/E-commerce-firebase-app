import React, { useEffect } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { FaPeopleArrows } from "react-icons/fa";
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
import { deleteStaffId } from "../../redux/action/editStaffIdAction";
import { totalStaff } from "../../redux/action/staffAction";
import { DELETE_STAFFBYID_RESET } from "../../redux/constants/editStaffIdConstant";

function ManageStaff() {
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);

  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;
  console.log(allStaff);

  const deleteStaffById = useSelector((state) => state.deleteStaffById);
  const { loading, success, error } = deleteStaffById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteStaffId(id));
      console.log(id);
    }
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  // const deactivateHandler = (id, is_active) => {
  //   editStudentId(id, is_active);
  //   setIsActive(!isActive);
  // };
  // console.log(isActive);

  if (success) {
    dispatch(totalStaff());
  }

  if (success) {
    toast({
      title: "Notification",
      description: "Staff Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_STAFFBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Staff",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_STAFFBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/staff/homepage");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Staff" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <FaPeopleArrows />
                <h2>Staff</h2>
              </div>
              <h1>|</h1>
              <h4>{allStaff && allStaff.length}</h4>
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
              <span>Staff Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="blue.500" />
                </Center>
              ) : (
                <Table varient="striped" colorScheme="gray" size="sm">
                  <Tr>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
                    <Th>Email</Th>
                    <Th>Spec.</Th>
                    <Th>Employee ID</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                  {allStaff &&
                    allStaff.map((item, i) => (
                      <Tbody key={i}>
                        <Tr key={item.id}>
                          <Td>{item.user.first_name}</Td>
                          <Td>{item.user.last_name}</Td>
                          <Td>{item.user.email}</Td>
                          <Td>{item.user.specialization}</Td>
                          <Td>{item.employee_id}</Td>
                          <Td>{item.is_active.toString()}</Td>
                          <Td>
                            <Button
                              className={styles.chakar_btn1}
                              // colorScheme="yellow"
                              borderRadius="10"
                              type="submit"
                            >
                              <Link to={`/admin/manageviewstaff/${item.id}`}>
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
          {/* <div className={styles.profileBox2}>
            <div className={styles.pageTitle2}>
              <span>Statistics</span>
            </div>
            <div className={styles.profileGridCard}>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <BsPersonFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>Newly Created Students</h2>
                  <h3>38</h3>
                </div>
                <div className={styles.profileCardIcon}>
                  <FaPlay />
                </div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon2}>
                  <BsPersonXFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>Recently Deleted Students</h2>
                  <h3>12</h3>
                </div>
                <div className={styles.profileCardIcon}>
                  <FaPlay />
                </div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon1}>
                  <BsPersonCheckFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Created Students</h2>
                  <h3>129</h3>
                </div>
                <div className={styles.profileCardIcon}>
                  <FaPlay />
                </div>
              </div>
              <div className={styles.profileEachCard}>
                <div className={styles.profileIcon2}>
                  <BsFillPersonDashFill />
                </div>
                <div className={styles.profileContentCard}>
                  <h2>All Deleted Students</h2>
                  <h3>53</h3>
                </div>
                <div className={styles.profileCardIcon}>
                  <FaPlay />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ManageStaff;
