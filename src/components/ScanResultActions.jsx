import React from 'react';
import { Button, Typography, Paper, IconButton } from '@material-ui/core';
import { Close, Wifi, Link, ContactMail, Payment, TextFields } from '@material-ui/icons';
import * as qrHandlers from '../utils/qrHandlers';
import useMaliciousCheck from '../hooks/useMaliciousCheck';

function ScanResultActions({ result, onNewScan, setShowWarning }) {
  const { text } = result;
  const { isMalicious } = useMaliciousCheck(text);
  const qrType = qrHandlers.detectQrType(text);
  
  const handleAction = () => {
    if (qrType === 'url' && isMalicious) {
      setShowWarning(true);
      return;
    }
    
    qrHandlers.handleQrAction(text, qrType);
  };

  const getIcon = () => {
    switch(qrType) {
      case 'wifi': return <Wifi fontSize="large" />;
      case 'url': return <Link fontSize="large" />;
      case 'vcard': return <ContactMail fontSize="large" />;
      case 'payment': return <Payment fontSize="large" />;
      default: return <TextFields fontSize="large" />;
    }
  };

  return (
    <Paper elevation={3} className="result-paper">
      <div className="result-header">
        <Typography variant="h6" component="div">
          {getIcon()} {qrType.toUpperCase()} Detected
        </Typography>
        <IconButton onClick={onNewScan}>
          <Close />
        </IconButton>
      </div>
      
      <div className="result-content">
        <Typography variant="body1" component="div" className="result-text">
          {qrHandlers.formatResultText(text, qrType)}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAction}
          fullWidth
          className="action-button"
        >
          {qrHandlers.getActionLabel(qrType)}
        </Button>
      </div>
    </Paper>
  );
}

export default ScanResultActions;
