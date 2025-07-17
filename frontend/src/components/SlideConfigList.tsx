import { useStore } from '../state/useStore';
import SlideRow from './SlideRow';

export default function SlideConfigList() {
  const slides = useStore((s) => s.configSlides);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
      {slides.map((slide, i) => (
        <SlideRow key={slide.type} slide={slide} index={i} />
      ))}
    </div>
  );
}
