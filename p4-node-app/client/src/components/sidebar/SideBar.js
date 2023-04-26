import { List } from "@mui/material";
import React from "react";
import {
  AddCircleOutlineOutlined,
  MenuBookOutlined,
  QueryStatsOutlined,
  SummarizeOutlined,
} from "@mui/icons-material";
import SideItem from "./SideItem";

const SideBar = () => {
  return (
    <List>
      <SideItem
        icon={<AddCircleOutlineOutlined />}
        text="Update daily record"
        to="/record"
      />
      <SideItem
        icon={<QueryStatsOutlined />}
        text="Compare charts and see trends"
        to="/charts"
      />
      <SideItem
        icon={<SummarizeOutlined />}
        text="View summaries"
        to="/summary"
      />
    </List>
  );
};

export default SideBar;
