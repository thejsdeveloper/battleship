import "./styles.css";

type WelcomeScreenProps = {
  onClick: () => void;
};

export const WelcomeScreen = ({ onClick }: WelcomeScreenProps) => {
  return (
    <div className="welcome">
      <div className="game-title">Battleship</div>
      <button className="button" onClick={onClick}>
        START
      </button>
    </div>
  );
};
