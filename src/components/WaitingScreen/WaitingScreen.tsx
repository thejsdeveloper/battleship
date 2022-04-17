import { ReactComponent as RightArrow } from "../../assets/icons/right_arrow.svg";

type WaitingScreenPros = {
  nextPlayer: string;
  onReadyClick: () => void;
  isSetUPState: boolean;
};

export const WaitingScreen = ({
  nextPlayer,
  onReadyClick,
  isSetUPState,
}: WaitingScreenPros) => {
  return (
    <div className="main">
      <div className="splash-title font-gradient">Battleship</div>
      <h2 className="player">{nextPlayer}'s Turn</h2>
      <button
        className="button-grad btn-splash btn-icon"
        onClick={onReadyClick}
      >
        {isSetUPState ? "SET UP YOUR FLEET" : "GO"}
        <div className="icon">
          <RightArrow fill="#fff" stroke="#fff" strokeWidth={50} />
        </div>
      </button>
    </div>
  );
};
