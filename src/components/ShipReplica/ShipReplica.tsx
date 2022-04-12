import React from "react";
import "./shipReplicaStyles.css";

type ShipReplicaProps = {
  name: string;
  length: number;
};

export const ShipReplica = ({ name, length }: ShipReplicaProps) => {
  const shipLength = new Array(length).fill("ship");
  const shipTiles = shipLength.map((_, i) => (
    <div key={`${name}-${i}`} className="ship-tile" />
  ));

  return (
    <div className="replica">
      <div className="title">{name}</div>
      <div className="tile">{shipTiles}</div>
    </div>
  );
};
