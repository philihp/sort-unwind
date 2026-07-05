[![Version](https://img.shields.io/npm/v/sort-unwind)](https://www.npmjs.com/package/sort-unwind)
[![Tests](https://github.com/philihp/sort-unwind/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/philihp/sort-unwind/actions/workflows/tests.yml)
[![Coverage Status](https://coveralls.io/repos/github/philihp/sort-unwind/badge.svg?branch=main)](https://coveralls.io/github/philihp/sort-unwind?branch=main)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/philihp/sort-unwind/badge)](https://scorecard.dev/viewer/?uri=github.com/philihp/sort-unwind)
![Downloads](https://img.shields.io/npm/dm/sort-unwind)
![License](https://img.shields.io/npm/l/sort-unwind)

# Sort Unwind

Sort an array and get back the permutation that undoes it. Give `unwind` an array of ranks and an array of values, and it returns the values in sorted order along with the inverse permutation (an argsort) — so you can undo the sort later, or apply the same sort order to other parallel arrays.

Zero dependencies, dual ESM/CJS build, TypeScript types included.

## Install

```
npm install --save sort-unwind
```

## Usage

```js
import { unwind } from 'sort-unwind'

const suits = ['♥', '♠', '♣', '♦']
const ranks = [2, 0, 3, 1]

const [sortedSuits, tenet] = unwind(ranks, suits)
// sortedSuits <- ['♠', '♦', '♥', '♣']
// tenet <- [1, 3, 0, 2]
```

The sorted array retains the stochastic tenet of the initial array, so you can restore the entropy back into the array, or perhaps apply that entropy to another array. Sort of like sending that array backward in time to the more chaotic state.

```js
const names = ['spades', 'diamonds', 'hearts', 'clubs']
const [tenetNames, tenetRanks] = unwind(tenet, names)
// tenetNames <- ['hearts', 'spades', 'clubs', 'diamonds']
// tenetRanks <- [2, 0, 3, 1]
```

A curried version of the function also exists which can be convenient.

```js
import { curried } from 'sort-unwind'

const prerankedUnwind = curried([2, 0, 3, 1])

const suits = ['♥', '♠', '♣', '♦']
const [sortedSuits, tenet] = prerankedUnwind(suits)
// sortedSuits <- ['♠', '♦', '♥', '♣']
// tenet <- [1, 3, 0, 2]
```

## When would I use this?

- **Undo a sort** — display an array sorted, then restore it to its original order without keeping a copy.
- **Sort parallel arrays together** — sort one array by another, then apply the same permutation to any number of sibling arrays and keep them all aligned.
- **Reverse a seeded shuffle** — after a [fast-shuffle](https://github.com/philihp/fast-shuffle), unwind puts the deck back in order, or deals the same shuffle to another deck.
- **Invert a permutation** — the returned indices are the [inverse permutation](https://en.wikipedia.org/wiki/Permutation#Inverse) of the sort, useful anywhere an argsort is.

## Thanks

- [@varenc](https://github.com/varenc) for showing me a clever way to do this.
- [@crosseye](https://github.com/crosseye) for working out a simpler way without a pipe
