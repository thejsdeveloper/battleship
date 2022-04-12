import "./styles.css";
import { Board } from "../../components/Board";
import { generateEmptyLayout } from "../../utils/helpers";
import Fleet from "../../components/Fleet/Fleet";
import { useAppState } from "../../state/appStateContext";
import { WelcomeScreen } from "../../components/WelcomeScreen";
import { startGame } from "../../state/actions";

export const Games = () => {
  const squares = generateEmptyLayout();

  const { gameState, dispatch } = useAppState();

  const handleStartGameClick = () => {
    dispatch(startGame());
  };

  if (gameState === "NONE") {
    return <WelcomeScreen onClick={handleStartGameClick} />;
  }

  return (
    <div className="game">
      <div className="game-title">Battleship</div>
      <div className="game-view">
        <Fleet />
        <Board squares={squares} />
      </div>
    </div>
  );
};
