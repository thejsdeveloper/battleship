import { Grid, Position } from "./types";

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
      type: "UPDATE_SHIP_POSITION";
      payload: {
        playerId: string;
        position: Position;
      };
    }
  | {
      type: "ROTATE_SHIP";
      payload: {
        playerId: string;
      };
    }
  | {
      type: "PLACE_SHIP";
      payload: {
        playerId: string;
        grid: Grid;
      };
    }
  | {
      type: "SHOOT";
      payload: {
        currentPlayerId: string;
        opponentId: string;
        index: number;
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

export const updateShipPosition = (
  playerId: string,
  position: Position
): Action => {
  return {
    type: "UPDATE_SHIP_POSITION",
    payload: {
      playerId,
      position,
    },
  };
};

export const rotateShipDirection = (playerId: string): Action => {
  return {
    type: "ROTATE_SHIP",
    payload: {
      playerId,
    },
  };
};

export const placeShip = (playerId: string, grid: Grid): Action => {
  return {
    type: "PLACE_SHIP",
    payload: {
      playerId,
      grid,
    },
  };
};

export const shootTarpido = (
  currentPlayerId: string,
  opponentId: string,
  index: number
): Action => {
  return {
    type: "SHOOT",
    payload: {
      currentPlayerId,
      opponentId,
      index,
    },
  };
};
