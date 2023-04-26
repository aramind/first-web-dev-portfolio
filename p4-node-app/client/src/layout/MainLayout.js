import React from "react";
import Login from "../components/user/Login";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import NavigationSpeedDial from "../components/speedDials/NavigationSpeedDial";

const MainLayout = () => {
  return (
    <>
      <NavigationSpeedDial />
      <Loading />
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
