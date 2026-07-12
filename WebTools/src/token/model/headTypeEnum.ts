
export enum HeadType {
    AverageAngular,
    SquareJawed,
    RoundedNarrow,
    RoundedAverage,
    SofterNarrow,
    PointedDelicate,
    Rectangular,
    Elfin,
    PillShaped,
    RoundedHeavy
}

export const allHeadTypes = (): HeadType[] => {
    return Object.keys(HeadType).filter((item) => {
        return !isNaN(Number(item));
    }).map(item => Number(item));
}