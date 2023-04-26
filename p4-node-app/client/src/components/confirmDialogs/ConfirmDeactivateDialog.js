import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ConfirmDeactivateDialog = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm deactivation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to deactivate your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Deactivate Account</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeactivateDialog;
