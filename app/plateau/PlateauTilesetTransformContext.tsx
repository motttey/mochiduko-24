"use client";

import { createContext } from "react";
import { Vector3 } from "three";

export const PlateauTilesetTransformContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCenter: (_center: Vector3): void => {},
});
