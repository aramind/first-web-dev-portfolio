import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Password, Send } from "@mui/icons-material";
import PasswordField from "./PasswordField";

const Login = () => {
  // ** states
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  // * sets what modal will show (login or register)
  const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState("false");

  // ** references
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // ** handlers
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {isRegister ? "Register" : "Login"}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "gray" }}
          onClick={handleClose}
        />
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Please fill your information in the fields below:
            </DialogContentText>
            {isRegister && (
              <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 2 }}
                required
              />
            )}
            <TextField
              autoFocus={!isRegister}
              margin="normal"
              variant="standard"
              id="email"
              label="Email"
              type="email"
              fullWidth
              inputRef={emailRef}
              required
            />
            <PasswordField passwordRef={passwordRef} />
            {isRegister && (
              <PasswordField
                passwordRef={confirmPasswordRef}
                id="confirmPassword"
                label="Confirm Password"
              />
            )}
          </DialogContent>
          <DialogActions sx={{ px: "19px" }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </DialogActions>
        </form>
        <DialogActions
          sx={{ justifyContent: "center", p: "5px 24px", fontSize: "smaller" }}
        >
          {isRegister ? `Already have an account?` : `First time user?`}
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? `Login` : `Register`}
          </Button>
        </DialogActions>
      </DialogTitle>
    </Dialog>
  );
};

export default Login;
