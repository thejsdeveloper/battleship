export type GameState =
  | "NONE"
  | "START"
  | "SET_UP"
  | "IN_PROGRESS"
  | "FINISH"
  | "RESET";

export type SquareType =
  | "empty"
  | "ship"
  | "hit"
  | "miss"
  | "sunk"
  | "forbidden"
  | "awaiting";

export type PlayerState = "NONE" | "PLACING" | "WAITING" | "READY" | "DONE";

export type ShipDirection = "H" | "V";

export type Position = {
  x: number;
  y: number;
};

export type Ship = {
  id?: string;
  name: string;
  length: number;
  placed: boolean;
  sunk: boolean;
  direction: ShipDirection;
  position: Position | null;
};

export type Shot = {
  pos: Position;
  type: SquareType;
};

export type Fleet = {
  ships: Ship[];
  selectedShip: Ship | null;
};

export type Player = {
  id: string;
  state: PlayerState;
  grid: SquareType[];
  shots: Shot[];
  fleet: Fleet;
};
