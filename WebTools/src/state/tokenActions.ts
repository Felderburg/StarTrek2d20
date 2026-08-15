import { cyrb53 } from '../common/cyrb53';
import { Rank } from '../helpers/ranks';
import { Species } from '../helpers/speciesEnum';
import { BodyType } from '../token/model/bodyTypeEnum';
import { ExtraType } from '../token/model/extrasTypeEnum';
import { EyeType } from '../token/model/eyeTypeEnum';
import { FacialHairType } from '../token/model/facialHairEnum';
import { HairType } from '../token/model/hairTypeEnum';
import { HeadType } from '../token/model/headTypeEnum';
import { MouthType } from '../token/model/mouthTypeEnum';
import { NasoLabialFoldType } from '../token/model/nasoLabialFoldTypeEnum';
import { NoseType } from '../token/model/noseTypeEnum';
import { SpeciesOption } from '../token/model/speciesOptionEnum';
import { TokenModel } from '../token/model/tokenModel';
import { UniformEra } from '../token/model/uniformEra';
import { UniformVariantType } from '../token/model/uniformVariantTypeEnum';

export const SET_TOKEN_SPECIES = 'SET_TOKEN_SPECIES';
export const SET_TOKEN_SPECIES_OPTION = 'SET_TOKEN_SPECIES_OPTION';
export const SET_TOKEN_UNIFORM_ERA = 'SET_TOKEN_UNIFORM_ERA';
export const SET_TOKEN_DIVISION_COLOR = 'SET_TOKEN_DIVISION_COLOR';
export const SET_TOKEN_SKIN_COLOR = 'SET_TOKEN_SKIN_COLOR';
export const SET_TOKEN_RANK = 'SET_TOKEN_RANK';
export const SET_TOKEN_HAIR_TYPE = 'SET_TOKEN_HAIR_TYPE';
export const SET_TOKEN_HAIR_COLOR = 'SET_TOKEN_HAIR_COLOR';
export const SET_TOKEN_HEAD_TYPE = 'SET_TOKEN_HEAD_TYPE';
export const SET_TOKEN_EYE_COLOR = 'SET_TOKEN_EYE_COLOR';
export const SET_TOKEN_NASO_LABIAL_FOLD_TYPE =
  'SET_TOKEN_NASO_LABIAL_FOLD_TYPE';
export const SET_TOKEN_NOSE_TYPE = 'SET_TOKEN_NOSE_TYPE';
export const SET_TOKEN_MOUTH_TYPE = 'SET_TOKEN_MOUTH_TYPE';
export const SET_TOKEN_BODY_TYPE = 'SET_TOKEN_BODY_TYPE';
export const SET_TOKEN_UNIFORM_VARIANT_TYPE = 'SET_TOKEN_UNIFORM_VARIANT_TYPE';
export const SET_TOKEN_EYE_TYPE = 'SET_TOKEN_EYE_TYPE';
export const SET_TOKEN_LIPSTICK_COLOR = 'SET_TOKEN_LIPSTICK_COLOR';
export const SET_TOKEN_FACIAL_HAIR_TYPE = 'SET_TOKEN_FACIAL_HAIR_TYPE';
export const SET_TOKEN_EXTRAS_TYPE = 'SET_TOKEN_EXTRAS_TYPE';
export const SET_TOKEN_SECONDARY_SPECIES = 'SET_TOKEN_SECONDARY_SPECIES';
export const CREATE_NEW_TOKEN = 'CREATE_NEW_TOKEN';
export const SET_TOKEN_ROUNDED = 'SET_TOKEN_ROUNDED';
export const SET_TOKEN_BORDERED = 'SET_TOKEN_BORDERED';

export function createNewToken(
  token?: TokenModel,
  marshalledCharacter?: string,
  characterName?: string,
  rounded: boolean = false,
  bordered: boolean = false,
) {
  const hash = marshalledCharacter?.length
    ? cyrb53(marshalledCharacter)
    : undefined;
  const payload = {
    token: token,
    marshalledCharacter: marshalledCharacter,
    characterName: characterName,
    hash: hash,
    rounded: rounded,
    bordered: bordered,
  };
  return {
    type: CREATE_NEW_TOKEN,
    payload: payload,
  };
}

export function setTokenSpecies(species: Species) {
  const payload = { species: species };
  return {
    type: SET_TOKEN_SPECIES,
    payload: payload,
  };
}

export function setTokenSecondarySpecies(species: Species) {
  const payload = { species: species };
  return {
    type: SET_TOKEN_SECONDARY_SPECIES,
    payload: payload,
  };
}

export function setUniformEra(era: UniformEra) {
  const payload = { era: era };
  return {
    type: SET_TOKEN_UNIFORM_ERA,
    payload: payload,
  };
}

export function setTokenDivisionColor(color: string) {
  const payload = { color: color };
  return {
    type: SET_TOKEN_DIVISION_COLOR,
    payload: payload,
  };
}

export function setTokenRank(rank: Rank) {
  const payload = { rank: rank };
  return {
    type: SET_TOKEN_RANK,
    payload: payload,
  };
}

export function setTokenSkinColor(color: string) {
  const payload = { color: color };
  return {
    type: SET_TOKEN_SKIN_COLOR,
    payload: payload,
  };
}

export function setTokenEyeColor(color: string) {
  const payload = { color: color };
  return {
    type: SET_TOKEN_EYE_COLOR,
    payload: payload,
  };
}

export function setTokenHairColor(color: string) {
  const payload = { color: color };
  return {
    type: SET_TOKEN_HAIR_COLOR,
    payload: payload,
  };
}

export function setTokenLipstickColor(color: string) {
  const payload = { color: color };
  return {
    type: SET_TOKEN_LIPSTICK_COLOR,
    payload: payload,
  };
}

export function setTokenHairType(hairType: HairType) {
  const payload = { hairType: hairType };
  return {
    type: SET_TOKEN_HAIR_TYPE,
    payload: payload,
  };
}

export function setTokenHeadType(headType: HeadType) {
  const payload = { headType: headType };
  return {
    type: SET_TOKEN_HEAD_TYPE,
    payload: payload,
  };
}

export function setTokenMouthType(mouthType: MouthType) {
  const payload = { mouthType: mouthType };
  return {
    type: SET_TOKEN_MOUTH_TYPE,
    payload: payload,
  };
}

export function setTokenEyeType(eyeType: EyeType) {
  const payload = { eyeType: eyeType };
  return {
    type: SET_TOKEN_EYE_TYPE,
    payload: payload,
  };
}

export function setTokenNoseType(noseType: NoseType) {
  const payload = { noseType: noseType };
  return {
    type: SET_TOKEN_NOSE_TYPE,
    payload: payload,
  };
}

export function setTokenBodyType(type: BodyType) {
  const payload = { type: type };
  return {
    type: SET_TOKEN_BODY_TYPE,
    payload: payload,
  };
}

export function setTokenUniformVariantType(type: UniformVariantType) {
  const payload = { type: type };
  return {
    type: SET_TOKEN_UNIFORM_VARIANT_TYPE,
    payload: payload,
  };
}

export function setTokenFacialHairTypes(types: FacialHairType[]) {
  const payload = { types: types };
  return {
    type: SET_TOKEN_FACIAL_HAIR_TYPE,
    payload: payload,
  };
}

export function setTokenExtrasTypes(types: ExtraType[]) {
  const payload = { types: types };
  return {
    type: SET_TOKEN_EXTRAS_TYPE,
    payload: payload,
  };
}

export function setTokenNasoLabialFoldType(type: NasoLabialFoldType) {
  const payload = { type: type };
  return {
    type: SET_TOKEN_NASO_LABIAL_FOLD_TYPE,
    payload: payload,
  };
}

export function setTokenSpeciesOption(option: SpeciesOption) {
  const payload = { option: option };
  return {
    type: SET_TOKEN_SPECIES_OPTION,
    payload: payload,
  };
}

export function setTokenRounded(rounded: boolean) {
  const payload = { rounded: rounded };
  return {
    type: SET_TOKEN_ROUNDED,
    payload: payload,
  };
}
export function setTokenBordered(bordered: boolean) {
  const payload = { bordered: bordered };
  return {
    type: SET_TOKEN_BORDERED,
    payload: payload,
  };
}
