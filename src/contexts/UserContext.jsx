import { createContext, useCallback, useMemo, useState } from "react";
import { instanceAPI } from "../services/instances";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserContext = createContext({});

export default UserContext;

export function AuthHandler({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || "{}"
  );
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const login = (_user) => {
    setUser(_user);
    localStorage.setItem("user", JSON.stringify(_user));
  };

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const isLogout = await instanceAPI.get("/api/v1/auth/logout");
      if (isLogout) {
        setUser({});
        localStorage.removeItem("user");
        setLoading(false);
        if (
          location.pathname === "/watchlist" ||
          location.pathname === "/profile"
        ) {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [location.pathname, navigate]);

  const memo = useMemo(() => {
    return { user, setUser, login, logout, loading };
  }, [user, logout, loading]);

  return <UserContext.Provider value={memo}>{children}</UserContext.Provider>;
}

AuthHandler.propTypes = {
  children: PropTypes.element,
};
