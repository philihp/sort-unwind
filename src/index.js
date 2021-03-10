import {
  uncurryN,
  pipe,
  addIndex,
  map,
  zip,
  sortBy,
  prop,
  transpose,
} from 'ramda'

export default uncurryN(2, (rank) =>
  pipe(
    addIndex(map)((element, idx) => [element, idx]),
    zip(rank),
    sortBy(prop(0)),
    map(prop(1)),
    transpose
  )
)
