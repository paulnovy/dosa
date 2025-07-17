import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  generateSlides,
  getJobStatus,
  buildJob,
} from '../api/client';
import type { GenerateRequest, GeneratedSlide } from '../api/types';

const BASE = 'http://localhost:5678';
const GEN_PATH = '/webhook/signage-generate';
const STATUS_PATH = '/webhook/signage-status';
const BUILD_PATH = '/webhook/signage-build';

vi.stubGlobal('fetch', vi.fn());

const okResponse = (data: any) =>
  Promise.resolve({ ok: true, json: () => data });

beforeEach(() => {
  (fetch as unknown as vi.Mock).mockReset();
});

describe('api client', () => {
  it('calls generate endpoint', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValue(okResponse({}));
    const payload: GenerateRequest = {
      date: '2024-01-01',
      resolution: '1080x1920',
      slides: [],
      lang: 'pl',
    };
    await generateSlides(payload);
    expect(fetch).toHaveBeenCalledWith(`${BASE}${GEN_PATH}`, expect.any(Object));
  });

  it('calls status endpoint with job_id', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValue(okResponse({}));
    await getJobStatus('abc');
    expect(fetch).toHaveBeenCalledWith(
      `${BASE}${STATUS_PATH}?job_id=abc`,
      expect.any(Object),
    );
  });

  it('calls build endpoint', async () => {
    (fetch as unknown as vi.Mock).mockResolvedValue(okResponse({}));
    const slides: GeneratedSlide[] = [];
    await buildJob('xyz', slides);
    expect(fetch).toHaveBeenCalledWith(`${BASE}${BUILD_PATH}`, expect.any(Object));
  });
});
