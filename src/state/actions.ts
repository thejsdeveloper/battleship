import { Player, Position } from "./types";

export type Action =
  | {
      type: "START_GAME";
    }
  | {
      type: "PLAY";
      payload: {
        currentPlayerId: string;
      };
    }
  | {
      type: "TRANSFER_DEVICE";
      payload: {
        currentPlayerId: string;
        nextPlayerId: string;
      };
    }
  | {
      type: "SELECT_SHIP";
      payload: { shipName: string; playerId: string };
    }
  | {
      type: "PLACE_SHIP";
      payload: {
        playerId: string;
        position: Position;
      };
    };

export const startGame = (): Action => {
  return {
    type: "START_GAME",
  };
};

export const play = (currentPlayerId: string): Action => {
  return {
    type: "PLAY",
    payload: {
      currentPlayerId,
    },
  };
};

export const transferGame = (
  currentPlayerId: string,
  nextPlayerId: string
): Action => {
  return {
    type: "TRANSFER_DEVICE",
    payload: { currentPlayerId, nextPlayerId },
  };
};

export const selectShip = (playerId: string, shipName: string): Action => {
  return {
    type: "SELECT_SHIP",
    payload: { shipName, playerId },
  };
};

export const placeShip = (playerId: string, position: Position): Action => {
  return {
    type: "PLACE_SHIP",
    payload: {
      playerId,
      position,
    },
  };
};
