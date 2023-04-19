import React from "react";
import Login from "../components/user/Login";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Login />
      <NavBar sx={{ position: "fixed" }} />
      <div>
        <Toolbar sx={{ marginBottom: "10px" }}></Toolbar>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
