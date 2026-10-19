import { SpinResult, SlotConfig } from "./slot.interface";

export class Slot {
  constructor(private readonly config: SlotConfig) {}

  private countMatchingSymbols(matchingSymbols: number[]): number {
    if (matchingSymbols.length === 0) {
      return 0;
    }
    const firstSymbol: number = matchingSymbols[0];
    let count: number = 1;
    for (let i = 1; i < matchingSymbols.length; i++) {
      if (matchingSymbols[i] !== firstSymbol) {
        break;
      }
      count++;
    }

    return count;
  }

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
    const allLineNumbers: number[][] = [];
    for (let i = 0; i < this.config.lines.length; i++) {
      const line = this.config.lines[i];
      const lineSymbols: number[] = [];
      for (let col = 0; col < line.length; col++) {
        const row = line[col];
        const lineSymbol = columns[col][row];
        lineSymbols.push(lineSymbol);
      }
      allLineNumbers.push(lineSymbols);
    }
    const matchingCountNumbers: number[] = [];
    for (let i = 0; i < allLineNumbers.length; i++) {
      matchingCountNumbers.push(this.countMatchingSymbols(allLineNumbers[i]));
    }
    const linePayouts: number[] = [];
    for (let i = 0; i < allLineNumbers.length; i++) {
      const symbol = allLineNumbers[i][0];
      const count = matchingCountNumbers[i];
      if (count < 3) {
        linePayouts.push(0);
        continue;
      }
      const payouts: number[] = this.config.symbols[symbol];
      const payout: number = payouts[count - 1];
      linePayouts.push(payout);
    }
    return {
      positions,
      columns,
      allLineNumbers,
      linePayouts,
    };
  }
}
