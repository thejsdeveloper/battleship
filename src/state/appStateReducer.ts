import { findShipIndexByName } from "../utils/arrayUtils";
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
      draft.gameState = "SET_UP";
      draft.isDeviceTransferInProgress = true;
      draft.currentPlayerIndex = 0;
      draft.opponentIndex = 1;
      break;
    }

    case "PLAY": {
      const { currentPlayerIndex } = action.payload;
      draft.isDeviceTransferInProgress = false;
      draft.players[currentPlayerIndex].state = "READY";
      break;
    }

    case "TRANSFER_DEVICE": {
      const { currentPlayerIndex, nextPlayerIndex } = action.payload;

      const nextPlayer = draft.players[nextPlayerIndex];

      draft.players[currentPlayerIndex].state = "DONE";
      draft.players[nextPlayerIndex].state = "WAITING";
      draft.isDeviceTransferInProgress = true;
      draft.currentPlayerIndex = nextPlayerIndex;
      draft.opponentIndex = currentPlayerIndex;

      const hasNextPlayerPlacedAllShips =
        nextPlayer.fleet.ships.filter((ship) => ship.placed === false)
          .length === 0;

      if (draft.gameState === "SET_UP" && hasNextPlayerPlacedAllShips) {
        draft.gameState = "IN_PROGRESS";
      }
      break;
    }

    case "SELECT_SHIP": {
      const { shipName, playerIndex } = action.payload;

      const currentPlayer = draft.players[playerIndex];

      const selectedShipIndex = findShipIndexByName(
        currentPlayer.fleet.ships,
        shipName
      );
      const selectedShip = currentPlayer.fleet.ships[selectedShipIndex];

      currentPlayer.fleet.selectedShip = selectedShip;
      break;
    }

    case "UPDATE_SHIP_POSITION": {
      const { playerIndex, position } = action.payload;

      const currentPlayer = draft.players[playerIndex];
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.position = position;
      }
      break;
    }

    case "ROTATE_SHIP": {
      const { playerIndex } = action.payload;
      const currentPlayer = draft.players[playerIndex];
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.direction = selectedShip.direction === "H" ? "V" : "H";
      }
      break;
    }

    case "PLACE_SHIP":
      {
        const { playerIndex, grid } = action.payload;
        const currentPlayer = draft.players[playerIndex];
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
      const { opponentIndex, index, currentPlayerIndex } = action.payload;
      const currentPlayer = draft.players[currentPlayerIndex];
      const opponent = draft.players[opponentIndex];

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
      draft.currentPlayerIndex = 0;
      draft.opponentIndex = 1;
      draft.gameState = "NONE";
      draft.isDeviceTransferInProgress = false;
      break;
    }
  }
};
