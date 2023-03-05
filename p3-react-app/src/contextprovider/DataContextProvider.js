import React, { createContext, useEffect, useState } from "react";
import logs from "../data/logs.json";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [pastRecords, setPastRecords] = useState(logs);

  useEffect(() => {
    console.log(logs);
    const data = JSON.parse(localStorage.getItem("pastRecords")) || logs;
    setPastRecords(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("pastRecords", JSON.stringify(pastRecords));
  }, [pastRecords]);

  const addRecord = (record) => {
    setPastRecords([...pastRecords, record]);
  };

  const value = { pastRecords, addRecord };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
