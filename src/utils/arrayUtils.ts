import { Grid, Player, Ship } from "../state/types";

export const findPlayerIndexById = <TPlayer extends Player>(
  palyers: TPlayer[],
  id: string
) => {
  return palyers.findIndex((player) => player.id === id);
};

export const getPlayerById = (players: Player[], id: string) =>
  players.find((player) => player.id === id);

export const findShipIndexByName = <TShip extends Ship>(
  ships: TShip[],
  name: string
) => {
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
