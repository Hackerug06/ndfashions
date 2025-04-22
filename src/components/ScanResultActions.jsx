import React from 'react';
import { Button, Typography, Paper, IconButton } from '@mui/material';
import { Close, Wifi, Link, Contacts, Payment, TextFields } from '@mui/icons-material';
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
      case 'vcard': return <Contacts fontSize="large" />;
      case 'payment': return <Payment fontSize="large" />;
      default: return <TextFields fontSize="large" />;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="div">
          {getIcon()} {qrType.toUpperCase()} Detected
        </Typography>
        <IconButton onClick={onNewScan}>
          <Close />
        </IconButton>
      </div>
      
      <div>
        <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', mb: 3 }}>
          {qrHandlers.formatResultText(text, qrType)}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAction}
          fullWidth
          sx={{ mt: 3 }}
        >
          {qrHandlers.getActionLabel(qrType)}
        </Button>
      </div>
    </Paper>
  );
}

export default ScanResultActions;
