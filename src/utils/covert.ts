import fs from 'fs';
import resizeImg, { Formats } from 'resize-img';
import fileSystemUtils from './fileSystemUtils';

const { fullPictureExists, thumbExists, getFullPicturePath, getThumbPath } =
  fileSystemUtils;

const resizeTargetImage = async (
  filename: string,
  width: number | undefined,
  height: number | undefined,
  format: string = 'jpg',
): Promise<string> => {
  // Create relevant paths
  const resizedImagePath = getThumbPath(filename, width, height, format);

  // Handle file not findable
  if (!fullPictureExists(filename, format)) return '';

  // Skip process if file has already been created
  if (thumbExists(filename, width, height, format)) return resizedImagePath;

  const resizedImage = await convertImage(filename, width, height, format);


  fs.writeFileSync(resizedImagePath, resizedImage);


  
  return thumbExists(filename, width, height, format) ? resizedImagePath : '';
};

const convertImage = async (
  filename: string,
  width: number,
  height: number,
  format: string = 'jpg',
): Promise<Buffer> => {
  const fullPicturePath = getFullPicturePath(filename, format);

  const resizedImage = await resizeImg(fs.readFileSync(fullPicturePath), {
    width: Number(width),
    height: Number(height),
    format: format as Formats,
  });

  return resizedImage;
};

export default resizeTargetImage;
