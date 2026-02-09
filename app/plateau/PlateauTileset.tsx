"use client";

import { TilesRenderer } from "3d-tiles-renderer";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Box3,
  EdgesGeometry,
  LineSegments,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Vector3,
} from "three";
import { GLTFLoader } from "three-stdlib";

import { CesiumRTCPlugin } from "./CesiumRTCPlugin";
import { PlateauTilesetTransformContext } from "./PlateauTilesetTransformContext";

export interface PlateauTilesetProps {
  path: string;
  center?: boolean;
}

const gltfLoader = new GLTFLoader();
gltfLoader.register((parser) => new CesiumRTCPlugin(parser));

const material = new MeshStandardMaterial({
  metalness: 0,
  color: 0xffffff,
});

const lineMaterial = new LineBasicMaterial({
  color: 0x000000,
});

export const PlateauTileset: React.FC<PlateauTilesetProps> = ({
  path,
  center = false,
}) => {
  const { setCenter } = useContext(PlateauTilesetTransformContext);

  const createTiles = useCallback(
    (path: string, shouldCenter: boolean) => {
      const tiles = new TilesRenderer(
        `https://plateau.geospatial.jp/main/data/3d-tiles/${path}/tileset.json`,
      );

      tiles.manager.addHandler(/\.gltf$/, gltfLoader);

      tiles.addEventListener("load-tile-set", () => {
        if (shouldCenter) {
          const box = new Box3();
          const matrix = new Matrix4();
          tiles.getOrientedBoundingBox(box, matrix);
          box.min.z = box.max.z = Math.min(box.min.z, box.max.z);
          box.applyMatrix4(matrix);
          const center = new Vector3();
          box.getCenter(center);
          setCenter(center);
        }
      });

      tiles.addEventListener("load-model", (event: unknown) => {
        const { scene } = event as { scene: Object3D };
        scene.traverse((object) => {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object instanceof Mesh) {
            object.material = material;
            // 枠線を追加
            const edges = new EdgesGeometry(object.geometry);
            const line = new LineSegments(edges, lineMaterial);
            object.add(line);
          }
        });
      });
      return tiles;
    },
    [setCenter],
  );

  // TilesRenderer 생성은副作用なので render 外(useEffect)で行う
  const [tiles, setTiles] = useState<TilesRenderer | null>(null);

  useEffect(() => {
    const t = createTiles(path, center);
    // Creating TilesRenderer is an external-side-effect, and we intentionally
    // store it in state so we can render it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTiles(t);
    return () => {
      t.dispose();
    };
  }, [path, center, createTiles]);

  const camera = useThree(({ camera }) => camera);
  const gl = useThree(({ gl }) => gl);

  useEffect(() => {
    if (!tiles) return;
    tiles.setCamera(camera);
  }, [tiles, camera]);

  useEffect(() => {
    if (!tiles) return;
    tiles.setResolutionFromRenderer(camera, gl);
  }, [tiles, camera, gl]);

  useFrame(() => {
    tiles?.update();
  });

  if (!tiles) return null;

  return <primitive object={tiles.group} />;
};
