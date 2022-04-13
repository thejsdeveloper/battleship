import { Player } from "../../state/types";
import "./winnerStyles.css";

type WinnerScreenProps = {
  onReset: () => void;
  winner: Player;
};
export const WinnerScreen = ({ onReset, winner }: WinnerScreenProps) => {
  return (
    <div className="winnerScreen">
      <div className="game-title">Battleship</div>
      <h1>Winner is {winner.name} 🎉 </h1>
      <button className="button" onClick={onReset}>
        PLAY AGAIN ?
      </button>
    </div>
  );
};
