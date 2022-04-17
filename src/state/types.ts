import { Player } from "../models/player";

export type GameState = "NONE" | "SET_UP" | "IN_PROGRESS" | "FINISH";

export type AppState = {
  players: Player[];
  currentPlayerId: string;
  opponentId: string;
  gameState: GameState;
  winner: Player | null;
  isDeviceTransferInProgress: boolean;
};
