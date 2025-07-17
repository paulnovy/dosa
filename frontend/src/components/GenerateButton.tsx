import { generateSlides } from '../api/client';
import { useStore } from '../state/useStore';
import dayjs from 'dayjs';

export default function GenerateButton() {
  const { configSlides, setJob } = useStore();

  const handleClick = async () => {
    try {
      const payload = {
        date: dayjs().format('YYYY-MM-DD'),
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
      className="mt-8 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      onClick={handleClick}
    >
      Generate Slides for Today
    </button>
  );
}
