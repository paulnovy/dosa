import { generateSlides } from '../api/client';
import { useStore } from '../state/useStore';

export default function GenerateButton() {
  const { configSlides, setJob } = useStore();

  const handleClick = async () => {
    try {
      const payload = {
        date: new Date().toISOString().slice(0, 10),
        resolution: '1080x1920',
        slides: configSlides,
        lang: 'pl',
      } as const;
      const res = await generateSlides(payload);
      setJob(res.job_id, res.status);
    } catch (err) {
      console.error(err);
      alert('Błąd generowania');
    }
  };

  return (
    <button
      className="mt-4 w-full bg-blue-600 text-white py-2"
      onClick={handleClick}
    >
      GENERUJ NA DZIŚ
    </button>
  );
}
