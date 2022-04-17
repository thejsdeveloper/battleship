import { createContext, Dispatch, FC, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { filterOutShips, getPlayerById } from "../utils/arrayUtils";
import { canPlaceShip, getCurrentPlayerGrid } from "../utils/helpers";

import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { AppState, GameState } from "./types";
import { Player } from "../models/player";

const appData: AppState = {
  players: [],
  gameState: "NONE",
  currentPlayerId: "",
  opponentId: "",
  winner: null,
  isDeviceTransferInProgress: false,
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
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: FC = (props) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const {
    players,
    currentPlayerId,
    opponentId,
    gameState,
    winner,
    isDeviceTransferInProgress,
  } = state;

  const currentPlayer = !!players.length
    ? getPlayerById(players, currentPlayerId)
    : players[0];
  const opponent = !!players.length
    ? getPlayerById(players, opponentId)
    : players[1];

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
