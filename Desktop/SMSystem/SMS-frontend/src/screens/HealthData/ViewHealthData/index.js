import React, { useEffect, useState } from "react";
import HeaderNav from "../../../components/HeaderNav";
import Sidebar from "../../../components/Sidebar";
import styles from "./styles.module.css";
import { RiHealthBookFill } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";
import { Button, Center, CircularProgress } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../../../redux/action/userAction";

function HealthData() {
  const dispatch = useDispatch();
  //   const toast = useToast();
  const navigate = useNavigate();

  const [blood_group, setBlood_group] = useState("");
  const [genotype, setGenotype] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [STIs, setSTIs] = useState("");
  const [heart_disease, setHeart_disease] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [respiratory_problems, setRespiratory_problems] = useState("");

  useEffect(() => {
    dispatch(userDetails());
  }, [dispatch]);

  const userDetail = useSelector((state) => state.userDetail);
  const { username, success: isSuccess } = userDetail;

  useEffect(() => {
    if (isSuccess) {
      setBlood_group(
        username && username.biodata && username.biodata.health_data.blood_group
      );
      setGenotype(
        username && username.biodata && username.biodata.health_data.genotype
      );
      setAllergies(
        username && username.biodata && username.biodata.health_data.allergies
      );
      setDiabetes(
        username && username.biodata && username.biodata.health_data.diabetes
      );
      setSTIs(
        username && username.biodata && username.biodata.health_data.STIs
      );
      setHeart_disease(
        username &&
          username.biodata &&
          username.biodata.health_data.heart_disease
      );
      setDisabilities(
        username &&
          username.biodata &&
          username.biodata.health_data.disabilities
      );
      setRespiratory_problems(
        username &&
          username.biodata &&
          username.biodata.health_data.respiratory_problems
      );
    }
  }, [isSuccess, username]);

  console.log(username && username.biodata.health_data.blood_group);

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     const healthdata = {
  //       blood_group: blood_group,
  //       genotype: genotype,
  //       allergies: allergies,
  //       diabetes: diabetes,
  //       STIs: STIs,
  //       heart_disease: heart_disease,
  //       disabilities: disabilities,
  //       respiratory_problems: respiratory_problems,
  //     };
  //     dispatch(postHealthData(healthdata));
  //     console.log(healthdata);
  //   };

  const postHealth = useSelector((state) => state.postHealth);
  const { loading, success } = postHealth;

  if (success) {
    navigate("/admin/academicdata");
  }

  const backHandler = () => {
    navigate("/admin/profile");
  };

  const nextHandler = () => {
    navigate("/admin/academicdata");
  };

  const editHandler = () => {
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
  //       description: "Health Credentials Created",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     dispatch({ type: HEALTH_DATA_RESET });
  //   }

  //   if (error) {
  //     toast({
  //       title: "Notification",
  //       description: "Invalid Credentials",
  //       status: "error",
  //       duration: 4000,
  //       isClosable: true,
  //     });
  //     dispatch({ type: HEALTH_DATA_RESET });
  //   }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Health Data" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <RiHealthBookFill />
                </div>
                <h1>|</h1>
              </div>
              <div className={styles.titleProfile}>
                <p>View Health Data</p>
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
                <button
                  type="submit"
                  className={styles.subButton}
                  onClick={editHandler}
                >
                  Edit Healthdata
                </button>
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            {loading ? (
              <Center>
                <CircularProgress isIndeterminate color="red.500" />
              </Center>
            ) : (
              <div className={styles.inputField}>
                <div className={styles.inputBox}>
                  <label>Blood Group</label>
                  <input
                    type="text"
                    onChange={(e) => setBlood_group(e.target.value)}
                    value={blood_group}
                    // required={true}
                    readOnly={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Genotype</label>
                  <input
                    type="text"
                    onChange={(e) => setGenotype(e.target.value)}
                    value={genotype}
                    // required={true}
                    readOnly={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Allergies</label>
                  <input
                    onChange={(e) => setAllergies(e.target.value)}
                    value={allergies}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Diabetes</label>
                  <input
                    onChange={(e) => setDiabetes(e.target.value)}
                    value={diabetes}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>STIs</label>
                  <input
                    onChange={(e) => setSTIs(e.target.value)}
                    value={STIs}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Heart Disease</label>
                  <input
                    onChange={(e) => setHeart_disease(e.target.value)}
                    value={heart_disease}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Disabilities</label>
                  <input
                    onChange={(e) => setDisabilities(e.target.value)}
                    value={disabilities}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <label>Respiratory Problems</label>
                  <input
                    onChange={(e) => setRespiratory_problems(e.target.value)}
                    value={respiratory_problems}
                    // required={true}
                    readOnly={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  {loading ? (
                    <Button
                      isLoading
                      loadingText="Validating Credentials..."
                      colorScheme="green"
                      variant="outline"
                      isfullWidth
                      style={{ height: "5rem" }}
                    />
                  ) : (
                    <button onClick={nextHandler} type="submit">
                      <p>Next</p>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthData;
