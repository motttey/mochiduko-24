"use client";

import { TilesRenderer } from "3d-tiles-renderer";
import { useFrame, useThree } from "@react-three/fiber";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { 
    Box3,
    EdgesGeometry,
    LineSegments,
    LineBasicMaterial,
    Matrix4,
    Mesh,
    MeshStandardMaterial,
    Vector3
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
  const centerRef = useRef(center);
  centerRef.current = center;

  const createTiles = useCallback(
    (path: string) => {
      const tiles = new TilesRenderer(
        `https://plateau.geospatial.jp/main/data/3d-tiles/${path}/tileset.json`
      );

      tiles.manager.addHandler(/\.gltf$/, gltfLoader);

      tiles.addEventListener("load-tile-set", () => {
        if (centerRef.current) {
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

      tiles.addEventListener("load-model", (event: any) => {
        const { scene } = event;
        scene.traverse((object: any) => {
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
    [setCenter]
  );

  const [tiles, setTiles] = useState(() => createTiles(path));

  const pathRef = useRef(path);
  useEffect(() => {
    if (path !== pathRef.current) {
      pathRef.current = path;
      setTiles(createTiles(path));
    }
  }, [path, createTiles]);

  useEffect(() => {
    return () => {
      tiles.dispose();
    };
  }, [tiles]);

  const camera = useThree(({ camera }) => camera);
  const gl = useThree(({ gl }) => gl);

  useEffect(() => {
    tiles.setCamera(camera);
  }, [tiles, camera]);

  useEffect(() => {
    tiles.setResolutionFromRenderer(camera, gl);
  }, [tiles, camera, gl]);

  useFrame(() => {
    tiles.update();
  });

  return <primitive object={tiles.group} />;
};
