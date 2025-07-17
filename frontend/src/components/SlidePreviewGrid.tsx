import { useStore } from '../state/useStore';

export default function SlidePreviewGrid() {
  const { generatedSlides, toggleSlide, reorderSlides, configSlides } = useStore();

  const onDrag = (from: number, to: number) => {
    reorderSlides(from, to);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          className={`relative rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ${!slide.enabled ? 'grayscale' : ''}`}>
          <img
            src={generatedSlides[idx]?.png_url}
            alt={slide.type}
            className="w-full h-auto object-cover"
          />
          {!slide.enabled && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <button onClick={() => toggleSlide(slide.type)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex items-center justify-between">
            <span className="capitalize font-medium">{slide.type}</span>
            <input
              type="checkbox"
              className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
              checked={slide.enabled}
              onChange={() => toggleSlide(slide.type)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
