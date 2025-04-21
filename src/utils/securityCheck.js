// This would typically make API calls to a backend service that checks URL safety
// For demo purposes, we're using a simple heuristic check

const maliciousDomains = ['evil.com', 'phishing.site', 'malware.download'];
const maliciousKeywords = ['login', 'password', 'account', 'bank', 'paypal'];

export const checkUrlSafety = async (url) => {
  // In a real app, you would:
  // 1. Check against Google Safe Browsing API
  // 2. Check against VirusTotal
  // 3. Check against internal blacklists
  
  // Simple heuristic for demo:
  try {
    const domain = new URL(url).hostname;
    return maliciousDomains.some(d => domain.includes(d)) || 
           maliciousKeywords.some(k => url.toLowerCase().includes(k));
  } catch {
    return false;
  }
};
