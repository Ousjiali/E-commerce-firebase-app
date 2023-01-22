import React, { useEffect, useState } from "react";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import styles from "./styles.module.css";
import { GrWorkshop } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Button, Center, CircularProgress, useToast } from "@chakra-ui/react";
import {
  getSpecialization,
  postSpecialization,
} from "../../redux/action/userProfileDataAction";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { getDepartment } from "../../redux/action/departmentAction";
import { CREATE_SPECIALIZATION_RESET } from "../../redux/constants/userProfileDataConstant";
import { getLevelAction } from "../../redux/action/levelAction";

function CreateSpecialization() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState("");
  const [maxLevel, setMaxLevel] = useState("");
  const [specializationName, setSpecializationName] = useState("");
  const [codeName, setCodeName] = useState("");
  const [descName, setDescName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  console.log(isActive);

  const submitHandler = (e) => {
    e.preventDefault();
    const specializeData = {
      department: departmentName,
      name: specializationName,
      code: codeName,
      max_level: maxLevel,
      description: descName,
      is_active: isActive,
    };
    dispatch(postSpecialization(specializeData));
    dispatch({ type: CREATE_SPECIALIZATION_RESET });
  };

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid } = departmentGet;

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;
  console.log(specializationid);

  useEffect(() => {
    dispatch(getLevelAction());
  }, [dispatch]);

  const levelGet = useSelector((state) => state.levelGet);
  const { getLevelId } = levelGet;
  console.log(getLevelId);

  const postSpecializations = useSelector((state) => state.postSpecializations);
  const { loading, success, error } = postSpecializations;

  const backHandler = () => {
    navigate("/admin/staffs");
  };

  if (success) {
    setDepartmentName("");
    setMaxLevel("");
    setSpecializationName("");
    setCodeName("");
    setDescName("");
    toast({
      title: "Notification",
      description: "Specialization Added",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: CREATE_SPECIALIZATION_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Invalid Credentials",
      status: "error",
      duration: 8000,
      isClosable: true,
    });
    dispatch({ type: CREATE_SPECIALIZATION_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="Specialization" />

        <div className={styles.profileBox}>
          <div className={styles.profileHeader}>
            <div className={styles.staffCount}>
              <div className={styles.staffDetails}>
                <div className={styles.staffIcon}>
                  <GrWorkshop />
                  <h2>Specialization</h2>
                </div>
                <h1>|</h1>
                <h4>{specializationid && specializationid.length}</h4>
              </div>

              <div className={styles.titleProfile}>
                <p>Create New Specialization</p>
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
                    onClick={submitHandler}
                  >
                    Submit
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
                  <label>Deparment Name</label>
                  <select
                    onChange={(e) => setDepartmentName(e.target.value)}
                    value={departmentName}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {departmentid &&
                      departmentid.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className={styles.inputBox}>
                  <label>Specialization Name</label>
                  <input
                    type="text"
                    onChange={(e) => setSpecializationName(e.target.value)}
                    value={specializationName}
                    required={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  <label>Max Level</label>
                  <select
                    onChange={(e) => setMaxLevel(e.target.value)}
                    value={maxLevel}
                    required={true}
                    className={styles.specializationSelect}
                  >
                    <option></option>
                    {getLevelId &&
                      getLevelId.map((item, i) => (
                        <option key={i} value={item.id}>
                          {item.code}
                        </option>
                      ))}
                  </select>
                </div>
                {/* 
                <div className={styles.inputBox}>
                  <label>Specialization Code</label>
                  <input
                    type="number"
                    onChange={(e) => setCodeName(e.target.value)}
                    value={codeName}
                    required={true}
                  />
                </div> */}

                <div className={styles.inputBox}>
                  <label>Description (optional)</label>
                  <input
                    type="text"
                    onChange={(e) => setDescName(e.target.value)}
                    value={descName}
                    required={true}
                  />
                </div>

                <div className={styles.inputBox}>
                  <div className={styles.checkboxBtn} onClick={handleClick}>
                    <input
                      type="checkbox"
                      value={isActive}
                      disable={isActive ? "false" : "true"}
                    />
                    <span className={styles.toggleRound}>
                      Publish Specialization
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSpecialization;
