import { ParsedQs } from 'qs';
import { DEFAULT_FILENAME, DEFAULT_FORMAT } from './defaultValues';
import { fullImageExists } from './fileSystemUtils';

interface RequestParams {
  filename: string;
  width: number;
  height: number;
  format: string;
}

// Sets every missing value to its default value
const getQueryParams = (query: ParsedQs): RequestParams => {
  const filename: string = query.filename
    ? (query.filename as string)
    : DEFAULT_FILENAME;

  const format: string = query.format
    ? (query.format as string)
    : DEFAULT_FORMAT;

  //Convert width and height to number
  const width = Number(query.width);
  const height = Number(query.height);

  return {
    filename,
    width,
    height,
    format,
  };
};

// Detects if params are invalid and return corresponding error message
const validateQueryParams = (query: ParsedQs): string => {
  const FORMATS = ['bmp', 'jpg', 'png'];
  const filename: string = query.filename
    ? (query.filename as string)
    : DEFAULT_FILENAME;

  const format: string = query.format
    ? (query.format as string)
    : DEFAULT_FORMAT;

  //Convert width and height to number
  const width = Number(query.width);
  const height = Number(query.height);

  // No filename given
  if (filename === '') return 'No filename provided';

  // Unsupported format
  if (query.format !== undefined && !FORMATS.includes(format))
    return 'Format is not supported';

  // File not found
  if (!fullImageExists(filename, format)) return 'File does not exist';

  // Height is invalid
  if (query.width !== undefined) {
    if (Number.isNaN(width)) return 'Width must be a number';
    if (width <= 0) return 'Width must be a positive number';
  }

  // Height not a number
  if (query.height !== undefined) {
    if (Number.isNaN(height)) return 'Height must be a number';
    if (height <= 0) return 'Height must be a positive number';
  }

  return '';
};

export { getQueryParams, validateQueryParams };
