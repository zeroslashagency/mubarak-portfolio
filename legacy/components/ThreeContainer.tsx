"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the Three.js component with SSR disabled
const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
  loading: () => <div>Loading 3D scene...</div>,
});

const ThreeContainer = () => {
  return (
    <div className="w-full h-[400px]">
      <Suspense fallback={<div>Loading...</div>}>
        <ThreeScene />
      </Suspense>
    </div>
  );
};

export default ThreeContainer;
