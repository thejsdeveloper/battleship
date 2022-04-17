import { useState } from "react";
import { Ship } from "../../state/types";
import { ShipReplica } from "../ShipReplica";

import "./fleetStyles.css";

type FleetProps = {
  fleet: Ship[];
  onShipSelect: (shipName: string) => void;
};

function Fleet({ onShipSelect, fleet }: FleetProps) {
  const [selectedShip, setSelectedShip] = useState<string>("");

  const handleShipSelect = (shipName: string) => {
    setSelectedShip(shipName);
    onShipSelect(shipName);
  };

  return (
    <div className="fleet">
      <h1>Your Ships</h1>
      <div className="replica-container">
        {fleet.map(({ name, length }, i) => (
          <ShipReplica
            key={name}
            name={name}
            length={length}
            onClick={handleShipSelect}
            isSelected={name === selectedShip}
          />
        ))}
      </div>
    </div>
  );
}

export default Fleet;
