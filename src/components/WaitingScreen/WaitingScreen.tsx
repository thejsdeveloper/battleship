import "./styles.css";

type WaitingScreenPros = {
  nextPlayer: string;
  onReadyClick: () => void;
};

export const WaitingScreen = ({
  nextPlayer,
  onReadyClick,
}: WaitingScreenPros) => {
  return (
    <div className="waitingScreen">
      <div className="game-title">Battleship</div>
      <div>{nextPlayer}'s Turn</div>
      <button className="button" onClick={onReadyClick}>
        PLAY
      </button>
    </div>
  );
};
