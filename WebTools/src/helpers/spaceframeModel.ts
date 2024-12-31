import i18next from "i18next";
import { CharacterType } from "../common/characterType";
import { Starship } from "../common/starship";
import { makeKey } from "../common/translationKey";
import { IConstructPrerequisite, NeverPrerequisite, ServiceYearPrerequisite, StarshipTypePrerequisite } from "./prerequisite";
import { Source } from "./sources";
import { Spaceframe } from "./spaceframeEnum";
import { SourcePrerequisite } from "./spaceframes";
import { TalentSelection } from "./talentSelection";
import { IServiceYearProvider } from "../common/serviceYearProvider";
import { CenturyPrerequisite, MaxServiceYearPrerequisite } from "./talents";


export class SoloSpaceframeStats {
    departments: number[];
    systems: number[];

    constructor(systems: number[], departments: number[]) {
        this.departments = departments;
        this.systems = systems;
    }
}

export class SpaceframeModel implements IServiceYearProvider {
    id: Spaceframe|null;
    type: CharacterType;
    name: string;
    serviceYear: number;
    prerequisites: IConstructPrerequisite<Starship>[];
    systems: number[];
    departments: number[];
    scale: number;
    attacks: string[];
    talents: TalentSelection[];
    additionalTraits: string[];
    maxServiceYear: number;
    soloStats?: SoloSpaceframeStats;

    constructor(id: Spaceframe|null, type: CharacterType, name: string, serviceYear: number,
        prerequisites: IConstructPrerequisite<Starship>[], systems: number[], departments: number[],
        scale: number, attacks: string[], talents: TalentSelection[],
        additionalTraits: string[] = [ "Federation Starship" ], maxServiceYear: number = 99999,
        soloStats?: SoloSpaceframeStats) {

        this.id = id;
        this.type = type;
        this.name = name;
        this.serviceYear = serviceYear;
        this.prerequisites = prerequisites;
        this.systems = systems;
        this.departments = departments;
        this.scale = scale;
        this.attacks = attacks;
        this.talents = talents;
        this.additionalTraits = additionalTraits;
        this.maxServiceYear = maxServiceYear;
        this.soloStats = soloStats;
    }

    get isMissionPodAvailable() {
        return this.id === Spaceframe.Nebula || this.id === Spaceframe.Luna || this.hasTalent("Mission Pod");
    }

    get isCustom() {
        return this.id == null;
    }

    talentsEffectiveForDate(serviceYear?: number) {
        if (serviceYear != null) {
            return this.talents.filter(t => {
                let result = true;
                t.talent.prerequisites.forEach(p => {
                    if (p instanceof MaxServiceYearPrerequisite) {
                        result = result && serviceYear <= (p as MaxServiceYearPrerequisite).year;
                    } else if (p instanceof CenturyPrerequisite) {
                        const prereq = p as CenturyPrerequisite;
                        if (prereq.toYear != null) {
                            result = result && serviceYear <= prereq.toYear;
                        }
                    }
                });

                return result;
            });
        } else {
            return this.talents;
        }
    }

    isPrerequisiteFulfilled(s: Starship) {
        if (this.prerequisites.length === 0) {
            return true;
        } else {
            let result = true;
            this.prerequisites.forEach(req => {
                result = result && req.isPrerequisiteFulfilled(s);
            });
            return result;
        }
    }

    hasTalent(name: string) {
        let result = false;
        this.talents.forEach(t => {
            result = result || (t.talent.name === name);
        });
        return result;
    }

    get isSmallCraft() {
        return this.scale <= 2;
    }

    get isCivilian() {
        return this.name.indexOf("Civilian") >= 0
            || [Spaceframe.JClassYClass, Spaceframe.Antares].includes(this.id)
            || this.type === CharacterType.Civilian;
    }

    get key() {
        if (this.id != null) {
            let key = makeKey('Spaceframe.', Spaceframe[this.id]);
            if (key.indexOf("_UP") >= 0) {
                key = key.substring(0, key.indexOf("_UP"));
            } else if (key.indexOf("_2E") >= 0) {
                key = key.substring(0, key.indexOf("_2E"));
            }
            return key;
        } else {
            return undefined;
        }
    }

    get localizedName() {
        let key = this.key;
        if (key != null) {
            let local = i18next.t(key);
            return local === key ? this.name : local;
        } else {
            return this.name;
        }
    }

    get localizedDescription() {
        let key = this.key;
        if (key != null) {
            key += ".description";
            let local = i18next.t(key);
            return local === key ? undefined : local;
        } else {
            return undefined;
        }
    }

    copy() {
        return new SpaceframeModel(this.id, this.type, this.name, this.serviceYear, this.prerequisites, [...this.systems], [...this.departments],
            this.scale, [...this.attacks], [...this.talents], [...this.additionalTraits], this.maxServiceYear);
    }

    static createStandardSpaceframe(id: Spaceframe, type: CharacterType, name: string, serviceYear: number, source: Source[], systems: number[], departments: number[],
        scale: number, attacks: string[], talents: TalentSelection[], additionalTraits: string[] = [ "Federation Starship" ], maxServiceYear: number = 99999,
        soloStats?: SoloSpaceframeStats) {
        let sourcePrerequisite = new SourcePrerequisite(...source);
        let prerequisites: IConstructPrerequisite<Starship>[] = [
            sourcePrerequisite, new StarshipTypePrerequisite(type), new ServiceYearPrerequisite(serviceYear) ];
        if (serviceYear > 3100 || id === Spaceframe.ScoutType) {
            prerequisites.push(new NeverPrerequisite());
        }
        return new SpaceframeModel(id, type, name, serviceYear, prerequisites, systems, departments, scale, attacks, talents, additionalTraits, maxServiceYear, soloStats );
    }

    static createCustomSpaceframe(type: CharacterType, serviceYear: number,
            systems: number[] = [7, 7, 7, 7, 7, 7], departments: number[] = [0, 0, 0, 0, 0, 0], scale: number = 3) {
        return new SpaceframeModel(null, type, "", serviceYear,
            [ new SourcePrerequisite(Source.None) ], systems, departments, scale, [], [],
            type === CharacterType.KlingonWarrior ? [ "Klingon Starship"] : [ "Federation Starship" ]);
    }
}
