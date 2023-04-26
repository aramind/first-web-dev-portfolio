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

const NotYetModal = ({ title }) => {
  const {
    state: { notYetModal },
    dispatch,
  } = useValue();

  const handleClose = () => {
    dispatch({
      type: "CLOSE_NOTYET_MODAL",
    });
  };

  // console.log(profile.open);
  return (
    <Dialog
      open={notYetModal}
      onClose={handleClose}
      sx={{
        padding: "2rem",
      }}
    >
      <DialogTitle>
        {title}
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
