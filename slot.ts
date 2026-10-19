export class Slot {
  constructor(
    private readonly config: {
      reelsCount: number;
      rowsCount: number;
      reels: number[][];
    },
  ) {}
  spin(): void {
    const firstReel = this.config.reels[0];
    const start = Math.floor(Math.random() * firstReel.length);

    const visibleSymbols: number[] = [];

    for (let row = 0; row < this.config.rowsCount; row++) {
      const index = (start + row) % firstReel.length;

      visibleSymbols.push(firstReel[index]);
    }

    console.log(`Start position: ${start}`);
    console.log(`Visible symbols: ${visibleSymbols}`);
  }
}
