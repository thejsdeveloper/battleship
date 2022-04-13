import { Player, Ship } from "../state/types";

export const findPlayerIndexById = <TPlayer extends Player>(
  palyers: TPlayer[],
  id: string
) => {
  return palyers.findIndex((player) => player.id === id);
};

export const findShipIndexByName = <TShip extends Ship>(
  ships: TShip[],
  name: string
) => {
  return ships.findIndex((ship) => ship.name === name);
};
