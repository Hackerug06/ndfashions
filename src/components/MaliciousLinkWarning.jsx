import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  warningIcon: {
    color: theme.palette.warning.main,
    fontSize: '3rem',
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  }
}));

function MaliciousLinkWarning({ onClose, onProceed }) {
  const classes = useStyles();

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        <div className={classes.title}>
          <WarningIcon className={classes.warningIcon} />
          <span>Security Warning</span>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This link appears to be suspicious. It may lead to a malicious website that could harm your device or steal your information.
        </DialogContentText>
        <DialogContentText>
          Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onProceed} color="secondary">
          Proceed Anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MaliciousLinkWarning;
