import React, { useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import FlashlightToggle from './FlashlightToggle';
import useVibration from '../hooks/useVibration';
import useFlashlight from '../hooks/useFlashlight';

function CameraScanner({ onScan }) {
  const [torchOn, setTorchOn] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const vibrate = useVibration();
  const { hasFlashlight, toggleFlashlight } = useFlashlight();

  const handleScan = (result) => {
    if (result) {
      vibrate();
      onScan({ text: result.text });
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner Error:', err);
  };

  const toggleCamera = () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
  };

  const previewStyle = {
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  };

  return (
    <div className="scanner-container">
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={previewStyle}
        facingMode={facingMode}
        torch={torchOn}
        constraints={{
          advanced: [{ zoom: true }],
          focusMode: 'continuous'
        }}
      />
      
      <div className="camera-controls">
        {hasFlashlight && (
          <FlashlightToggle 
            torchOn={torchOn} 
            toggleFlashlight={() => {
              setTorchOn(!torchOn);
              toggleFlashlight();
            }} 
          />
        )}
        <button onClick={toggleCamera} className="switch-camera-btn">
          Switch Camera
        </button>
      </div>
    </div>
  );
}

export default CameraScanner;
