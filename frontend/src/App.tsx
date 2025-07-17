import { useStore } from './state/useStore';
import SlideConfigList from './components/SlideConfigList';
import GenerateButton from './components/GenerateButton';
import JobProgress from './components/JobProgress';
import SlidePreviewGrid from './components/SlidePreviewGrid';
import DeployButton from './components/DeployButton';
import PlayerWindow from './player/PlayerWindow';

function App() {
  const { jobStatus, finalVideoUrl } = useStore();

  if (jobStatus === 'pending') {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl mb-4">Konfiguracja slajdów</h1>
        <SlideConfigList />
        <GenerateButton />
      </div>
    );
  }

  if (jobStatus === 'rendering') {
    return (
      <div className="p-4 text-center">
        <JobProgress target="ready" />
      </div>
    );
  }

  if (jobStatus === 'ready') {
    return (
      <div className="p-4">
        <SlidePreviewGrid />
        <DeployButton />
      </div>
    );
  }

  if (jobStatus === 'building') {
    return (
      <div className="p-4 text-center">
        <JobProgress target="complete" />
      </div>
    );
  }

  if (jobStatus === 'complete' && finalVideoUrl) {
    return <PlayerWindow mp4Url={finalVideoUrl} />;
  }

  return <p>Błąd lub nieznany status</p>;
}

export default App;
