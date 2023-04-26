import React from "react";
import { useValue } from "../../context/ContextProvider";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import gcashLogo from "../../resources/images/gcash.png";

const NotYetModal = () => {
  const {
    state: { notYetModal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({
      type: "UPDATE_NOTYET_MODAL",
      payload: { open: false, title: "Update Record" },
    });
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={notYetModal.open}
      onClose={handleClose}
      sx={{
        padding: "2rem",
      }}
    >
      <DialogTitle>
        {notYetModal.title}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            Sorry...not yet implemented. Devs run out of funds.😔
          </Typography>
          <Typography>Give Support?</Typography>
          <div className="flex-left">
            {/* <img
              src={gcashLogo}
              alt="gcash logo"
            />{" "} */}
            Send Gcash: 098282734283472
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default NotYetModal;
