import { useRef } from "react";
import { SquareType } from "../../state/types";

type GridCellProps = {
  square: SquareType;
  onHover?: () => void;
  onDoubleClick?: () => void;
  onSingleClick?: () => void;
};
export const GridCell = ({
  square,
  onHover,
  onDoubleClick,
  onSingleClick,
}: GridCellProps) => {
  const clickCount = useRef(0);

  const handledClick = () => {
    clickCount.current++;
    setTimeout(() => {
      if (clickCount.current === 1) {
        onSingleClick?.();
        clickCount.current = 0;
      }
      if (clickCount.current === 2) {
        onDoubleClick?.();
        clickCount.current = 0;
      }
    }, 300);
  };

  return (
    <div className={square} onClick={handledClick} onMouseOver={onHover} />
  );
};
