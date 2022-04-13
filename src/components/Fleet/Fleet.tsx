import React, { useEffect, useState } from "react";
import { AVAILABLE_SHIPS } from "../../constants";
import { ShipReplica } from "../ShipReplica";

import "./fleetStyles.css";

type FleetProps = {
  onShipSelect: (shipName: string) => void;
};

function Fleet({ onShipSelect }: FleetProps) {
  const [selectedShip, setSelectedShip] = useState<string>("");

  const handleShipSelect = (shipName: string) => {
    setSelectedShip(shipName);
    onShipSelect(selectedShip);
  };

  return (
    <div className="fleet">
      <div className="fleet-title">Your Ships</div>
      {AVAILABLE_SHIPS.map(({ name, length, placed }, i) => (
        <ShipReplica
          key={name}
          name={name}
          length={length}
          onClick={handleShipSelect}
          isSelected={name === selectedShip}
        />
      ))}
    </div>
  );
}

export default Fleet;
