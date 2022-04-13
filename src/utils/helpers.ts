import { Player, SquareType } from "../state/types";
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
