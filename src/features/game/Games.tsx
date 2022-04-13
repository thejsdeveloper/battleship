import "./styles.css";
import { Board } from "../../components/Board";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import {
  placeShip,
  play,
  selectShip,
  startGame,
  transferGame,
} from "../../state/actions";
import { WaitingScreen } from "../../components/WaitingScreen";
import { Position } from "../../state/types";
import { canPlaceShip, getShipIndices } from "../../utils/helpers";

export const Games = () => {
  const {
    gameState,
    dispatch,
    currentPlayer: {
      name: currentPlayerName,
      id: currentPlayerId,
      grid: currentPlayerGrid,
    },
    opponent: { name: opponentName, id: opponentId, grid: opponentGrid },
    isDeviceTransferInProgress,
  } = useAppState();

  const isGameInSetupState = gameState === "SET_UP";

  const handleStartGameClick = () => {
    dispatch(startGame());
  };

  const handleOnReady = () => {
    dispatch(play(currentPlayerId));
  };

  const handleDoneClick = () => {
    dispatch(transferGame(currentPlayerId, opponentId));
  };

  const handleShipSelect = (shipName: string) => {
    dispatch(selectShip(currentPlayerId, shipName));
  };

  const handleGridOnhover = (position: Position) => {
    if (gameState === "SET_UP") {
      // dispatch(placeShip(currentPlayer.id, position))
      // const currentPlayerIndex = findPlayerIndexById(draft.players, playerId);
      // const currentPlayer = draft.players[currentPlayerIndex];
      // const selectedShip = currentPlayer.fleet.selectedShip;
      // const grid = currentPlayer.grid.slice();
      // if (selectedShip) {
      //   const ship = {
      //     ...selectedShip,
      //     position,
      //   };
      //   if (canPlaceShip(ship, currentPlayerGrid)) {
      //     getShipIndices(ship).forEach((index) => (grid[index] = "ship"));
      //     currentPlayerGrid = grid;
      //   }
      // }
    }
  };

  if (gameState === "NONE") {
    return <WelcomeScreen onClick={handleStartGameClick} />;
  }

  if (isDeviceTransferInProgress) {
    return (
      <WaitingScreen
        nextPlayer={currentPlayerName}
        onReadyClick={handleOnReady}
        isSetUPState={isGameInSetupState}
      />
    );
  }

  return (
    <div className="game">
      <div className="game-title">Battleship</div>
      <div className="game-view">
        <Fleet onShipSelect={handleShipSelect} />
        <div className="boardContainer">
          <h1>{currentPlayerName}</h1>
          <Board squares={currentPlayerGrid} onHover={handleGridOnhover} />
          <button onClick={handleDoneClick}>Done</button>
        </div>
        <div className="boardContainer">
          <h1>{opponentName}</h1>
          <Board squares={opponentGrid} />
        </div>
      </div>
    </div>
  );
};
