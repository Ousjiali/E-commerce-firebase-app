import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AcademicData from "./screens/AcademicData";
import ConfirmPassword from "./screens/Auth/ConfirmPassword";
import ForgetPassword from "./screens/Auth/ForgetPassword";
import LoginPage from "./screens/Auth/LoginPage";
import CreateSpecialization from "./screens/CreateSpecialization";
import Dashboard from "./screens/Dashboard";
import Faculty from "./screens/Faculty";
import FacultyHomePage from "./screens/FacultyHomePage";
import FamilyData from "./screens/FamilyData";
import HealthData from "./screens/HealthData";
import InformationImage from "./screens/InformationImage";
import ManageFaculty from "./screens/ManageFaculty";
import ManageStaff from "./screens/ManageStaff";
import ManageStudent from "./screens/ManageStudent";
import ManageViewFaculty from "./screens/ManageViewFaculty";
import ManageViewStaff from "./screens/ManageViewStaff";
import ManageViewStudent from "./screens/ManageViewStudent";
import NewCourse from "./screens/NewCourse";
import NewDepartment from "./screens/NewDepartment";
import NoticeBoard from "./screens/NoticeBoard";
import NoticeInformation from "./screens/NoticeInformation";
import Profile from "./screens/Profile";
import ViewProfileData from "./screens/Profile/ViewProfileData";
import StaffData from "./screens/StaffData";
import StaffHomePage from "./screens/StaffHomePage";
import StudentData from "./screens/StudentData";
import StudentHomePage from "./screens/StudentHomePage";
import DepartmentHomePage from "./screens/DepartmentHomePage";
import ManageDepartment from "./screens/ManageDepartment";
import ManageViewDepartment from "./screens/ManageViewDepartment";
import CourseHomePage from "./screens/CourseHomePage";
import ManageCourse from "./screens/ManageCourse";
import ManageViewCourse from "./screens/ManageViewCourse";
import ViewHealthData from "./screens/HealthData/ViewHealthData";
import ViewAcademicData from "./screens/AcademicData/ViewAcademicData";
import ViewFamilyData from "./screens/FamilyData/ViewFamilyData";
import ManageNotice from "./screens/ManageNotice";
import EditNotice from "./screens/EditNotice";
import CreateScope from "./screens/CreateScope";
import ProfilePicture from "./screens/ProfilePicture";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LoginPage />} />
        <Route
          path="/staff/confirmpassword"
          exact
          element={<ForgetPassword />}
        />
        <Route path="/auth/confirmemail" exact element={<ConfirmPassword />} />
        <Route path="/admin/dashboard" exact element={<Dashboard />} />
        <Route path="/admin/profile" exact element={<Profile />} />
        <Route path="/admin/staffs" exact element={<StaffData />} />
        <Route path="/admin/student" exact element={<StudentData />} />
        <Route path="/admin/academicdata" exact element={<AcademicData />} />
        <Route path="/admin/healthdata" exact element={<HealthData />} />
        <Route path="/admin/familydata" exact element={<FamilyData />} />
        <Route path="/admin/faculty" exact element={<Faculty />} />
        <Route path="/admin/department" exact element={<NewDepartment />} />
        <Route path="/admin/course" exact element={<NewCourse />} />
        <Route path="/admin/noticeboard" exact element={<NoticeBoard />} />
        <Route
          path="/admin/notice/informationimage"
          exact
          element={<InformationImage />}
        />
        <Route
          path="/admin/notice/information"
          exact
          element={<NoticeInformation />}
        />
        <Route path="/admin/managestudent" exact element={<ManageStudent />} />
        <Route
          path="/admin/specialization"
          exact
          element={<CreateSpecialization />}
        />
        <Route
          path="/admin/manageviewstudent/:id"
          exact
          element={<ManageViewStudent />}
        />
        <Route
          path="/admin/viewprofiledata"
          exact
          element={<ViewProfileData />}
        />
        <Route
          path="/admin/student/homepage"
          exact
          element={<StudentHomePage />}
        />
        <Route path="/admin/staff/homepage" exact element={<StaffHomePage />} />
        <Route path="/admin/managestaff" exact element={<ManageStaff />} />
        <Route
          path="/admin/manageviewstaff/:id"
          exact
          element={<ManageViewStaff />}
        />
        <Route
          path="/admin/faculty/homepage"
          exact
          element={<FacultyHomePage />}
        />
        <Route path="/admin/managefaculty" exact element={<ManageFaculty />} />
        <Route
          path="/admin/manageviewfaculty/:id"
          exact
          element={<ManageViewFaculty />}
        />
        <Route
          path="/admin/department/homepage"
          exact
          element={<DepartmentHomePage />}
        />
        <Route
          path="/admin/managedepartment"
          exact
          element={<ManageDepartment />}
        />
        <Route
          path="/admin/manageviewdepartment/:id"
          exact
          element={<ManageViewDepartment />}
        />
        <Route
          path="/admin/manageviewcourse/:id"
          exact
          element={<ManageViewCourse />}
        />
        <Route
          path="/admin/course/homepage"
          exact
          element={<CourseHomePage />}
        />
        <Route path="/admin/managecourse" exact element={<ManageCourse />} />
        <Route
          path="/admin/viewhealthdata"
          exact
          element={<ViewHealthData />}
        />
        <Route
          path="/admin/viewacademicdata"
          exact
          element={<ViewAcademicData />}
        />
        <Route
          path="/admin/viewfamilydata"
          exact
          element={<ViewFamilyData />}
        />
        <Route path="/admin/managenotice" exact element={<ManageNotice />} />
        <Route path="/admin/editnotice/:id" exact element={<EditNotice />} />
        <Route path="/admin/scope" exact element={<CreateScope />} />
        <Route
          path="/admin/profilepicture"
          exact
          element={<ProfilePicture />}
        />
      </Routes>
    </Router>
  );
}

export default App;
