import "./ErrorMessage.css";
import React from "react";

const ErrorMessage = ({ errorMsg }) => {
  return <div className="error-msg">{errorMsg}</div>;
};

export default ErrorMessage;
