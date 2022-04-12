import "./styles.css";
import { Board } from "../../components/Board";
import { generateEmptyLayout } from "../../utils/helpers";
import Fleet from "../../components/Fleet/Fleet";

export const Games = () => {
  const squares = generateEmptyLayout();

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
