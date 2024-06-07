import fileSystemUtils from '../../utils/fileSystemUtils';
import fs from 'fs';
import path from 'path';

const {
  getBaseDirectoryPath,
  getFullImageDirectory,
  getThumbImageDirectory,
  fullPictureExists,
  getThumbPath,
  getFullPicturePath,
  thumbExists,
} = fileSystemUtils;

describe('File System Utils Suite', () => {
  describe('getBaseDirectoryPath', () => {
    it('should return a valid path', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(fs.existsSync(utilsPath)).toBeTruthy();
    });
    it('should return a string', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(typeof utilsPath).toBe('string');
    });

    it('should end with "Image-Processing-API/"', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(utilsPath.endsWith('Image-Processing-API/')).toBeTruthy();
    });

    it('should be an absolute path', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(path.isAbsolute(utilsPath)).toBeTruthy();
    });
  });

  describe('getFullImageDirectory', () => {
    it('should return a valid path', () => {
      const fullImageDir = getFullImageDirectory();
      expect(fs.existsSync(fullImageDir)).toBeTruthy();
    });

    it('should return a string', () => {
      const fullImageDir = getFullImageDirectory();
      expect(typeof fullImageDir).toBe('string');
    });

    it('should end with "full/"', () => {
      const fullImageDir = getFullImageDirectory();
      expect(fullImageDir.endsWith('full/')).toBeTruthy();
    });

    it('should be an absolute path', () => {
      const fullImageDir = getFullImageDirectory();
      expect(path.isAbsolute(fullImageDir)).toBeTruthy();
    });
  });

  describe('getThumbImageDirectory', () => {
    it('should return a valid path', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(fs.existsSync(thumbImageDir)).toBeTruthy();
    });

    it('should return a string', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(typeof thumbImageDir).toBe('string');
    });

    it('should end with "thumb/"', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(thumbImageDir.endsWith('thumb/')).toBeTruthy();
    });

    it('should be an absolute path', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(path.isAbsolute(thumbImageDir)).toBeTruthy();
    });
  });

  describe('fullPictureExists', () => {
    it('should return true if the full picture file exists', () => {
      const filename = 'tiger';
      const fullPicturePath = getFullPicturePath(filename);
      expect(fullPictureExists(filename)).toBe(fs.existsSync(fullPicturePath));
    });
    it('should return false if the full picture file does not exist', () => {
      const filename = 'does_not_exist';
      const fullPicturePath = getFullPicturePath(filename);
      expect(fullPictureExists(filename)).toBe(fs.existsSync(fullPicturePath));
    });
  });

  describe('getThumbPath', () => {
    it('should return the correct thumbnail image path', () => {
      const thumbImageDir = getThumbImageDirectory();
      const thumbPath = getThumbPath('image', 200, 300, 'jpg');
      expect(thumbPath).toBe(path.join(thumbImageDir, 'image-200x300.jpg'));
    });
  });

  describe('thumbExists', () => {
    it('should return true if the thumb file exists', () => {
      const filename = 'tiger';
      const fullPicturePath = getFullPicturePath(filename);
      expect(fullPictureExists(filename)).toBe(fs.existsSync(fullPicturePath));
    });
    it('should return false if the thumb file does not exist', () => {
      const filename = 'does_not_exist';
      const fullPicturePath = getThumbPath(filename, 200, 300);
      expect(thumbExists(filename, 200, 300)).toBe(
        fs.existsSync(fullPicturePath),
      );
    });
  });
});
