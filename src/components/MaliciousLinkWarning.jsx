import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function MaliciousLinkWarning({ onClose, onProceed }) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
        <WarningIcon color="warning" sx={{ fontSize: '3rem', mr: 2 }} />
        <span>Security Warning</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This link appears to be suspicious. It may lead to a malicious website.
        </DialogContentText>
        <DialogContentText>
          Are you sure you want to proceed?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onProceed} color="error">
          Proceed Anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MaliciousLinkWarning;
