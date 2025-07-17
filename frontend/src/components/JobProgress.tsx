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

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
        Processing... Please wait.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">(Target: {target})</p>
    </div>
  );
}
