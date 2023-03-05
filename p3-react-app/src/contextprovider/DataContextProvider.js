import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [pastRecords, setPastRecords] = useState([{ id: 110, initial: "mon" }]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pastRecords")) || [];
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
