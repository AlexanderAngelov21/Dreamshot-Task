import { Slot } from "./slot";
import configuration from "./configuration";

const totalSpins = 1_000_000;

const slot = new Slot(configuration);

const betPerSpin = 1;
let totalWinnings = 0;
let totalBets = 0;
let winningSpins = 0;
const startTime = performance.now();

for (let i = 0; i < totalSpins; i++) {
  const result = slot.spin();
  totalWinnings += result.totalPayout;
  totalBets += betPerSpin;
  if (result.totalPayout > 0) {
    winningSpins++;
  }
}
const elapsedSeconds = (performance.now() - startTime) / 1000;
const spinsPerSecond = totalSpins / elapsedSeconds;
console.log("Time in seconds:", elapsedSeconds.toFixed(5));
console.log("Spins per second:", Math.round(spinsPerSecond).toLocaleString());
console.log("Total spins:", totalSpins.toLocaleString());
console.log("Total bets:", totalBets.toLocaleString());
console.log("Total winnings:", totalWinnings.toLocaleString());
console.log("Winning Spins:", winningSpins.toLocaleString());
