import wifiParser from 'wifi-qr-code-parser';
import { parse } from 'vcard-parser';

export const detectQrType = (text) => {
  if (!text) return 'text';
  
  // Check for URLs
  try {
    new URL(text);
    return 'url';
  } catch (e) {}
  
  // Check for WiFi
  if (text.startsWith('WIFI:') || text.startsWith('wifi:')) {
    return 'wifi';
  }
  
  // Check for vCard
  if (text.startsWith('BEGIN:VCARD')) {
    return 'vcard';
  }
  
  // Check for payment URIs
  if (text.startsWith('bitcoin:') || 
      text.startsWith('ethereum:') || 
      text.startsWith('upi:')) {
    return 'payment';
  }
  
  // Default to text
  return 'text';
};

export const formatResultText = (text, type) => {
  switch(type) {
    case 'wifi':
      try {
        const wifi = wifiParser(text);
        return `Network: ${wifi.ssid}\nPassword: ${wifi.password || 'Open'}\nSecurity: ${wifi.security}`;
      } catch {
        return text;
      }
    case 'vcard':
      try {
        const vcard = parse(text);
        return `Name: ${vcard.firstName} ${vcard.lastName}\nPhone: ${vcard.cellPhone || vcard.homePhone}\nEmail: ${vcard.email}`;
      } catch {
        return text;
      }
    case 'url':
      return `URL: ${text}`;
    case 'payment':
      return `Payment Request: ${text}`;
    default:
      return text;
  }
};

export const getActionLabel = (type) => {
  switch(type) {
    case 'wifi': return 'Connect to WiFi';
    case 'url': return 'Open Website';
    case 'vcard': return 'Save Contact';
    case 'payment': return 'Make Payment';
    default: return 'Copy Text';
  }
};

export const handleQrAction = (text, type) => {
  switch(type) {
    case 'wifi':
      handleWifiConnection(text);
      break;
    case 'url':
      window.open(text, '_blank', 'noopener,noreferrer');
      break;
    case 'vcard':
      handleVCard(text);
      break;
    case 'payment':
      handlePayment(text);
      break;
    default:
      navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
  }
};

const handleWifiConnection = (text) => {
  try {
    const wifi = wifiParser(text);
    if (navigator.connection && navigator.connection.type === 'wifi') {
      // This is just a simulation - actual WiFi connection requires platform-specific APIs
      alert(`Connecting to WiFi network: ${wifi.ssid}`);
    } else {
      alert(`WiFi credentials:\nSSID: ${wifi.ssid}\nPassword: ${wifi.password || 'Open'}`);
    }
  } catch (err) {
    alert('Could not parse WiFi credentials');
  }
};

const handleVCard = (text) => {
  try {
    const vcard = parse(text);
    // In a real app, you would use the Contacts API or similar
    alert(`Contact details:\nName: ${vcard.firstName} ${vcard.lastName}\nPhone: ${vcard.cellPhone}\nEmail: ${vcard.email}`);
  } catch (err) {
    alert('Could not parse contact information');
  }
};

const handlePayment = (text) => {
  // This would open the appropriate payment app
  if (text.startsWith('upi:')) {
    window.location.href = text;
  } else {
    alert(`Payment request: ${text}`);
  }
};
