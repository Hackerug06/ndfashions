import React, { useState } from 'react';
import { BarcodeScanner } from 'react-qr-barcode-scanner';
import FlashlightToggle from './FlashlightToggle';
import useVibration from '../hooks/useVibration';
import useFlashlight from '../hooks/useFlashlight';

function CameraScanner({ onScan }) {
  const [torchOn, setTorchOn] = useState(false);
  const vibrate = useVibration();
  const { hasFlashlight, toggleFlashlight } = useFlashlight();

  const handleUpdate = (err, result) => {
    if (result) {
      vibrate(); // Vibrate on successful scan
      onScan(result);
    }
  };

  return (
    <div className="scanner-container">
      <BarcodeScanner
        width="100%"
        height="100%"
        torch={torchOn}
        onUpdate={handleUpdate}
        facingMode="environment"
        constraints={{
          advanced: [{ zoom: true }],
          focusMode: 'continuous'
        }}
      />
      
      {hasFlashlight && (
        <FlashlightToggle 
          torchOn={torchOn} 
          toggleFlashlight={() => {
            setTorchOn(!torchOn);
            toggleFlashlight();
          }} 
        />
      )}
    </div>
  );
}

export default CameraScanner;
