export const curried =
  (rank: number[]) =>
  (src: any[]): any[] => {
    if (src.length === 0) return []

    const zipped: [number, number, any][] = []
    src.forEach((_, i) => {
      zipped.push([rank[i], i, src[i]])
    })
    // Array.sort will mutate the array, so we must make another
    zipped.sort(([a], [b]) => a - b)

    const dst: any[] = []
    const derank: number[] = []
    zipped.forEach(([_, i, o]) => {
      derank.push(i)
      dst.push(o)
    })
    return [dst, derank]
  }

// if i understood generics better, i think this could go back
// to just being one exported function with an optional second
// param... but this is just simpler.
export default <T>(rank: number[], src: T[]) => curried(rank)(src)
