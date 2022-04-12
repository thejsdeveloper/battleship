import { Player, Ship } from "./types";

export type Action =
  | {
      type: "START_GAME";
    }
  | {
      type: "TRANSFER_DEVICE";
      payload: {
        currentPlayer: Player;
        nextPlayer: Player;
      };
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

export const transferGame = (
  currentPlayer: Player,
  nextPlayer: Player
): Action => {
  return {
    type: "TRANSFER_DEVICE",
    payload: { currentPlayer, nextPlayer },
  };
};

export const selectShip = (playerId: number, ship: Ship): Action => {
  return {
    type: "SELECT_SHIP",
    payload: { ship, playerId },
  };
};
