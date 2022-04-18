import { Grid } from "../models/grid";
import { Position } from "../models/position";

export type Action =
  | {
      type: "START_GAME";
    }
  | {
      type: "PLAY";
      payload: {
        currentPlayerIndex: number;
      };
    }
  | {
      type: "TRANSFER_DEVICE";
      payload: {
        currentPlayerIndex: number;
        nextPlayerIndex: number;
      };
    }
  | {
      type: "SELECT_SHIP";
      payload: { shipName: string; playerIndex: number };
    }
  | {
      type: "UPDATE_SHIP_POSITION";
      payload: {
        playerIndex: number;
        position: Position;
      };
    }
  | {
      type: "ROTATE_SHIP";
      payload: {
        playerIndex: number;
      };
    }
  | {
      type: "PLACE_SHIP";
      payload: {
        playerIndex: number;
        grid: Grid;
      };
    }
  | {
      type: "SHOOT";
      payload: {
        currentPlayerIndex: number;
        opponentIndex: number;
        index: number;
      };
    }
  | {
      type: "RESET";
    };

export const startGame = (): Action => {
  return {
    type: "START_GAME",
  };
};

export const play = (currentPlayerIndex: number): Action => {
  return {
    type: "PLAY",
    payload: {
      currentPlayerIndex,
    },
  };
};

export const transferGame = (
  currentPlayerIndex: number,
  nextPlayerIndex: number
): Action => {
  return {
    type: "TRANSFER_DEVICE",
    payload: { currentPlayerIndex, nextPlayerIndex },
  };
};

export const selectShip = (playerIndex: number, shipName: string): Action => {
  return {
    type: "SELECT_SHIP",
    payload: { shipName, playerIndex },
  };
};

export const updateShipPosition = (
  playerIndex: number,
  position: Position
): Action => {
  return {
    type: "UPDATE_SHIP_POSITION",
    payload: {
      playerIndex,
      position,
    },
  };
};

export const rotateShipDirection = (playerIndex: number): Action => {
  return {
    type: "ROTATE_SHIP",
    payload: {
      playerIndex,
    },
  };
};

export const placeShip = (playerIndex: number, grid: Grid): Action => {
  return {
    type: "PLACE_SHIP",
    payload: {
      playerIndex,
      grid,
    },
  };
};

export const shootTarpido = (
  currentPlayerIndex: number,
  opponentIndex: number,
  index: number
): Action => {
  return {
    type: "SHOOT",
    payload: {
      currentPlayerIndex,
      opponentIndex,
      index,
    },
  };
};

export const resetGame = (): Action => {
  return {
    type: "RESET",
  };
};
