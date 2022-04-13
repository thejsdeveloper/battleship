import { createContext, Dispatch, FC, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { getPlayerById } from "../utils/arrayUtils";
import { canPlaceShip, getOverhang, placeInGrid } from "../utils/helpers";

import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { AppState, GameState, Player } from "./types";

const appData: AppState = {
  players: [],
  gameState: "NONE",
  currentPlayerId: "",
  opponentId: "",
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

  const currentPlayer = getPlayerById(players, currentPlayerId) || players[0];
  const opponent = getPlayerById(players, opponentId) || players[1];

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
