import { Position, SquareType } from "../../state/types";
import { indexToCoords } from "../../utils/helpers";
import { GridCell } from "../GridCell";
import "./boardStyles.css";

type BoardProps = {
  isCurrentPlayer?: boolean;
  playerName: string;
  squares: SquareType[];
  onHover?: (position: Position) => void;
  onSingleClick?: () => void;
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
}: BoardProps) => {
  const handleMouseOver = (index: number) => {
    const position = indexToCoords(index);
    onHover?.(position);
  };

  const handleDoubleClick = () => {
    onDoubleClick?.();
  };

  const handleSingleClick = () => {
    onSingleClick?.();
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
              onSingleClick={handleSingleClick}
            />
          );
        })}
      </div>
      {isCurrentPlayer && <button onClick={onDoneClick}>Done</button>}
    </div>
  );
};
