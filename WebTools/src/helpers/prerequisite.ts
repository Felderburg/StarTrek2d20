import { Character } from "../common/character";
import { CharacterType } from "../common/characterType";
import { Construct, Stereotype } from "../common/construct";
import { IConstruct } from "../common/iconstruct";
import { Specialization } from "../common/specializationEnum";
import { Starship } from "../common/starship";
import { Station } from "../common/station";
import { Creature } from "../creature/model/creature";
import store from "../state/store";
import { Career } from "./careerEnum";
import { Era } from "./eras";
import { Role } from "./roles";
import { Source } from "./sources";

export interface IConstructPrerequisite {
    isPrerequisiteFulfilled(construct: Character|Starship|Creature|Station): boolean;
    describe(): string
}

export interface ICompositePrerequisite {
    prerequisites: IConstructPrerequisite[];
}

export class OfficerPrerequisite implements IConstructPrerequisite {
    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return character instanceof Character && !character.enlisted && !character.isCivilian();
    }

    describe(): string {
        return "";
    }
}

export class RolePrerequisite implements IConstructPrerequisite {

    readonly role: Role;

    constructor(role: Role) {
        this.role = role;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        if (!(character instanceof Character)) {
            return false;
        } else if (character.role != null) {
            return character.role === this.role || character.secondaryRole === this.role;
        } else if (character.stereotype === Stereotype.MainCharacter) {
            let roles = character.talents.map(t => t.talentModel.prerequisites)
                .flat()
                .filter(p => p instanceof RolePrerequisite)
                .filter(p => (p as RolePrerequisite).role !== this.role);
            return !(roles?.length)
        } else {
            return false;
        }
    }

    describe(): string {
        return "";
    }
}

export class MainCharacterPrerequisite implements IConstructPrerequisite {

    isPrerequisiteFulfilled(c: Character|Starship|Creature|Station) {
        return c.stereotype === Stereotype.MainCharacter;
    }
    describe(): string {
        return "Main Character only";
    }
}



export class SourcePrerequisite implements IConstructPrerequisite {
    private sources: Source[];

    constructor(...sources: Source[]) {
        this.sources = sources;
    }

    isPrerequisiteFulfilled(c: Character|Starship|Creature|Station) {
        let result = false
        this.sources.forEach((s) => { result = result || store.getState().context.sources.indexOf(s) >= 0 })
        return result;
    }

    getSources() {
        return this.sources;
    }
    describe(): string {
        return "";
    }
}

export class StarshipTypePrerequisite implements IConstructPrerequisite {
    private types: CharacterType[];

    constructor(...type: CharacterType[]) {
        this.types = type;
    }

    isPrerequisiteFulfilled(s: Character|Starship|Creature|Station) {
        return s instanceof Starship && this.types.indexOf(s.type) >= 0;
    }
    describe(): string {
        return "";
    }
}

export class ServiceYearPrerequisite implements IConstructPrerequisite {
    private year: number;

    constructor(year: number) {
        this.year = year;
    }

    isPrerequisiteFulfilled(s: Character|Starship|Creature|Station) {
        return s != null && (s instanceof Starship) && s.serviceYear >= this.year;
    }
    describe(): string {
        return "" + this.year + " or later";
    }
}

export class NotPrerequisite implements IConstructPrerequisite {
    private prereq: IConstructPrerequisite;

    constructor(prereq: IConstructPrerequisite) {
        this.prereq = prereq;
    }
    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station): boolean {
        return !this.prereq.isPrerequisiteFulfilled(character);
    }
    describe(): string {
        return "";
    }
}

export class AnyOfPrerequisite implements IConstructPrerequisite, ICompositePrerequisite {
    prerequisites: IConstructPrerequisite[];

    constructor(...prequisites: IConstructPrerequisite[]) {
        this.prerequisites = prequisites;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        if (this.prerequisites.length === 0) {
            return true;
        } else {
            var result = false;
            this.prerequisites.forEach(req => {
                result = result || req.isPrerequisiteFulfilled(character);
            });
            return result;
        }
    }
    describe(): string {
        return "";
    }
}

export class CareersPrerequisite implements IConstructPrerequisite {
    private _careers: Career[];

    constructor(...careers: Career[]) {
        this._careers = careers;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return character instanceof Character
            && character.careerStep?.career != null
            && this._careers.indexOf(character.careerStep?.career) > -1;
    }
    describe(): string {
        return "Only available to " + this._careers.map(c => Career[c]).join(', ') + " characters";
    }
}

export class EnlistedPrerequisite implements IConstructPrerequisite {
    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return character instanceof Character && character.enlisted;
    }
    describe(): string {
        return "";
    }
}

export class AnyEraPrerequisite implements IConstructPrerequisite {
    private eras: Era[];

    constructor(...era: Era[]) {
        this.eras = era;
    }

    isPrerequisiteFulfilled(construct: Character|Starship|Creature|Station) {
        return this.eras.indexOf(store.getState().context.era) >= 0;
    }
    describe(): string {
        return "";
    }
}

export class CharacterTypePrerequisite implements IConstructPrerequisite {
    private types: CharacterType[];

    constructor(...type: CharacterType[]) {
        this.types = type;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return this.types.indexOf(character.type) >= 0;
    }
    describe(): string {
        return "";
    }
}

export class StereotypePrerequisite implements IConstructPrerequisite {
    private types: Stereotype[];

    constructor(...type: Stereotype[]) {
        this.types = type;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return this.types.indexOf(character.stereotype) >= 0;
    }
    describe(): string {
        return "";
    }
}

export class SpecializationPrerequisite implements IConstructPrerequisite {
    private types: Specialization[];

    constructor(...type: Specialization[]) {
        this.types = type;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        return character instanceof Character && character.stereotype === Stereotype.Npc && this.types.indexOf(character.npcGenerationStep?.specialization) >= 0;
    }
    describe(): string {
        return "";
    }
}

export class NeverPrerequisite implements IConstructPrerequisite {

    isPrerequisiteFulfilled(c: Starship) {
        return false;
    }

    describe(): string {
        return "";
    }
}

export class AllOfPrerequisite implements IConstructPrerequisite, ICompositePrerequisite {
    prerequisites: IConstructPrerequisite[];

    constructor(...prequisites: IConstructPrerequisite[]) {
        this.prerequisites = prequisites;
    }

    isPrerequisiteFulfilled(character: Character|Starship|Creature|Station) {
        if (this.prerequisites.length === 0) {
            return true;
        } else {
            let result = true;
            this.prerequisites.forEach(req => {
                result = result && req.isPrerequisiteFulfilled(character);
            });
            return result;
        }
    }
    describe(): string {
        return "";
    }
}