import { Player } from "./types";

export type Action =
  | {
      type: "START_GAME";
    }
  | {
      type: "PLAY";
      payload: {
        currentPlayer: Player;
      };
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
      payload: { shipName: string; playerId: string };
    };

export const startGame = (): Action => {
  return {
    type: "START_GAME",
  };
};

export const play = (currentPlayer: Player): Action => {
  return {
    type: "PLAY",
    payload: {
      currentPlayer,
    },
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

export const selectShip = (playerId: string, shipName: string): Action => {
  return {
    type: "SELECT_SHIP",
    payload: { shipName, playerId },
  };
};
