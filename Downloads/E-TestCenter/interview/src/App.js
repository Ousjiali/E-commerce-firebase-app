import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomeScreen from "./screens/User/WelcomeScreen";
import LoginScreen from "./screens/User/LoginScreen";
import RegisterScreen from "./screens/User/RegisterScreen";
import StartScreen from "./screens/User/StartScreen";
import TestScreen from "./screens/User/TestScreen";
import SuccessScreen from "./screens/User/SuccessScreen";
import Forget from "./screens/User/forget";
import ChangePassword from "./screens/User/changePassword";
import Dashboard from "./screens/Dashboard";
import AdminRegister from "./screens/AdminRegister";
import ViewQuestion from "./screens/ViewQuestion";
import Profile from "./screens/Profile";
import QuestionBank from "./screens/QuestionBank";
import AdminLogin from "./screens/AdminLogin";
import Test from "./screens/Test";
import Section from "./screens/Section";
import ViewAdmin from "./screens/ViewAdmin";
import PasswordForgot from "./screens/PasswordForgot";
import ResetPassword from "./screens/ResetPassword";
import EditAdmin from "./screens/EditAdmin";
import ViewCandidate from "./screens/ViewCandidate";
import ViewAllCandidates from "./screens/ViewAllCandidates";
import Training from "./screens/User/training";

//import protectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={WelcomeScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/signup" exact component={RegisterScreen} />
        <Route path="/start" exact component={StartScreen} />
        <Route path="/success" exact component={SuccessScreen} />
        <Route path="/test" exact component={TestScreen} />
        <Route path="/forget" exact component={Forget} />
        <Route path="/changePassword" exact component={ChangePassword} />
        <Route path="/adminlogin" exact component={AdminLogin} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/adminregister" exact component={AdminRegister} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/questionbank" exact component={QuestionBank} />
        <Route path="/viewquestion" exact component={ViewQuestion} />
        <Route path="/adminTest" exact component={Test} />
        <Route path="/section" exact component={Section} />
        <Route path="/viewadmin" exact component={ViewAdmin} />

        <Route path="/passwordforgot" exact component={PasswordForgot} />

        <Route path="/resetpassword" exact component={ResetPassword} />

        <Route path="/editquestion/:id" exact component={EditAdmin} />
        <Route path="/viewcandidate/:id" exact component={ViewCandidate} />
        <Route path="/allcandidate/" exact component={ViewAllCandidates} />
        <Route path="/training/" exact component={Training} />
      </Switch>
    </Router>
  );
}

export default App;
