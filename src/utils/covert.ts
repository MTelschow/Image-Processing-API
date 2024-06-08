import fs from 'fs';
import resizeImg, { Formats } from 'resize-img';
import fileSystemUtils from './fileSystemUtils';

interface ResizeImgArgs {
  width?: number;
  height?: number;
  format: Formats;
}

// Destructor fileSystemUtils functions
const { fullPictureExists, thumbExists, getFullPicturePath, getThumbPath } =
  fileSystemUtils;

// Method to handle conversion with
const resizeTargetImage = async (
  filename: string,
  width: number,
  height: number,
  format: string,
): Promise<string> => {
  // Handle file not findable
  if (!fullPictureExists(filename, format)) return '';

  // If no height or width specified return full image
  if (Number.isNaN(width) && Number.isNaN(height)) {
    return getFullPicturePath(filename, format);
  }

  // Create target path
  const resizedImagePath = getThumbPath(filename, width, height, format);

  // Skip process if file has already been created
  if (thumbExists(filename, width, height, format)) return resizedImagePath;

  // Resize image
  const resizedImage = await convertImage(filename, width, height, format);

  // Handle conversion error
  if (resizedImage == undefined) return '';

  // Write file to fs
  fs.writeFileSync(resizedImagePath, resizedImage);

  // Return file path
  return thumbExists(filename, width, height, format) ? resizedImagePath : '';
};

// Function to do conversion step
const convertImage = async (
  filename: string,
  width: number,
  height: number,
  format: string,
): Promise<Buffer | undefined> => {
  // Get filepath
  const fullPicturePath = getFullPicturePath(filename, format);

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
  try {
    console.log(`resizeImg(fs.readFileSync(${fullPicturePath}, ${resizeImgArgs});`)
    const resizedImage = await resizeImg(
      fs.readFileSync(fullPicturePath),
      resizeImgArgs,
    );

    return resizedImage;
  } catch (error) {
    // Handle fail in conversion step
    return undefined;
  }

};

export default resizeTargetImage;
