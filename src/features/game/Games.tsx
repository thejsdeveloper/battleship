import "./styles.css";
import { Board } from "../../components/Board";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import {
  play,
  rotateShipDirection,
  selectShip,
  startGame,
  transferGame,
  updateShipPosition,
} from "../../state/actions";
import { WaitingScreen } from "../../components/WaitingScreen";
import { Position } from "../../state/types";

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
    isInPlacingState,
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
    if (isInPlacingState) {
      dispatch(updateShipPosition(currentPlayerId, position));
    }
  };

  const handleGridSingleClick = () => {
    if (isInPlacingState) {
      dispatch(rotateShipDirection(currentPlayerId));
    }
  };
  const handleGridDoubleClick = () => {};

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
          <Board
            squares={currentPlayerGrid}
            onHover={handleGridOnhover}
            onSingleClick={handleGridSingleClick}
            onDoubleClick={handleGridDoubleClick}
          />
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
