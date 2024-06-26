import {
  getBaseDirectoryPath,
  getFullImageDirectory,
  getThumbImageDirectory,
  fullImageExists,
  getThumbPath,
  getFullImagePath,
  thumbExists,
} from '../../utils/fileSystemUtils';
import fs from 'fs';
import path from 'path';

describe('fileSystemUtils Suite', () => {
  describe('getBaseDirectoryPath', () => {
    it('should return a valid path', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(fs.existsSync(utilsPath)).toBeTruthy();
    });
    it('should return a string', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(typeof utilsPath).toBe('string');
    });

    it('should contain with "Image-Processing-API"', () => {
      const utilsPath = getBaseDirectoryPath();
      expect(utilsPath.includes('Image-Processing-API')).toBeTruthy();
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

    it('should contain with "full"', () => {
      const fullImageDir = getFullImageDirectory();
      expect(fullImageDir.includes('full')).toBeTruthy();
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

    it('should contain with "thumb"', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(thumbImageDir.includes('thumb')).toBeTruthy();
    });

    it('should be an absolute path', () => {
      const thumbImageDir = getThumbImageDirectory();
      expect(path.isAbsolute(thumbImageDir)).toBeTruthy();
    });
  });

  describe('fullPictureExists', () => {
    it('should return true if the full picture file exists', () => {
      const filename = 'tiger';
      const fullPicturePath = getFullImagePath(filename);
      expect(fullImageExists(filename)).toBe(fs.existsSync(fullPicturePath));
    });
    it('should return false if the full picture file does not exist', () => {
      const filename = 'does_not_exist';
      const fullPicturePath = getFullImagePath(filename);
      expect(fullImageExists(filename)).toBe(fs.existsSync(fullPicturePath));
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
      const fullPicturePath = getFullImagePath(filename);
      expect(fullImageExists(filename)).toBe(fs.existsSync(fullPicturePath));
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
