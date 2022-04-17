import { Grid } from "./grid";
import { Fleet } from "./fleet";
import { Shot } from "./shot";

export type PlayerState = "NONE" | "WAITING" | "READY" | "DONE" | "SHOT_TAKEN";

export type Player = {
  id: string;
  name: string;
  state: PlayerState;
  grid: Grid;
  shots: Shot[];
  fleet: Fleet;
};
