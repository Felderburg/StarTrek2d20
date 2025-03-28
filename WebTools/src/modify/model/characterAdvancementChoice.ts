
export enum CharacterAdvancementChoice {
    Attribute,
    Department,
    Talent,
    Focus,
    Value
}

export const allCharacterAdvancementChoices = (): CharacterAdvancementChoice[] => {
    return Object.keys(CharacterAdvancementChoice).filter((item) => {
        return !isNaN(Number(item));
    }).map(item => Number(item));
}
