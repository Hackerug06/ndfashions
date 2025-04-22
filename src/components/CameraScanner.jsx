import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import FlashlightToggle from './FlashlightToggle';
import useVibration from '../hooks/useVibration';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  scannerContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    height: '300px',
    margin: '20px auto',
    border: '2px solid #3f51b5',
    borderRadius: '8px',
    overflow: 'hidden',
    '& #html5qr-code-full-region': {
      width: '100% !important',
      height: '100% !important'
    }
  },
  cameraControls: {
    position: 'absolute',
    bottom: '20px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    zIndex: 10
  },
  switchCameraBtn: {
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.7)'
    }
  }
});

function CameraScanner({ onScan }) {
  const classes = useStyles();
  const scannerRef = useRef(null);
  const [torchOn, setTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const vibrate = useVibration();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-scanner',
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: true
      },
      false
    );

    scanner.render(
      (decodedText) => {
        vibrate();
        onScan({ text: decodedText });
      },
      (error) => {
        console.error('QR Scanner Error:', error);
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error('Failed to clear scanner', error);
        });
      }
    };
  }, [onScan, vibrate]);

  const toggleCamera = () => {
    if (scannerRef.current) {
      const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
      scannerRef.current.getState().then(state => {
        if (state === Html5QrcodeScannerState.SCANNING) {
          scannerRef.current.pause().then(() => {
            scannerRef.current.setCamera(newFacingMode).then(() => {
              scannerRef.current.resume();
              setFacingMode(newFacingMode);
            });
          });
        }
      });
    }
  };

  const toggleTorch = () => {
    if (scannerRef.current) {
      scannerRef.current.getState().then(state => {
        if (state === Html5QrcodeScannerState.SCANNING) {
          scannerRef.current.applyVideoConstraints({
            advanced: [{ torch: !torchOn }]
          }).then(() => {
            setTorchOn(!torchOn);
          });
        }
      });
    }
  };

  return (
    <div className={classes.scannerContainer} id="qr-scanner">
      <div className={classes.cameraControls}>
        <button onClick={toggleTorch} className={classes.switchCameraBtn}>
          {torchOn ? 'Turn Off Flash' : 'Turn On Flash'}
        </button>
        <button onClick={toggleCamera} className={classes.switchCameraBtn}>
          Switch Camera
        </button>
      </div>
    </div>
  );
}

export default CameraScanner;
