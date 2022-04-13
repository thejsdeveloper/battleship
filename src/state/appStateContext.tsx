import { createContext, Dispatch, FC, useContext } from "react";
import { useImmerReducer } from "use-immer";

import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { AppState, GameState, Player } from "./types";

const appData: AppState = {
  players: [],
  gameState: "NONE",
  currentPlayerId: null,
  opponentId: null,
  winner: null,
  isDeviceTransferInProgress: false,
};

type AppStateContextProps = {
  currentPlayer: Pick<Player, "name" | "id" | "grid">;
  opponent: Pick<Player, "name" | "id" | "grid">;
  gameState: GameState;
  isDeviceTransferInProgress: boolean;
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

  const currentPlayer =
    players.find((player) => player.id === currentPlayerId) || players[0];
  const opponent =
    players.find((player) => player.id === opponentId) || players[1];

  const currentPlayerGrid = currentPlayer?.grid;
  const opponentGrid = opponent?.grid;

  return (
    <AppStateContext.Provider
      value={{
        currentPlayer: {
          name: currentPlayer?.name,
          id: currentPlayer?.id,
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
