import R from 'ramda'

export default R.uncurryN(2, (rank) =>
  R.pipe(
    R.addIndex(R.map)((element, idx) => [element, idx]),
    R.zip(rank),
    R.sortBy(R.prop(0)),
    R.map(R.prop(1)),
    R.transpose
  )
)
