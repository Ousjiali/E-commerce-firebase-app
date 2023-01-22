import React, { useEffect, useState } from "react";
import HeaderNav from "../../../components/HeaderNav";
import Sidebar from "../../../components/Sidebar";
import styles from "./styles.module.css";
import { BiArrowBack } from "react-icons/bi";
import { Button, Center, CircularProgress } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userDetails } from "../../../redux/action/userAction";
import { MdHistoryEdu } from "react-icons/md";

function AcademicData() {
  const dispatch = useDispatch();
  //   const toast = useToast();
  const navigate = useNavigate();

  const [institution, setInstitution] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [qualification_earned, setQualification_earned] = useState("");
  const [type, setType] = useState("text");

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  const userDetail = useSelector((state) => state.userDetail);
  const { username, success: isSuccess } = userDetail;

  useEffect(() => {
    if (isSuccess) {
      setInstitution(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].institution
      );
      setStart_date(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].start_date
      );
      setEnd_date(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].end_date
      );
      setQualification_earned(
        username &&
          username.biodata &&
          username.biodata.academic_history[0].qualification_earned
      );
    }
  }, [isSuccess, username]);

  const postAcademic = useSelector((state) => state.postAcademic);
  const { loading } = postAcademic;

  const editHandler = () => {
    navigate("/admin/academicdata");
  };

  const backHandler = () => {
    navigate("/admin/healthdata");
  };

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  //   if (success) {
  //     toast({
  //       title: "Notification",
  //       description: "Academic Credentials Created",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     dispatch({ type: ACADEMIC_DATA_RESET });
  //   }

  //   if (error) {
  //     toast({
  //       title: "Notification",
  //       description: "Invalid Credentials",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     dispatch({ type: ACADEMIC_DATA_RESET });
  //   }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Academic History" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <MdHistoryEdu />
                </div>
                <h1>|</h1>
              </div>
              <div className={styles.titleProfile}>
                <p>View Academic History</p>
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

                {loading ? (
                  <Button
                    isLoading
                    loadingText="Validating Credentials..."
                    colorScheme="teal"
                    variant="outline"
                    isfullWidth
                    style={{ height: "5rem" }}
                  />
                ) : (
                  <button
                    type="submit"
                    className={styles.subButton}
                    onClick={editHandler}
                  >
                    Edit Academic History
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="green.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Institution</label>
                  <input
                    type="text"
                    onChange={(e) => setInstitution(e.target.value)}
                    value={institution}
                    // required={true}
                    readOnly={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Start Date</label>
                  <input
                    type={type}
                    onChange={(e) => setStart_date(e.target.value)}
                    value={start_date}
                    // required={true}
                    onFocus={() => setType("date")}
                    onBlur={() => setType("text")}
                    readOnly={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>End Data</label>
                  <input
                    type={type}
                    onChange={(e) => setEnd_date(e.target.value)}
                    value={end_date}
                    required={true}
                    onFocus={() => setType("date")}
                    onBlur={() => setType("text")}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Qualification Earned</label>
                  <input
                    onChange={(e) => setQualification_earned(e.target.value)}
                    value={qualification_earned}
                    required={true}
                    readOnly={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <button>
                    <Link to="/admin/familydata">
                      <p>Next</p>
                    </Link>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademicData;
