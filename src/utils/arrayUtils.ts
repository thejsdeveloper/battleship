import { Player } from "../state/types";

export const findPlayerIndexById = <TPlayer extends Player>(
  palyers: TPlayer[],
  id: string
) => {
  return palyers.findIndex((player) => player.id === id);
};
