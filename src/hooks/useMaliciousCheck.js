import { useState, useEffect } from 'react';
import { isURL, isIP } from 'validator';
import * as securityCheck from '../utils/securityCheck';

function useMaliciousCheck(text) {
  const [isMalicious, setIsMalicious] = useState(false);

  useEffect(() => {
    const checkMalicious = async () => {
      if (!text || !isURL(text, { require_protocol: true }) && !isIP(text)) {
        setIsMalicious(false);
        return;
      }
      
      const malicious = await securityCheck.checkUrlSafety(text);
      setIsMalicious(malicious);
    };

    checkMalicious();
  }, [text]);

  return { isMalicious };
}

export default useMaliciousCheck;
