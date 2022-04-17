import { Player } from "../../state/types";
import "./winnerStyles.css";

type WinnerScreenProps = {
  onReset: () => void;
  winner?: Player;
};
export const WinnerScreen = ({ onReset, winner }: WinnerScreenProps) => {
  return (
    <div className="main">
      <div className="splash-title font-gradient">Battleship</div>
      <h1>Winner is Vikas 🎉 </h1>
      <button className="button-grad btn-splash btn-icon" onClick={onReset}>
        PLAY AGAIN ?
      </button>
    </div>
  );
};
