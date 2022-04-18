import { Board } from "../../components/Board";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import { ReactComponent as RightArrow } from "../../assets/icons/right_arrow.svg";

import {
  placeShip,
  play,
  resetGame,
  rotateShipDirection,
  selectShip,
  shootTarpido,
  startGame,
  transferGame,
  updateShipPosition,
} from "../../state/actions";
import { WaitingScreen } from "../../components/WaitingScreen";
import { getDoneDisabled } from "../../utils/helpers";
import { WinnerScreen } from "../../components/WinnerScreen";
import { Position } from "../../models/position";

export const Games = () => {
  const {
    gameState,
    dispatch,
    currentPlayer,
    opponent,
    isDeviceTransferInProgress,
    isInPlacingState,
    isValidPlacement,
    winner,
    currentPlayerIndex,
    opponentIndex,
  } = useAppState();

  const { name: currentPlayerName, grid: currentPlayerGrid } = currentPlayer;

  const { name: opponentName, grid: opponentGrid } = opponent;

  const currentPlayerFleet =
    currentPlayer?.fleet?.ships.filter((ship) => ship.placed === false) || [];

  const isGameInSetupState = gameState === "SET_UP";

  const isGameInProgress = gameState === "IN_PROGRESS";

  const isShotTakenByCurrentPlayer = currentPlayer.state === "SHOT_TAKEN";

  const isDoneDisabled = getDoneDisabled(gameState, currentPlayer);

  const isShootAreaDisabled =
    isGameInSetupState || (isGameInProgress && isShotTakenByCurrentPlayer);

  const handleStartGameClick = () => {
    dispatch(startGame());
  };

  const handleOnReady = () => {
    dispatch(play(currentPlayerIndex));
  };

  const handleDoneClick = () => {
    dispatch(transferGame(currentPlayerIndex, opponentIndex));
  };

  const handleShipSelect = (shipName: string) => {
    dispatch(selectShip(currentPlayerIndex, shipName));
  };

  const handleGridOnhover = (position: Position) => {
    if (isInPlacingState) {
      dispatch(updateShipPosition(currentPlayerIndex, position));
    }
  };

  const handleShoot = (index: number) => {
    if (isGameInProgress && !isShootAreaDisabled) {
      dispatch(shootTarpido(currentPlayerIndex, opponentIndex, index));
    }
  };

  const handleGridSingleClick = () => {
    if (isInPlacingState) {
      dispatch(rotateShipDirection(currentPlayerIndex));
    }
  };
  const handleGridDoubleClick = () => {
    if (isInPlacingState && isValidPlacement) {
      dispatch(placeShip(currentPlayerIndex, currentPlayerGrid));
    }
  };

  const handleReset = () => {
    dispatch(resetGame());
  };

  if (gameState === "FINISH" && winner !== null) {
    return <WinnerScreen onReset={handleReset} winner={winner} />;
  }

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
      <div className="game-title font-gradient">Battleship</div>
      <main className="game-view">
        {!!currentPlayerFleet.length && (
          <Fleet onShipSelect={handleShipSelect} fleet={currentPlayerFleet} />
        )}
        <div className="board-container">
          <Board
            playerName={currentPlayerName}
            squares={currentPlayerGrid}
            onHover={handleGridOnhover}
            onSingleClick={() => handleGridSingleClick()}
            onDoubleClick={handleGridDoubleClick}
          />
          <Board
            playerName={opponentName}
            squares={opponentGrid}
            onSingleClick={handleShoot}
          />
        </div>
        <button
          className="button-grad btn-icon done button"
          onClick={handleDoneClick}
          disabled={isDoneDisabled}
        >
          Done
          <div className="icon">
            <RightArrow fill="#fff" stroke="#fff" strokeWidth={50} />
          </div>
        </button>
      </main>
    </div>
  );
};
