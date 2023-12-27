"use client"

import { useEffect, useRef } from "react";
import webGLFluidEnhanced from 'webgl-fluid-enhanced';

const Canvas: React.FC = () => {
    const canvas = useRef<HTMLCanvasElement>(null)

    const handleClick = () => {
        console.log("clicked");
        webGLFluidEnhanced.splats();
    } 

    useEffect(() => {

        if (canvas.current) {
            webGLFluidEnhanced.simulation(canvas.current, {
                SIM_RESOLUTION: 256,
                HOVER: false,
                BLOOM: false,
                INITIAL: true,
                BACK_COLOR: '#FFFFFF',
                TRANSPARENT: false,
                DENSITY_DISSIPATION: 0.8,
                PRESSURE_ITERATIONS: 30,
                COLOR_PALETTE: ['#61dafb', '#a8dadc', '#457b9d', '#1d3557', '#f1faee'],
                SUNRAYS: false
            });

            canvas.current.addEventListener('click', handleClick, { passive: true });
        }

        const interval = setInterval(() => {
            if (canvas.current) {
                webGLFluidEnhanced.splats(); // splats 関数を呼び出し
            }
        }, 5000);

        return () => {
            if (canvas.current) {
                canvas.current.removeEventListener('click', handleClick);
                clearInterval(interval);
            }
        };
    }, []);

    return (
        <div className="canvas">
            <canvas
                id="fluidCanvas"
                ref={canvas} 
                style={{
                    position: 'absolute',
                    width: '100vw',
                    height: '100vh',
                    top: 0,
                    left: 0,
                    opacity: '20%',
                    zIndex: -1,
                }
            }>
                </canvas> 
        </div>
    )
};

export default Canvas;
