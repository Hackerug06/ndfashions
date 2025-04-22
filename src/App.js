import React, { useState, useEffect } from 'react';
import CameraScanner from './components/CameraScanner';
import ScanResultActions from './components/ScanResultActions';
import MaliciousLinkWarning from './components/MaliciousLinkWarning';
import ReviewPrompt from './components/ReviewPrompt';
import './App.css';

function App() {
  const [scanResult, setScanResult] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [appOpenedCount, setAppOpenedCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('appOpenedCount') || 0;
    const newCount = parseInt(count) + 1;
    setAppOpenedCount(newCount);
    localStorage.setItem('appOpenedCount', newCount);

    if (newCount % 5 === 0) {
      setShowReviewPrompt(true);
    }
  }, []);

  const handleScan = (result) => {
    if (result) {
      setScanResult(result);
    }
  };

  return (
    <div className="app">
      <h1>QR Code Scanner</h1>
      
      {!scanResult ? (
        <CameraScanner onScan={handleScan} />
      ) : (
        <div className="result-container">
          <ScanResultActions 
            result={scanResult} 
            onNewScan={() => setScanResult(null)}
            setShowWarning={setShowWarning}
          />
        </div>
      )}
      
      {showWarning && (
        <MaliciousLinkWarning 
          onClose={() => setShowWarning(false)} 
          onProceed={() => setShowWarning(false)} 
        />
      )}
      
      {showReviewPrompt && (
        <ReviewPrompt onClose={() => setShowReviewPrompt(false)} />
      )}
    </div>
  );
}

export default App;
