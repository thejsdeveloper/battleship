import { Grid } from "../models/grid";
import { Ship } from "../models/ship";

export const findShipIndexByName = (ships: Ship[], name: string) => {
  return ships.findIndex((ship) => ship.name === name);
};

export const filterOutShips = (grid: Grid) =>
  grid.map((cell) => (cell === "ship" ? "empty" : cell));
