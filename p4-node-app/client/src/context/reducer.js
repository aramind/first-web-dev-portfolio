const reducer = (state, action) => {
  switch (action.type) {
    // for login/register modal
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };

    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };

    // for  alert
    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };

    // for logging and loggin out via the icon on the navbar
    case "UPDATE_USER":
      return { ...state, currentUser: action.payload };

    // for selectedDate
    case "UPDATE_DATESELECTED":
      return { ...state, selectedDate: action.payload };
    default:
      throw new Error("No matched action");
  }
};

export default reducer;
