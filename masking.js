// Masking Rules Constants
const CVV_MASKING_RULES = {
    NO_MASKING: 'NO_MASKING',
    ALWAYS_MASK_ALL: 'ALWAYS_MASK_ALL',
    BLUR_MASK_ALL: 'BLUR_MASK_ALL',
  };
  
  const CARD_MASKING_RULES = {
    NO_MASKING: 'NO_MASKING',
    ALWAYS_MASK_ALL: 'ALWAYS_MASK_ALL',
    BLUR_MASK_ALL: 'BLUR_MASK_ALL',
    ALWAYS_MASK_EXCEPT_4: 'ALWAYS_MASK_EXCEPT_4',
    BLUR_MASK_EXCEPT_4: 'BLUR_MASK_EXCEPT_4',
    BLUR_MASK_EXCEPT_SHRINK_4: 'BLUR_MASK_EXCEPT_SHRINK_4',
    BLUR_MASK_ALL_SHRINK: 'BLUR_MASK_ALL_SHRINK',
  };
  
  // Masking Functions
  function maskCVV(value, rule, isFocused) {
    switch (rule) {
      case CVV_MASKING_RULES.ALWAYS_MASK_ALL:
        return '*'.repeat(value.length);
      case CVV_MASKING_RULES.BLUR_MASK_ALL:
        return isFocused ? value : '*'.repeat(value.length);
      default:
        return value;
    }
  }
  
  function maskCardNumber(value, rule, isFocused) {
    const cleanValue = value.replace(/\D/g, ''); // Remove non-digit characters
  
    switch (rule) {
      case CARD_MASKING_RULES.ALWAYS_MASK_ALL:
        return '*'.repeat(cleanValue.length);
      case CARD_MASKING_RULES.BLUR_MASK_ALL:
        return isFocused ? cleanValue : '*'.repeat(cleanValue.length);
      case CARD_MASKING_RULES.ALWAYS_MASK_EXCEPT_4:
        return '*'.repeat(cleanValue.length - 4) + cleanValue.slice(-4);
      case CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4:
        return isFocused ? cleanValue : '*'.repeat(cleanValue.length - 4) + cleanValue.slice(-4);
      case CARD_MASKING_RULES.BLUR_MASK_EXCEPT_SHRINK_4:
        return isFocused 
          ? cleanValue 
          : '**** **** **** ' + cleanValue.slice(-4);
      case CARD_MASKING_RULES.BLUR_MASK_ALL_SHRINK:
        return isFocused ? cleanValue : '**** **** **** ****';
      default:
        return cleanValue;
    }
  }
  
  // Event Handlers
  function handleInput(event, rule, maskFunc, isFocused) {
    const value = event.target.value;
    event.target.value = maskFunc(value, rule, isFocused);
  }
  
  function handleFocus(event, rule, maskFunc) {
    handleInput(event, rule, maskFunc, true);
  }
  
  function handleBlur(event, rule, maskFunc) {
    handleInput(event, rule, maskFunc, false);
  }
  
  // Example Usage
  document.getElementById('cvv').addEventListener('focus', (e) => handleFocus(e, CVV_MASKING_RULES.BLUR_MASK_ALL, maskCVV));
  document.getElementById('cvv').addEventListener('blur', (e) => handleBlur(e, CVV_MASKING_RULES.BLUR_MASK_ALL, maskCVV));
  
  document.getElementById('card-number').addEventListener('focus', (e) => handleFocus(e, CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, maskCardNumber));
  document.getElementById('card-number').addEventListener('blur', (e) => handleBlur(e, CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, maskCardNumber));
  