/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

import LanyardBand from "./LanyardBand";

import rishiModel from "../../assets/team/rishi.glb";
import aarushModel from "../../assets/team/aarush.glb";
import muskanModel from "../../assets/team/muskan.glb";
import shonalModel from "../../assets/team/shonal.glb";
import adityaModel from "../../assets/team/aditya.glb";
import palakModel from "../../assets/team/palak.glb";

const TEAM = [
  { model: rishiModel, position: [-10, 0, 0] },
  { model: aarushModel, position: [-6, 0, 0] },
  { model: muskanModel, position: [-2, 0, 0] },
  { model: shonalModel, position: [2, 0, 0] },
  { model: adityaModel, position: [6, 0, 0] },
  { model: palakModel, position: [10, 0, 0] }
];

export default function LanyardScene() {
  return (
    <div className="w-full h-[520px]">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 20 }}
        dpr={[1, 1.3]}
        gl={{ alpha: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), 0)
        }
      >
        <ambientLight intensity={Math.PI} />

        <Physics gravity={[0, -40, 0]} timeStep={1 / 40}>
          {TEAM.map((member, i) => (
            <LanyardBand
              key={i}
              glbPath={member.model}
              position={member.position}
            />
          ))}
        </Physics>

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}