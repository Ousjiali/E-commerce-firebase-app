import { Center, CircularProgress, useToast, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { editNoticeId, getNoticeId } from "../../redux/action/editNoticeAction";
import { getNotice } from "../../redux/action/noticeBoardAction";
import { getScope } from "../../redux/action/scopeAction";
import { EDIT_NOTICEBYID_RESET } from "../../redux/constants/EditNoticeIdConstant";
import styles from "./styles.module.css";

function EditNotice() {
  const dispatch = useDispatch();
  const toast = useToast();

  let { id } = useParams();

  const [title, setTitle] = useState("");
  const [scope, setScope] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getNoticeId(id, setTitle, setScope, setMessage, onChangeHandler));
  }, [dispatch, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const noticeData = {
      title: title,
      message: message,
      scope: scope,
    };
    dispatch(editNoticeId(id, noticeData));
  };

  const getNoticeById = useSelector((state) => state.getNoticeById);
  const { results = {} } = getNoticeById;
  console.log(results);

  const onChangeHandler = (e) => {
    setTitle(e.target.value);
    setScope(e.target.value);
    setMessage(e.target.value);
  };

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  const noticeGet = useSelector((state) => state.noticeGet);
  const { allNotice } = noticeGet;

  useEffect(() => {
    dispatch(getScope());
  }, [dispatch]);

  const scopeId = useSelector((state) => state.scopeId);
  const { getScopeId } = scopeId;
  console.log(getScopeId);

  const editNoticeById = useSelector((state) => state.editNoticeById);
  const { loading, success, error } = editNoticeById;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Notice Successfully Uddated",
      status: "success",
      duration: 7000,
      isClosable: true,
    });
    dispatch({ type: EDIT_NOTICEBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_NOTICEBYID_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Edit Notice Board" />
        <div className={styles.dashboardContent}>
          <div className={styles.dashboardNotice}>
            <div className={styles.noticeTitle}>
              <span>View Notice</span>
            </div>
            {allNotice &&
              allNotice.map((item, i) => (
                <div key={i} className={styles.noticeContent}>
                  <h2>{item.timestamp}</h2>
                  <h4>{item.title}</h4>
                  <h5 className={styles.noticeComment}>{item.message}</h5>
                </div>
              ))}
          </div>
          <div className={styles.noticeFormContainer}>
            <div className={styles.noticeButton}>
              {/* <div className={styles.noticeManageBtn}>
                <Link to="/admin/managenotice">
                  <buttonn type="button" className={styles.manageBtn}>
                    Notice
                  </buttonn>
                </Link>
              </div> */}
              <Link to="/admin/managenotice">
                <button className={styles.infoBtn} type="button">
                  Back
                </button>
              </Link>
            </div>
            <div className={styles.dashboardNoticeForm}>
              <div className={styles.noticeFormTitle}>
                <span>Edit Notice</span>
              </div>
              {loading ? (
                <Center>
                  <CircularProgress isIndeterminate color="red.500" />
                </Center>
              ) : (
                <div className={styles.noticeInputField}>
                  <div className={styles.inputBox}>
                    <label>Title</label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Student Scope</label>
                    <select
                      type="text"
                      onChange={(e) => setScope(e.target.value)}
                      value={scope}
                      required={true}
                    >
                      <option></option>
                      {getScopeId &&
                        getScopeId.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.inputBox}>
                    <label>Post Content</label>
                    <textarea
                      type="text"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      required={true}
                    />
                  </div>

                  <div className={styles.noticeSubmitBtn}>
                    {loading ? (
                      <Button
                        isLoading
                        loadingText="Validating Credentials..."
                        colorScheme="blue"
                        variant="outline"
                        style={{ height: "4rem" }}
                      />
                    ) : (
                      <button
                        type="submit"
                        className={styles.noticeBtn}
                        onClick={submitHandler}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNotice;
