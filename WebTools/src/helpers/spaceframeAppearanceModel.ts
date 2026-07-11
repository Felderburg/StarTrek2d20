import i18next from "i18next";
import { makeKey } from "../common/translationKey";
import { SpaceframeAppearance } from "./spaceframeAppearance";
import { CharacterType } from "../common/characterType";
import { Era } from "./erasEnum";
import { ShipBuildType } from "../common/shipBuildType";

export class SpaceframeAppearanceModel {

    private static TYPES: SpaceframeAppearanceModel[] = null;

    readonly id: SpaceframeAppearance;
    readonly type: CharacterType;
    readonly eras: Era[];
    readonly buildType: ShipBuildType;

    constructor(id: SpaceframeAppearance, type: CharacterType, eras: Era[], buildType: ShipBuildType = ShipBuildType.Starship) {
        this.id = id;
        this.type = type;
        this.eras = eras;
        this.buildType = buildType;
    }

    get localizedName() {
        return i18next.t(makeKey('SpaceframeAppearance.', SpaceframeAppearance[this.id]));
    }

    static getAllAppearanceModels(type: CharacterType, era: Era, buildType: ShipBuildType = ShipBuildType.Starship) {
        if (this.TYPES == null) {
            this.TYPES = [
                // Shuttles
                new SpaceframeAppearanceModel(SpaceframeAppearance.Type6Shuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Type8Shuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Type9Shuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Type10Shuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.ArgoClassShuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Type16Shuttle, CharacterType.Starfleet, [Era.NextGeneration], ShipBuildType.Shuttlecraft),

                // Civilian
                new SpaceframeAppearanceModel(SpaceframeAppearance.Antares, CharacterType.Civilian, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.ClassJCargoShip, CharacterType.Civilian, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.ConestogaType, CharacterType.Civilian, [Era.Enterprise]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Eleos, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Freighter, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.JovisType, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Merchantman, CharacterType.Civilian, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.XhosaType, CharacterType.Civilian, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.KaplanF17PatrolFrigate, CharacterType.Civilian, [Era.NextGeneration]),

                // Romulan
                new SpaceframeAppearanceModel(SpaceframeAppearance.Aelahl, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.BirdOfPrey22ndCentury, CharacterType.Romulan, [Era.Enterprise]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Tliss, CharacterType.Romulan, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RomulanD7, CharacterType.Romulan, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Whitewind, CharacterType.Romulan, [Era.OriginalSeries]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.DDeridex, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RomulanScienceVessel, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Mogai, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RedLadyType, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Snakehead, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.ScimitarType, CharacterType.Romulan, [Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Khnial, CharacterType.Romulan, [Era.NextGeneration]),
                // Romulan Shuttles
                new SpaceframeAppearanceModel(SpaceframeAppearance.RomulanShuttle, CharacterType.Romulan, [Era.NextGeneration], ShipBuildType.Shuttlecraft),
                new SpaceframeAppearanceModel(SpaceframeAppearance.RemanScorpionFighter, CharacterType.Romulan, [Era.NextGeneration], ShipBuildType.Shuttlecraft),


                // Discovery 32nd century
                new SpaceframeAppearanceModel(SpaceframeAppearance.Eisenberg, CharacterType.Starfleet, [Era.Discovery32]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Friendship, CharacterType.Starfleet, [Era.Discovery32]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Kirk, CharacterType.Starfleet, [Era.Discovery32]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Janeway, CharacterType.Starfleet, [Era.Discovery32]),

                // Orion
                new SpaceframeAppearanceModel(SpaceframeAppearance.Interceptor, CharacterType.Orion, [Era.Enterprise]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.DVar, CharacterType.Orion, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Intruder, CharacterType.Orion, [Era.OriginalSeries, Era.NextGeneration]),
                new SpaceframeAppearanceModel(SpaceframeAppearance.Orchid, CharacterType.Orion, [Era.OriginalSeries, Era.NextGeneration]),
            ];
        }

        return this.TYPES.filter(a => a.type === type && a.eras.includes(era) && a.buildType === buildType);
    }

    static appearanceCodeByName(name: string): SpaceframeAppearance|undefined {
        const result = Object.keys(SpaceframeAppearance).filter((item) => {
                        return !isNaN(Number(item));
                    }).map(item => Number(item))
                    .filter(item => SpaceframeAppearance[item] === name);
        return result?.length ? result[0] : undefined;
    }
}