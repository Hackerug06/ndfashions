import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import FlashlightToggle from './FlashlightToggle';
import useVibration from '../hooks/useVibration';
import { IconButton } from '@mui/material';
import { Cameraswitch, FlashOn, FlashOff } from '@mui/icons-material';

function CameraScanner({ onScan }) {
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
    const newFacingMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newFacingMode);
    // Html5Qrcode will automatically handle camera switching
  };

  const toggleTorch = () => {
    setTorchOn(!torchOn);
    // Torch control would need additional implementation
  };

  return (
    <div className="scanner-container" id="qr-scanner">
      <div className="camera-controls">
        <IconButton onClick={toggleTorch} color="primary">
          {torchOn ? <FlashOff /> : <FlashOn />}
        </IconButton>
        <IconButton onClick={toggleCamera} color="primary">
          <Cameraswitch />
        </IconButton>
      </div>
    </div>
  );
}

export default CameraScanner;
