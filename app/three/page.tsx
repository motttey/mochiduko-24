"use client";
import styles from "@/app/page.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

function Box(props: any) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [position, setPosition] = useState([
    props.position[0],
    5,
    props.position[2],
  ]); // 初期位置を上に設定

  // 定期的に移動し, 画面外に出たらリセットする
  useFrame((_state, delta) => {
    if (ref.current && (ref.current as any).position) {
      let newPosition = [...position];
      newPosition[1] -= delta * 2;
      if (newPosition[1] < -5) {
        newPosition[1] = 5;
      }
      setPosition(newPosition);
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      position={position}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} id="mainLayout">
        <div style={{ width: "50vw", height: "50vh" }}>
          <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            {[0, 1, 2].map((index: number) => {
              const x = Math.random() * 5 - 5;
              const z = Math.random() * 3 - 3;

              return <Box key={index} position={[x, 0, z]} />;
            })}
            ;
            <OrbitControls />
          </Canvas>
        </div>
      </main>
    </>
  );
}
