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
      let bestPayout = 0;

      for (const [key, payouts] of Object.entries(this.config.symbols)) {
        const count = this.countMatchingSymbols(line, Number(key));
        //For shorter payout arrays than matching symbols we take the last available payout
        const payoutIndex = Math.min(count, payouts.length) - 1;
        const payout = count > 0 ? (payouts[payoutIndex] ?? 0) : 0;
        bestPayout = Math.max(bestPayout, payout);
      }

      linePayouts.push(bestPayout);
    }

    return linePayouts;
  }

  private countMatchingSymbols(line: number[], symbol: number): number {
    let count = 0;

    for (const current of line) {
      if (current !== symbol && current !== this.config.wildSymbol) {
        break;
      }

      count++;
    }

    return count;
  }
}
