import { Ship } from "./ship";

export type Fleet = {
  ships: Ship[];
  selectedShip: Ship | null;
};
