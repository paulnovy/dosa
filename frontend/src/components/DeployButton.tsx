import { buildJob } from '../api/client';
import { useStore } from '../state/useStore';

export default function DeployButton() {
  const { jobId, configSlides, generatedSlides, setJob } = useStore();

  const handleDeploy = async () => {
    if (!jobId) return;
    const slides = configSlides
      .filter((s) => s.enabled)
      .map((cfg) =>
        generatedSlides.find((g) => g.type === cfg.type),
      )
      .filter(Boolean) as typeof generatedSlides;
    try {
      const res = await buildJob(jobId, slides);
      setJob(res.job_id, res.status);
    } catch (err) {
      console.error(err);
      alert('Błąd deploy');
    }
  };

  return (
    <button
      className="mt-4 w-full bg-blue-600 text-white py-2"
      onClick={handleDeploy}
    >
      DEPLOY
    </button>
  );
}
