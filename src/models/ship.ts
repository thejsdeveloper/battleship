import { Position } from "./position";

export type ShipDirection = "H" | "V";

export type Ship = {
  id?: string;
  name: string;
  length: number;
  placed: boolean;
  sunk: boolean;
  direction: ShipDirection;
  position: Position | null;
};
