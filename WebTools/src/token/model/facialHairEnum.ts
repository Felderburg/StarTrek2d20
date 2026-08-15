export enum FacialHairType {
  None,
  SoulPatch,
  BasicMoustache,
  GeneralChangMoustache,
  PencilMoustache,
  BushyMoustache1,
  BushyMoustache2,
  BushyChinBeard1,
  BushyGoatee,
  LargeBeard1,
  LargeBeard2,
  FiveOclockShadow,
}

export enum FacialHairCategory {
  Shadow,
  Moustache,
  Beard,
  MoustacheAndBeard,
}

export const allFacialHairTypes = (): FacialHairType[] => {
  return Object.keys(FacialHairType)
    .filter((item) => {
      return !isNaN(Number(item));
    })
    .map((item) => Number(item));
};
