import { ParsedQs } from 'qs';
import { DEFAULT_FILENAME, DEFAULT_FORMAT } from './defaultValues';

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

export default getQueryParams;
