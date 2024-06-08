import fs from 'fs';
import resizeImg, { Formats } from 'resize-img';
import {
  fullImageExists,
  getFullImagePath,
  thumbExists,
  getThumbPath,
} from './fileSystemUtils';

interface ResizeImgArgs {
  width?: number;
  height?: number;
  format: Formats;
}

// Method to handle conversion with
const resizeTargetImage = async (
  filename: string,
  width: number,
  height: number,
  format: string,
): Promise<string> => {
  // Handle file not findable
  if (!fullImageExists(filename, format)) return '';

  // If no height or width specified return full image
  if (Number.isNaN(width) && Number.isNaN(height)) {
    return getFullImagePath(filename, format);
  }

  // Create target path
  const resizedImagePath = getThumbPath(filename, width, height, format);

  // Skip process if file has already been created
  if (thumbExists(filename, width, height, format)) return resizedImagePath;

  // Try to resize image
  try {
    // Resize image
    const resizedImage = await convertImage(filename, width, height, format);

    // Write file to fs
    fs.writeFileSync(resizedImagePath, resizedImage);

    // Return file path
    return thumbExists(filename, width, height, format) ? resizedImagePath : '';
  } catch (error) {
    // Handle conversion error
    console.error('Error converting image:', error);
    return '';
  }
};

// Function to do conversion step
const convertImage = async (
  filename: string,
  width: number,
  height: number,
  format: string,
): Promise<Buffer> => {
  // Get filepath
  const fullPicturePath = getFullImagePath(filename, format);

  // Create args variable for resizeImg()
  const resizeImgArgs: ResizeImgArgs = {
    format: format as Formats,
  };

  // Set width/height if not Nan
  if (!Number.isNaN(width)) {
    resizeImgArgs.width = width;
  }
  if (!Number.isNaN(height)) {
    resizeImgArgs.height = height;
  }
  // Try Conversion
  const resizedImage = await resizeImg(
    fs.readFileSync(fullPicturePath),
    resizeImgArgs,
  );

  return resizedImage;
};

export { resizeTargetImage, convertImage };
