import path from 'path';
import fs from 'fs';

// Get directory paths
const getBaseDirectoryPath = (): string => {
  // Used to make path
  return path.join(__dirname, '../../');
};

const getFullImageDirectory = (): string => {
  return path.join(getBaseDirectoryPath(), '/assets/full/');
};

const getThumbImageDirectory = (): string => {
  return path.join(getBaseDirectoryPath(), '/assets/thumb/');
};

// Get path to specific pictures
const getFullPicturePath = (
  filename: string,
  format: string = 'jpeg',
): string => {
  const fullFilename = filename + '.' + format;
  return path.join(getFullImageDirectory(), fullFilename);
};

const getThumbPath = (
  filename: string,
  width: number,
  height: number,
  format: string = 'jpeg',
): string => {
  const thumbFilename =
    filename + '-' + String(width) + 'x' + String(height) + '.' + format;
  return path.join(getThumbImageDirectory(), thumbFilename);
};

// Check if full picture exist
const fullPictureExists = (
  filename: string,
  format: string = 'jpeg',
): boolean => {
  const fullFilename = filename + '.' + format;
  const filePath = path.join(getFullImageDirectory(), fullFilename);
  return fs.existsSync(filePath);
};

// Check if specific thumb exists
const thumbExists = (
  filename: string,
  width: number,
  height: number,
  format: string = 'jpeg',
): boolean => {
  return fs.existsSync(getThumbPath(filename, width, height, format));
};

export default {
  getBaseDirectoryPath,
  getFullImageDirectory,
  getThumbImageDirectory,
  fullPictureExists,
  getThumbPath,
  getFullPicturePath,
  thumbExists,
};
