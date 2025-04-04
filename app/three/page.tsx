/*
"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Mesh, Texture, TextureLoader } from "three";

import styles from "@/app/page.module.css";

const POSITION_MAX = 10;
const BOX_NUM = 20;

function Box(props: any) {
  const ref = useRef<Mesh>(null);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    setTexture(loader.load("/dorayaki.png"));
  }, []);

  // 定期的に移動し, 画面外に出たらリセットする
  const initialPosition = useMemo(() => props.position, [props.position]);

  // X方向のランダムな回転角度（-15度から15度の間）
  useFrame((_state, delta) => {
    if (ref?.current) {
      ref.current.position.y -= delta * 2;
      if (ref.current.position.y < -POSITION_MAX / 2) {
        ref.current.position.y = POSITION_MAX / 2;
      }
    }
  });

  const scale = (1 * Math.random() + 1) * 0.75;
  // X方向のランダムな回転角度（-15度から15度の間）
  const randomRotation = useMemo(() => {
    const maxRotation = (15 * Math.PI) / 180; // 15度をラジアンに変換
    return Math.random() * 2 * maxRotation - maxRotation;
  }, []);

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
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      <sprite scale={[scale, scale, 1]} position={[0, 1, 0]}>
        <spriteMaterial
          attach="material"
          color={new Color(0xffffff)}
          depthTest={false}
          depthWrite={false}
          map={texture}
          rotation={randomRotation}
        />
      </sprite>
    </mesh>
  );
}

export default function Page() {
  const [maxinTexture, setMainTexture] = useState<Texture | null>(null);

  useEffect(() => {
    const loader = new TextureLoader();
    setMainTexture(loader.load("/dorayakidaisuki.png"));
  }, []);

  return (
    <main className={styles.main} id="mainLayout">
      <div style={{ width: "100vw", height: "75vh" }}>
        <Canvas linear flat>
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
          <mesh position={[1, 1, -POSITION_MAX / 3]}>
            <sprite scale={[7.5, 7.5, 0]} position={[0, -POSITION_MAX / 2, 1]}>
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
*/

export default function Page() {
  <>test</>
}
