import { findPlayerIndexById, findShipIndexByName } from "../utils/arrayUtils";
import {
  generatePlayers,
  getSunkIndices,
  getSunkShips,
  getWinner,
  indexToCoords,
  markShot,
} from "../utils/helpers";
import { Action } from "./actions";
import { AppState, Shot, SquareType } from "./types";

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

    case "UPDATE_SHIP_POSITION": {
      const { playerId, position } = action.payload;

      const currentPlayerIndex = findPlayerIndexById(draft.players, playerId);
      const currentPlayer = draft.players[currentPlayerIndex];
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.position = position;
      }
      break;
    }

    case "ROTATE_SHIP": {
      const { playerId } = action.payload;
      const currentPlayerIndex = findPlayerIndexById(draft.players, playerId);
      const currentPlayer = draft.players[currentPlayerIndex];
      const selectedShip = currentPlayer.fleet.selectedShip;
      if (selectedShip !== null) {
        selectedShip.direction = selectedShip.direction === "H" ? "V" : "H";
      }
      break;
    }

    case "PLACE_SHIP": {
      const { playerId, grid } = action.payload;
      const currentPlayerIndex = findPlayerIndexById(draft.players, playerId);
      const currentPlayer = draft.players[currentPlayerIndex];
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
      break;
    }

    case "SHOOT": {
      const { opponentId, index, currentPlayerId } = action.payload;
      const currentPlayerIndex = findPlayerIndexById(
        draft.players,
        currentPlayerId
      );
      const currentPlayer = draft.players[currentPlayerIndex];

      const opponentIndex = findPlayerIndexById(draft.players, opponentId);
      const opponent = draft.players[opponentIndex];

      const opponentGrid = opponent.grid;
      let shotType: SquareType = "empty";

      if (opponentGrid[index] === "ship") {
        shotType = "hit";
      } else if (opponentGrid[index] === "empty") {
        shotType = "miss";
      }

      const shot: Shot = {
        type: shotType,
        position: indexToCoords(index),
      };

      opponent.grid = markShot(opponentGrid, shot);
      currentPlayer.shots.push(shot);
      currentPlayer.state = "SHOT_TAKEN";

      const sunkShips = getSunkShips(currentPlayer.shots, opponent.fleet.ships);

      sunkShips.forEach((ship) => {
        const shipIndex = findShipIndexByName(opponent.fleet.ships, ship.name);
        opponent.fleet.ships[shipIndex] = {
          ...ship,
          sunk: true,
        };
      });

      const winner = getWinner(currentPlayer, opponent);
      if (winner !== null) {
        draft.winner = winner;
        draft.gameState = "FINISH";
      }

      const sunkIndices = getSunkIndices(
        currentPlayer.shots,
        opponent.fleet.ships
      );

      sunkIndices.forEach((index) => (opponent.grid[index] = "sunk"));

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
