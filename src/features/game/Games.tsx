import { Board } from "../../components/Board";
import { generateEmptyLayout } from "../../utils/helpers";

export const Games = () => {
  const squares = generateEmptyLayout();

  return (
    <div>
      Games
      <Board squares={squares} />
    </div>
  );
};
