export type SquareType =
  | "empty"
  | "ship"
  | "hit"
  | "miss"
  | "sunk"
  | "forbidden"
  | "awaiting";

export type Ship = {
  name: string;
  length: number;
  placed: boolean | null;
};
