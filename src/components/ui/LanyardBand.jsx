/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint
} from "@react-three/rapier";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import lanyard from "../../assets/lanyard/lanyard.png";

export default function LanyardBand({
  glbPath,
  position = [0, 0, 0],
  maxSpeed = 10,
  minSpeed = 0
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4
  };

  const { nodes, materials } = useGLTF(glbPath);
  const texture = useTexture(lanyard);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ])
  );

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.4]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.4]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.4]);

  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      card.current?.setNextKinematicTranslation({
        x: vec.x,
        y: vec.y,
        z: vec.z
      });
    }

    if (fixed.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());

      band.current.geometry.setPoints(curve.getPoints(12));
    }
  });

  return (
    <>
      <group position={[position[0], 4.6, position[2]]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />

        <RigidBody ref={j1} position={[0.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j2} position={[1, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={j3} position={[1.5, 0, 0]} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody ref={card} position={[2, 0, 0]} {...segmentProps}>
          <CuboidCollider args={[4.18, 2.125, 0.01]} />

          <group scale={4.25} position={[0, -3.6, -0.05]}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial map={materials.base.map} />
            </mesh>

            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
    </>
  );
}