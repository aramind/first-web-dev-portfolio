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
      />
      <SideItem
        icon={<QueryStatsOutlined />}
        text="Compare charts and see trends"
      />
      <SideItem
        icon={<SummarizeOutlined />}
        text="View summaries"
      />
      <SideItem
        icon={<MenuBookOutlined />}
        text="Do some readings"
      />
    </List>
  );
};

export default SideBar;
