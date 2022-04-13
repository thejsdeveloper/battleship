import { Position, SquareType } from "../../state/types";
import { indexToCoords } from "../../utils/helpers";
import { GridCell } from "../GridCell";
import "./boardStyles.css";

type BoardProps = {
  playerName: string;
  squares: SquareType[];
  isCurrentPlayer?: boolean;
  disableDone?: boolean;
  onHover?: (position: Position) => void;
  onSingleClick?: (index: number) => void;
  onDoubleClick?: () => void;
  onDoneClick?: () => void;
};

export const Board = ({
  squares,
  onHover,
  onSingleClick,
  onDoubleClick,
  playerName,
  onDoneClick,
  isCurrentPlayer = false,
  disableDone = true,
}: BoardProps) => {
  const handleMouseOver = (index: number) => {
    const position = indexToCoords(index);
    onHover?.(position);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.();
  };

  const handleSingleClick = (index: number) => {
    onSingleClick?.(index);
  };

  return (
    <div className="boardContainer">
      <h1>{playerName}</h1>
      <div className="board">
        {squares.map((square, index) => {
          return (
            <GridCell
              key={`${square}-${index}`}
              square={square}
              onHover={() => handleMouseOver(index)}
              onDoubleClick={handleDoubleClick}
              onSingleClick={() => handleSingleClick(index)}
            />
          );
        })}
      </div>
      {isCurrentPlayer && (
        <button onClick={onDoneClick} disabled={disableDone}>
          Done
        </button>
      )}
    </div>
  );
};
