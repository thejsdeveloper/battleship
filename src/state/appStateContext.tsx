import React, { createContext, Dispatch, FC, useContext } from "react";
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
};

type AppStateContextProps = {
  currentPlayer: Player | null;
  opponent: Player | null;
  gameState: GameState;
  winner: Player | null;
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider: FC = (props) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);

  const { players, currentPlayerId, opponentId, gameState, winner } = state;

  const currentPlayer =
    players.find((player) => player.id === currentPlayerId) || null;
  const opponent = players.find((player) => player.id === opponentId) || null;

  return (
    <AppStateContext.Provider
      value={{ currentPlayer, opponent, dispatch, gameState, winner }}
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
