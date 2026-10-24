import { Slot } from "../src/slot";
import configuration from "../src/configuration";
import type { SlotConfig } from "../src/slot.interface";

describe("Slot", () => {
  let slot: Slot;

  beforeEach(() => {
    slot = new Slot(configuration);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 5 reels with 3 visible symbols each", () => {
    const result = slot.spin();

    expect(result.visibleReels).toHaveLength(5);

    for (const reel of result.visibleReels) {
      expect(reel).toHaveLength(3);
    }
  });

  it("should return valid reel positions", () => {
    const result = slot.spin();

    expect(result.reelPositions).toHaveLength(5);

    for (let i = 0; i < result.reelPositions.length; i++) {
      const position = result.reelPositions[i];
      const reelLength = configuration.reels[i].length;

      expect(position).toBeGreaterThanOrEqual(0);
      expect(position).toBeLessThan(reelLength);
    }
  });

  it("should extract symbols according to payline patterns", () => {
    const result = slot.spin();

    expect(result.paylineSymbols).toHaveLength(configuration.lines.length);

    for (let i = 0; i < configuration.lines.length; i++) {
      const line = configuration.lines[i];

      const expectedSymbols = line.map(
        (row, col) => result.visibleReels[col][row],
      );

      expect(result.paylineSymbols[i]).toEqual(expectedSymbols);
    }
  });

  it("should calculate total payout correctly", () => {
    const result = slot.spin();

    expect(result.linePayouts).toHaveLength(5);

    const expectedTotal = result.linePayouts.reduce(
      (sum, payout) => sum + payout,
      0,
    );

    expect(result.totalPayout).toBe(expectedTotal);
  });

  it("should pay multiple winning lines in one spin", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);

    const testConfig: SlotConfig = {
      reelsCount: 5,
      rowsCount: 3,
      reels: Array.from({ length: 5 }, () => [1, 2, 3, 4, 5]),
      lines: configuration.lines,
      symbols: configuration.symbols,
    };

    const testSlot = new Slot(testConfig);
    const result = testSlot.spin();

    expect(result.reelPositions).toEqual([0, 0, 0, 0, 0]);

    expect(result.linePayouts).toEqual([50, 100, 150, 0, 0]);

    expect(result.totalPayout).toBe(300);
  });

  it("should wrap around when a reel reaches its end", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.8);

    const testConfig: SlotConfig = {
      reelsCount: 5,
      rowsCount: 3,
      reels: Array.from({ length: 5 }, () => [1, 2, 3, 4, 5]),
      lines: configuration.lines,
      symbols: configuration.symbols,
    };

    const testSlot = new Slot(testConfig);
    const result = testSlot.spin();

    expect(result.reelPositions).toEqual([4, 4, 4, 4, 4]);

    for (const reel of result.visibleReels) {
      expect(reel).toEqual([5, 1, 2]);
    }
  });
  it("should use wilds to pay the highest win on a line", () => {
    const testConfig: SlotConfig = {
      ...configuration,
      rowsCount: 1,
      reels: [[10], [10], [1], [2], [3]],
      lines: [[0, 0, 0, 0, 0]],
    };

    const result = new Slot(testConfig).spin();

    expect(result.linePayouts).toEqual([25]);
    expect(result.totalPayout).toBe(25);
  });

  it("should use the last payout when the payout array is shorter", () => {
    const testConfig: SlotConfig = {
      ...configuration,
      rowsCount: 1,
      reels: [[1], [1], [1], [1], [1]],
      lines: [[0, 0, 0, 0, 0]],
      symbols: { 1: [0, 0, 10] },
    };

    const result = new Slot(testConfig).spin();

    expect(result.linePayouts).toEqual([10]);
    expect(result.totalPayout).toBe(10);
  });

  it("Should return zero payout for fewer than 3 matching elements", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const testConfig: SlotConfig = {
      reelsCount: 5,
      rowsCount: 3,
      reels: [
        [3, 3, 5, 2, 1],
        [3, 3, 1, 5, 7],
        [5, 2, 6, 7, 1],
        [2, 5, 2, 3, 1],
        [1, 8, 1, 8, 3],
      ],
      lines: configuration.lines,
      symbols: configuration.symbols,
    };
    const testSlot = new Slot(testConfig);

    const result = testSlot.spin();

    expect(result.linePayouts[0]).toBe(0);
  });
});
