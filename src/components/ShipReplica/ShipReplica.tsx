import { useAppState } from "../../state/appStateContext";
import { useShipDrag } from "../../utils/useShipDrag";

type ShipReplicaProps = {
  name: string;
  length: number;
  isSelected: boolean;
  onClick: (shipName: string) => void;
};

export const ShipReplica = ({
  name,
  length,
  onClick,
  isSelected = false,
}: ShipReplicaProps) => {
  const { currentPlayer } = useAppState();
  const { isDragging, drag } = useShipDrag({
    type: "SHIP",
    playerId: currentPlayer.id,
    shipName: name,
  });

  // console.log("Is Draging ---", isDragging);

  const shipLength = new Array(length).fill("ship");
  const shipTiles = shipLength.map((_, i) => (
    <div key={`${name}-${i}`} className="ship-tile" />
  ));

  return (
    <button
      ref={drag}
      className={isSelected ? "replica placing" : "replica"}
      style={{
        opacity: isDragging ? 0.5 : 1,
        color: "red",
      }}
      // onClick={() => onClick(name)}
    >
      <div className="title">{name}</div>
      <div className="tile">{shipTiles}</div>
    </button>
  );
};
