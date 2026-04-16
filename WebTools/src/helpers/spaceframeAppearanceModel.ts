import i18next from "i18next";
import { makeKey } from "../common/translationKey";
import { SpaceframeAppearance } from "./spaceframeAppearance";
import { CharacterType } from "../common/characterType";
import { Era } from "./eras";

export class SpaceframeAppearanceModel {

    private static TYPES: SpaceframeAppearanceModel[] = null;

    id: SpaceframeAppearance;
    type: CharacterType;
    eras: Era[];

    constructor(id: SpaceframeAppearance, type: CharacterType, eras: Era[]) {
        this.id = id;
        this.type = type;
        this.eras = eras;
    }

    get localizedName() {
        return i18next.t(makeKey('SpaceframeAppearance.', SpaceframeAppearance[this.id]));
    }

    static getAllAppearanceModels(type: CharacterType, era: Era) {
        if (this.TYPES == null) {
            this.TYPES = [
                // Civilian
                new SpaceframeAppearanceModel(SpaceframeAppearance.Antares, CharacterType.Civilian, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.ClassJCargoShip, CharacterType.Civilian, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Freighter, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.JovisType, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Merchantman, CharacterType.Civilian, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.XhosaType, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.KaplanF17PatrolFrigate, CharacterType.Civilian, [Era.NextGeneration]),

                // Romulan
                new SpaceframeAppearanceModel(SpaceframeAppearance.BirdOfPrey22ndCentury, CharacterType.Romulan, [Era.Enterprise]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Tliss, CharacterType.Romulan, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RomulanD7, CharacterType.Romulan, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Whitewind, CharacterType.Romulan, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.DDeridex, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Mogai, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RedLadyType, CharacterType.Romulan, [Era.NextGeneration]),
//                new SpaceframeAppearanceModel(SpaceframeAppearance.Snakehead, CharacterType.Romulan, [Era.NextGeneration]),
            ];
        }

        return this.TYPES.filter(a => a.type === type && a.eras.includes(era));
    }

    static appearanceCodeByName(name: string): SpaceframeAppearance|undefined {
        const result = Object.keys(SpaceframeAppearance).filter((item) => {
                        return !isNaN(Number(item));
                    }).map(item => Number(item))
                    .filter(item => SpaceframeAppearance[item] === name);
        return result?.length ? result[0] : undefined;
    }
}