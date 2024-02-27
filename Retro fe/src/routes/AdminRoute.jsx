import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserTokenContext } from "../context/UserTokenContext";

const AdminRoute = ({ roles }) => {
const{decodedToken}=useContext(UserTokenContext)
  return roles.includes(decodedToken?.role) ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;