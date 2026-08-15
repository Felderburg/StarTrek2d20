import { Rank } from '../../helpers/ranks';
import { Species } from '../../helpers/speciesEnum';
import { BodyType } from './bodyTypeEnum';
import { DivisionColors } from './divisionColors';
import { ExtraType } from './extrasTypeEnum';
import { EyeType } from './eyeTypeEnum';
import { FacialHairType } from './facialHairEnum';
import { HairType } from './hairTypeEnum';
import { HeadType } from './headTypeEnum';
import { MouthType } from './mouthTypeEnum';
import { NasoLabialFoldType } from './nasoLabialFoldTypeEnum';
import { NoseType } from './noseTypeEnum';
import { SpeciesOption } from './speciesOptionEnum';
import SpeciesRestrictions from './speciesRestrictions';
import { Token } from './token';
import { UniformEra } from './uniformEra';
import { UniformVariantType } from './uniformVariantTypeEnum';

export class TokenModel {
  primarySpecies: Species;
  speciesOption: SpeciesOption;
  secondarySpecies?: Species;

  uniformEra: UniformEra;
  variant: UniformVariantType;
  divisionColor: string;
  rankIndicator: Rank;

  skinColor: string;
  headType: HeadType;
  noseType: NoseType;
  nasoLabialFold: NasoLabialFoldType;
  hairType: HairType;
  bodyType: BodyType;
  hairColor: string;
  eyeColor: string;
  eyeType: EyeType;
  mouthType: MouthType;
  lipstickColor: string;
  facialHairType: FacialHairType[];

  extras: ExtraType[];

  get species() {
    if (this.primarySpecies === Species.LiberatedBorg) {
      return this.secondarySpecies ?? Species.Human;
    } else {
      return this.primarySpecies;
    }
  }

  static createDefault() {
    return TokenModel.from({
      species: Species.Human,
      divisionColor: DivisionColors.getColors(UniformEra.DominionWar)[0].color,
      skinColor: SpeciesRestrictions.DEFAULT_SKIN_COLOR,
      headType: HeadType.SofterNarrow,
      rankIndicator: Rank.None,
      hairType: HairType.DeLeve,
      hairColor: SpeciesRestrictions.DEFAULT_HAIR_COLOR,
      eyeColor: SpeciesRestrictions.getDefaultEyeColor(Species.Human),
      eyeType: EyeType.Eye3,
      noseType: NoseType.StraightBasic,
      mouthType: MouthType.Mouth2,
      uniformEra: UniformEra.DominionWar,
      bodyType: BodyType.AverageMale,
      nasoLabialFold: NasoLabialFoldType.None,
      lipstickColor: SpeciesRestrictions.DEFAULT_LIPSTICK_COLOR,
      facialHairType: [],
      speciesOption: SpeciesOption.Option1,
      extras: [],
      variant: UniformVariantType.Base,
    });
  }

  static from(token: Token): TokenModel {
    let result = new TokenModel();
    result.primarySpecies = token.species;
    result.secondarySpecies = token.secondarySpecies;
    result.speciesOption = token.speciesOption;

    result.divisionColor = token.divisionColor;
    result.skinColor = token.skinColor;
    result.headType = token.headType;
    result.rankIndicator = token.rankIndicator;
    result.noseType = token.noseType;
    result.nasoLabialFold = token.nasoLabialFold;
    result.hairType = token.hairType;
    result.uniformEra = token.uniformEra;
    result.bodyType = token.bodyType;
    result.hairColor = token.hairColor;
    result.eyeColor = token.eyeColor;
    result.eyeType = token.eyeType;
    result.mouthType = token.mouthType;
    result.lipstickColor = token.lipstickColor;
    result.facialHairType = [...(token.facialHairType ?? [])];
    result.extras = [...(token.extras ?? [])];
    result.variant = token.variant;

    return result;
  }

  copy() {
    let result = new TokenModel();

    result.primarySpecies = this.primarySpecies;
    result.secondarySpecies = this.secondarySpecies;
    result.speciesOption = this.speciesOption;

    result.divisionColor = this.divisionColor;
    result.skinColor = this.skinColor;
    result.headType = this.headType;
    result.rankIndicator = this.rankIndicator;
    result.noseType = this.noseType;
    result.nasoLabialFold = this.nasoLabialFold;
    result.hairType = this.hairType;
    result.uniformEra = this.uniformEra;
    result.bodyType = this.bodyType;
    result.hairColor = this.hairColor;
    result.eyeColor = this.eyeColor;
    result.eyeType = this.eyeType;
    result.mouthType = this.mouthType;
    result.lipstickColor = this.lipstickColor;
    result.facialHairType = [...this.facialHairType];
    result.extras = [...this.extras];
    result.variant = this.variant;

    return result;
  }
}
