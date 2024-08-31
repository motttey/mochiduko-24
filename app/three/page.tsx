"use client";

import styles from "@/app/page.module.css";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Color, Mesh, TextureLoader } from "three";

const POSITION_MAX = 10;
const BOX_NUM = 15;

function Box(props: any) {
  const ref = useRef<Mesh>(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // 定期的に移動し, 画面外に出たらリセットする
  const initialPosition = useMemo(() => props.position, [props.position]);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.position.y -= delta * 2;
      if (ref.current.position.y < -POSITION_MAX / 2) {
        ref.current.position.y = POSITION_MAX / 2;
      }
    }
  });

  const loader = new TextureLoader();
  const texture = loader.load("/dorayaki.png");

  return (
    <mesh
      {...props}
      ref={ref}
      position={initialPosition}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      {/*
        <boxGeometry args={[0.5, 0.5, 0.5]} />
      */}
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      {/* Add a Sprite */}
      <sprite scale={[1, 1, 1]} position={[0, 1, 0]}>
        <spriteMaterial
          attach="material"
          color={new Color(0xffffff)}
          depthTest={false}
          depthWrite={false}
          map={texture}
        />
      </sprite>
    </mesh>
  );
}

export default function Page() {
  const maxinTexture = new TextureLoader().load("/icon512_rounded.png");

  return (
    <main className={styles.main} id="mainLayout">
      <div style={{ width: "100vw", height: "75vh" }}>
        <Canvas>
          <ambientLight color={new Color(0xffffff)} intensity={1} />
          <spotLight
            position={[POSITION_MAX, POSITION_MAX, POSITION_MAX]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={1}
          />
          <pointLight
            position={[-POSITION_MAX, -POSITION_MAX, -POSITION_MAX]}
            decay={0}
            intensity={1}
          />
          {Array(BOX_NUM)
            .fill(0)
            .map((_: number, index: number) => {
              const x = Math.random() * POSITION_MAX - POSITION_MAX / 2;
              const y = Math.random() * POSITION_MAX;
              const z = (Math.random() * POSITION_MAX) / 3 - POSITION_MAX / 3;

              return <Box key={index} position={[x, y, z]} />;
            })}
          ;
          <OrbitControls />
          <mesh
            position={[
              1,
              1,
              -(Math.random() * POSITION_MAX) / 3 - POSITION_MAX / 3,
            ]}
          >
            <sprite scale={[10, 10, 1]} position={[0, 0, 1]}>
              <spriteMaterial
                attach="material"
                color={new Color(0xffffff)}
                depthTest={false}
                depthWrite={false}
                map={maxinTexture}
              />
            </sprite>
          </mesh>
        </Canvas>
      </div>
    </main>
  );
}
