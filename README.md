# Slot Game

## Overview

A simple backend slot game built with TypeScript.

The game has 5 reels with 3 visible symbols each. It checks 5 predefined paylines and calculates winnings based on matching symbols.

## Installation

```bash
npm install
```

## Run the Game

```bash
npx tsx src/index.ts
```

This runs one spin and displays the reel positions, visible symbols and winnings.

## Game Rules

- Each reel starts at a random position.
- When a reel reaches its end, it continues from the beginning.
- At least 3 matching symbols from left to right are required to win.
- Winnings are calculated using the provided configuration.
- Multiple paylines can win in one spin.

## Simulation

Run 1,000,000 spins:

```bash
npx tsx src/simulation.ts
```

The simulation displays the total spins, bets, winnings, winning spins and execution speed.

A fixed bet of 1 credit per spin is assumed.

## Tests

```bash
npm test
```

The project includes Jest tests for the main game logic.
