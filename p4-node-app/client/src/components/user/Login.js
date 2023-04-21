import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useValue } from "../../context/ContextProvider";
import { Close, Send, TryRounded } from "@mui/icons-material";
import PasswordField from "./PasswordField";

// testing only
import photoURL from "../../profile.jpg";
const user = { name: "Robin Mon", photoURL };

const Login = () => {
  // ** states
  const {
    state: { openLogin, currentUser },
    dispatch,
  } = useValue();
  // * sets what modal will show (login or register)
  // const [title, setTitle] = useState("Login");
  const [isRegister, setIsRegister] = useState("false");

  // ** references
  const nameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  // ** handlers
  const handleClose = () => {
    dispatch({ type: "CLOSE_LOGIN" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // testing of loading
    dispatch({ type: "START_LOADING" });
    setTimeout(() => {
      dispatch({ type: "END_LOADING" });
    }, 3000);
    // testing Notification
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: "Passwords do not match",
        },
      });
    }
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
    >
      <DialogTitle>
        {isRegister ? "Register" : "Login"}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "#333" }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <DialogContentText>
              Please fill your information in the fields below:
            </DialogContentText>
            {isRegister && (
              <>
                <TextField
                  autoFocus
                  margin="normal"
                  variant="standard"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  inputRef={nameRef}
                  inputProps={{ minLength: 3 }}
                  required
                />
                <TextField
                  margin="normal"
                  variant="standard"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  inputRef={userNameRef}
                  inputProps={{ minLength: 3 }}
                  required
                />
              </>
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
            <Box mt={1}>
              {isRegister ? (
                <Typography fontSize="0.8rem">
                  By registering you are accepting our{" "}
                  <Link sx={{ cursor: "pointer" }}>
                    Terms of Use and Policy
                  </Link>
                </Typography>
              ) : (
                <Typography fontSize="0.8rem">
                  <Link sx={{ cursor: "pointer" }}>Forgot Password?</Link>
                </Typography>
              )}
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: "19px" }}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<Send />}
              onClick={() => dispatch({ type: "UPDATE_USER", payload: user })} //TODO : to remove
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </DialogActions>
        </form>
        <DialogActions
          sx={{ justifyContent: "center", p: "5px 24px", fontSize: "smaller" }}
        >
          {isRegister ? `Already have an account?` : `First time user?`}
          <Button
            onClick={() => {
              setIsRegister(!isRegister);
            }}
          >
            {isRegister ? `Login` : `Register`}
          </Button>
        </DialogActions>
      </DialogTitle>
    </Dialog>
  );
};

export default Login;
