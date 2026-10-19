export interface SlotConfig {
  reelsCount: number;
  rowsCount: number;
  reels: number[][];
  lines: number[][];
  symbols: Record<number, number[]>;
}
export interface SpinResult {
  positions: number[];
  columns: number[][];
  allLineNumbers: number[][];
}
