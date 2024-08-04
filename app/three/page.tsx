"use client";
import styles from "@/app/page.module.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

const POSITION_MAX = 10;
const BOX_NUM = 10;

function Box(props: any) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [position, setPosition] = useState([
    props.position[0],
    props.position[1],
    props.position[2],
  ]); // 初期位置を上に設定

  // 定期的に移動し, 画面外に出たらリセットする
  useFrame((_state, delta) => {
    if (ref.current && (ref.current as any).position) {
      let newPosition = [...position];
      newPosition[1] -= delta * 2;
      if (newPosition[1] < -POSITION_MAX / 2) {
        newPosition[1] = POSITION_MAX / 2;
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
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Page() {
  return (
    <>
      <main className={styles.main} id="mainLayout">
        <div style={{ width: "50vw", height: "75vh" }}>
          <Canvas>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[POSITION_MAX, POSITION_MAX, POSITION_MAX]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-POSITION_MAX, -POSITION_MAX, -POSITION_MAX]}
              decay={0}
              intensity={Math.PI}
            />
            {Array(BOX_NUM)
              .fill(0)
              .map((index: number) => {
                const x = (Math.random() * POSITION_MAX) / 2 - POSITION_MAX / 2;
                const y = (Math.random() * POSITION_MAX) / 2;
                const z = (Math.random() * POSITION_MAX) / 3 - POSITION_MAX / 3;

                return <Box key={index} position={[x, y, z]} />;
              })}
            ;
            <OrbitControls />
          </Canvas>
        </div>
      </main>
    </>
  );
}
