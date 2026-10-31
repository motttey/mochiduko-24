"use client";

import React, { useCallback, useMemo, useState } from "react";
import { ReactNode } from "react";
import { Quaternion, Vector3 } from "three";

import { PlateauTilesetTransformContext } from "./PlateauTilesetTransformContext";

export interface PlateauTilesetTransformProps {
  children: ReactNode;
}

export const PlateauTilesetTransform: React.FC<
  PlateauTilesetTransformProps
> = ({ children }) => {
  const [transform, setTransform] = useState<{
    offset?: Vector3;
    rotation?: Quaternion;
  }>({});

  const setCenter = useCallback((center: Vector3) => {
    const direction = center.clone().normalize();
    const up = new Vector3(0, 1, 0);
    const rotation = new Quaternion();
    rotation.setFromUnitVectors(direction, up);
    setTransform({
      offset: new Vector3(0, -center.length(), 0),
      rotation,
    });
  }, []);

  const context = useMemo(() => ({ setCenter }), [setCenter]);

  return (
    <PlateauTilesetTransformContext value={context}>
      <group position={transform.offset} quaternion={transform.rotation}>
        {children}
      </group>
    </PlateauTilesetTransformContext>
  );
};
