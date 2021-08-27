import {
  addIndex,
  map,
  pipe,
  prop,
  sortBy,
  transpose,
  uncurryN,
  zip,
} from 'ramda'

export default uncurryN(2, (rank) =>
  pipe(
    addIndex(map)((element, idx) => [element, idx]),
    zip(rank),
    sortBy(prop(0)), // O(log n)
    map(prop(1)),
    transpose
  )
)
