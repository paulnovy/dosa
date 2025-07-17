import { buildJob } from '../api/client';
import { useStore } from '../state/useStore';

export default function DeployButton() {
  const { jobId, configSlides, generatedSlides, setJob } = useStore();

  const handleDeploy = async () => {
    if (!jobId) return;
    const slides = configSlides
      .filter((s) => s.enabled)
      .map((s, i) => generatedSlides[i]);
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
      className="mt-8 w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      onClick={handleDeploy}
    >
      Deploy to Production
    </button>
  );
}
