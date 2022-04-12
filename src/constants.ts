import { Ship } from "./state/types";

export const BOARD_ROWS = 10;
export const BOARD_COLUMNS = 10;
export const BOARD = BOARD_COLUMNS * BOARD_ROWS;

export const AVAILABLE_SHIPS: Ship[] = [
  {
    name: "carrier",
    length: 4,
    placed: false,
    sunk: false,
    direction: "H",
    position: null,
  },
  {
    name: "battleship",
    length: 3,
    placed: false,
    sunk: false,
    direction: "H",
    position: null,
  },
  {
    name: "cruiser",
    length: 2,
    placed: false,
    sunk: false,
    direction: "H",
    position: null,
  },
  {
    name: "destroyer",
    length: 1,
    placed: false,
    sunk: false,
    direction: "H",
    position: null,
  },
];
