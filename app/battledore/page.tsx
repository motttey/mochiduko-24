"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, Vector3 } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Ball = (props: any) => {
  const ballRef: React.Ref<any> | undefined = useRef();

  // ボールの初期位置と速度
  const initialPosition = [0, 0, 1];
  const initialVelocity = [0.01, 0.02, -0.01];
  const gravity = -0.000098; // 重力加速度

  // ボールの状態管理
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState(initialVelocity);

  // ボールの動きを制御するフレームごとの処理
  useFrame(() => {
    // 重力を速度に加算
    setVelocity((prev) => [prev[0], prev[1] + gravity, prev[2]]);

    // ボールの位置を更新
    setPosition((prev) => [
      prev[0] + velocity[0],
      prev[1] + velocity[1],
      prev[2] + velocity[2],
    ]);

    // 画面端の処理
    if (position[1] < -5) {
      props.setGameOver(true);
      window.alert("game over");
    }
    if (position[1] > 5) {
      setVelocity((prev) => [prev[0], -0.03, prev[2]]);
    }

    if (position[2] <= -3 || position[2] >= 3) {
      setVelocity((prev) => [prev[0], prev[1], -prev[2]]);
    }
    if (position[0] <= -3 || position[0] >= 3) {
      setVelocity((prev) => [-prev[0], prev[1], prev[2]]);
    }
  });

  // ユーザーのクリックでボールを打ち返す関数
  // ユーザーのクリックでボールを打ち返す関数
  const handleClick = () => {
    if (!props.gameOver) {
      // 現在の位置から[0, 0, -3]への方向ベクトルを計算
      const target = [0, 0, -3];
      const direction = [
        target[0] - position[0],
        target[1] - position[1],
        target[2] - position[2],
      ];

      // 方向ベクトルを正規化
      const magnitude = Math.sqrt(
        direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2,
      );
      const normalizedDirection = [
        direction[0] / magnitude,
        direction[1] / magnitude,
        direction[2] / magnitude,
      ];

      // 速度を設定（速度の大きさは任意で調整可能）
      const speed = 0.03;
      setVelocity([
        normalizedDirection[0] * speed,
        normalizedDirection[1] * speed,
        normalizedDirection[2] * speed,
      ]);
    } else {
      props.setGameOver(false);
    }
  };

  return (
    <mesh ref={ballRef} onClick={handleClick} position={position as Vector3}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

export default function Page() {
  const [gameOver, setGameOver] = useState(false);
  const handleClick = () => {
    setGameOver(false);
  };
  return (
    <div style={{ width: "100vw", height: "75vh" }}>
      <Canvas onClick={handleClick}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {!gameOver && <Ball gameOver={gameOver} setGameOver={setGameOver} />}
      </Canvas>
    </div>
  );
}
