import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { BsFillInfoSquareFill } from "react-icons/bs";
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
  Thead,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNotice } from "../../redux/action/noticeBoardAction";
import { deleteNoticeId } from "../../redux/action/editNoticeAction";
import { DELETE_NOTICEBYID_RESET } from "../../redux/constants/EditNoticeIdConstant";
// import Modal from "../../components/Modal";

function ManageNotice() {
  // const [isActive, setIsActive] = useState(false);
  // const [title, setTitle] = useState();
  // const [openModal, setOpenModal] = useState(false);

  // let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  const noticeGet = useSelector((state) => state.noticeGet);
  const { allNotice } = noticeGet;

  const deleteNoticeById = useSelector((state) => state.deleteNoticeById);
  const { loading, success, error } = deleteNoticeById;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this ?")) {
      dispatch(deleteNoticeId(id));
      console.log(id);
    }
  };

  // const openHandler = () => {
  //   setOpenModal(true);
  // };

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
    toast({
      title: "Notification",
      description: "Notice Deleted Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    window.location.reload();
    dispatch({ type: DELETE_NOTICEBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Deleting Notice",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: DELETE_NOTICEBYID_RESET });
  }

  const backHandler = () => {
    navigate("/admin/noticeboard");
  };

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="View Notice" />
        <div className={styles.profileHeader}>
          <div className={styles.staffCount}>
            <div className={styles.staffDetails}>
              <div className={styles.staffIcon}>
                <BsFillInfoSquareFill />
                <h2>Notice</h2>
              </div>
              <h1>|</h1>
              <h4>{allNotice && allNotice.length}</h4>
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
              <span>Notice Details</span>
            </div>
            <div className={styles.viewTable}>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="purple.500" />
                </Center>
              ) : (
                <TableContainer>
                  <Table varient="striped" colorScheme="gray" size="md">
                    <Thead>
                      <Tr>
                        <Th>Notice Title</Th>
                        <Th>Notice Message</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>

                    {allNotice &&
                      allNotice.map((item, i) => (
                        <Tbody key={i}>
                          <Tr key={item.id}>
                            <Td>{item.title}</Td>
                            <Td>{item.message}</Td>
                            <Td>
                              <Button
                                className={styles.chakar_btn1}
                                borderRadius="10"
                                type="submit"
                                // onClick={openHandler}
                              >
                                <Link to={`/admin/editnotice/${item.id}`}>
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

export default ManageNotice;
