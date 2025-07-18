import { useStore } from '../state/useStore';

export default function Header() {
  const { jobStatus } = useStore();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dosa</h1>
      <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
    </header>
  );
}
