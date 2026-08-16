import type { Rank } from '../../helpers/ranks';
import type { Species } from '../../helpers/speciesEnum';
import type { BodyType } from './bodyTypeEnum';
import type { ExtraType } from './extrasTypeEnum';
import type { EyeType } from './eyeTypeEnum';
import type { FacialHairType } from './facialHairEnum';
import type { HairType } from './hairTypeEnum';
import type { HeadType } from './headTypeEnum';
import type { MouthType } from './mouthTypeEnum';
import type { NasoLabialFoldType } from './nasoLabialFoldTypeEnum';
import type { NoseType } from './noseTypeEnum';
import type { SpeciesOption } from './speciesOptionEnum';
import type { UniformEra } from './uniformEra';
import type { UniformVariantType } from './uniformVariantTypeEnum';

export interface Token {
  species: Species;
  secondarySpecies?: Species;
  divisionColor: string;
  skinColor: string;
  headType: HeadType;
  rankIndicator: Rank;
  noseType: NoseType;
  nasoLabialFold: NasoLabialFoldType;
  hairType: HairType;
  uniformEra: UniformEra;
  bodyType: BodyType;
  hairColor: string;
  eyeColor: string;
  eyeType: EyeType;
  mouthType: MouthType;
  lipstickColor: string;
  facialHairType: FacialHairType[];
  speciesOption: SpeciesOption;
  extras: ExtraType[];
  variant: UniformVariantType;
}
