import type { SlideConfig } from '../api/types';
import { useStore } from '../state/useStore';

interface Props {
  slide: SlideConfig;
  index: number;
}

export default function SlideRow({ slide, index }: Props) {
  const { toggleSlide, reorderSlides, setConfigSlides } = useStore();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const from = Number(e.dataTransfer.getData('text/plain'));
    reorderSlides(from, index);
  };

  return (
    <div
      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm"
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="cursor-move">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <input
        type="checkbox"
        className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
        checked={slide.enabled}
        onChange={() => toggleSlide(slide.type)}
      />
      <span className="flex-1 capitalize font-medium">{slide.type}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
        <input
          type="number"
          className="w-20 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-2 py-1"
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
    </div>
  );
}
