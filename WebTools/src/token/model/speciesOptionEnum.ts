export enum SpeciesOption {
  Option1,
  Option2,
  Option3,
  Option4,
  Option5,
  Option6,
  Option7,
}

export const allSpeciesOptions = (): SpeciesOption[] => {
  return Object.keys(SpeciesOption)
    .filter((item) => {
      return !isNaN(Number(item));
    })
    .map((item) => Number(item));
};
