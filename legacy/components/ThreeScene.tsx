"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const ThreeScene = () => {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;
