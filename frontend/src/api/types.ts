export type SlideType =
  | 'day'
  | 'nameday'
  | 'disrupt'
  | 'news'
  | 'fact'
  | 'ad1'
  | 'ad2';

export interface SlideConfig {
  type: SlideType;
  enabled: boolean;
  duration: number; // seconds
  count?: number; // optional (news articles to include)
}

export interface GenerateRequest {
  date: string; // ISO yyyy-mm-dd
  resolution: string; // '1080x1920'
  slides: SlideConfig[];
  lang: string; // 'pl'
}

export interface GeneratedSlide {
  type: SlideType;
  png_url: string;
  duration: number;
}

export type JobStatusValue =
  | 'pending'
  | 'rendering'
  | 'ready'
  | 'building'
  | 'complete'
  | 'error';

export interface JobStatusResponse {
  job_id: string;
  status: JobStatusValue;
  slides?: GeneratedSlide[];
  mp4_url?: string;
  message?: string;
}
