import React from "react";
import Login from "../components/user/Login";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import Notification from "../components/Notification";

const MainLayout = () => {
  return (
    <>
      <Notification />
      <Login />
      <NavBar sx={{ position: "fixed", marginBottom: "10px" }} />
      <div>
        {/* <Toolbar sx={{ marginBottom: "10px" }}></Toolbar> */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
