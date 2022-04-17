import { ReactComponent as RightArrow } from "../../assets/icons/right_arrow.svg";

type WelcomeScreenProps = {
  onClick: () => void;
};

export const WelcomeScreen = ({ onClick }: WelcomeScreenProps) => {
  return (
    <div className="main">
      <div className="splash-title font-gradient">Battleship</div>
      <button className="button-grad btn-splash btn-icon" onClick={onClick}>
        START
        <div className="icon">
          <RightArrow fill="#fff" stroke="#fff" strokeWidth={50} />
        </div>
      </button>
    </div>
  );
};
