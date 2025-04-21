import { useState, useEffect } from 'react';

function useFlashlight() {
  const [hasFlashlight, setHasFlashlight] = useState(false);

  useEffect(() => {
    // Check if browser supports flashlight
    if (navigator.mediaDevices && 
        navigator.mediaDevices.getUserMedia && 
        'torch' in MediaTrackCapabilities.prototype) {
      setHasFlashlight(true);
    }
  }, []);

  const toggleFlashlight = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          advanced: [{ torch: true }]
        }
      });
      const track = stream.getVideoTracks()[0];
      await track.applyConstraints({
        advanced: [{ torch: !track.getSettings().torch }]
      });
    } catch (err) {
      console.error('Error toggling flashlight:', err);
    }
  };

  return { hasFlashlight, toggleFlashlight };
}

export default useFlashlight;
