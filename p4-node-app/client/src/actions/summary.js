import { utcToZonedTime } from "date-fns-tz";
import fetchData from "./utils/fetchData";
import { format } from "date-fns";

const url = process.env.REACT_APP_SERVER_URL + "/summary";

export const getSummaryForInterval = async (
  token,
  { date, interval },
  dispatch
) => {
  dispatch({ type: "START_LOADING" });

  const timezone = "Asia/Manila";
  const zonedDate = utcToZonedTime(date, timezone);
  const label = format(zonedDate, "yyyy-MM-dd");
  const url = process.env.REACT_APP_SERVER_URL + "/summary";

  const result = fetchData(
    {
      url: `${url}/interval?ref=${label}&interval=${interval}`,
      method: "GET",
      token: token,
      body: null,
    },
    dispatch
  );
  dispatch({ type: "END_LOADING" });
  return result;
};
