import { getQueryParams, validateQueryParams } from '../../utils/queryUtils';
import { DEFAULT_FILENAME, DEFAULT_FORMAT } from '../../utils/defaultValues';

describe('queryUtils Suite', () => {
  describe('getQueryParams', () => {
    it('should return a default object when there are no query parameters', () => {
      const input = {};
      const output = getQueryParams(input);

      expect(output).toEqual({
        filename: DEFAULT_FILENAME,
        format: DEFAULT_FORMAT,
        width: NaN,
        height: NaN,
      });
    });

    it('should return object with correct width and height', () => {
      const input = {
        width: '800',
        height: '600',
      };
      const output = getQueryParams(input);
      expect(output).toEqual({
        filename: DEFAULT_FILENAME,
        format: DEFAULT_FORMAT,
        width: 800,
        height: 600,
      });
    });
    it('should return object with correct filename', () => {
      const input = {
        filename: 'image',
      };
      const output = getQueryParams(input);
      expect(output).toEqual({
        filename: 'image',
        format: DEFAULT_FORMAT,
        width: NaN,
        height: NaN,
      });
    });

    it('should return object with correct format', () => {
      const input = {
        format: 'png',
      };
      const output = getQueryParams(input);
      expect(output).toEqual({
        filename: DEFAULT_FILENAME,
        format: 'png',
        width: NaN,
        height: NaN,
      });
    });
  });
  describe('validateQueryParams', () => {
    it("should return '' if no error", () => {
      const input = {
        filename: 'tiger',
        width: '300',
        height: '200',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe('');
    });
    it("should return '' even if no height or width provided", () => {
      const input = {
        filename: 'tiger',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe('');
    });
    it("should return '' even if no format provided", () => {
      const input = {
        filename: 'tiger',
      };
      expect(validateQueryParams(input)).toBe('');
    });
    it('should return error message if no filename provided', () => {
      const input = {};
      expect(validateQueryParams(input)).toBe('No filename provided');
    });
    it('should return error message if unsupported format provided', () => {
      const input = {
        filename: 'tiger',
        format: 'jpeg',
      };
      expect(validateQueryParams(input)).toBe('Format is not supported');
    });
    it('should return error message if file not found', () => {
      const input = {
        filename: 'does-not-exist',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe('File does not exist');
    });
    it('should return error message if width is not a number', () => {
      const input = {
        filename: 'tiger',
        width: 'abc',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe('Width must be a number');
    });
    it('should return error message if width is less than 1', () => {
      const input = {
        filename: 'tiger',
        width: '0',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe(
        'Width must be a positive number',
      );
    });
    it('should return error message if height is not a number', () => {
      const input = {
        filename: 'tiger',
        height: 'abc',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe('Height must be a number');
    });
    it('should return error message if height is less than 1', () => {
      const input = {
        filename: 'tiger',
        height: '0',
        format: 'jpg',
      };
      expect(validateQueryParams(input)).toBe(
        'Height must be a positive number',
      );
    });
  });
});
