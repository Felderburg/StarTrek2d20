import { Rank } from '../helpers/ranks';
import { Species } from '../helpers/speciesEnum';
import { BodyType } from '../token/model/bodyTypeEnum';
import { DivisionColors } from '../token/model/divisionColors';
import { EyeType } from '../token/model/eyeTypeEnum';
import { HairType } from '../token/model/hairTypeEnum';
import { HeadType } from '../token/model/headTypeEnum';
import { MouthType } from '../token/model/mouthTypeEnum';
import { NasoLabialFoldType } from '../token/model/nasoLabialFoldTypeEnum';
import { NoseType } from '../token/model/noseTypeEnum';
import { SpeciesOption } from '../token/model/speciesOptionEnum';
import SpeciesRestrictions from '../token/model/speciesRestrictions';
import type { Token } from '../token/model/token';
import { UniformEra } from '../token/model/uniformEra';
import UniformVariantRestrictions from '../token/model/uniformVariantRestrictions';
import { UniformVariantType } from '../token/model/uniformVariantTypeEnum';
import {
  CREATE_NEW_TOKEN,
  SET_TOKEN_BODY_TYPE,
  SET_TOKEN_BORDERED,
  SET_TOKEN_DIVISION_COLOR,
  SET_TOKEN_EXTRAS_TYPE,
  SET_TOKEN_EYE_COLOR,
  SET_TOKEN_EYE_TYPE,
  SET_TOKEN_FACIAL_HAIR_TYPE,
  SET_TOKEN_HAIR_COLOR,
  SET_TOKEN_HAIR_TYPE,
  SET_TOKEN_HEAD_TYPE,
  SET_TOKEN_LIPSTICK_COLOR,
  SET_TOKEN_MOUTH_TYPE,
  SET_TOKEN_NASO_LABIAL_FOLD_TYPE,
  SET_TOKEN_NOSE_TYPE,
  SET_TOKEN_RANK,
  SET_TOKEN_ROUNDED,
  SET_TOKEN_SECONDARY_SPECIES,
  SET_TOKEN_SKIN_COLOR,
  SET_TOKEN_SPECIES,
  SET_TOKEN_SPECIES_OPTION,
  SET_TOKEN_UNIFORM_ERA,
  SET_TOKEN_UNIFORM_VARIANT_TYPE,
} from './tokenActions';

const initialState = {
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
};

interface TokenState {
  token?: Token;
  marshalledCharacter?: string;
  characterName?: string;
  replacementHash?: number;
  rounded?: boolean;
  bordered?: boolean;
}

const token = (state: TokenState = { token: initialState }, action) => {
  switch (action.type) {
    case SET_TOKEN_SECONDARY_SPECIES:
    case SET_TOKEN_SPECIES: {
      const token = state.token;
      let newSpecies = action.payload.species;
      let skinColor = token.skinColor;
      const palette = SpeciesRestrictions.getSkinColors(newSpecies);
      if (palette.indexOf(skinColor) < 0) {
        skinColor = palette[Math.floor(palette.length / 2)];
      }
      let hairColour = token.hairColor;
      const hairColours = SpeciesRestrictions.getHairColors(newSpecies);
      if (hairColours.indexOf(hairColour) < 0) {
        hairColour = hairColours[0];
      }

      let hairType = token.hairType;
      const hairTypes = SpeciesRestrictions.getHairTypes(newSpecies);
      if (hairTypes.indexOf(hairType) < 0) {
        hairType = SpeciesRestrictions.getDefaultHairType(newSpecies);
      }

      let noseType = token.noseType;
      const noseTypes = SpeciesRestrictions.getNoseTypes(newSpecies);
      if (noseTypes.indexOf(noseType) < 0) {
        noseType = noseTypes[0];
      }

      let headType = token.headType;
      const headTypes = SpeciesRestrictions.getHeadTypes(newSpecies);
      if (headTypes.indexOf(headType) < 0) {
        headType = headTypes[0];
      }

      let mouthType = token.mouthType;
      const mouthTypes = SpeciesRestrictions.getMouthTypes(newSpecies);
      if (mouthTypes.indexOf(mouthType) < 0) {
        mouthType = mouthTypes[0];
      }

      let facialHairType = token.facialHairType;
      if (!SpeciesRestrictions.isFacialHairSupportedFor(newSpecies)) {
        facialHairType = [];
      }

      let eyeColor = token.eyeColor;
      const speciesEyeColours = SpeciesRestrictions.getEyeColors(
        action.payload.species,
      );
      if (speciesEyeColours.indexOf(eyeColor) < 0) {
        eyeColor = speciesEyeColours[Math.floor(speciesEyeColours.length / 2)];
      }
      let option = token.speciesOption;
      const options = SpeciesRestrictions.getSpeciesOptions(newSpecies);
      if (options.indexOf(option) < 0) {
        option = SpeciesOption.Option1;
      }
      const extras = token.extras.filter((e) =>
        action.type === SET_TOKEN_SECONDARY_SPECIES
          ? SpeciesRestrictions.isExtraAvailableFor(
              e,
              Species.LiberatedBorg,
              newSpecies,
              token.uniformEra,
            )
          : SpeciesRestrictions.isExtraAvailableFor(
              e,
              newSpecies,
              token.secondarySpecies,
              token.uniformEra,
            ),
      );

      let uniformEra = token.uniformEra;
      let colour = token.divisionColor;
      let rank = token.rankIndicator;
      const uniforms = SpeciesRestrictions.getUniformTypes(newSpecies);
      if (uniforms.indexOf(uniformEra) < 0) {
        uniformEra = uniforms[0];

        const newColourOptions = DivisionColors.getColors(
          action.payload.era,
          rank,
        );
        const index = DivisionColors.indexOf(token.uniformEra, colour);
        if (index >= 0 && index < newColourOptions.length) {
          colour = newColourOptions[index].color;
        } else {
          colour = newColourOptions[0].color;
        }
        if (
          !UniformVariantRestrictions.isRankSupported(rank, action.payload.era)
        ) {
          rank = Rank.None;
        }
      }

      let variant = token.variant;
      const variants = UniformVariantRestrictions.getAvailableVariants(
        uniformEra,
        token.bodyType,
        newSpecies,
        token.divisionColor,
        token.rankIndicator,
      );
      if (variants.indexOf(variant) < 0) {
        variant = UniformVariantType.Base;
      }

      let secondarySpecies = token.secondarySpecies;
      if (action.type === SET_TOKEN_SECONDARY_SPECIES) {
        secondarySpecies = newSpecies;
        if (secondarySpecies == null) {
          secondarySpecies = Species.Human;
        }
        newSpecies = token.species;
      } else if (
        newSpecies === Species.LiberatedBorg &&
        secondarySpecies == null
      ) {
        secondarySpecies = Species.Human;
      }

      return {
        ...state,
        token: {
          ...token,
          eyeColor: eyeColor,
          hairType: hairType,
          hairColor: hairColour,
          headType: headType,
          noseType: noseType,
          mouthType: mouthType,
          skinColor: skinColor,
          facialHairType: facialHairType,
          species: newSpecies,
          secondarySpecies: secondarySpecies,
          speciesOption: option,
          extras: extras,
          uniformEra: uniformEra,
          rankIndicator: rank,
          divisionColor: colour,
          variant: variant,
        },
      };
    }
    case SET_TOKEN_UNIFORM_ERA: {
      const token = state.token;
      let colour = token.divisionColor;
      const newColourOptions = DivisionColors.getColors(
        action.payload.era,
        token.rankIndicator,
      );
      const index = DivisionColors.indexOf(token.uniformEra, colour);
      if (index >= 0 && index < newColourOptions.length) {
        colour = newColourOptions[index].color;
      } else {
        colour = newColourOptions[0].color;
      }
      let rank = token.rankIndicator;
      if (
        !UniformVariantRestrictions.isRankSupported(rank, action.payload.era)
      ) {
        rank = Rank.None;
      }
      let bodyType = token.bodyType;
      if (
        !UniformVariantRestrictions.getSupportedBodyTypes(
          action.payload.era,
        ).includes(bodyType)
      ) {
        bodyType = UniformVariantRestrictions.getSupportedBodyTypes(
          action.payload.era,
        )[0];
      }
      let variant = token.variant;
      const variants = UniformVariantRestrictions.getAvailableVariants(
        action.payload.era,
        bodyType,
        token.species,
        colour,
        rank,
      );
      if (variants.indexOf(variant) < 0) {
        variant = UniformVariantType.Base;
      }
      const extras = token.extras.filter((e) =>
        SpeciesRestrictions.isExtraAvailableFor(
          e,
          token.species,
          token.secondarySpecies,
          action.payload.era,
        ),
      );

      return {
        ...state,
        token: {
          ...token,
          rankIndicator: rank,
          divisionColor: colour,
          uniformEra: action.payload.era,
          variant: variant,
          bodyType: bodyType,
          extras: extras,
        },
      };
    }
    case SET_TOKEN_DIVISION_COLOR: {
      const token = state.token;
      let variant = token.variant;
      const variants = UniformVariantRestrictions.getAvailableVariants(
        token.uniformEra,
        token.bodyType,
        token.species,
        action.payload.color,
        token.rankIndicator,
      );
      if (variants.indexOf(variant) < 0) {
        variant = UniformVariantType.Base;
      }

      return {
        ...state,
        token: {
          ...token,
          divisionColor: action.payload.color,
          variant: variant,
        },
      };
    }
    case SET_TOKEN_RANK: {
      const token = { ...state.token };
      const variant = token.variant;
      const variants = UniformVariantRestrictions.getAvailableVariants(
        token.uniformEra,
        token.bodyType,
        token.species,
        token.divisionColor,
        action.payload.rank,
      );
      if (variants.indexOf(variant) < 0) {
        token.variant = UniformVariantType.Base;
      }
      token.rankIndicator = action.payload.rank;
      const colours = DivisionColors.getColors(
        token.uniformEra,
        token.rankIndicator,
      );
      if (
        colours.length &&
        !colours.map((c) => c.color).includes(token.divisionColor)
      ) {
        token.divisionColor = colours[0].color;
      }

      return {
        ...state,
        token: token,
      };
    }
    case SET_TOKEN_HAIR_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          hairType: action.payload.hairType,
        },
      };
    }
    case SET_TOKEN_HEAD_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          headType: action.payload.headType,
        },
      };
    }
    case SET_TOKEN_NOSE_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          noseType: action.payload.noseType,
        },
      };
    }
    case SET_TOKEN_NASO_LABIAL_FOLD_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          nasoLabialFold: action.payload.type,
        },
      };
    }
    case SET_TOKEN_BODY_TYPE: {
      const token = state.token;
      let variant = token.variant;
      const variants = UniformVariantRestrictions.getAvailableVariants(
        token.uniformEra,
        action.payload.type,
        token.species,
        token.divisionColor,
        token.rankIndicator,
      );
      if (variants.indexOf(variant) < 0) {
        variant = UniformVariantType.Base;
      }
      return {
        ...state,
        token: {
          ...token,
          bodyType: action.payload.type,
          variant: variant,
        },
      };
    }
    case SET_TOKEN_UNIFORM_VARIANT_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          variant: action.payload.type,
        },
      };
    }
    case SET_TOKEN_EYE_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          eyeType: action.payload.eyeType,
        },
      };
    }
    case SET_TOKEN_MOUTH_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          mouthType: action.payload.mouthType,
        },
      };
    }
    case SET_TOKEN_FACIAL_HAIR_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          facialHairType: action.payload.types,
        },
      };
    }
    case SET_TOKEN_EXTRAS_TYPE: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          extras: action.payload.types,
        },
      };
    }
    case SET_TOKEN_EYE_COLOR: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          eyeColor: action.payload.color,
        },
      };
    }
    case SET_TOKEN_HAIR_COLOR: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          hairColor: action.payload.color,
        },
      };
    }
    case SET_TOKEN_LIPSTICK_COLOR: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          lipstickColor: action.payload.color,
        },
      };
    }
    case SET_TOKEN_SKIN_COLOR: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          skinColor: action.payload.color,
        },
      };
    }
    case SET_TOKEN_SPECIES_OPTION: {
      const token = state.token;
      return {
        ...state,
        token: {
          ...token,
          speciesOption: action.payload.option,
        },
      };
    }
    case CREATE_NEW_TOKEN: {
      const newToken = action.payload.token;
      const token: Token = { ...initialState };
      if (newToken) {
        token.species = newToken.primarySpecies;
        token.secondarySpecies = newToken.secondarySpecies;
        token.speciesOption = newToken.speciesOption;
        token.bodyType = newToken.bodyType;
        token.uniformEra = newToken.uniformEra;
        token.variant = newToken.variant;
        token.rankIndicator = newToken.rankIndicator;
        token.divisionColor = newToken.divisionColor;
        token.skinColor = newToken.skinColor;
        token.headType = newToken.headType;
        token.hairType = newToken.hairType;
        token.hairColor = newToken.hairColor;
        token.eyeType = newToken.eyeType;
        token.eyeColor = newToken.eyeColor;
        token.noseType = newToken.noseType;
        token.nasoLabialFold = newToken.nasoLabialFold;
        token.lipstickColor = newToken.lipstickColor;
        token.mouthType = newToken.mouthType;
        token.facialHairType = [...(newToken?.facialHairType ?? [])];
        token.extras = [...(newToken.extras ?? [])];
      }
      return {
        ...state,
        token: token,
        rounded: action.payload.rounded,
        bordered: action.payload.bordered,
        marshalledCharacter: action.payload.marshalledCharacter,
        characterName: action.payload.characterName,
        replacementHash: action.payload.hash,
      };
    }
    case SET_TOKEN_ROUNDED: {
      return {
        ...state,
        rounded: action.payload.rounded,
      };
    }
    case SET_TOKEN_BORDERED: {
      return {
        ...state,
        bordered: action.payload.bordered,
      };
    }
    default:
      return state;
  }
};

export default token;
