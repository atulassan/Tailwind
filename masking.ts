// Masking Rules Constants
enum CVV_MASKING_RULES {
    NO_MASKING = 'NO_MASKING',
    ALWAYS_MASK_ALL = 'ALWAYS_MASK_ALL',
    BLUR_MASK_ALL = 'BLUR_MASK_ALL',
  }
  
  enum CARD_MASKING_RULES {
    NO_MASKING = 'NO_MASKING',
    ALWAYS_MASK_ALL = 'ALWAYS_MASK_ALL',
    BLUR_MASK_ALL = 'BLUR_MASK_ALL',
    ALWAYS_MASK_EXCEPT_4 = 'ALWAYS_MASK_EXCEPT_4',
    BLUR_MASK_EXCEPT_4 = 'BLUR_MASK_EXCEPT_4',
    BLUR_MASK_EXCEPT_SHRINK_4 = 'BLUR_MASK_EXCEPT_SHRINK_4',
    BLUR_MASK_ALL_SHRINK = 'BLUR_MASK_ALL_SHRINK',
  }
  
  // Masking Functions
  function maskCVV(value: string, rule: CVV_MASKING_RULES, isFocused: boolean): string {
    switch (rule) {
      case CVV_MASKING_RULES.ALWAYS_MASK_ALL:
        return '*'.repeat(value.length);
      case CVV_MASKING_RULES.BLUR_MASK_ALL:
        return isFocused ? value : '*'.repeat(value.length);
      default:
        return value;
    }
  }
  
  function maskCardNumber(value: string, rule: CARD_MASKING_RULES, isFocused: boolean): string {
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
  function handleInput(
    event: Event,
    rule: CVV_MASKING_RULES | CARD_MASKING_RULES,
    maskFunc: (value: string, rule: any, isFocused: boolean) => string,
    isFocused: boolean
  ): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    target.value = maskFunc(value, rule, isFocused);
  }
  
  function handleFocus(
    event: FocusEvent,
    rule: CVV_MASKING_RULES | CARD_MASKING_RULES,
    maskFunc: (value: string, rule: any, isFocused: boolean) => string
  ): void {
    handleInput(event, rule, maskFunc, true);
  }
  
  function handleBlur(
    event: FocusEvent,
    rule: CVV_MASKING_RULES | CARD_MASKING_RULES,
    maskFunc: (value: string, rule: any, isFocused: boolean) => string
  ): void {
    handleInput(event, rule, maskFunc, false);
  }
  
  // Example Usage
  const cvvInput = document.getElementById('cvv') as HTMLInputElement;
  const cardNumberInput = document.getElementById('card-number') as HTMLInputElement;
  
  cvvInput.addEventListener('focus', (e) => handleFocus(e, CVV_MASKING_RULES.BLUR_MASK_ALL, maskCVV));
  cvvInput.addEventListener('blur', (e) => handleBlur(e, CVV_MASKING_RULES.BLUR_MASK_ALL, maskCVV));
  
  cardNumberInput.addEventListener('focus', (e) => handleFocus(e, CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, maskCardNumber));
  cardNumberInput.addEventListener('blur', (e) => handleBlur(e, CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, maskCardNumber));
  