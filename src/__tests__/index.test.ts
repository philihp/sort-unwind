import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createShuffle } from 'fast-shuffle'
import { curried, unwind } from '../index.ts'

describe('unwind', () => {
  it('accepts zero items', () => {
    const src: string[] = []
    const rank: number[] = []
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, [])
    assert.deepEqual(derank, [])
  })

  it('accepts 1 item', () => {
    const src = ['a']
    const rank = [0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['a'])
    assert.deepEqual(derank, [0])
  })

  it('accepts 2 items', () => {
    const src = ['b', 'a']
    const rank = [1, 0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['a', 'b'])
    assert.deepEqual(derank, [1, 0])
  })

  it('accepts 3 items', () => {
    const src = ['b', 'c', 'a']
    const rank = [1, 2, 0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['a', 'b', 'c'])
    assert.deepEqual(derank, [2, 0, 1])
  })

  it('accepts 4 items', () => {
    const src = ['b', 'd', 'c', 'a']
    const rank = [1, 3, 2, 0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['a', 'b', 'c', 'd'])
    assert.deepEqual(derank, [3, 0, 2, 1])
  })

  it('can undo the ranking', () => {
    const shuffle = createShuffle(42)
    const oneToAHundred = Array.from({ length: 100 }, (_, i) => i)
    const src = shuffle(oneToAHundred)
    const rank = shuffle(oneToAHundred)
    const [trans, derank] = unwind(rank, src)
    const [dst, dederank] = unwind(derank, trans)
    assert.deepEqual(dst, src)
    assert.notEqual(dst, src)
    assert.deepEqual(dederank, rank)
  })

  it('can be curried', () => {
    const reverse4 = curried([3, 2, 1, 0])
    assert.deepEqual(reverse4(['d', 'c', 'b', 'a']), [
      ['a', 'b', 'c', 'd'],
      [3, 2, 1, 0],
    ])
    assert.deepEqual(reverse4(['d', 'd', 'b', 'b']), [
      ['b', 'b', 'd', 'd'],
      [3, 2, 1, 0],
    ])
  })

  it('accepts duplicate values', () => {
    const [reversed] = unwind([3, 2, 1, 0], ['d', 'd', 'b', 'b'])
    assert.deepEqual(reversed, ['b', 'b', 'd', 'd'])
  })

  it('sorts stably when ranks are duplicated', () => {
    const src = ['a', 'b', 'c', 'd']
    const rank = [1, 0, 1, 0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['b', 'd', 'a', 'c'])
    assert.deepEqual(derank, [1, 3, 0, 2])
  })

  it('does not mutate the inputs', () => {
    const src = ['b', 'c', 'a']
    const rank = [1, 2, 0]
    unwind(rank, src)
    assert.deepEqual(src, ['b', 'c', 'a'])
    assert.deepEqual(rank, [1, 2, 0])
  })

  it('allows ranks that are not zero-indexed integers', () => {
    const src = ['a', 'b', 'c', 'd', 'e', 'f']
    const rank = [0.28591, 0.42682, 0.35912, 0.21237, 0.60619, 0.47078]
    const [dst] = unwind(rank, src)
    assert.deepEqual(dst, ['d', 'a', 'c', 'b', 'f', 'e'])
  })
})
