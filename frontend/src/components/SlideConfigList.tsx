import { useStore } from '../state/useStore';
import SlideRow from './SlideRow';

export default function SlideConfigList() {
  const slides = useStore((s) => s.configSlides);
  return (
    <div className="space-y-2">
      {slides.map((slide, i) => (
        <SlideRow key={slide.type} slide={slide} index={i} />
      ))}
    </div>
  );
}
