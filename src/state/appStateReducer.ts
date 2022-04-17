import {
  findPlayerIndexById,
  findShipIndexByName,
  getPlayerById,
} from "../utils/arrayUtils";
import {
  generatePlayers,
  getShot,
  getWinner,
  markShot,
  updatedOpponentGrid,
  updateOppnentShipState,
} from "../utils/helpers";
import { Action } from "./actions";
import { AppState } from "./types";

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
      const { currentPlayerId } = action.payload;
      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayerId
      );
      draft.isDeviceTransferInProgress = false;
      draft.players[currentPlayerIndex].state = "READY";
      break;
    }

    case "TRANSFER_DEVICE": {
      const { currentPlayerId, nextPlayerId } = action.payload;

      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayerId
      );

      const nextPlayerIndex = findPlayerIndexById(draft.players, nextPlayerId);
      const nextPlayer = draft.players[nextPlayerIndex];

      draft.players[currentPlayerIndex].state = "DONE";
      draft.players[nextPlayerIndex].state = "WAITING";
      draft.isDeviceTransferInProgress = true;
      draft.currentPlayerId = nextPlayerId;
      draft.opponentId = currentPlayerId;

      const hasNextPlayerPlacedAllShips =
        nextPlayer.fleet.ships.filter((ship) => ship.placed === false)
          .length === 0;

      if (draft.gameState === "SET_UP" && hasNextPlayerPlacedAllShips) {
        draft.gameState = "IN_PROGRESS";
      }
      break;
    }

    case "SELECT_SHIP": {
      const { shipName, playerId } = action.payload;

      const currentPlayer = getPlayerById(draft.players, playerId);

      const selectedShipIndex = findShipIndexByName(
        currentPlayer.fleet.ships,
        shipName
      );
      const selectedShip = currentPlayer.fleet.ships[selectedShipIndex];

      currentPlayer.fleet.selectedShip = selectedShip;
      break;
    }

    case "UPDATE_SHIP_POSITION": {
      const { playerId, position } = action.payload;

      const currentPlayer = getPlayerById(draft.players, playerId);
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.position = position;
      }
      break;
    }

    case "ROTATE_SHIP": {
      const { playerId } = action.payload;
      const currentPlayer = getPlayerById(draft.players, playerId);
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.direction = selectedShip.direction === "H" ? "V" : "H";
      }
      break;
    }

    case "PLACE_SHIP":
      {
        const { playerId, grid } = action.payload;
        const currentPlayer = getPlayerById(draft.players, playerId);
        const selectedShip = currentPlayer.fleet.selectedShip;
        if (selectedShip !== null) {
          const shipIndex = findShipIndexByName(
            currentPlayer.fleet.ships,
            selectedShip.name
          );
          currentPlayer.fleet.ships[shipIndex] = {
            ...selectedShip,
            placed: true,
          };
        }
        currentPlayer.grid = grid;
        currentPlayer.fleet.selectedShip = null;
      }
      break;

    case "SHOOT": {
      const { opponentId, index, currentPlayerId } = action.payload;
      const currentPlayer = getPlayerById(draft.players, currentPlayerId);
      const opponent = getPlayerById(draft.players, opponentId);

      const opponentGrid = opponent.grid;
      const shot = getShot(opponentGrid, index);
      opponent.grid = markShot(opponentGrid, shot);

      currentPlayer.shots.push(shot);
      currentPlayer.state = "SHOT_TAKEN";

      updateOppnentShipState(currentPlayer.shots, opponent.fleet.ships);
      updatedOpponentGrid(currentPlayer.shots, opponent);

      const winner = getWinner(currentPlayer, opponent);
      if (winner !== null) {
        draft.winner = winner;
        draft.gameState = "FINISH";
      }
      break;
    }

    case "RESET": {
      const players = generatePlayers();
      draft.players = players;
      draft.currentPlayerId = players[0].id;
      draft.opponentId = players[1].id;
      draft.gameState = "NONE";
      draft.isDeviceTransferInProgress = false;
      break;
    }
  }
};
