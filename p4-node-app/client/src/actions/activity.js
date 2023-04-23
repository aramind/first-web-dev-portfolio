import { utcToZonedTime } from "date-fns-tz";
import fetchData from "./utils/fetchData";
import { format } from "date-fns";

const url = process.env.REACT_APP_SERVER_URL + "/record";

export const updateActivityRecord = async (
  token,
  { date, activity, hrs, mins, operation },
  dispatch
) => {
  dispatch({ type: "START_LOADING" });
  const timezone = "Asia/Manila";
  const zonedDate = utcToZonedTime(date, timezone);
  const label = format(zonedDate, "yyyy-MM-dd");
  console.log("DATE", date);
  console.log("LABEL", label);
  // console.log("LABEL", label);
  console.log(`${url}/${label}`);
  const totalSeconds = parseInt(hrs * 3600) + parseInt(+mins * 60);
  console.log(totalSeconds);
  fetchData({
    url: `${url}/${label}`,
    method: "POST",
    token: token,
    body: { name: activity, seconds_spent: totalSeconds },
  });
  dispatch({ type: "END_LOADING" });
  // return result;
};
