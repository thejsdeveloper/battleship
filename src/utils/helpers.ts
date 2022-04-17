import { GameState } from "../state/types";
import { nanoid } from "nanoid";
import { AVAILABLE_SHIPS, BOARD_COLUMNS, BOARD_ROWS } from "../constants";
import { Cell, Grid } from "../models/grid";
import { Player } from "../models/player";
import { Position } from "../models/position";
import { Ship } from "../models/ship";
import { Shot } from "../models/shot";
import { findShipIndexByName } from "./arrayUtils";

export const generateEmptyLayout = () => {
  return new Array<Cell>(BOARD_ROWS * BOARD_COLUMNS).fill("empty");
};

export const generatePlayers = (): Player[] => {
  return [
    {
      id: nanoid(),
      name: "Player 1",
      state: "WAITING",
      grid: generateEmptyLayout(),
      shots: [],
      fleet: {
        ships: AVAILABLE_SHIPS,
        selectedShip: null,
      },
    },
    {
      id: nanoid(),
      name: "Player 2",
      state: "WAITING",
      grid: generateEmptyLayout(),
      shots: [],
      fleet: {
        ships: AVAILABLE_SHIPS,
        selectedShip: null,
      },
    },
  ];
};

export const coordsToIndex = (coordinates: Position): number => {
  const { x, y } = coordinates;

  return y * BOARD_ROWS + x;
};

export const indexToCoords = (index: number) => {
  return {
    x: index % BOARD_ROWS,
    y: Math.floor(index / BOARD_ROWS),
  };
};

export const isWithinBound = (ship: Ship) => {
  const { length, direction, position } = ship;
  if (direction === "H" && position !== null) {
    return position.x + length <= BOARD_COLUMNS;
  }

  if (direction === "V" && position !== null) {
    return position.y + length <= BOARD_ROWS;
  }

  return false;
};

export const getShipIndices = (ship: Ship): number[] => {
  const { length, position, direction } = ship;
  const indices = [];
  for (let i = 0; i < length; i++) {
    if (position !== null) {
      if (direction === "H") {
        indices.push(
          coordsToIndex({
            x: position.x + i,
            y: position.y,
          })
        );
      } else {
        indices.push(
          coordsToIndex({
            x: position.x,
            y: position.y + i,
          })
        );
      }
    }
  }

  return indices;
};

export const isPlaceFree = (ship: Ship, grid: Grid) => {
  const shipIndices = getShipIndices(ship);
  return shipIndices.every((index) => grid[index] === "empty");
};

export const canPlaceShip = (ship: Ship, grid: Grid) => {
  return isWithinBound(ship) && isPlaceFree(ship, grid);
};

export const getOverhang = (ship: Ship) => {
  const { length, direction, position, name } = ship;
  if (position === null) {
    throw new Error(`Position for selected ship ${name} is null`);
  }

  return Math.max(
    direction === "V"
      ? position.y + length - BOARD_ROWS
      : position.x + length - BOARD_COLUMNS,
    0
  );
};

export const placeInGrid = (grid: Grid, ship: Ship, type: Cell) => {
  if (type === "ship" || type === "forbidden") {
    getShipIndices(ship).forEach((index) => {
      grid[index] = type;
    });
  }

  return grid;
};

export const getShot = (grid: Grid, index: number): Shot => {
  return {
    type: grid[index] === "ship" ? "hit" : "miss",
    position: indexToCoords(index),
  };
};

export const markShot = (grid: Grid, shot: Shot) => {
  const newGrid = grid.slice();
  newGrid[coordsToIndex(shot.position)] = shot.type;
  return newGrid;
};

export const getCurrentPlayerGrid = (
  currentPlayer: Player,
  gameState: GameState
): Grid => {
  let currentPlayerGrid = currentPlayer?.grid.slice();
  const selectedShip = currentPlayer?.fleet.selectedShip;

  if (selectedShip?.position && gameState === "SET_UP") {
    if (canPlaceShip(selectedShip, currentPlayerGrid)) {
      currentPlayerGrid = placeInGrid(currentPlayerGrid, selectedShip, "ship");
    } else {
      const invalidShip = {
        ...selectedShip,
        length: selectedShip.length - getOverhang(selectedShip),
      };

      currentPlayerGrid = placeInGrid(
        currentPlayerGrid,
        invalidShip,
        "forbidden"
      );
    }
  }
  return currentPlayerGrid;
};

const getSunkIndices = (playerShots: Shot[], opponentShips: Ship[]) => {
  const hits = playerShots.filter((shot) => shot.type === "hit");
  const hitIndices = new Set(hits.map((hit) => coordsToIndex(hit.position)));

  const sunkIndices = opponentShips
    .filter((ship) => {
      const shipIndices = getShipIndices(ship);
      return shipIndices.every((index) => hitIndices.has(index));
    })
    .map((sunkShip) => getShipIndices(sunkShip))
    .flat();

  return sunkIndices;
};

const getSunkShips = (playerShots: Shot[], opponentShips: Ship[]) => {
  const hits = playerShots.filter((shot) => shot.type === "hit");
  const hitIndices = new Set(hits.map((hit) => coordsToIndex(hit.position)));
  return opponentShips.filter((ship) => {
    const shipIndices = getShipIndices(ship);
    return shipIndices.every((index) => hitIndices.has(index));
  });
};

export const updateOppnentShipState = (
  currentPlayerShots: Shot[],
  opponentShips: Ship[]
) => {
  const sunkShips = getSunkShips(currentPlayerShots, opponentShips);

  sunkShips.forEach((ship) => {
    const shipIndex = findShipIndexByName(opponentShips, ship.name);
    opponentShips[shipIndex] = {
      ...ship,
      sunk: true,
    };
  });
};

export const updatedOpponentGrid = (
  currentPlayerShots: Shot[],
  opponent: Player
) => {
  const sunkIndices = getSunkIndices(currentPlayerShots, opponent.fleet.ships);
  sunkIndices.forEach((index) => (opponent.grid[index] = "sunk"));
};

export const getWinner = (
  currentPlayer: Player,
  opponent: Player
): Player | null => {
  const isOpponentWinner = currentPlayer.fleet.ships.every(
    (ship) => ship.sunk === true
  );
  const isCurrentPlayerWinner = opponent.fleet.ships.every(
    (ship) => ship.sunk === true
  );

  return isOpponentWinner
    ? opponent
    : isCurrentPlayerWinner
    ? currentPlayer
    : null;
};

export const getDoneDisabled = (
  gameState: GameState,
  currentPlayer: Player
) => {
  return (
    (gameState === "SET_UP" &&
      currentPlayer?.fleet?.ships.filter((ship) => ship.placed === false)
        .length > 0) ||
    (gameState === "IN_PROGRESS" && !(currentPlayer.state === "SHOT_TAKEN")) ||
    gameState === "FINISH"
  );
};
