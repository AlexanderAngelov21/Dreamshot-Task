export interface SlotConfig {
  reelsCount: number;
  rowsCount: number;
  reels: number[][];
  lines: number[][];
  symbols: Record<number, number[]>;
}
export interface SpinResult {
  reelPositions: number[];
  visibleReels: number[][];
  paylineSymbols: number[][];
  linePayouts: number[];
  totalPayout: number;
}
