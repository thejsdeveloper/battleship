import { findPlayerIndexById } from "../utils/arrayUtils";
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
      break;
    }
    case "TRANSFER_DEVICE": {
      const { currentPlayer, nextPlayer } = action.payload;

      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayer.id
      );

      const nextPlayerIndex = findPlayerIndexById(draft.players, nextPlayer.id);

      draft.players[currentPlayerIndex].state = "WAITING";
      draft.players[nextPlayerIndex].state = "WAITING";
      draft.currentPlayerId = nextPlayer.id;
      draft.opponentId = currentPlayer.id;
      draft.isDeviceTransferInProgress = true;

      break;
    }
  }
};
