const expect = require('expect');

const {isRealString} = require('./validators');

describe('isRealString', () => {
   it('should accept valid strings', () => {
      expect(isRealString('mystring')).toBe(true);
      expect(isRealString(' k ')).toBe(true);
   });

   it('should reject empty strings', () => {
      expect(isRealString('  ')).toBe(false);
      expect(isRealString()).toBe(false);
   });

   it('should reject non-string arguments', () => {
      expect(isRealString({})).toBe(false);
      expect(isRealString(3)).toBe(false);
      expect(isRealString(true)).toBe(false);
   });
})