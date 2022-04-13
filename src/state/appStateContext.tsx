import { createContext, Dispatch, FC, useContext } from "react";
import { useImmerReducer } from "use-immer";

import { Action } from "./actions";
import { AppState, appStateReducer } from "./appStateReducer";
import { GameState, Player } from "./types";

const appData: AppState = {
  players: [],
  gameState: "NONE",
  currentPlayerId: null,
  opponentId: null,
  winner: null,
  isDeviceTransferInProgress: false,
};

type AppStateContextProps = {
  currentPlayer: Player;
  opponent: Player;
  gameState: GameState;
  isDeviceTransferInProgress: boolean;
  winner: Player | null;
  dispatch: Dispatch<Action>;
  //TODO: If not used remove
  getPlayerById: (playerId: string) => Player | null;
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

  const currentPlayer =
    players.find((player) => player.id === currentPlayerId) || players[0];
  const opponent =
    players.find((player) => player.id === opponentId) || players[1];
  //TODO: If not used remove
  const getPlayerById = (playerId: string) => {
    return players.find((player) => player.id === playerId) || null;
  };

  return (
    <AppStateContext.Provider
      value={{
        currentPlayer,
        opponent,
        dispatch,
        gameState,
        winner,
        //TODO: If not used remove
        getPlayerById,
        isDeviceTransferInProgress,
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
