import { resizeTargetImage, convertImage } from '../../utils/covert';
import { getFullImagePath, getThumbPath } from '../../utils/fileSystemUtils';

describe('convertImage suite', () => {
  describe('resizeTargetImage', () => {
    it("should return '' if image doesn't exist", async () => {
      const output = await resizeTargetImage('does-not-exist', 200, 200, 'jpg');
      expect(output).toBe('');
    });

    it('should return full image path if width and height NaN', async () => {
      const filename = 'tiger';
      const format = 'jpg';
      const output = await resizeTargetImage(filename, NaN, NaN, format);
      expect(output).toBe(getFullImagePath(filename, format));
    });
    it('should return correct thumb image path', async () => {
      const filename = 'tiger';
      const format = 'jpg';
      const width = 300;
      const height = 200;
      const output = await resizeTargetImage(filename, width, height, format);
      expect(output).toBe(getThumbPath(filename, width, height, format));
    });
    it("should return '' if conversion fails", async () => {
      const output = await resizeTargetImage(
        'does-not-exist',
        -200,
        -200,
        'jpg',
      );
      expect(output).toBe('');
    });
  });
  describe('convertImage', () => {
    it('should convert image correctly', async () => {
      const filename = 'tiger';
      const format = 'jpg';
      const width = 300;
      const height = 200;
      const output = await convertImage(filename, width, height, format);

      expect(output).toBeInstanceOf(Buffer);
    });
  });
});
