import { Grid, Player, Position, Ship, SquareType } from "../state/types";
import { nanoid } from "nanoid";
import { AVAILABLE_SHIPS, BOARD_COLUMNS, BOARD_ROWS } from "../constants";

export const generateEmptyLayout = () => {
  return new Array<SquareType>(BOARD_ROWS * BOARD_COLUMNS).fill("empty");
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

export const placeInGrid = (grid: Grid, ship: Ship, type: SquareType) => {
  if (type === "ship" || type === "forbidden") {
    getShipIndices(ship).forEach((index) => {
      grid[index] = type;
    });
  }

  return grid;
};
