import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../utils";
import { getStoredUser } from "../storage";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: {},
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const data = getStoredUser();
    if (data) {
      setUser(data);
      setAuthToken(data.jwtToken);
    }
  }, []);

  function authenticate(token) {
    setAuthToken(token.data.jwtToken);
    setUser(token.data);
  }
  function logout() {
    setUser(undefined);
    setAuthToken(null);
    localStorage.removeItem("user");
  }

  const value = {
    user: user,
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
