import {
  DEFAULT_FILENAME,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_FORMAT,
} from '../../utils/defaultValues';

describe('defaultValues suite', () => {
  it('default filename should be a string', () => {
    expect(DEFAULT_FILENAME).toBeInstanceOf(String);
  });

  it('default width should be a number', () => {
    expect(DEFAULT_WIDTH).toBeInstanceOf(Number);
  });

  it('default height should be a number', () => {
    expect(DEFAULT_HEIGHT).toBeInstanceOf(Number);
  });

  it('default format should be a valid, supported format', () => {
    expect(DEFAULT_FORMAT).toMatch(/^(png|jpg|bmp)$/);
  });
});
