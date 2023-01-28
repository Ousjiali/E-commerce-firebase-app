import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context";
import {
  Admin,
  AllRequest,
  ApprovedLoan,
  Audit,
  Bank,
  Branch,
  Checklist,
  Dashboard,
  DeclinedLoan,
  Document,
  Group,
  Home,
  LoanType,
  PendingLoan,
  Role,
  SinglePendingLoan,
  ViewLoan,
} from "./modules";

function App() {
  const Stack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    );
  };

  const AuthStack = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/app/loan/pending" exact element={<PendingLoan />} />
        <Route
          path="/app/loan/pending/:id"
          exact
          element={<SinglePendingLoan />}
        />
        <Route path="/app/loan/approved" exact element={<ApprovedLoan />} />
        <Route path="/app/loan/declined" exact element={<DeclinedLoan />} />
        <Route path="/app/loan/:id" exact element={<ViewLoan />} />
        <Route path="/app/loan/all" exact element={<AllRequest />} />
        <Route path="/app/branch" exact element={<Branch />} />
        <Route path="/app/bank" exact element={<Bank />} />
        <Route path="/app/roles" exact element={<Role />} />
        <Route path="/app/groups" exact element={<Group />} />
        <Route path="/app/config/loantype" exact element={<LoanType />} />
        <Route path="/app/config/checklist" exact element={<Checklist />} />
        <Route path="/app/config/document" exact element={<Document />} />
        <Route path="/app/admin" exact element={<Admin />} />
        <Route path="/app/audit" exact element={<Audit />} />
      </Routes>
    );
  };

  const AuthGate = () => {
    const { user } = useContext(AuthContext);

    if (user) {
      return <AuthStack />;
    }
    return <Stack />;
  };

  return (
    <Router>
      <AuthContextProvider>
        <AuthGate />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
