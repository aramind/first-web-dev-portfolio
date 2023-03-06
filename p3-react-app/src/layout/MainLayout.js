import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarForMobile from "../components/NavBarForMobile";
import NavigationBar from "../components/NavigationBar";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // return () => {
    //   mediaQuery.removeEventListener(handleMediaQueryChange);
    // };
  }, []);

  return (
    <div>
      {isMobile ? <NavBarForMobile /> : <NavigationBar />}
      {/* <NavigationBar /> */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
