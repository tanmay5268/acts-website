//import Beams from "./Beams";
import DarkVeil from './DarkVeil';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
        <div className="w-full h-screen">
      <DarkVeil
  hueShift={0}
  noiseIntensity={0}
  scanlineIntensity={0}
  speed={1.5}
  scanlineFrequency={0.5}
  warpAmount={0}
/>
      </div>
      
    </div>
  );
}


