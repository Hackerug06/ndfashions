// Simple vCard parser
export const parseVCard = (text) => {
  const lines = text.split('\n');
  const result = {
    firstName: '',
    lastName: '',
    cellPhone: '',
    email: ''
  };

  lines.forEach(line => {
    if (line.startsWith('FN:')) {
      const names = line.substring(3).split(' ');
      result.firstName = names[0] || '';
      result.lastName = names.slice(1).join(' ') || '';
    } else if (line.startsWith('TEL;') && line.includes('CELL')) {
      result.cellPhone = line.split(':')[1] || '';
    } else if (line.startsWith('EMAIL;')) {
      result.email = line.split(':')[1] || '';
    }
  });

  return result;
};

// Updated detectQrType
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
  
  return 'text';
};

// Updated formatResultText for vCard
export const formatResultText = (text, type) => {
  switch(type) {
    case 'wifi':
      return parseWifi(text);
    case 'vcard':
      const vcard = parseVCard(text);
      return `Name: ${vcard.firstName} ${vcard.lastName}\nPhone: ${vcard.cellPhone}\nEmail: ${vcard.email}`;
    // ... rest of your existing cases
  }
};

// Simple WiFi parser
const parseWifi = (text) => {
  const parts = text.split(';');
  const result = {
    ssid: '',
    password: '',
    security: 'nopass'
  };

  parts.forEach(part => {
    if (part.startsWith('S:')) {
      result.ssid = part.substring(2);
    } else if (part.startsWith('P:')) {
      result.password = part.substring(2);
    } else if (part.startsWith('T:')) {
      result.security = part.substring(2);
    }
  });

  return `Network: ${result.ssid}\nPassword: ${result.password || 'Open'}\nSecurity: ${result.security}`;
};
