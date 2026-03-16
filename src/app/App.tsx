import { CanvasPortfolio } from './components/CanvasPortfolio';
import { UIOverlay } from './components/UIOverlay';

export default function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 overflow-hidden">
      <CanvasPortfolio />
      <UIOverlay />
    </div>
  );
}
