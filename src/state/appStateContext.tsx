import { createContext, Dispatch, FC, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { filterOutShips } from "../utils/arrayUtils";
import { canPlaceShip, getCurrentPlayerGrid } from "../utils/helpers";

import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { AppState, GameState } from "./types";
import { Player } from "../models/player";

const appData: AppState = {
  players: [],
  gameState: "NONE",
  winner: null,
  isDeviceTransferInProgress: false,
  currentPlayerIndex: 0,
  opponentIndex: 1,
};

type AppStateContextProps = {
  currentPlayer: Player;
  opponent: Pick<Player, "name" | "id" | "grid">;
  gameState: GameState;
  isDeviceTransferInProgress: boolean;
  isInPlacingState: boolean;
  isValidPlacement: boolean;
  winner: Player | null;
  dispatch: Dispatch<Action>;
  currentPlayerIndex: number;
  opponentIndex: number;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: FC = (props) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const {
    players,
    gameState,
    winner,
    isDeviceTransferInProgress,
    currentPlayerIndex,
    opponentIndex,
  } = state;

  const currentPlayer = players[currentPlayerIndex];
  const opponent = players[opponentIndex];

  const isInPlacingState =
    gameState === "SET_UP" && !!currentPlayer.fleet.selectedShip;

  const isValidPlacement =
    !!currentPlayer?.fleet.selectedShip &&
    canPlaceShip(currentPlayer?.fleet.selectedShip, currentPlayer.grid);

  const currentPlayerGrid = getCurrentPlayerGrid(currentPlayer, gameState);
  const opponentGrid = filterOutShips(opponent?.grid || []);

  return (
    <AppStateContext.Provider
      value={{
        currentPlayer: {
          ...currentPlayer,
          grid: currentPlayerGrid,
        },
        opponent: {
          name: opponent?.name,
          id: opponent?.id,
          grid: opponentGrid,
        },
        dispatch,
        gameState,
        winner,
        isDeviceTransferInProgress,
        isInPlacingState,
        isValidPlacement,
        currentPlayerIndex,
        opponentIndex,
      }}
      {...props}
    />
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error(`useAppState must be used within AppStateProvider`);
  }

  return context;
};
