import express from 'express';
import getQueryParams from './utils/getQueryParams';
import { resizeTargetImage } from './utils/covert';
import { fullImageExists } from './utils/fileSystemUtils';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {
  const query = req.query;
  const { filename, width, height, format } = getQueryParams(query);

  // Send 404 if no filename given
  if (filename == '') {
    res.status(404).send('No file name provided');
    return;
  }

  // Send 404 if file not found
  if (!fullImageExists(filename, format)) {
    res.status(404).send('File does not exist');
    return;
  }
  const convertedImage = await resizeTargetImage(
    filename,
    width,
    height,
    format,
  );

  // Handle if conversion failed
  if (convertedImage == '') {
    res.status(500).send('Conversion failed');
    return;
  }

  res.status(200);
  res.sendFile(convertedImage);
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
