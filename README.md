[![Version](https://img.shields.io/npm/v/reorder)](https://www.npmjs.com/package/reorder)
![Tests](https://github.com/philihp/reorder.js/workflows/tests/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/philihp/reorder.js/badge.svg?branch=main)](https://coveralls.io/github/philihp/reorder.js?branch=main)
![Downloads](https://img.shields.io/npm/dt/fast-shuffle)
![License](https://img.shields.io/npm/l/reorder)

# Reorder

Sorts an array by a parallel array of ordinal ranks and returns the sorted array as well as a list of indexes to restore the original sort order.

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

Then to restore the original order

```js
const [resortedSuits] = reorder(unwind, sortedSuits)
// resortedSuits <- ['♥', '♠', '♣', '♦']
```

- Thanks to @varenc for showing me a better way to do this.
