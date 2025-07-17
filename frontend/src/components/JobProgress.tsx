import { useEffect } from 'react';
import { getJobStatus } from '../api/client';
import { useStore } from '../state/useStore';

interface Props {
  target: 'ready' | 'complete';
}

export default function JobProgress({ target }: Props) {
  const { jobId, setJob, setGeneratedSlides, setFinalVideoUrl } = useStore();

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
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId, target, setJob, setGeneratedSlides, setFinalVideoUrl]);

  return <p>Przetwarzanie... ({target})</p>;
}
