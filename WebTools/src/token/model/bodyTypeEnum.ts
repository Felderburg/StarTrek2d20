export enum BodyType {
    AverageMale,
    AverageFemale,
    AverageNonBinary
}

export const allBodyTypes = (): BodyType[] => {
    return Object.keys(BodyType).filter((item) => {
        return !isNaN(Number(item));
    }).map(item => Number(item));
}