import { useState } from "react";
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
    onShipSelect(shipName);
  };

  return (
    <div className="fleet">
      <h1>Your Ships</h1>
      {AVAILABLE_SHIPS.map(({ name, length }, i) => (
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
