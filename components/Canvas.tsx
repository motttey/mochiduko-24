"use client";

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid-enhanced";

const Canvas: React.FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const handleClick = () => {
    webGLFluidEnhanced.splats();
  };

  useEffect(() => {
    const currentCanvas = canvas.current; // canvas.currentを変数にコピー
    if (currentCanvas) {
      webGLFluidEnhanced.simulation(canvas.current, {
        SIM_RESOLUTION: 256,
        HOVER: false,
        BLOOM: false,
        INITIAL: true,
        COLORFUL: false,
        DENSITY_DISSIPATION: 1.9,
        VELOCITY_DISSIPATION: 2.0,
        CURL: 10,
        BACK_COLOR: "#FFFFFF",
        TRANSPARENT: false,
        PRESSURE_ITERATIONS: 30,
        SPLAT_RADIUS: 0.5,
        SPLAT_FORCE: 5000,
        COLOR_PALETTE: ["#61dafb", "#a8dadc", "#457b9d", "#1d3557", "#f1faee"],
        SUNRAYS: false,
      });
      currentCanvas.addEventListener("click", handleClick, { passive: true });
    }

    /*
        const interval = setInterval(() => {
            if (currentCanvas) {
                webGLFluidEnhanced.splats(); // splats 関数を呼び出し
            }
        }, 5000);
        */

    return () => {
      if (currentCanvas) {
        currentCanvas.removeEventListener("click", handleClick);
        // clearInterval(interval);
      }
    };
  }, []);

  return (
    <div
      className="canvas"
      style={{
        backgroundColor: "white",
      }}
    >
      <canvas
        id="fluidCanvas"
        ref={canvas}
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          opacity: "100%",
          zIndex: -1,
        }}
      ></canvas>
    </div>
  );
};

export default Canvas;
