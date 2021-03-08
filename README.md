[![Version](https://img.shields.io/npm/v/sort-unwind)](https://www.npmjs.com/package/sort-unwind)
![Tests](https://github.com/philihp/sort-unwind.js/workflows/tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/philihp/sort-unwind.js/badge.svg?branch=main)](https://coveralls.io/github/philihp/sort-unwind.js?branch=main)
![Downloads](https://img.shields.io/npm/dt/sort-unwind)
![License](https://img.shields.io/npm/l/sort-unwind)

# Sort Unwind

Sorts an array by an array of ranks and retains the stochastic tenet of the initial array so you can _undo_ back to the original shuffled state.

## Install

```
npm install --save sort-unwind
```

## Usage

```js
import unwind from 'sort-unwind'

const suits = ['♥', '♠', '♣', '♦']
const ranks = [2, 0, 3, 1]

const [sortedSuits, tenet] = unwind(ranks, suits)
// sortedSuits <- ['♠', '♦', '♥', '♣']
// unwind <- [1, 3, 0, 2]
```

You can then restore the entropy back into the array, or perhaps apply that entropy to another array. Sort of like sending that array backward in time to the more chaotic state.

```js
const names = ['spades', 'diamonds', 'hearts', 'clubs']
const [tenetNames, tenetRanks] = unwind(tenet, names)
// tenetNames <- ['hearts', 'spades', 'clubs', 'diamonds']
// tenetRanks <- [2, 0, 3, 1]
```

## Thanks

- [@varenc](https://github.com/varenc) for showing me a clever way to do this.
