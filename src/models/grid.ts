export type Cell = "empty" | "ship" | "hit" | "miss" | "sunk" | "forbidden";
export type Grid = Cell[];

// getShot = (board: Board, coordinate: Coordinate): Shot
// markShot = (cells: Cell[], shot: Shot): Cell[]
// areAllShipsSunk = (board: Board) => boolean
// isPlaceFree = (ship: Ship, board: Board) => boolean
