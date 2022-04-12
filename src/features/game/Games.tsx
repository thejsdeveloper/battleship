import "./styles.css";
import { Board } from "../../components/Board";
import { generateEmptyLayout } from "../../utils/helpers";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import { startGame, transferGame } from "../../state/actions";
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

  const handleStartGameClick = () => {
    dispatch(startGame());
  };

  const handleOnReady = () => {};

  const handleDoneClick = () => {
    dispatch(transferGame(currentPlayer, opponent));
  };

  if (gameState === "NONE") {
    return <WelcomeScreen onClick={handleStartGameClick} />;
  }

  if (isDeviceTransferInProgress) {
    return (
      <WaitingScreen
        nextPlayer={currentPlayer.name}
        onReadyClick={handleOnReady}
      />
    );
  }

  return (
    <div className="game">
      <div className="game-title">Battleship</div>
      <div className="game-view">
        <Fleet />
        <div className="boardContainer">
          <Board squares={squares} />
          <button onClick={handleDoneClick}>Done</button>
        </div>
      </div>
    </div>
  );
};
