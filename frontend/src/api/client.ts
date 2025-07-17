import type { GenerateRequest, JobStatusResponse, GeneratedSlide } from './types';

const BASE = import.meta.env.VITE_N8N_BASE_URL ?? 'http://localhost:5678';
const GENERATE_PATH = import.meta.env.VITE_N8N_GENERATE_PATH ?? '/webhook/signage-generate';
const STATUS_PATH = import.meta.env.VITE_N8N_STATUS_PATH ?? '/webhook/signage-status';
const BUILD_PATH = import.meta.env.VITE_N8N_BUILD_PATH ?? '/webhook/signage-build';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json() as Promise<T>;
}

export function generateSlides(payload: GenerateRequest): Promise<JobStatusResponse> {
  return request<JobStatusResponse>(GENERATE_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getJobStatus(jobId: string): Promise<JobStatusResponse> {
  const url = `${STATUS_PATH}?id=${encodeURIComponent(jobId)}`;
  return request<JobStatusResponse>(url);
}

export function buildJob(jobId: string, slides: GeneratedSlide[]): Promise<JobStatusResponse> {
  return request<JobStatusResponse>(BUILD_PATH, {
    method: 'POST',
    body: JSON.stringify({ job_id: jobId, slides }),
  });
}
