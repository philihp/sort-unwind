[![Version](https://img.shields.io/npm/v/reorder)](https://www.npmjs.com/package/reorder)
![Tests](https://github.com/philihp/reorder.js/workflows/tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/philihp/reorder.js/badge.svg?branch=main)](https://coveralls.io/github/philihp/reorder.js?branch=main)
![Downloads](https://img.shields.io/npm/dt/reorder)
![License](https://img.shields.io/npm/l/reorder)

# Reorder

Sorts an array by an array of ranks and allows you to _undo_ back to the original shuffled state.

## Install

```
npm install --save reorder
```

## Usage

```js
import reorder from 'reorder'

const suits = ['♥', '♠', '♣', '♦']
const ranks = [2, 0, 3, 1]

const [sortedSuits, unwind] = reorder(ranks, suits)
// sortedSuits <- ['♠', '♦', '♥', '♣']
// unwind <- [1, 3, 0, 2]
```

You can then restore perhaps another array back to the original state.

```js
const names = ['spades', 'diamonds', 'hearts', 'clubs']
const [reorderedNames, reorderedRanks] = reorder(unwind, names)
// reorderedNames <- ['hearts', 'spades', 'clubs', 'diamonds']
// reorderedRanks <- [2, 0, 3, 1]
```

## Thanks

- [@varenc](https://github.com/varenc) for showing me a clever way to do this.
