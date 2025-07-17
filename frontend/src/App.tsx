import { useStore } from './state/useStore';
import SlideConfigList from './components/SlideConfigList';
import GenerateButton from './components/GenerateButton';
import JobProgress from './components/JobProgress';
import SlidePreviewGrid from './components/SlidePreviewGrid';
import DeployButton from './components/DeployButton';
import PlayerWindow from './player/PlayerWindow';
import Header from './components/Header';

function App() {
  const { jobStatus, finalVideoUrl } = useStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {jobStatus === 'pending' && (
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Slide Configuration</h2>
            <SlideConfigList />
            <GenerateButton />
          </div>
        )}
        {jobStatus === 'rendering' && (
          <div className="text-center">
            <JobProgress target="ready" />
          </div>
        )}
        {jobStatus === 'ready' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Preview & Deploy</h2>
            <SlidePreviewGrid />
            <DeployButton />
          </div>
        )}
        {jobStatus === 'building' && (
          <div className="text-center">
            <JobProgress target="complete" />
          </div>
        )}
        {jobStatus === 'complete' && finalVideoUrl && (
          <PlayerWindow mp4Url={finalVideoUrl} />
        )}
        {jobStatus !== 'pending' &&
          jobStatus !== 'rendering' &&
          jobStatus !== 'ready' &&
          jobStatus !== 'building' &&
          jobStatus !== 'complete' && <p>Error or unknown status</p>}
      </main>
    </div>
  );
}

export default App;
