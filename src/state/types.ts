import { Player } from "../models/player";

export type GameState = "NONE" | "SET_UP" | "IN_PROGRESS" | "FINISH";

export type AppState = {
  gameState: GameState;
  players: Player[];
  currentPlayerIndex: number;
  opponentIndex: number;
  winner: Player | null;
  isDeviceTransferInProgress: boolean;
};
