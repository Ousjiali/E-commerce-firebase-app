import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import styles from "./styles.module.css";
import Modal from "../../components/Modal";
import { Button, useToast } from "@chakra-ui/react";
import { totalStaff } from "../../redux/action/staffAction";
import {
  editDepartmentId,
  getDepartmentId,
} from "../../redux/action/editDepartmentIdAction";
import { getDepartment } from "../../redux/action/departmentAction";
import { EDIT_DEPARTMENTBYID_RESET } from "../../redux/constants/editDepartmentIdConstant";
import { BsBuilding } from "react-icons/bs";

const ManageViewDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const [facultyName, setFacultyName] = useState("");
  const [nameOfDepartment, setNameOfDepartment] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [headOfDepartment, setHeadOfDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(false);

  React.useEffect(() => {
    dispatch(
      getDepartmentId(
        id,
        setFacultyName,
        setNameOfDepartment,
        setDepartmentCode,
        setHeadOfDepartment,
        setDescription,
        setIsActive,
        onChangeHandler
      )
    );
  }, [id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      faculty: facultyName,
      name: nameOfDepartment,
      code: departmentCode,
      description: description,
      head: headOfDepartment,
      is_active: isActive,
    };
    dispatch(editDepartmentId(id, data));
    console.log(data);
  };
  console.log(id);

  const onChangeHandler = (e) => {
    setFacultyName(e.target.value);
    setNameOfDepartment(e.target.value);
    setDescription(e.target.value);
    setHeadOfDepartment(e.target.value);
    setIsActive(e.target.value);
  };

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  const [departmentInfo, setDepartmentInfo] = React.useState();

  const departmentGet = useSelector((state) => state.departmentGet);
  const { departmentid = [], success: departments } = departmentGet;
  const data = departmentid.filter((x) => x.id === parseInt(id));

  // console.log(departmentid && departmentid[0].code);

  React.useEffect(() => {
    if (departments) {
      setDepartmentInfo(data && data);
    }
  }, [departments]);
  console.log(departmentInfo && departmentInfo[0].code);
  // console.log(departments && departments[0].faculty.name);

  const backHandler = () => {
    navigate("/admin/managedepartment");
  };

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);
  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;
  // console.log(specializationid);

  const editDepartment = useSelector((state) => state.editDepartment);
  const { success, error, loading } = editDepartment;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  if (success) {
    toast({
      title: "Notification",
      description: "Update Successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_DEPARTMENTBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Updating",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_DEPARTMENTBYID_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="View Department" />
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
        <div className={styles.profileBox}>
          <div className={styles.gridBox}>
            <div className={styles.eachGridBox}>
              <header>Faculty Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {/* {data && data[0].faculty.name} */}
                  {departmentInfo && departmentInfo[0].faculty.name}
                  {/* {departmentid && departmentid.name} */}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Name of Department</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {departmentInfo && departmentInfo[0].name}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Department Code</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {departmentInfo && departmentInfo[0].code}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Description</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {departmentInfo && departmentInfo[0].description}
                </p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Head of Department</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {departmentInfo && departmentInfo[0].head}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Active Faculty</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {departmentInfo && departmentInfo[0].is_active.toString()}
                </p>
              </span>
            </div>
          </div>
          <div className={styles.editModal}>
            <button
              className={styles.editBtn}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Edit Details
            </button>
          </div>
          {openModal && (
            <Modal
              onClose={() => setOpenModal(false)}
              isVisible={true}
              size="md"
              content={
                <div className={styles.noticeInputField}>
                  <span>Edit Department Details</span>
                  <div className={styles.inputBox}>
                    <label>Faculty Name</label>
                    <input
                      type="text"
                      onChange={(e) => setFacultyName(e.target.value)}
                      value={facultyName}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Name of Department</label>
                    <input
                      type="text"
                      onChange={(e) => setNameOfDepartment(e.target.value)}
                      value={nameOfDepartment}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Department Code</label>
                    <input
                      type="text"
                      onChange={(e) => setDepartmentCode(e.target.value)}
                      value={departmentCode}
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Head of Department</label>
                    <select
                      onChange={(e) => setHeadOfDepartment(e.target.value)}
                      value={headOfDepartment}
                      className={styles.newFacultySelect}
                    >
                      <option></option>
                      {allStaff &&
                        allStaff.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.user.full_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.inputBox}>
                    <label>Description</label>
                    <input
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Active Faculty</label>
                    <input
                      type="text"
                      onChange={(e) => setIsActive(e.target.value)}
                      value={isActive}
                    />
                  </div>
                  <div className={styles.inputBox}>
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
                        className={styles.modalBtn}
                        onClick={submitHandler}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageViewDepartment;
