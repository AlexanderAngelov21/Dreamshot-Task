export interface SlotConfig {
  reelsCount: number;
  rowsCount: number;
  reels: number[][];
  lines: number[][];
}
export interface SpinResult {
  positions: number[];
  columns: number[][];
  allLineNumbers: number[][];
}
