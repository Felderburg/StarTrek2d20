
export default class PointAllocator {

    static allocatePointsEvenly(points: number) {
        let base = (points < 0) ? Math.ceil(points / 6) : Math.floor(points / 6);
        let remainder = points - (base * 6);
        let result = [base, base, base, base, base, base];
        for (let i = 0; i < Math.min(Math.abs(remainder), 6); i++) {
            result[i] += (points < 0 ? -1 : 1);
        }
        return result;
    }
}