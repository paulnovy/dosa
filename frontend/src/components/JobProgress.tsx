import { useEffect } from 'react';
import { getJobStatus } from '../api/client';
import { useStore } from '../state/useStore';
import { getPlaceholderMp4, getPlaceholderPng } from '../mocks/placeholder';

interface Props {
  target: 'ready' | 'complete';
}

export default function JobProgress({ target }: Props) {
  const {
    jobId,
    setJob,
    setGeneratedSlides,
    setFinalVideoUrl,
    configSlides,
  } = useStore();

  useEffect(() => {
    if (!jobId) return;
    const interval = setInterval(async () => {
      try {
        const res = await getJobStatus(jobId);
        setJob(jobId, res.status);
        if (res.slides) setGeneratedSlides(res.slides);
        if (res.mp4_url) setFinalVideoUrl(res.mp4_url);
        if (res.status === target) clearInterval(interval);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('404') && import.meta.env.VITE_MOCK === '1') {
          const fakeSlides = configSlides
            .filter((s) => s.enabled)
            .map((s) => ({
              type: s.type,
              png_url: getPlaceholderPng(),
              duration: s.duration,
            }));
          setGeneratedSlides(fakeSlides);
          setFinalVideoUrl(getPlaceholderMp4());
          setJob(jobId, 'complete');
          clearInterval(interval);
        } else {
          console.error(err);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [
    jobId,
    target,
    setJob,
    setGeneratedSlides,
    setFinalVideoUrl,
    configSlides,
  ]);

  return <p>Przetwarzanie... ({target})</p>;
}
