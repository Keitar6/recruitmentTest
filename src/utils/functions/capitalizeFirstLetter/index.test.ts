import { capitalizeFirstLetter } from '.';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    expect(capitalizeFirstLetter('test')).toBe('Test');
  });

  it('should not affect the rest of the string', () => {
    expect(capitalizeFirstLetter('test String')).toBe('Test String');
  });

  it('should return an empty string when given an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('should not modify strings that start with a number', () => {
    expect(capitalizeFirstLetter('1st')).toBe('1st');
  });

  it('should capitalize the first letter after leading spaces', () => {
    expect(capitalizeFirstLetter(' test')).toBe(' test');
  });

  it('should handle strings that start with a special character', () => {
    expect(capitalizeFirstLetter('$test')).toBe('$test');
  });

  it('should not modify strings that are already capitalized', () => {
    expect(capitalizeFirstLetter('Test')).toBe('Test');
  });
});
