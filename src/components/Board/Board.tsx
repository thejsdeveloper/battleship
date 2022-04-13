import React from "react";
import { Position, SquareType } from "../../state/types";
import { indexToCoords } from "../../utils/helpers";
import "./boardStyles.css";

type BoardProps = {
  squares: SquareType[];
  onHover?: (position: Position) => void;
};

export const Board = ({ squares, onHover }: BoardProps) => {
  const handleMouseOver = (index: number) => {
    const position = indexToCoords(index);
    onHover?.(position);
  };

  return (
    <div className="board">
      {squares.map((square, index) => {
        return (
          <div
            key={`square-${index}`}
            className={square}
            onMouseOver={() => handleMouseOver(index)}
          />
        );
      })}
    </div>
  );
};
