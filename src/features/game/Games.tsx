import "./styles.css";
import { Board } from "../../components/Board";
import { generateEmptyLayout } from "../../utils/helpers";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import { play, selectShip, startGame, transferGame } from "../../state/actions";
import { WaitingScreen } from "../../components/WaitingScreen";

export const Games = () => {
  const squares = generateEmptyLayout();

  const {
    gameState,
    dispatch,
    currentPlayer,
    opponent,
    isDeviceTransferInProgress,
  } = useAppState();

  const isGameInSetupState = gameState === "SET_UP";

  const handleStartGameClick = () => {
    dispatch(startGame());
  };

  const handleOnReady = () => {
    dispatch(play(currentPlayer));
  };

  const handleDoneClick = () => {
    dispatch(transferGame(currentPlayer, opponent));
  };

  const handleShipSelect = (shipName: string) => {
    dispatch(selectShip(currentPlayer.id, shipName));
  };

  if (gameState === "NONE") {
    return <WelcomeScreen onClick={handleStartGameClick} />;
  }

  if (isDeviceTransferInProgress) {
    return (
      <WaitingScreen
        nextPlayer={currentPlayer.name}
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
          <Board squares={squares} />
          <button onClick={handleDoneClick}>Done</button>
        </div>
      </div>
    </div>
  );
};
