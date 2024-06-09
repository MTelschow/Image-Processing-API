import express from 'express';
import { getQueryParams, validateQueryParams } from './utils/queryUtils';
import { resizeTargetImage } from './utils/covert';

const app = express();
const port = 3000;

app.get('/api/images', async (req, res) => {
  const query = req.query;

  // Send an error if Params are invalid
  const invalidQueryReason = validateQueryParams(query);
  if (invalidQueryReason !== '') {
    res.status(404).send(invalidQueryReason);
    return;
  }

  const { filename, width, height, format } = getQueryParams(query);

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
