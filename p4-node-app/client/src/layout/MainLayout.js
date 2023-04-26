import React from "react";
import Login from "../components/user/Login";
import NavBar from "../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import NavigationSpeedDial from "../components/speedDials/NavigationSpeedDial";
import { useValue } from "../context/ContextProvider";
import NotYetModal from "../components/modals/NotYetModal";
import ClosingModal from "../components/modals/ClosingModal";

const MainLayout = () => {
  const {
    state: { notYetModal, currentUser, closingModalIsOpen },
  } = useValue();
  return (
    <>
      {closingModalIsOpen.open && <ClosingModal />}
      {notYetModal.open && <NotYetModal title={"Update Record"} />}
      {currentUser && <NavigationSpeedDial />}
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
