import path from 'path';
import fs from 'fs';

// Get base directory paths
const getBaseDirectoryPath = (): string => {
  return path.join(__dirname, '../../');
};

// Get path to full images
const getFullImageDirectory = (): string => {
  return path.join(getBaseDirectoryPath(), '/assets/full/');
};

// Get path to thumb images and create it if not there
const getThumbImageDirectory = (): string => {
  const thumbPath = path.join(getBaseDirectoryPath(), '/assets/thumb/');
  // Create path if it doesn't exist
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }
  return thumbPath;
};

// Get path to specific full image
const getFullImagePath = (filename: string, format: string = 'jpg'): string => {
  const fullFilename = filename + '.' + format;
  return path.join(getFullImageDirectory(), fullFilename);
};

// Get path to specific thumb image
const getThumbPath = (
  filename: string,
  width: number,
  height: number,
  format: string = 'jpg',
): string => {
  const thumbFilename =
    filename + '-' + String(width) + 'x' + String(height) + '.' + format;
  return path.join(getThumbImageDirectory(), thumbFilename);
};

// Check if full image exist
const fullImageExists = (filename: string, format: string = 'jpg'): boolean => {
  const fullFilename = filename + '.' + format;
  const filePath = path.join(getFullImageDirectory(), fullFilename);
  return fs.existsSync(filePath);
};

// Check if specific thumb image exists
const thumbExists = (
  filename: string,
  width: number,
  height: number,
  format: string = 'jpg',
): boolean => {
  return fs.existsSync(getThumbPath(filename, width, height, format));
};

export default {
  getBaseDirectoryPath,
  getFullImageDirectory,
  getThumbImageDirectory,
  fullPictureExists: fullImageExists,
  getThumbPath,
  getFullPicturePath: getFullImagePath,
  thumbExists,
};
