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
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
// import { BsFillPersonDashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourseId } from "../../redux/action/editCourseIdAction";
import { getCourse } from "../../redux/action/courseAction";
import { DELETE_COURSEBYID_RESET } from "../../redux/constants/editCourseIdConstant";
import { ImAddressBook, ImBook } from "react-icons/im";

function ManageCourse() {
  // const [isActive, setIsActive] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const deleteCourseById = useSelector((state) => state.deleteCourseById);
  const { loading, success, error } = deleteCourseById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteCourseId(id));
      console.log(id);
    }
  };

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  const courseGet = useSelector((state) => state.courseGet);
  const { getCourseId } = courseGet;

  console.log(getCourseId && getCourseId.results);

  const dataCourse = getCourseId && getCourseId.results;
  console.log(dataCourse);

  // const deactivateHandler = (id, is_active) => {
  //   editStudentId(id, is_active);
  //   setIsActive(!isActive);
  // };
  // console.log(isActive);

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Course Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    window.location.reload();
    dispatch({ type: DELETE_COURSEBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Course",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_COURSEBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/course/homepage");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Course" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetail}>
              <div className={styles.staffIcon}>
                <ImAddressBook />
                <h2>Course</h2>
              </div>
              <h1>|</h1>
              <h4>{getCourseId && getCourseId.count}</h4>
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
              <span>Course Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="red.500" />
                </Center>
              ) : (
                <Table varient="striped" colorScheme="gray" size="sm">
                  <Tr>
                    <Th>Spec. Name</Th>
                    <Th>Course Name</Th>
                    <Th>Course Code</Th>
                    <Th>Description</Th>
                    <Th>Coordinator</Th>
                    <Th>Action</Th>
                  </Tr>
                  {dataCourse &&
                    dataCourse.map((item, i) => (
                      <Tbody key={i}>
                        <Tr key={item.id}>
                          <Td>{item.specialization.name}</Td>
                          <Td>{item.name}</Td>
                          <Td>{item.code}</Td>
                          <Td>{item.description}</Td>
                          <Td>{item.coordinator}</Td>
                          <Td>
                            <Button
                              className={styles.chakar_btn1}
                              // colorScheme="yellow"
                              borderRadius="10"
                              type="submit"
                            >
                              <Link to={`/admin/manageviewcourse/${item.id}`}>
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

export default ManageCourse;
