import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import { mentorChatRequestSchema } from '../schemas/mentorSchema.js';
import { buildMentorPrompt } from '../services/mentorService.js';

describe('Mentor Zod Schema Validation', () => {
  it('validates a valid mentor chat payload', () => {
    const payload = {
      project: {
        title: 'MedAssist AI',
        domain: 'Healthcare & MedTech',
      },
      message: 'Explain the system architecture',
    };

    const result = mentorChatRequestSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('rejects empty user message', () => {
    const payload = {
      message: '',
    };

    const result = mentorChatRequestSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  it('rejects oversized user message', () => {
    const payload = {
      message: 'a'.repeat(2500),
    };

    const result = mentorChatRequestSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });
});

describe('Mentor Prompt Builder', () => {
  it('constructs system instruction and prompt containing project context', () => {
    const parsed = mentorChatRequestSchema.parse({
      project: {
        title: 'CyberSentinel',
        domain: 'Cybersecurity',
        techStack: { frontend: ['React'], backend: ['FastAPI'] },
      },
      blueprint: {
        architecturePattern: 'Microservices with Kafka',
      },
      studentContext: {
        experienceLevel: 'intermediate',
        duration: '3 months',
      },
      message: 'What should I build first?',
    });

    const { systemInstruction, userPrompt } = buildMentorPrompt(parsed);

    expect(systemInstruction).toContain('Senior AI & Software Engineering Mentor');
    expect(userPrompt).toContain('CyberSentinel');
    expect(userPrompt).toContain('Microservices with Kafka');
    expect(userPrompt).toContain('What should I build first?');
  });
});

describe('POST /api/mentor/chat Endpoint', () => {
  it('returns 200 OK with valid chat response', async () => {
    const res = await request(app)
      .post('/api/mentor/chat')
      .send({
        project: {
          title: 'EduSmart AI',
          domain: 'EdTech & Learning',
        },
        message: 'How do I reduce scope for a 2-month timeline?',
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('reply');
    expect(typeof res.body.data.reply).toBe('string');
  });

  it('returns 400 Bad Request for empty message', async () => {
    const res = await request(app).post('/api/mentor/chat').send({ message: '' });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
