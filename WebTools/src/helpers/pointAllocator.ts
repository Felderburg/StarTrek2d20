export default class PointAllocator {
  static allocatePointsEvenly(points: number) {
    const base = points < 0 ? Math.ceil(points / 6) : Math.floor(points / 6);
    const remainder = points - base * 6;
    const result = [base, base, base, base, base, base];
    for (let i = 0; i < Math.min(Math.abs(remainder), 6); i++) {
      result[i] += points < 0 ? -1 : 1;
    }
    return result;
  }

  static allocatePointsRandomly(points: number) {
    const result = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < points; i++) {
      let done = false;
      while (!done) {
        const index = Math.floor(Math.random() * result.length);
        if (result[index] < 12) {
          result[index] = result[index] + 1;
          done = true;
        }
      }
    }
    return result;
  }
}
