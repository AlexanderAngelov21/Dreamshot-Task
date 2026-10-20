import type { SpinResult, SlotConfig } from "./slot.interface";

export class Slot {
  constructor(private readonly config: SlotConfig) {}

  spin(): SpinResult {
    const { reelPositions, visibleReels } = this.generateVisibleReels();

    const paylineSymbols = this.getPaylineSymbols(visibleReels);

    const linePayouts = this.calculateLinePayouts(paylineSymbols);

    const totalPayout = linePayouts.reduce((sum, payout) => sum + payout, 0);

    return {
      reelPositions,
      visibleReels,
      paylineSymbols,
      linePayouts,
      totalPayout,
    };
  }

  private generateVisibleReels(): {
    reelPositions: number[];
    visibleReels: number[][];
  } {
    const reelPositions: number[] = [];
    const visibleReels: number[][] = [];

    for (let col = 0; col < this.config.reelsCount; col++) {
      const reel = this.config.reels[col];
      const start = Math.floor(Math.random() * reel.length);

      reelPositions.push(start);

      const visibleSymbols: number[] = [];

      for (let row = 0; row < this.config.rowsCount; row++) {
        const index = (start + row) % reel.length;
        visibleSymbols.push(reel[index]);
      }

      visibleReels.push(visibleSymbols);
    }

    return { reelPositions, visibleReels };
  }

  private getPaylineSymbols(visibleReels: number[][]): number[][] {
    const paylineSymbols: number[][] = [];

    for (const line of this.config.lines) {
      const lineSymbols: number[] = [];

      for (let col = 0; col < line.length; col++) {
        const row = line[col];
        lineSymbols.push(visibleReels[col][row]);
      }

      paylineSymbols.push(lineSymbols);
    }

    return paylineSymbols;
  }

  private calculateLinePayouts(paylineSymbols: number[][]): number[] {
    const linePayouts: number[] = [];

    for (const line of paylineSymbols) {
      const count = this.countMatchingSymbols(line);

      if (count < 3) {
        linePayouts.push(0);
        continue;
      }

      const symbol = line[0];
      const payouts = this.config.symbols[symbol];

      linePayouts.push(payouts[count - 1]);
    }

    return linePayouts;
  }

  private countMatchingSymbols(symbols: number[]): number {
    if (symbols.length === 0) {
      return 0;
    }

    const firstSymbol = symbols[0];
    let count = 1;

    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i] !== firstSymbol) {
        break;
      }

      count++;
    }

    return count;
  }
}
