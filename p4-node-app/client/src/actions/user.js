import fetchData from "./utils/fetchData";

const url = process.env.REACT_APP_SERVER_URL;

export const register = async (user, dispatch) => {
  dispatch({ type: "START_LOADING" });
  try {
    const result = await fetchData(
      { url: url + "/register", body: user },
      dispatch
    );
    if (result) {
      dispatch({ type: "UPDATE_USER", payload: result });
      dispatch({ type: "CLOSE_LOGIN" });
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "success",
          message: "Your account has been created successfully",
        },
      });
    }
  } catch (error) {
    if (error.message === "Username already taken") {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message:
            "This username is already taken, please choose a different one",
        },
      });
    } else {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { open: true, severity: "error", message: error.message },
      });
    }
  }
  dispatch({ type: "END_LOADING" });
};
