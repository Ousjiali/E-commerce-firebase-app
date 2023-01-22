import React, { useEffect, useState } from "react";
import { FaPeopleArrows } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNav from "../../components/HeaderNav";
import Sidebar from "../../components/Sidebar";
import { BiArrowBack } from "react-icons/bi";
import styles from "./styles.module.css";
import Modal from "../../components/Modal";
import { Button, useToast } from "@chakra-ui/react";
import { getSpecialization } from "../../redux/action/userProfileDataAction";
import { EDIT_STAFFBYID_RESET } from "../../redux/constants/editStaffIdConstant";
import { totalStaff } from "../../redux/action/staffAction";
import { editStaffId, getStaffId } from "../../redux/action/editStaffIdAction";

const ManageViewStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let { id } = useParams();

  const [openModal, setOpenModal] = useState(false);

  const [first_Name, setFirst_Name] = useState("");
  const [middle_Name, setMiddle_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");

  React.useEffect(() => {
    dispatch(getStaffId(id));
  }, [id, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      user: {
        first_name: first_Name,
        middle_name: middle_Name,
        last_name: last_Name,
        email: currentEmail !== email ? email : undefined,
        specialization: specialization,
      },
      is_active: isActive,
      employee_id: employee_id,
    };
    dispatch(editStaffId(id, data));
    console.log(data);
  };
  console.log(id);

  useEffect(() => {
    dispatch(totalStaff());
  }, [dispatch]);

  const totalStaffNo = useSelector((state) => state.totalStaffNo);
  const { allStaff } = totalStaffNo;
  console.log(allStaff);

  const getStaffById = useSelector((state) => state.getStaffById);
  const { user = {}, specialization: isSpecialization = {} } = getStaffById;

  const backHandler = () => {
    navigate("/admin/managestaff");
  };

  useEffect(() => {
    dispatch(getSpecialization());
  }, [dispatch]);

  const getSpecilize = useSelector((state) => state.getSpecilize);
  const { specializationid } = getSpecilize;
  // console.log(specializationid);

  const editStaff = useSelector((state) => state.editStaff);
  const { success, error, loading } = editStaff;

  // window.scroll({
  //   top: 0,
  //   left: 0,
  //   behavior: "smooth",
  // });

  const openHandler = () => {
    setOpenModal(true);
    setFirst_Name(user.first_name);
    setMiddle_Name(user.middle_name);
    setLast_Name(user.last_name);
    setEmail(user.email);
    setCurrentEmail(user.email);
    setEmployee_id(user.staff && user.staff[0].employee_id);
    setSpecialization(isSpecialization.id);
    setIsActive(user.is_active.toString());
  };

  if (success) {
    dispatch(getStaffId(id));
  }

  if (success) {
    toast({
      title: "Notification",
      description: "Update Successful",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setOpenModal(false);
    dispatch({ type: EDIT_STAFFBYID_RESET });
  }

  if (error) {
    toast({
      title: "Notification",
      description: "Error Updating",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch({ type: EDIT_STAFFBYID_RESET });
  }

  return (
    <div className={styles.profileContainer}>
      <Sidebar />
      <div className={styles.profile}>
        <HeaderNav title="View Staff" />
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
        <div className={styles.profileBox}>
          <div className={styles.gridBox}>
            <div className={styles.eachGridBox}>
              <header>First Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{user.first_name}</p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Middle Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{user.middle_name}</p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Last Name</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{user.last_name}</p>
              </span>
            </div>

            <div className={styles.eachGridBox}>
              <header>Email</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{user.email}</p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Specialization</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{isSpecialization.name}</p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Employee Identification Number</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>
                  {user.staff && user.staff[0].employee_id}
                </p>
              </span>
            </div>
            <div className={styles.eachGridBox}>
              <header>Active Staff</header>
              <span className={styles.titleContainer}>
                <p className={styles.titleName}>{user.is_active.toString()}</p>
              </span>
            </div>
          </div>
          <div className={styles.editModal}>
            <button className={styles.editBtn} onClick={openHandler}>
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
                  <span>Edit Staff Details</span>
                  <div className={styles.inputBox}>
                    <label>First Name</label>
                    <input
                      type="text"
                      onChange={(e) => setFirst_Name(e.target.value)}
                      value={first_Name}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Middle Name</label>
                    <input
                      type="text"
                      onChange={(e) => setMiddle_Name(e.target.value)}
                      value={middle_Name}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      onChange={(e) => setLast_Name(e.target.value)}
                      value={last_Name}
                      required={true}
                    />
                  </div>

                  <div className={styles.inputBox}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Specialization</label>
                    <select
                      onChange={(e) => setSpecialization(e.target.value)}
                      value={specialization}
                      required={true}
                      className={styles.newStudentSelect}
                    >
                      <option></option>
                      {specializationid &&
                        specializationid.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className={styles.inputBox}>
                    <label>Employee ID</label>
                    <input
                      type="text"
                      onChange={(e) => setEmployee_id(e.currentTarget.value)}
                      value={employee_id}
                      required={true}
                    />
                  </div>
                  <div className={styles.inputBox}>
                    <label>Active Staff</label>
                    <input
                      type="text"
                      onChange={(e) => setIsActive(e.target.value)}
                      value={isActive}
                      required={true}
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

export default ManageViewStaff;
