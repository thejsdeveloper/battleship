import React from "react";
import { AVAILABLE_SHIPS } from "../../constants";
import { ShipReplica } from "../ShipReplica";

import "./fleetStyles.css";

function Fleet() {
  return (
    <div className="fleet">
      <div className="fleet-title">Your Ships</div>
      {AVAILABLE_SHIPS.map(({ name, length, placed }, i) => (
        <ShipReplica key={name} name={name} length={length} />
      ))}
    </div>
  );
}

export default Fleet;
