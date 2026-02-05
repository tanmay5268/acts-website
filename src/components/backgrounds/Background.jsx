import Beams from "./Beams";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
        <div className="w-full h-screen">
      <Beams
        beamWidth={1.3}
        beamHeight={25}
        beamNumber={41}
        lightColor="#81d2e6"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={65}
      />
      </div>
      <div className="absolute inset-0 bg-black/70 pointer-events-none" />
    </div>
  );
}
