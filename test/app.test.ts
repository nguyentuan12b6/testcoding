import request from 'supertest';
import app from '../src/config/app';

describe('GET /', () => {
  it('response with "OKE"', async () => {
    const response = await request(app).get('/api/health-check');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OKE');
  });
});
