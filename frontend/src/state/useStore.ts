import { create } from 'zustand';
import type { SlideConfig, GeneratedSlide, JobStatusValue } from '../api/types';

type Store = {
  configSlides: SlideConfig[];
  jobId: string | null;
  jobStatus: JobStatusValue;
  generatedSlides: GeneratedSlide[];
  finalVideoUrl: string | null;
  setConfigSlides: (slides: SlideConfig[]) => void;
  setJob: (id: string | null, status: JobStatusValue) => void;
  setGeneratedSlides: (slides: GeneratedSlide[]) => void;
  toggleSlide: (type: SlideConfig['type']) => void;
  reorderSlides: (from: number, to: number) => void;
  setFinalVideoUrl: (url: string | null) => void;
};

const defaults: SlideConfig[] = [
  { type: 'day', enabled: true, duration: 6 },
  { type: 'nameday', enabled: true, duration: 6 },
  { type: 'disrupt', enabled: false, duration: 8 },
  { type: 'news', enabled: true, duration: 6, count: 1 },
  { type: 'fact', enabled: true, duration: 6 },
  { type: 'ad1', enabled: true, duration: 6 },
  { type: 'ad2', enabled: false, duration: 6 },
];

export const useStore = create<Store>((set) => ({
  configSlides: defaults,
  jobId: null,
  jobStatus: 'pending',
  generatedSlides: [],
  finalVideoUrl: null,
  setConfigSlides: (slides) => set({ configSlides: slides }),
  setJob: (id, status) => set({ jobId: id, jobStatus: status }),
  setGeneratedSlides: (slides) => set({ generatedSlides: slides }),
  toggleSlide: (type) =>
    set((state) => ({
      configSlides: state.configSlides.map((s) =>
        s.type === type ? { ...s, enabled: !s.enabled } : s
      ),
    })),
  reorderSlides: (from, to) =>
    set((state) => {
      const arr = [...state.configSlides];
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      return { configSlides: arr };
    }),
  setFinalVideoUrl: (url) => set({ finalVideoUrl: url }),
}));
