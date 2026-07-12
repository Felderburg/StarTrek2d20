

export enum NasoLabialFoldType {
    None, Subtle, Cherubic, Nimoy, Meaney, Lewis
}

export const allNasoLabialFoldTypes = (): NasoLabialFoldType[] => {
    return Object.keys(NasoLabialFoldType).filter((item) => {
        return !isNaN(Number(item));
    }).map(item => Number(item));
}