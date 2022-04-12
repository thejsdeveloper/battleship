import { Ship } from "./types";

export type Action =
  | {
      type: "START_GAME";
    }
  | {
      type: "SELECT_SHIP";
      payload: { ship: Ship; playerId: number };
    };

export const startGame = (): Action => {
  return {
    type: "START_GAME",
  };
};

export const selectShip = (playerId: number, ship: Ship): Action => {
  return {
    type: "SELECT_SHIP",
    payload: { ship, playerId },
  };
};
