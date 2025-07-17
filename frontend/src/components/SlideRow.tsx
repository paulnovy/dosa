import type { SlideConfig } from '../api/types';
import { useStore } from '../state/useStore';

interface Props {
  slide: SlideConfig;
  index: number;
}

export default function SlideRow({ slide, index }: Props) {
  const { toggleSlide, setConfigSlides } = useStore();

  return (
    <div className="flex items-center gap-2 py-1">
      <input
        type="checkbox"
        checked={slide.enabled}
        onChange={() => toggleSlide(slide.type)}
      />
      <span className="flex-1 capitalize">{slide.type}</span>
      <input
        type="number"
        className="w-16 border px-1"
        value={slide.duration}
        min={1}
        onChange={(e) =>
          setConfigSlides(
            useStore.getState().configSlides.map((s, i) =>
              i === index ? { ...s, duration: Number(e.target.value) } : s
            )
          )
        }
      />
    </div>
  );
}
