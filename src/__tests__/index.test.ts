import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { shuffle } from 'fast-shuffle'
import { curried, unwind } from '../index.ts'

describe('unwind', () => {
  it('accepts zero items', () => {
    const src: any[] = []
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
    const src: string[] = ['b', 'd', 'c', 'a']
    const rank: number[] = [1, 3, 2, 0]
    const [dst, derank] = unwind(rank, src)
    assert.deepEqual(dst, ['a', 'b', 'c', 'd'])
    assert.deepEqual(derank, [3, 0, 2, 1])
  })

  it('can undo the ranking', () => {
    const oneToAHundred = [...new Array(100)].map((_, i) => i)
    const src: any[] = shuffle(oneToAHundred)
    const rank: number[] = shuffle(oneToAHundred)
    const [trans, derank] = unwind(rank, src)
    const [dst, dederank] = unwind(derank, trans)
    assert.deepEqual(dst, src)
    assert.notEqual(dst, src)
    assert.notEqual(dederank, rank)
  })

  it('can be curried', () => {
    const reverse4 = curried([3, 2, 1, 0])
    assert.doesNotThrow(() => {
      const [reversed] = reverse4(['d', 'c', 'b', 'a'])
      assert.deepEqual(reversed, ['a', 'b', 'c', 'd'])
    })
    assert.doesNotThrow(() => {
      const [reversed] = reverse4(['d', 'd', 'b', 'b'])
      assert.deepEqual(reversed, ['b', 'b', 'd', 'd'])
    })
  })

  it('allows ranks that are not zero-indexed integers', () => {
    const src = ['a', 'b', 'c', 'd', 'e', 'f']
    const rank = [0.28591, 0.42682, 0.35912, 0.21237, 0.60619, 0.47078]
    const [dst] = unwind(rank, src)
    assert.deepEqual(dst, ['d', 'a', 'c', 'b', 'f', 'e'])
  })
})
