// Add your test code here
import app from '..';
import supertest from 'supertest';
import { getFullImagePath } from '../utils/fileSystemUtils';
import fs from 'fs';

describe('Endpoint Test suite', async () => {
  it('should return a 200 status code and the expected response', async () => {
    const filename = 'tiger';
    const response = await supertest(app)
      .get(`/api/images?filename=${filename}`)
      .expect(200);

    const fullPath = getFullImagePath(filename);
    const fullBuffer = await fs.promises.readFile(fullPath);

    expect(response.body).toEqual(fullBuffer);
  });

  it('should return a 404 status code if file is not available', async () => {
    const filename = 'does-not-exist';
    const response = await supertest(app)
      .get(`/api/images?filename=${filename}`)
      .expect(404);

    expect(response.body).toEqual({});
  });
});
