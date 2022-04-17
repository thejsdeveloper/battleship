import { Grid } from "../models/grid";
import { Player } from "../models/player";
import { Ship } from "../models/ship";

export const findPlayerIndexById = (palyers: Player[], id: string) => {
  return palyers.findIndex((player) => player.id === id);
};

export const getPlayerById = (players: Player[], id: string): Player => {
  const player = players.find((player) => player.id === id);
  if (!player) throw new Error("Invalid Player id " + id);
  return player;
};

export const findShipIndexByName = (ships: Ship[], name: string) => {
  return ships.findIndex((ship) => ship.name === name);
};

export const removeShip = (ships: Ship[], shipName: string) =>
  ships.filter((ship) => ship.name !== shipName);

export const markShipAsPlaced = (ships: Ship[], shipName: string): Ship[] =>
  ships.map((ship) => ({
    ...ship,
    placed: ship.name === shipName,
  }));

export const filterOutShips = (grid: Grid) =>
  grid.map((cell) => (cell === "ship" ? "empty" : cell));
