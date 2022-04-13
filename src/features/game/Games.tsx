import "./styles.css";
import { Board } from "../../components/Board";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import {
  placeShip,
  play,
  rotateShipDirection,
  selectShip,
  shootTarpido,
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
    currentPlayer,
    opponent,
    isDeviceTransferInProgress,
    isInPlacingState,
    isValidPlacement,
  } = useAppState();

  const {
    name: currentPlayerName,
    id: currentPlayerId,
    grid: currentPlayerGrid,
  } = currentPlayer;

  const { name: opponentName, id: opponentId, grid: opponentGrid } = opponent;

  const currentPlayerFleet = currentPlayer?.fleet?.ships || [];

  const isGameInSetupState = gameState === "SET_UP";

  const isGameInProgress = gameState === "IN_PROGRESS";

  const isShotTakenByCurrentPlayer = currentPlayer.state === "SHOT_TAKEN";

  const isDoneDisabled =
    (isGameInSetupState && currentPlayer?.fleet?.ships.length > 0) ||
    (isGameInProgress && !isShotTakenByCurrentPlayer);

  const isShootAreaDisabled =
    isGameInSetupState || (isGameInProgress && isShotTakenByCurrentPlayer);

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

  const handleShoot = (index: number) => {
    if (isGameInProgress && !isShootAreaDisabled) {
      dispatch(shootTarpido(currentPlayerId, opponentId, index));
    }
  };

  const handleGridSingleClick = () => {
    if (isInPlacingState) {
      dispatch(rotateShipDirection(currentPlayerId));
    }
  };
  const handleGridDoubleClick = () => {
    if (isInPlacingState && isValidPlacement) {
      dispatch(placeShip(currentPlayerId, currentPlayerGrid));
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
        {!!currentPlayerFleet.length && (
          <Fleet onShipSelect={handleShipSelect} fleet={currentPlayerFleet} />
        )}
        <Board
          isCurrentPlayer={true}
          disableDone={isDoneDisabled}
          playerName={currentPlayerName}
          squares={currentPlayerGrid}
          onHover={handleGridOnhover}
          onSingleClick={() => handleGridSingleClick()}
          onDoubleClick={handleGridDoubleClick}
          onDoneClick={handleDoneClick}
        />
        <Board
          playerName={opponentName}
          squares={opponentGrid}
          onSingleClick={handleShoot}
        />
      </div>
    </div>
  );
};
