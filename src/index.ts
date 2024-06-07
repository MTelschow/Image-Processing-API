import express from 'express';
import resizeTargetImage from './utils/covert';

const app = express();

app.get('/api/images', (req, res) => {
  const query = req.query;
  const filename = query.filename as string;
  const width = query.width as unknown as number;
  const height = query.height as unknown as number;
  if (filename && height && width) {
    resizeTargetImage(filename, width, height);
  }

  res.status(200);
  res.send();
});

const port = 3000;

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
