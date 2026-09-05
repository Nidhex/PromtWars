import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

describe('Backend API Endpoints', () => {
  it('GET /api/health returns 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('service', 'ai-project-mentor-backend');
  });

  it('POST /api/projects/generate returns 400 for invalid payload', async () => {
    const res = await request(app).post('/api/projects/generate').send({ experienceLevel: 'invalid_level' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('Invalid request input format');
  });
});
