import { Cell } from "./grid";
import { Position } from "./position";

export type Shot = {
  position: Position;
  type: Cell;
};
