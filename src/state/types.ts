export type GameState = "NONE" | "SET_UP" | "IN_PROGRESS" | "FINISH";
export type PlayerState = "NONE" | "WAITING" | "READY" | "DONE" | "SHOT_TAKEN";

export type SquareType =
  | "empty"
  | "ship"
  | "hit"
  | "miss"
  | "sunk"
  | "forbidden"
  | "awaiting";

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
  name: string;
  state: PlayerState;
  grid: SquareType[];
  shots: Shot[];
  fleet: Fleet;
};
