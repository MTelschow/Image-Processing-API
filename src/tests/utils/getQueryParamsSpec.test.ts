import getQueryParams from '../../utils/getQueryParams';
import defaultValues from '../../utils/defaultValues';
const { DEFAULT_FILENAME, DEFAULT_FORMAT } = defaultValues;

describe('GetQueryParams Suite', () => {
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
