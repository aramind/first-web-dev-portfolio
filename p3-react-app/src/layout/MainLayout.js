import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

const MainLayout = ({ records, setRecords }) => {
  return (
    <div>
      <NavigationBar />
      <Outlet
        records={records}
        setRecords={setRecords}
      />
    </div>
  );
};

export default MainLayout;
