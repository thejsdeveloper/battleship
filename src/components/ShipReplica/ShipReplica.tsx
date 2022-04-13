import React from "react";
import "./shipReplicaStyles.css";

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
  const shipLength = new Array(length).fill("ship");
  const shipTiles = shipLength.map((_, i) => (
    <div key={`${name}-${i}`} className="ship-tile" />
  ));

  return (
    <div
      className={isSelected ? "replica placing" : "replica"}
      onClick={() => onClick(name)}
    >
      <div className="title">{name}</div>
      <div className="tile">{shipTiles}</div>
    </div>
  );
};
