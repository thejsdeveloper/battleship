import "./styles.css";

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
    <div className="waitingScreen">
      <div className="game-title">Battleship</div>
      <div>{nextPlayer}'s Turn</div>
      <button className="button" onClick={onReadyClick}>
        {isSetUPState ? "SET UP YOUR FLEET" : "PLAY"}
      </button>
    </div>
  );
};
