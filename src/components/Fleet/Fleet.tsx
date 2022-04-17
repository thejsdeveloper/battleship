import { useState } from "react";
import { Ship } from "../../models/ship";
import { ShipReplica } from "../ShipReplica";

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
      <div className="instructions">
        Double click to Position the ship. Single click to rotate before you
        position.
      </div>
    </div>
  );
}

export default Fleet;
