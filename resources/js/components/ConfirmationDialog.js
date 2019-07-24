import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDiaglog({onComfirmation, onOpen, onCancel}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(onOpen)
  });

  function handleClickOpen() {
    setOpen(true);
  }

  

  function handleConfirmation() {
    onComfirmation()
    handleClose()
  }

  function handleCancel() {
    onCancelConfirmation()
    handleClose()
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={onOpen}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this event?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please note that once the event is deleted, all the attendees RSVPed for this event will be removed too.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation} color="primary">
            Confirm
          </Button>
          <Button onClick={onCancel} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
