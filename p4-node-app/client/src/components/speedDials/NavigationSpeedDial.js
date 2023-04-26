import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  AddCircle,
  Home,
  Menu,
  QueryStats,
  Summarize,
} from "@mui/icons-material";

const NavigationSpeedDial = () => {
  return (
    <SpeedDial
      ariaLabel="Navigation speed dial"
      sx={{ position: "fixed", bottom: 24, right: 20 }}
      icon={<Menu />}
    >
      <SpeedDialAction
        icon={<Home />}
        tooltipTitle="Home"
      />
      <SpeedDialAction
        icon={<AddCircle />}
        tooltipTitle="Add Record"
      />
      <SpeedDialAction
        icon={<QueryStats />}
        tooltipTitle="Charts"
      />
      <SpeedDialAction
        icon={<Summarize />}
        tooltipTitle="Summary"
      />
    </SpeedDial>
  );
};

export default NavigationSpeedDial;
