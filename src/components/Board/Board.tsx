import { Cell } from "../../models/grid";
import { Position } from "../../models/position";
import { indexToCoords } from "../../utils/helpers";
import { GridCell } from "../GridCell";

type BoardProps = {
  playerName: string;
  squares: Cell[];
  onHover?: (position: Position) => void;
  onSingleClick?: (index: number) => void;
  onDoubleClick?: () => void;
};

export const Board = ({
  squares,
  onHover,
  onSingleClick,
  onDoubleClick,
  playerName,
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
    <div className="board-view">
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
    </div>
  );
};
