import { useEffect } from 'react';

function useVibration() {
  const vibrate = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200); // Vibrate for 200ms
    }
    
    // Fallback: Play beep sound
    const beep = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
    beep.play().catch(e => console.log('Audio play failed:', e));
  };

  return vibrate;
}

export default useVibration;
