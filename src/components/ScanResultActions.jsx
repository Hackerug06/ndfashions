import React from 'react';
import { Button, Typography, Paper, IconButton } from '@material-ui/core';
import { Close, Wifi, Link, ContactMail, Payment, TextFields } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import * as qrHandlers from '../utils/qrHandlers';
import useMaliciousCheck from '../hooks/useMaliciousCheck';

const useStyles = makeStyles((theme) => ({
  resultPaper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  resultText: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    marginBottom: theme.spacing(3),
  },
  actionButton: {
    marginTop: theme.spacing(3),
  }
}));

function ScanResultActions({ result, onNewScan, setShowWarning }) {
  const classes = useStyles();
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
    <Paper elevation={3} className={classes.resultPaper}>
      <div className={classes.resultHeader}>
        <Typography variant="h6" component="div">
          {getIcon()} {qrType.toUpperCase()} Detected
        </Typography>
        <IconButton onClick={onNewScan}>
          <Close />
        </IconButton>
      </div>
      
      <div>
        <Typography variant="body1" component="div" className={classes.resultText}>
          {qrHandlers.formatResultText(text, qrType)}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAction}
          fullWidth
          className={classes.actionButton}
        >
          {qrHandlers.getActionLabel(qrType)}
        </Button>
      </div>
    </Paper>
  );
}

export default ScanResultActions;
