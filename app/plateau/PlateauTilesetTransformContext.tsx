"use client";

import { createContext } from "react";
import { Vector3 } from "three";

export const PlateauTilesetTransformContext = createContext({
  setCenter: (_center: Vector3): void => {},
});
