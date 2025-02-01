import { 
    CVV_MASKING_RULES, 
    CARD_MASKING_RULES, 
    maskCVV, 
    maskCardNumber 
  } from './masking_validation';
  
  describe('CVV Masking', () => {
    it('should not mask CVV when NO_MASKING rule is applied', () => {
      expect(maskCVV('123', CVV_MASKING_RULES.NO_MASKING, true)).toBe('123');
    });
  
    it('should always mask CVV when ALWAYS_MASK_ALL rule is applied', () => {
      expect(maskCVV('123', CVV_MASKING_RULES.ALWAYS_MASK_ALL, true)).toBe('***');
      expect(maskCVV('1234', CVV_MASKING_RULES.ALWAYS_MASK_ALL, false)).toBe('****');
    });
  
    it('should mask CVV on blur and show on focus with BLUR_MASK_ALL rule', () => {
      expect(maskCVV('123', CVV_MASKING_RULES.BLUR_MASK_ALL, true)).toBe('123');
      expect(maskCVV('123', CVV_MASKING_RULES.BLUR_MASK_ALL, false)).toBe('***');
    });
  });
  
  describe('Card Number Masking', () => {
    it('should not mask card number when NO_MASKING rule is applied', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.NO_MASKING, true)).toBe('1234567890123456');
    });
  
    it('should always mask card number when ALWAYS_MASK_ALL rule is applied', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.ALWAYS_MASK_ALL, true)).toBe('****************');
    });
  
    it('should mask card number on blur with BLUR_MASK_ALL rule', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_ALL, true)).toBe('1234567890123456');
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_ALL, false)).toBe('****************');
    });
  
    it('should show last 4 digits with ALWAYS_MASK_EXCEPT_4 rule', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.ALWAYS_MASK_EXCEPT_4, true)).toBe('************3456');
    });
  
    it('should show last 4 digits on focus and mask on blur with BLUR_MASK_EXCEPT_4 rule', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, true)).toBe('1234567890123456');
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_EXCEPT_4, false)).toBe('************3456');
    });
  
    it('should shrink masked part with BLUR_MASK_EXCEPT_SHRINK_4 rule', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_EXCEPT_SHRINK_4, true)).toBe('1234567890123456');
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_EXCEPT_SHRINK_4, false)).toBe('**** **** **** 3456');
    });
  
    it('should fully shrink masked card number on blur with BLUR_MASK_ALL_SHRINK rule', () => {
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_ALL_SHRINK, true)).toBe('1234567890123456');
      expect(maskCardNumber('1234567890123456', CARD_MASKING_RULES.BLUR_MASK_ALL_SHRINK, false)).toBe('**** **** **** ****');
    });
  });