"use client";

import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/Canvas"), {
  ssr: false,
});

export default function DynamicCanvas() {
  return <Canvas />;
}
