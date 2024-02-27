import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import "./AdminMainLayout.scss"
function AdminMainLayout() {
  return (
    <div className="admmainlay">
      <AdminNav />
      <Outlet />
    </div>
  );
}

export default AdminMainLayout;
