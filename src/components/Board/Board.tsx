import React from "react";
import { SquareType } from "../../state/types";
import "./boardStyles.css";

type BoardProps = {
  squares: SquareType[];
};

export const Board = ({ squares }: BoardProps) => {
  return (
    <div className="board">
      {squares.map((square, index) => {
        return <div key={`square-${index}`} className={square} />;
      })}
    </div>
  );
};
