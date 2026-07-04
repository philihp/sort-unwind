export const unwind = <T>(rank: number[], src: T[]): [T[], number[]] => {
  // the derank is just the indices of src, sorted by their rank
  const derank = [...src.keys()].sort((a, b) => rank[a] - rank[b])
  return [derank.map((i) => src[i]), derank]
}
