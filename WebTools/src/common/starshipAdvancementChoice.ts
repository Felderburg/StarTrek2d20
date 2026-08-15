export enum StarshipAdvancementChoice {
  System,
  Department,
  Talent,
}

export const allStarshipAdvancementChoices =
  (): StarshipAdvancementChoice[] => {
    return Object.keys(StarshipAdvancementChoice)
      .filter((item) => {
        return !isNaN(Number(item));
      })
      .map((item) => Number(item));
  };
