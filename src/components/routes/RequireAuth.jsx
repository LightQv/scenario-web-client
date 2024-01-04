import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function RequireAuth() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return user?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
