import { Rank } from "../../helpers/ranks";
import { Species } from "../../helpers/speciesEnum";
import { BodyType } from "./bodyTypeEnum";
import { ExtraType } from "./extrasTypeEnum";
import { EyeType } from "./eyeTypeEnum";
import { FacialHairType } from "./facialHairEnum";
import { HairType } from "./hairTypeEnum";
import { HeadType } from "./headTypeEnum";
import { MouthType } from "./mouthTypeEnum";
import { NasoLabialFoldType } from "./nasoLabialFoldTypeEnum";
import { NoseType } from "./noseTypeEnum";
import { SpeciesOption } from "./speciesOptionEnum";
import { Token } from "./token";
import { UniformEra } from "./uniformEra";
import { UniformVariantType } from "./uniformVariantTypeEnum";

export class TokenModel {

    species: Species;
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


    static from(token: Token): TokenModel {
        let result = new TokenModel();
        result.species = token.species;
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
        result.facialHairType = [...token.facialHairType];
        result.extras = [...token.extras];
        result.speciesOption = token.speciesOption;
        result.variant = token.variant;

        return result;
    }
}