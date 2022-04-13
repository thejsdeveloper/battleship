import { findPlayerIndexById, findShipIndexByName } from "../utils/arrayUtils";
import { generatePlayers } from "../utils/helpers";
import { Action } from "./actions";
import { GameState, Player } from "./types";

export type AppState = {
  players: Player[];
  gameState: GameState;
  currentPlayerId: string | null;
  opponentId: string | null;
  winner: Player | null;
  isDeviceTransferInProgress: boolean;
};

export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "START_GAME": {
      const players = generatePlayers();
      draft.players = players;
      draft.currentPlayerId = players[0].id;
      draft.opponentId = players[1].id;
      draft.gameState = "SET_UP";
      draft.isDeviceTransferInProgress = true;
      break;
    }

    case "PLAY": {
      const { currentPlayer } = action.payload;
      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayer.id
      );
      draft.isDeviceTransferInProgress = false;
      draft.players[currentPlayerIndex].state = "READY";
      break;
    }

    case "TRANSFER_DEVICE": {
      const { currentPlayer, nextPlayer } = action.payload;

      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayer.id
      );

      const nextPlayerIndex = findPlayerIndexById(draft.players, nextPlayer.id);

      draft.players[currentPlayerIndex].state = "DONE";
      draft.players[nextPlayerIndex].state = "WAITING";
      draft.isDeviceTransferInProgress = true;
      draft.currentPlayerId = nextPlayer.id;
      draft.opponentId = currentPlayer.id;

      const hasNextPlayerPlacedAllShips = nextPlayer.fleet.ships.length === 0;

      if (draft.gameState === "SET_UP" && hasNextPlayerPlacedAllShips) {
        draft.gameState = "IN_PROGRESS";
      }
      break;
    }

    case "SELECT_SHIP": {
      const { shipName, playerId } = action.payload;

      const currentPlayerIndex = findPlayerIndexById(draft.players, playerId);
      const currentPlayer = draft.players[currentPlayerIndex];

      const selectedShipIndex = findShipIndexByName(
        currentPlayer.fleet.ships,
        shipName
      );
      const selectedShip = currentPlayer.fleet.ships[selectedShipIndex];

      currentPlayer.fleet.selectedShip = selectedShip;
      break;
    }
  }
};
