import { SpinResult, SlotConfig } from "./slot.interface";

export class Slot {
  constructor(private readonly config: SlotConfig) {}
  spin(): SpinResult {
    const columns: number[][] = [];
    const positions: number[] = [];
    for (let col = 0; col < this.config.reelsCount; col++) {
      const reel = this.config.reels[col];
      const start = Math.floor(Math.random() * reel.length);
      const visibleSymbols: number[] = [];
      positions.push(start);
      for (let row = 0; row < this.config.rowsCount; row++) {
        const index = (start + row) % reel.length;
        visibleSymbols.push(reel[index]);
      }
      columns.push(visibleSymbols);
    }
    return {
      positions,
      columns,
    };
  }
}
