import React, { createContext, useEffect, useState } from "react";
// import logs from "../data/logs.json";

export const DataContext = createContext();

const logs = [
  {
    date: "2023-02-24",
    activities: [
      {
        name: "SLEEP",
        hours: 6,
      },
      {
        name: "WORK",
        hours: 7,
      },
      {
        name: "LEARN",
        hours: 4,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 2,
      },
      {
        name: "PLAY",
        hours: 1,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 2,
      },
    ],
  },
  {
    date: "2023-02-25",
    activities: [
      {
        name: "SLEEP",
        hours: 8,
      },
      {
        name: "WORK",
        hours: 7,
      },
      {
        name: "LEARN",
        hours: 2,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 2,
      },
      {
        name: "PLAY",
        hours: 1,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 2,
      },
    ],
  },
  {
    date: "2023-02-26",
    activities: [
      {
        name: "SLEEP",
        hours: 8,
      },
      {
        name: "WORK",
        hours: 6,
      },
      {
        name: "LEARN",
        hours: 2,
      },
      {
        name: "SELF",
        hours: 3,
      },
      {
        name: "SOCIAL",
        hours: 2,
      },
      {
        name: "PLAY",
        hours: 1,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 1,
      },
    ],
  },
  {
    date: "2023-02-27",
    activities: [
      {
        name: "SLEEP",
        hours: 8,
      },
      {
        name: "WORK",
        hours: 5,
      },
      {
        name: "LEARN",
        hours: 3,
      },
      {
        name: "SELF",
        hours: 2,
      },
      {
        name: "SOCIAL",
        hours: 2,
      },
      {
        name: "PLAY",
        hours: 2,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 1,
      },
    ],
  },
  {
    date: "2023-02-28",
    activities: [
      {
        name: "SLEEP",
        hours: 7,
      },
      {
        name: "WORK",
        hours: 7,
      },
      {
        name: "LEARN",
        hours: 2,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 3,
      },
      {
        name: "PLAY",
        hours: 1,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 2,
      },
    ],
  },
  {
    date: "2023-03-01",
    activities: [
      {
        name: "sleep",
        hours: 8,
      },
      {
        name: "work",
        hours: 6,
      },
      {
        name: "learn",
        hours: 2,
      },
      {
        name: "self",
        hours: 2,
      },
      {
        name: "social",
        hours: 3,
      },
      {
        name: "play",
        hours: 2,
      },
      {
        name: "fitness",
        hours: 1,
      },
      {
        name: "others",
        hours: 0,
      },
    ],
  },
  {
    date: "2023-03-02",
    activities: [
      {
        name: "SLEEP",
        hours: 8,
      },
      {
        name: "WORK",
        hours: 7,
      },
      {
        name: "LEARN",
        hours: 2,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 3,
      },
      {
        name: "PLAY",
        hours: 2,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 0,
      },
    ],
  },
  {
    date: "2023-03-03",
    activities: [
      {
        name: "SLEEP",
        hours: 6,
      },
      {
        name: "WORK",
        hours: 8,
      },
      {
        name: "LEARN",
        hours: 3,
      },
      {
        name: "SELF",
        hours: 1,
      },
      {
        name: "SOCIAL",
        hours: 3,
      },
      {
        name: "PLAY",
        hours: 2,
      },
      {
        name: "FITNESS",
        hours: 1,
      },
      {
        name: "OTHERS",
        hours: 0,
      },
    ],
  },
];

const DataContextProvider = ({ children }) => {
  // const [pastRecords, setPastRecords] = useState(logs);
  const [pastRecords, setPastRecords] = useState(() => {
    const data = JSON.parse(localStorage.getItem("pastRecords")) || logs;
    return Array.isArray(data) ? data : [data];
  });

  useEffect(() => {
    console.log(logs);
    const data = JSON.parse(localStorage.getItem("pastRecords")) || logs;
    setPastRecords(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("pastRecords", JSON.stringify(pastRecords));
  }, [pastRecords]);

  // const addRecord = (record) => {
  //   setPastRecords([...pastRecords, record]);
  // };

  const value = { pastRecords, setPastRecords };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
