import React, { useState, useEffect } from 'react';
import { forwardRef, useRef, useImperativeHandle } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmationDiaglog = forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  

  function handleClickOpen() {
    setOpen(true);
  }

  

  function handleConfirmation() {
    props.onComfirmation()
    handleClose()
  }

  function handleCancel() {
    onCancelConfirmation()
    handleClose()
  }

  function handleClose() {
    setOpen(false);
  }
  useImperativeHandle(ref, () => ({

    handleClickOpen() {
      setOpen(true);
    }
  

  }));

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
)

export default ConfirmationDiaglog