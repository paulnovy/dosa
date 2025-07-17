import { useStore } from '../state/useStore';

export default function SlidePreviewGrid() {
  const { generatedSlides, toggleSlide, reorderSlides, configSlides } = useStore();

  const onDrag = (from: number, to: number) => {
    reorderSlides(from, to);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {configSlides.map((slide, idx) => (
        <div
          key={slide.type}
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', String(idx));
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const from = Number(e.dataTransfer.getData('text/plain'));
            onDrag(from, idx);
          }}
          className={`border p-2 ${slide.enabled ? '' : 'opacity-50'}`}
        >
          <img
            src={generatedSlides[idx]?.png_url}
            alt={slide.type}
            className="mb-2 w-full"
          />
          <div className="flex items-center justify-between">
            <span className="capitalize">{slide.type}</span>
            <input
              type="checkbox"
              checked={slide.enabled}
              onChange={() => toggleSlide(slide.type)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
