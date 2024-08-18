import {Character } from '../common/character';
import { CharacterType } from '../common/characterType';
import {AliasModel} from './aliases';
import {Attribute} from './attributes';
import {Skill, SkillsHelper} from './skills';
import {Department} from './departments';
import {Source} from './sources';
import {Era} from './eras';
import { Species } from './speciesEnum';
import { Construct, Stereotype } from '../common/construct';
import { Starship } from '../common/starship';
import store from '../state/store';
import { centuryToYear } from './weapons';
import { Spaceframe } from './spaceframeEnum';
import { CareersPrerequisite, CharacterStereotypePrerequisite, ICompositePrerequisite, IConstructPrerequisite, MainCharacterPrerequisite, OfficerPrerequisite, ServiceYearPrerequisite, SourcePrerequisite, SpecializationPrerequisite } from './prerequisite';
import { NotSourcePrerequisite } from './spaceframes';
import { Career } from './careerEnum';
import { hasAnySource } from '../state/contextFunctions';
import i18next from 'i18next';
import { toCamelCase } from '../common/camelCaseUtil';
import { Specialization } from '../common/specializationEnum';
import { ITalent } from './italent';

export const ADVANCED_TEAM_DYNAMICS = "Advanced Team Dynamics";
export const TALENT_NAME_BORG_IMPLANTS = "Borg Implants";
export const TALENT_NAME_EXPANDED_PROGRAM = "Expanded Program";
export const TALENT_NAME_VISIT_EVERY_STAR = "Visit Every Star";
export const TALENT_NAME_WISDOM_OF_YEARS = "Wisdom of Years";
export const TALENT_NAME_BRAK_LUL = "Brak’lul";
export const TALENT_NAME_MISSION_POD = "Mission Pod";

enum TalentCategory {
    General,
    Career,
    Enhancement,
    Starship,
    Starbase,
    Esoteric
}

class AttributePrerequisite implements IConstructPrerequisite<Character> {
    private attribute: Attribute;
    private value: number;

    constructor(attribute: Attribute, minValue: number) {
        this.attribute = attribute;
        this.value = minValue;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.attributes[this.attribute].value >= this.value;
    }
    describe(): string {
        return "Requires " + Attribute[this.attribute] + " " + this.value + "+";
    }
};

class DisciplinePrerequisite implements IConstructPrerequisite<Character> {
    discipline: Skill;
    private value: number;

    constructor(discipline: Skill, minValue: number) {
        this.discipline = discipline;
        this.value = minValue;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.skills[this.discipline].expertise >= this.value;
    }

    describe(): string {
        return "Requires " + Skill[this.discipline] + " " + this.value + "+";
    }
};

class UntrainedDisciplinePrerequisite implements IConstructPrerequisite<Character> {
    private discipline: Skill;

    constructor(discipline: Skill) {
        this.discipline = discipline;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.skills[this.discipline].expertise <= 1;
    }
    describe(): string {
        return "Requires " + Skill[this.discipline] + " <= 1";
    }
};

class VariableDisciplinePrerequisite implements IConstructPrerequisite<Character> {
    private discipline1: Skill;
    private discipline2: Skill;
    private value: number;

    constructor(discipline1: Skill, discipline2: Skill, minValue: number) {
        this.discipline1 = discipline1;
        this.discipline2 = discipline2;
        this.value = minValue;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.skills[this.discipline1].expertise >= this.value ||
               c.skills[this.discipline2].expertise >= this.value;
    }
    describe(): string {
        return "Requires " + Skill[this.discipline1] + " " + this.value + "+ or "
            + Skill[this.discipline2] + " " + this.value + "+";
    }
};

class SpeciesPrerequisite implements IConstructPrerequisite<Character> {
    private species: number;
    private allowCrossSelection: boolean;
    private allowMixedSpecies: boolean;

    constructor(species: number, allowCrossSelection: boolean, allowMixedSpecies: boolean = true) {
        this.species = species;
        this.allowCrossSelection = allowCrossSelection;
        this.allowMixedSpecies = allowMixedSpecies;
    }

    isPrerequisiteFulfilled(c: Character) {
        if (this.allowMixedSpecies) {
            return c.speciesStep?.species === this.species ||
            c.speciesStep?.mixedSpecies === this.species ||
            c.speciesStep?.originalSpecies === this.species ||
            (this.allowCrossSelection && store.getState().context.allowCrossSpeciesTalents);
        } else {
            return c.speciesStep?.species === this.species && c.speciesStep?.mixedSpecies == null && c.speciesStep?.originalSpecies == null;
        }
    }

    describe(): string {
        return "";
    }
}

class AnySpeciesPrerequisite implements IConstructPrerequisite<Character> {
    private species: Species[];
    private allowCrossSelection: boolean;

    constructor(allowCrossSelection: boolean, ...species: Species[]) {
        this.species = species;
        this.allowCrossSelection = allowCrossSelection;
    }

    isPrerequisiteFulfilled(c: Character) {
        let result = (this.allowCrossSelection && store.getState().context.allowCrossSpeciesTalents);
        this.species.forEach(s => result = result || c.speciesStep?.species === s || c.speciesStep?.mixedSpecies === s || c.speciesStep?.originalSpecies === s);
        return result;
    }
    describe(): string {
        return "";
    }
}

class ChildOnlyPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(c: Character) {
        return false; // it's never selected by players; only automatically added for child characters
    }
    describe(): string {
        return "Child characters only";
    }
}

class CommandingAndExecutiveOfficerPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(c: Character) {
        // Awkwardly, we don't know the character's role at the time that
        // they select talents. What we *do* know is that Young characters
        // don't get to be Commanding Officers or Executive Officers.
        return !c.isYoung();
    }
    describe(): string {
        return "Commanding Officer or Executive Officer only";
    }
}

class GMsDiscretionPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(c: Character) {
        return store.getState().context.allowEsotericTalents;
    }
    describe(): string {
        return "Gamemaster’s discretion";
    }
}

class OnlyAtCharacterCreationPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(c: Character) {
        return true;
    }
    describe(): string {
        return "Only available at character creation";
    }
}


class SupportingCharacterPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(c: Character) {
        return false; // at the moment, only Main characters can have talents, so I think this is always false
    }
    describe(): string {
        return "Supporting Character only, must have at least two values and at least two other talents";
    }
}

class NotCharacterTypePrerequisite implements IConstructPrerequisite<Character> {
    private type: CharacterType;

    constructor(type: CharacterType) {
        this.type = type;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.type !== this.type;
    }
    describe(): string {
        return "";
    }
}

class AnyOfPrerequisite implements IConstructPrerequisite<Construct>, ICompositePrerequisite<Construct> {
    prerequisites: IConstructPrerequisite<Construct>[];

    constructor(...prerequisites: IConstructPrerequisite<Construct>[]) {
        this.prerequisites = prerequisites;
    }

    isPrerequisiteFulfilled(c: Construct) {
        let result = false;
        for (let p of this.prerequisites) {
            result = result || p.isPrerequisiteFulfilled(c);
            if (result) {
                break;
            }
        }
        return result;
    }
    describe(): string {

        return "";
    }
}


class TalentPrerequisite implements IConstructPrerequisite<Construct> {
    private talent: string[];

    constructor(...talent: string[]) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled(c: Construct) {
        let result = false;
        this.talent.forEach(t =>
            result = result || c.hasTalent(t)
        );
        return result;
    }
    describe(): string {
        return "Requires \"" + this.talent.join('" or "') + "\" Talent";
    }
}

class FocusPrerequisite implements IConstructPrerequisite<Character> {
    private focuses: string[];

    constructor(...focuses: string[]) {
        this.focuses = focuses;
    }

    isPrerequisiteFulfilled(c: Character) {
        return c.focuses.filter(f => this.focuses.indexOf(f) >= 0).length > 0;
    }
    describe(): string {
        if (this.focuses.length === 1) {
            return "Requires \"" + this.focuses[0] + "\" Focus";
        } else {
            return "Requires one of the following focuses: \"" + this.focuses.join("\", \"") + "\"";
        }
    }
}

class NotTalentPrerequisite implements IConstructPrerequisite<Construct> {
    private talent: string;

    constructor(talent: string) {
        this.talent = talent;
    }

    isPrerequisiteFulfilled(c: Construct) {
        return !c.hasTalent(this.talent);
    }
    describe(): string {
        return "Conflicts with \"" + this.talent + "\" Talent";
    }
}

class EraPrerequisite implements IConstructPrerequisite<Construct> {
    private era: Era;

    constructor(era: Era) {
        this.era = era;
    }

    isPrerequisiteFulfilled(c: Construct) {
        return store.getState().context.era >= this.era;
    }
    describe(): string {
        return "";
    }
}

class NotEraPrerequisite implements IConstructPrerequisite<Construct> {
    private eras: Era[];

    constructor(...eras: Era[]) {
        this.eras = eras;
    }

    isPrerequisiteFulfilled(c: Construct) {
        let result = true;
        this.eras.forEach((e) => { result = result && store.getState().context.era !== e })
        return result;
    }
    describe(): string {
        return "";
    }
}

class StarshipPrerequisite implements IConstructPrerequisite<Starship> {
    isPrerequisiteFulfilled(starship: Starship) {
        return starship instanceof Starship;
    }
    describe(): string {
        return "";
    }
}

class StarbasePrerequisite implements IConstructPrerequisite<Construct> {
    isPrerequisiteFulfilled(c: Construct) {
        return false;
    }
    describe(): string {
        return "";
    }
}

class MaxServiceYearPrerequisite implements IConstructPrerequisite<Starship> {
    private year: number;

    constructor(year: number) {
        this.year = year;
    }

    isPrerequisiteFulfilled(s: Starship) {
        return s != null && s.serviceYear <= this.year;
    }
    describe(): string {
        return "";
    }
}

class SpaceframePrerequisite implements IConstructPrerequisite<Starship> {
    private frame: number;

    constructor(frame: number) {
        this.frame = frame;
    }

    isPrerequisiteFulfilled(s: Starship) {
        return s?.spaceframeModel?.id === this.frame;
    }
    describe(): string {
        return "";
    }
}

export class CenturyPrerequisite implements IConstructPrerequisite<Starship> {
    private century: number;
    private toCentury?: number;

    constructor(century: number, toCentury?: number) {
        this.century = century;
    }

    isPrerequisiteFulfilled(s: Starship) {
        let year = centuryToYear(this.century);
        if (this.toCentury == null) {
            return s != null && s.serviceYear != null && s.serviceYear >= year;
        } else {
            let toYear = centuryToYear(this.toCentury + 1) + 1;
            return s != null && s.serviceYear != null && s.serviceYear >= year && s.serviceYear < toYear;
        }
    }
    describe(): string {
        if (this.toCentury == null) {
            return "" + this.addSuffix(this.century) + " century or later";
        } else {
            return "" + this.addSuffix(this.century) + " century to " + this.addSuffix(this.toCentury) + " century.";
        }
    }

    addSuffix(century: number) {
        let lastDigit = century.toString().substring(century.toString().length - 1);
        if (lastDigit === '1') {
            return this.century + "st";
        } else if (lastDigit === '2') {
            return this.century + "nd";
        } else if (lastDigit === '3') {
            return this.century + "rd";
        } else {
            return this.century + "th";
        }
    }
}

class AllOfPrerequisite implements IConstructPrerequisite<Construct>, ICompositePrerequisite<Construct> {
    prerequisites: IConstructPrerequisite<Construct>[];

    constructor(...prerequisites: IConstructPrerequisite<Construct>[]) {
        this.prerequisites = prerequisites;
    }

    isPrerequisiteFulfilled(c: Construct) {
        if (this.prerequisites.length === 0) {
            return true;
        } else {
            let result = true;
            this.prerequisites.forEach(req => {
                result = result && req.isPrerequisiteFulfilled(c);
            });
            return result;
        }
    }

    describe(): string {
        let temp = this.prerequisites.map(p => "(" + p.describe() + ")");
        return temp.join(" and ");
    }
}
class SpaceframesPrerequisite implements IConstructPrerequisite<Starship> {
    private frames: number[];

    constructor(frames: number[]) {
        this.frames = frames;
    }

    isPrerequisiteFulfilled(starship: Starship) {
        return starship.spaceframeModel && (this.frames.indexOf(starship.spaceframeModel.id) > -1);
    }
    describe(): string {
        return "";
    }
}

class DepartmentPrerequisite implements IConstructPrerequisite<Starship> {
    private department: Department;
    private value: number;

    constructor(department: Department, value: number) {
        this.department = department;
        this.value = value;
    }

    isPrerequisiteFulfilled(starship: Starship) {
        return starship != null && starship.departments[this.department] >= this.value;
    }
    describe(): string {
        return "";
    }
}

export class TalentModel implements ITalent {
    readonly name: string;
    private description: string;
    prerequisites: IConstructPrerequisite<Construct>[];
    maxRank: number;
    category: string;
    aliases: AliasModel[];
    specialRule: boolean;

    constructor(name: string, desc: string, prerequisites: IConstructPrerequisite<Construct>[], maxRank: number = 1, category?: string, specialRule: boolean = false, ...aliases: AliasModel[]) {
        this.name = name;
        this.description = desc;
        this.prerequisites = prerequisites;
        this.maxRank = maxRank;
        if (category == null) {
            let prereq = prerequisites.filter(p => (p instanceof DisciplinePrerequisite));
            if (prereq.length > 0) {
                let p = prereq[0] as DisciplinePrerequisite;
                this.category = Skill[p.discipline];
            } else {
                this.category = "";
            }
        } else {
            this.category = category;
        }
        this.specialRule = specialRule;
        this.aliases = aliases || AliasModel[0];
    }

    get displayName() {
        if (this.category) {
            const suffix = " (" + this.category + ")";
            if (this.name.indexOf(suffix) >= 0) {
                return this.name.substring(0, this.name.indexOf(suffix));
            } else {
                return this.name;
            }
        } else {
            return this.name;
        }
    }

    get localizedDisplayName() {
        let key = "Talent." + this.rootKey;
        let result = i18next.t(key);

        if (result === key) {
            let name = this.localizedName;
            if (this.category) {
                const suffix = " (" + this.category + ")";
                if (name.indexOf(suffix) >= 0) {
                    return name.substring(0, name.indexOf(suffix));
                } else {
                    return name;
                }
            } else {
                return name;
            }
        } else {
            return result;
        }
    }

    get localizedDescription() {
        let key = "Talent." + this.rootKey + ".description";
        let result = i18next.t(key);
        return result === key ? this.description : result;
    }

    get localizedDescription2e() {
        let key = "Talent." + this.rootKey + ".description2e";
        let result = i18next.t(key);
        return result === key ? this.localizedDescription : result;
    }

    get rootKey() {
        return toCamelCase(this.name);
    }

    get localizedName() {
        let key = "Talent." + this.rootKey;
        let result = i18next.t(key);
        return result === key ? this.name : result;
    }

    localizedNameForSource(source: Source): string {
        let result = this.localizedDisplayName;
        let alias = this.aliases.filter(a => a.source === source);
        return alias?.length ? alias[0].localizedName : result;
    }

    get localizedSoloDescription(): string { // for Starship talents, this is the short, abbreviated description of the talent
        let key = "Talent." + this.rootKey + ".soloDescription";
        let result = i18next.t(key);
        return result === key ? "" : result;
    }

    private sourcesFromPrerequsite(prerequisite: ICompositePrerequisite<Construct>) {
        let result = [];
        let subList = prerequisite.prerequisites;
        subList.forEach(p => {
            if (p instanceof SourcePrerequisite) {
                Array.prototype.push.apply(result, (p as SourcePrerequisite).getSources());
            } else if (p instanceof AnyOfPrerequisite || p instanceof AllOfPrerequisite) {
                Array.prototype.push.apply(result, this.sourcesFromPrerequsite(p));
            }
        });
        return result;
    }

    get sources(): Source[] {
        let src = [];

        this.prerequisites.forEach(p => {
            if (p instanceof SourcePrerequisite) {
                Array.prototype.push.apply(src, (this.prerequisites.filter(p => p instanceof SourcePrerequisite)[0] as SourcePrerequisite).getSources());
            } else if (p instanceof AnyOfPrerequisite || p instanceof AllOfPrerequisite) {
                Array.prototype.push.apply(src, this.sourcesFromPrerequsite(p));
            }
        });

        if (src.length === 0) {
            src = [ Source.Core ];
        }

        return src;
    }

    isAvailableExcludingSpecies(character: Character) {
        let available = true;
        this.prerequisites.forEach((p, i) => {
            if (!(p instanceof SpeciesPrerequisite) && !(p instanceof AnySpeciesPrerequisite) && !p.isPrerequisiteFulfilled(character)) {
                available = false;
            }
        });
        return available;
    }

    isAvailableForServiceYear(s: Starship) {
        let available = true;
        this.prerequisites.forEach((p, i) => {
            if (((p instanceof ServiceYearPrerequisite) || (p instanceof MaxServiceYearPrerequisite)) && !p.isPrerequisiteFulfilled(s)) {
                available = false;
            }
        });
        return available;
    }

    isPrerequisiteFulfilled(c: Construct) {
        let include = true;
        this.prerequisites.forEach((p, i) => {
            if (!p.isPrerequisiteFulfilled(c)) {
                include = false;
            }
        });
        return include;
    }

    isSourcePrerequisiteFulfilled(c: Construct) {
        let include = true;
        this.prerequisites.forEach((p, i) => {
            if (p instanceof SourcePrerequisite && !p.isPrerequisiteFulfilled(c)) {
                include = false;
            } else if (p instanceof NotSourcePrerequisite && c instanceof Starship && !p.isPrerequisiteFulfilled(c as Starship)) {
                include = false;
            }
        });
        return include;
    }

    nameForSource(source: Source) {
        let result = this.name;
        for (let a of this.aliases) {
            if (a.source === source) {
                result = a.name;
                break;
            }
        }
        return result;
    }

    matches(name: string) {
        if (this.name === name || this.name.replace("’", "'") === name.replace("’", "'")) {
            return true;
        } else {
            let result = false;
            this.aliases.forEach(a => {
                if (a.name === name || a.name.replace("’", "'") === name.replace("’", "'")) {
                    result = true;
                }
            })
            return result;
        }
    }

    get requirement() {
        let prerequisites = undefined;
        this.prerequisites.forEach((p) => {
            let desc = p.describe();
            if (desc) {
                if (prerequisites == null) {
                    prerequisites = desc;
                } else {
                    prerequisites += (", " + desc);
                }
            }
        });
        return prerequisites;
    }

    get localizedCategory() {
        let categoryEnum = undefined;
        for (let i = 0; i < TalentCategory.Esoteric; i++) {
            if (this.category === TalentCategory[i]) {
                categoryEnum = TalentCategory[i];
            }
        }
        if (categoryEnum != null) {
            let key = "TalentCategory." + toCamelCase(categoryEnum);
            return i18next.t(key);
        } else {
            let match = SkillsHelper.getSkills().filter(s => Skill[s] === this.category);
            if (match.length) {
                let key = "Construct.discipline." + toCamelCase(Skill[match[0]]);
                return i18next.t(key);
            } else {
                // assume that it's a species
                let key = "Species." + toCamelCase(this.category) + ".name";
                if (this.category === "Rigellian Jelna") {
                    key = "Species.jelna.name";
                } else if (this.category === "Rigellian Chelon") {
                    key = "Species.chelon.name";
                }
                let result = i18next.t(key);
                return result === key ? this.category : result;
            }
        }
    }
}

export class TalentViewModel {
    id: string;
    name: string;
    rank: number;
    hasRank: boolean;
    description: string;
    category: string;
    prerequisites: IConstructPrerequisite<Construct>[];
    displayName: string;
    specialRule: boolean;
    localizedName:string;

    constructor(name: string, localizedName:string, rank: number, showRank: boolean, description: string, skill: Skill, category: string, prerequities: IConstructPrerequisite<Character>[], specialRule: boolean) {
        this.id = name;
        this.description = description;
        this.rank = rank;
        this.hasRank = showRank;
        this.displayName = this.constructDisplayName(name, localizedName, rank, showRank, skill, category);
        this.name = name;
        this.prerequisites = prerequities;
        this.category = category;
        this.specialRule = specialRule;
        this.localizedName = localizedName;
    }


    private constructDisplayName(name: string, localizedName: string, rank: number, showRank: boolean, skill: Skill, category: string) {
        let displayName = localizedName + ((showRank && category !== "Starship" && category !== "Starbase") ? " [Rank: " + rank + "]" : "");
        let suffix = skill !== undefined && skill !== Skill.None
            ? ` (${SkillsHelper.getSkillName(skill)})`
            : category.length > 0 ? ` (${category})` : "";
        if (displayName.indexOf(suffix) < 0) {
            displayName += suffix;
        }
        return displayName;
    }
}

export function ToViewModel(talent: TalentModel, rank: number = 1, type: CharacterType, version: number = 1): TalentViewModel {
    let name = talent.name;
    if (type === CharacterType.KlingonWarrior) {
        name = talent.nameForSource(Source.KlingonCore);
    }
    return new TalentViewModel(name, talent.localizedName, rank, talent.maxRank > 1,
        version === 1 ? talent.localizedDescription : talent.localizedDescription2e,
        undefined, talent.category, talent.prerequisites, talent.specialRule);
}

export class Talents {
    private _talents: TalentModel[] = [
            new TalentModel(
                "Advisor",
                "Whenever you assist another character using your Command Discipline, the character being assisted may re-roll one d20.",
                [new DisciplinePrerequisite(Skill.Command, 2), new MainCharacterPrerequisite(), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Defuse the Tension",
                "Whenever you attempt a Task to persuade someone not to resort to violence, you may add a bonus d20 to your dice pool.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Follow My Lead",
                "Once per scene, when you succeed at a Task during combat or another perilous situation, you may spend one Determination. If you do, choose a single ally. The next Task that ally attempts counts as having assistance from you, using your Presence + Command.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Supervisor",
                "The ship’s Crew Support increases by one. This increase is cumulative if multiple Main Characters in the group select it.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Command", false, new AliasModel("War Leader", Source.KlingonCore)),
            new TalentModel(
                "Bargain",
                "When negotiating an offer with someone during Social Conflict, you may re-roll a d20 on your next Persuade Task to convince that person. If the Social Conflict involves an Extended Task, you gain the Progression 1 benefit when you roll your Challenge Dice.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Call Out Targets",
                "Upon assisting a character making an attack (using either the Assist Task, the Direct Task, or some other means), the helped character generates one point of bonus Momentum if they succeed; bonus Momentum cannot be saved to the group pool.",
                [new DisciplinePrerequisite(Skill.Command, 3), new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Call to Action",
                "In a Conflict, a character may use the Prepare Minor Action to grant one ally a Minor Action of their choice (performed immediately) if they can communicate with that ally.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Cold Reading",
                "Succeeding at a Task during Social Conflict generates one bonus Momentum which must be used for the Obtain Information Momentum Spend to gain knowledge about an individual on the other side of the interaction. If the Social Conflict involves an Extended Task, the character gains the Scrutinize 1 benefit when rolling Challenge Dice.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Coordinated Efforts",
                "During an Extended Task, an assisted character may gain either the Scrutinize 2 or Progression 1 benefits when they roll their Challenge Dice.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Decisive Leadership",
                "In a Conflict, whenever the character performs the Assist Task and would then pay two Momentum to keep the initiative, the cost to keep the initiative is reduced to 0.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Fleet Commander",
                "Commanding a vessel during a fleet action reduces the Difficulty of a Task to grant a bonus to your vessel or group by 1, to a minimum of 1. Aboard a vessel during a fleet action, the character may treat the vessel as having a Command Department of 4+, regardless of the actual value.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision)],
                1),
            new TalentModel(
                "Multi-Discipline",
                "The character may select one additional Role, but not Commanding Officer or Admiral.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Plan of Action",
                "When an ally succeeds at a Task that was made possible or had reduced Difficulty because of an Advantage created by the character, if that Advantage represented a plan or strategy, they generate two bonus Momentum. Bonus Momentum cannot be saved into the group pool.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Time Management",
                "During any Challenge, Extended Task or other activity under time pressure, the character may attempt a Control + Command Task with a Difficulty 3. If this Task succeeds, reduce the total number of intervals the Players have taken by 1; for every 2 Momentum spent (Repeatable) reduce by a further 1. The character has managed to minimize lost time. If the Task fails, add one additional interval as the character’s efforts actually waste time.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.CommandDivision)],
                1),
            new TalentModel(
                "Advanced Team Dynamics",
                "The people working for you are the best, and you expect the best from them. The first time each adventure that you introduce a supporting character, that supporting character may take one additional option to improve the supporting character (from the list on page 134 of the core rulebook, or page 126 of The Klingon Empire core rulebook).",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new MainCharacterPrerequisite(), new CommandingAndExecutiveOfficerPrerequisite()],
                1),
            new TalentModel(
                "Bolster",
                "You are skilled in keeping your allies up and active even under the most difficult circumstances. When you succeed at any task using your Command discipline during an action scene, you may spend Momentum to recover Stress suffered by your allies: each Momentum spent (Repeatable) recovers Stress equal to your Command rating from a single ally. This cannot help an injured character.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Precautions",
                "You prepare for the worst, just in case. Once per scene, when an ally suffers an injury or the ship suffers a breach, you may prevent that injury or breach; describe what precaution you took to allow that ally to avoid being injured or to prevent that breach occurring.",
                [new DisciplinePrerequisite(Skill.Command, 4), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Teacher",
                "Beyond only being a leader, you concern yourself with the development and growth of your crew, taking pride in their accomplishments. When you create an advantage for an ally that represents your guidance or advice, that ally may re-roll one d20 on a single task they attempt which benefits from that advantage.",
                [new DisciplinePrerequisite(Skill.Command, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Fly-By",
                "Whenever you use the Swift Task Momentum Spend, you do not increase the Difficulty of the second Task if one of the Tasks you attempt is to pilot a vessel or vehicle.",
                [new DisciplinePrerequisite(Skill.Conn, 2), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Precise Evasion",
                "Whenever you succeed at the Evasive Action Task, you may spend two Momentum. If you do, the ship does not suffer the increased Difficulty for attacks normally caused by Evasive Action.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Push the Limits",
                "When you attempt a Conn Task that has increased in Difficulty due to environmental conditions or damage to the engines, reduce the Difficulty by 1, to a minimum of 1.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Starship Expert",
                "Whenever you succeed at a Conn Task to identify a type of starship, or to try and understand an unknown form of Starship, you gain one bonus Momentum, which may only be used on the Obtain Information Momentum Spend, or to pay part of the cost of the Create Advantage Momentum Spend (where the Advantage must represent some form of known or observed weakness in the ship being studied).",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Attack Run",
                "A success in the Attack Pattern Task lets a character spend two Momentum. Enemy Attacks against the character’s ship do not reduce in Difficulty due to the Attack Pattern Task.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Covering Advance",
                "A success at any Helm Task means two Momentum can be spent to block a single enemy vessel within Medium range, plus one additional enemy vessel for each additional Momentum spent beyond that (Repeatable). When a blocked vessel makes its next attack, before the beginning of the character’s next Turn, the Difficulty of any Attack that does not target your vessel has a base Difficulty equal to the character ship’s Scale, instead of normal Difficulty.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Efficient Evasion",
                "Attempting an Evasive Action Task for the second or subsequent time in a row during a scene reduces the Power Requirement for Evasive Action to 0.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Glancing Impact",
                "Succeeding at the Evasive Action Task increases the Resistance of the ship being piloted by +2. This bonus lasts until the start of the character’s next Turn.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Inertia",
                "When the character succeeds at a Maneuver Task, 1 Momentum may be spent to move one additional zone so long as the previous Turn included an Impulse or Warp Task.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Multi-Tasking",
                "Attempting the Override Task while at a bridge station including Helm and/or Navigator positions utilizes the character’s Conn Discipline instead of the Discipline normally required for the Task.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Pathfinder",
                "When a character attempts a Task to plot a course through unknown territory, reduce the Difficulty of the Task by 1, 2, or 3, to a minimum of 1. Each point that reduces Difficulty increases the Complication Range of the Task.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Precision Maneuvering",
                "Reduces the Difficulty of the Task by 1, to a minimum of 0, when attempting a Task that requires precise maneuvering, or where there is a collision risk.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Spacewalk",
                "Whenever the Difficulty of a Task is increased thanks to low- or zero-gravity, ignore the increase. A Task that is normally possible but isn’t because of low- or zero-gravity, may be attempted at +1 Difficulty to the Task.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Strafing Run",
                "When a character succeeds at the Attack Pattern Task and spends Momentum to keep the initiative, the cost to keep the initiative is 0.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.CommandDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Thread the Needle",
                "You’re used to operating small, nimble ships, where their agility and small profile make them a much harder target, if you know how to fly them. When you perform an Impulse, Warp, or Evasive Action task when piloting a starship, enemy attacks from ships with a greater Scale than yours increase in Difficulty by 1. If attacked by a ship with a Scale that is double or more the Scale of your ship, then you increase the Difficulty by 2 instead.",
                [new DisciplinePrerequisite(Skill.Conn, 4), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Zero-G Combat",
                "You have received special training to fight effectively in micro-gravity and zero-gravity environments, a process that famously involves a significant amount of nausea as participants acclimatize to the conditions. In combat, when you make an attack while in a zero-gravity or micro-gravity environment, you may use the higher of your Conn or Security disciplines for the task, and you ignore any Difficulty increases caused by the lack of gravity. In addition, enemies who lack similar training increase the Difficulty of attacks against you by 1.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Hands-On Pilot",
                "Your piloting style delves deeply into the technical aspects of a ship’s propulsion systems, and you spend much of your time in Engineering, fine-tuning power flows, subspace field geometries, and inertial stabilizers to ensure that the ship flies exactly the way you want it to. When you perform one of the Impulse, Warp, Evasive Action, or Attack Pattern tasks, the ship may treat its assistance die as if it had rolled a 1. However, when anyone else pilots the ship, they increase their complication range by 1, as your adjustments don’t suit everyone.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Visit Every Star",
                "Your expertise in navigation and stellar cartography come from a deep and enduring fascination with space; as a child, you dreamed of the stars you’d visit and the stellar phenomena you’d see up close, and you memorized every fact you could about them. You gain an additional focus, and one of your focuses (either the one gained from this talent, or an existing one) must relate to Astronavigation, Stellar Cartography, or a similar field of space science. Further, when you succeed at a navigation-related task, you gain 1 bonus Momentum due to your knowledge and familiarity. Bonus Momentum cannot be saved.",
                [new DisciplinePrerequisite(Skill.Conn, 3), new DisciplinePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Close Protection",
                "When you make a successful Attack, you may spend one Momentum to protect a single ally within Close range. The next Attack against that ally before the start of your next turn increases in Difficulty by 1.",
                [new DisciplinePrerequisite(Skill.Security, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Interrogation",
                "When you succeed at a Task to coerce someone to reveal information in a social conflict, you will gain one bonus Momentum, which may only be spent on the Obtain Information Momentum Spend.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Mean Right Hook",
                "Your Unarmed Strike Attack has the Vicious 1 Damage Effect.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Security", false, new AliasModel("Warrior’s Strike", Source.KlingonCore)),
            new TalentModel(
                "Pack Tactics",
                "Whenever you assist another character during combat, the character you assisted gains one bonus Momentum if they succeed.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Security"),
            new TalentModel(
                "Quick to Action",
                "During the first round of any combat, you and your allies may ignore the normal cost to Retain the Initiative.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Combat Medic",
                "The character’s abilities in field medicine and battle triage are exceptional and their presence inspires allies to continue any fight. Whenever the character attempts the First Aid Task, they may spend one Momentum to cause the recipient to regain points of Stress equal to the number of the character’s Medicine Discipline. A character may only regain Stress in this way once per scene.",
                [new DisciplinePrerequisite(Skill.Security, 2), new DisciplinePrerequisite(Skill.Medicine, 2), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Criminal Minds",
                "By imagining they are a suspect, and thinking in the same way, the character gains insight into a criminal’s thought processes or actions. Whenever a character succeeds at a Task to interpret information about a suspect using Reason, a character generates 1 bonus Momentum which may only be used for the Obtain Information Momentum Spend.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Crisis Management",
                "Small squad tactics can mean the difference between life and death in a dangerous, hostile situation, and the character excels at coordinating action in battle. The character may make use of the Direct Task (Star Trek Adventures core rulebook p. 173). If they already have access to the Direct Task, they may do so twice per scene instead of once.",
                [new VariableDisciplinePrerequisite(Skill.Security, Skill.Command, 3), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1,
                "Security"),
            new TalentModel(
                "Deadeye Marksman",
                "The character has spent time at the target range every day, working on their aim. When the character takes the Aim Minor Action, they reduce the Difficulty of their next Attack by 1, in addition to the normal effects of the Aim Minor Action.",
                [new DisciplinePrerequisite(Skill.Security, 3), new AttributePrerequisite(Attribute.Control, 10), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Fire at Will",
                "The character is capable of tracking multiple targets and making attacks against them with great effect. Whenever the character makes a ranged weapon attack, and then uses the Swift Task Momentum spend to make a second ranged attack, they ignore the normal Difficulty increase from Swift Task.",
                [new DisciplinePrerequisite(Skill.Security, 2), new AttributePrerequisite(Attribute.Daring, 9), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Full Spread - Maximum Yield!",
                "The character is skilled in setting up torpedo attacks. In addition to the normal benefits of a Salvo, the attack also gains the benefit of the Devastating Attack Momentum Spend as though 2 Momentum had been spent. The Devastating Attack Momentum Spend may not be selected again for this attack.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Hunker Down",
                "Making good use of the surroundings for protection is one of the hallmarks of a skilled soldier. Whenever the character rolls Cover Dice,  they may add +1 Resistance to the total for each Effect rolled.",
                [new DisciplinePrerequisite(Skill.Security, 2), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Lead Investigator",
                "The character has a mind intrigued by mystery and investigation, and is often called upon to review and coordinate response to lawbreaking. The character generates two bonus Momentum after a successful Task to investigate a crime.",
                [new DisciplinePrerequisite(Skill.Security, 3), new DisciplinePrerequisite(Skill.Conn, 2), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Martial Artist",
                "There are countless forms and styles of hand-to-hand combat, and the character has mastered several of them. The character’s Unarmed Strike attacks gain the Intense Damage Effect. If the character also has the Mean Right Hook Talent, then both Damage Effect apply when Effects are rolled.",
                [new DisciplinePrerequisite(Skill.Security, 4), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Precision Targeting",
                "Having extensive knowledge of ship systems and operations, the character can easily target specific systems when attacking an enemy vessel. When the character makes an attack that targets a specific System they may  reroll 1d20 in their dice pool, and the attack gains the Piercing 1 damage effect.",
                [new DisciplinePrerequisite(Skill.Security, 4), new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Ambush Tactics",
                "You’ve familiarized yourself with techniques that make ambushes and surprise attacks especially effective. When you succeed at an attack against an enemy who is unaware of your presence, or who is suffering from a trait or complication which represents a weakness or vulnerability, add 2[D] to the amount of Stress the attack inflicts. This applies to both personal combat and ship combat.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Applied Force",
                "You’ve trained to best apply your size and strength in a fight. When you make a melee attack, you may use Fitness instead of Daring. In addition, you add 1[D] to the Stress rating of your unarmed attacks, or 2[D] if you have a Fitness of 11 or higher.",
                [new DisciplinePrerequisite(Skill.Security, 4), new AttributePrerequisite(Attribute.Fitness, 9), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Defensive Training",
                "You’re especially good at avoiding harm. Select either melee attacks or ranged attacks when you acquire this talent. Attacks against you of the chosen type increase in Difficulty by 1.",
                [new DisciplinePrerequisite(Skill.Security, 2), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]),
            new TalentModel(
                "Precision Salvo",
                "You’ve spent countless hours running combat simulations and fine-tuning targeting subroutines, and you can now place a torpedo salvo exactly where it will have the most decisive effect. When you make a torpedo attack, you may spend 1 Momentum (Immediate) to add the Piercing 1 weapon effect.",
                [new DisciplinePrerequisite(Skill.Security, 4), new SourcePrerequisite(Source.PlayersGuide)]),
            new TalentModel(
                "Shield Breaker",
                "You’ve developed firing solutions designed to overwhelm a target vessel’s shields without harming the ship beneath, ideally as a prelude to boarding or extracting a target using transporters. When you make an attack with a starship’s energy weapons, you may spend 1 Momentum (Immediate) to target shields. If you do so, then increase the Stress rating of the energy weapon used by 2[D]. This attack cannot inflict any breaches to the target. If used on a ship with 0 shields, then it adds 1 Difficulty to the next Regenerate Shields task the target attempts.",
                [new DisciplinePrerequisite(Skill.Security, 3), new SourcePrerequisite(Source.PlayersGuide)]),
            new TalentModel(
                "A Little More Power",
                "Whenever you succeed at an Engineering Task aboard your own ship, you may spend one Momentum to regain one spent Power.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.Core, Source.KlingonCore, Source.Core2ndEdition)],
                1, null, false, new AliasModel("A Little More Power", Source.Core), new AliasModel("More Power", Source.KlingonCore)),
            new TalentModel(
                "I Know My Ship",
                "Whenever you attempt a Task to determine the source of a technical problem with your ship, add one bonus d20.",
                [new DisciplinePrerequisite(Skill.Engineering, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "In the Nick of Time",
                "Whenever you succeed at an Engineering or Science Task as part of an Extended Task, you score 1 additional Work for every Effect rolled.",
                [new VariableDisciplinePrerequisite(Skill.Engineering, Skill.Science, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Science"),
            new TalentModel(
                "Intense Scrutiny",
                "Whenever you succeed at a Task using Reason or Control as part of an Extended Task, you may ignore up to two Resistance for every Effect rolled.",
                [new VariableDisciplinePrerequisite(Skill.Engineering, Skill.Science, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Science"),
            new TalentModel(
                "Jury-Rig",
                "Whenever you attempt an Engineering Task to perform repairs, you may reduce the Difficulty by two, to a minimum of 0. If you do this, however, then the repairs are only temporary and will last only a single scene, plus one additional scene per Momentum spent (Repeatable) before they fail again. Jury-rigged repairs can only be applied once, and the Difficulty to repair a device that has been Jury-rigged increases by 1.",
                [new DisciplinePrerequisite(Skill.Engineering, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Experimental Device",
                "You have designed and constructed a new piece of equipment that is either a brand new invention or is heavily modified from its original to the point of being barely recognizable. In either case, the device performs a function that you determine when you select this Talent. When used appropriately, it automatically provides you an Advantage. However, its experimental nature means there are lingering design bugs that sometimes plagues its function. Increase the Complication Range of any Task by 2 when using this device. This Talent may be selected multiple times with a different device for each selection.",
                [new DisciplinePrerequisite(Skill.Engineering, 4), new SourcePrerequisite(Source.OperationsDivision), new MainCharacterPrerequisite()],
                10),
            new TalentModel(
                "Exploit Engineering Flaw",
                "Following an ally’s successful Scan for Weakness Task,  you may highlight an identified engineering flaw in the opponent’s ship. In addition to the bonus granted by the Scan for Weakness Task, you may assist anyone making an Attack against the target ship, which does not count against the normal limit for providing assistance. If the Attack is successful, it generates 1 bonus Momentum. You must be able to communicate with the ally making the Attack to offer this assistance.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new DisciplinePrerequisite(Skill.Conn, 3), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Maintenance Specialist",
                "You are an expert in conducting and directing normal, day-to-day, maintenance and repairs on Starfleet equipment. Whenever they are required to perform maintenance, reduce the Difficulty by 1, to a minimum of 1, and halve the time required to complete the Task.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Meticulous",
                "You are patient, methodical, and check for errors before considering Tasks complete. Whenever they use Engineering to complete a Task, you may negate one Complication generated from the roll. However, during timed Tasks or Challenges, you take 1 more interval to complete the Task.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 3),
                    new AttributePrerequisite(Attribute.Control, 10),
                    new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Miracle Worker",
                "You have a reputation of doing the impossible: repairs or modifications well in advance of expectations; getting offline systems up and running when most needed and so on. Whenever you use Engineering on an Extended Task, if you achieve a Breakthrough and roll at least one Effect on a Challenge Die, you achieve a second Breakthrough.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 5),
                    new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Procedural Compliance",
                "You are well versed in established Starfleet engineering practices and guidelines. By spending 2 Momentum to Create an Advantage (obtaining the proper technical manuals and documentation prior to attempting a Task to work on a ship’s system), you may reroll 1d20 during the next Engineering Task.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 3),
                    new DisciplinePrerequisite(Skill.Conn, 2),
                    new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)
                ],
                1),
            new TalentModel(
                "Past the Redline",
                "Engineers understand that safety tolerances and operating margins are always designed into the acceptable performance range of equipment. While not recommended the equipment is usually capable of higher performance, if the consequences are risky. This Talent provides bonus Momentum for using a ship’s System until the end of the scene. Select the System you wish to enhance, and the number of bonus Momentum to be provided. Attempt a Daring + Engineering Task with a Difficulty equal to the bonus Momentum selected. If the you succeed, subsequent Tasks using that System automatically generate that amount of bonus Momentum. However, to represent the risks involved, the Task also increases its Complication Range by the same number as the Bonus Momentum provided. If a Complication is rolled, the System no longer provides bonus Momentum and the System suffers a number of Breaches equal to half the ship’s Scale.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 4),
                    new AttributePrerequisite(Attribute.Daring, 10),
                    new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Repair Team Leader",
                "You are trained to direct and lead damage repair parties during emergencies, giving them guidance and expert knowledge of the ships systems. If you succeed at the Damage Control Task you may spend 3 Momentum (Repeatable) to also repair one Breach.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 3),
                    new DisciplinePrerequisite(Skill.Command, 2),
                    new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)
                ],
                1),
            new TalentModel(
                "Right Tool for the Right Job",
                "Engineers are trained to identify and use appropriate tools whenever they are working on the delicate components that make up complex ship systems. Whenever you acquire an engineering tool with an Opportunity Cost, the tool grants an Advantage if it did not do so originally, or increases the Advantage it provides by one step.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.OperationsDivision, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Rocks Into Replicators",
                "Starfleet engineers are famed for being able to build or create nearly anything needed from the most basic of available components. Once per session, you may destroy any single piece of equipment to create any other piece of equipment of an equal or lower Opportunity Cost. This new piece of equipment has a Complication range increase of 2, with the Complication being a malfunction that renders it useless. You should provide a reasonable explanation as to how a repurposed or cannibalized device could function and the Gamemaster has final say if there is any question about the “reasonableness” of the new device.",
                [new DisciplinePrerequisite(Skill.Engineering, 4), new DisciplinePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.OperationsDivision)],
                1),
            new TalentModel(
                "Saboteur",
                "You’re skilled in taking things apart – violently if necessary. When you make an attack against a structure, machine, or stationary vehicle while in personal combat (i.e., you aren’t using a ship’s weapons to make the attack), you may use your Engineering instead of your Security to resolve the attack task and the Stress inflicted.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]
                ),
            new TalentModel(
                "Percussive Maintenance",
                "You have an extensive repertoire of quick fixes, crude bypasses, and other improvised techniques for using and repairing devices during a crisis. They all do the job, but it’s messy work. When you attempt a Control + Engineering task, you may add 2 to Threat to use your Daring instead of your Control. If you do this, and the task succeeds, you may reduce the time taken by 1 interval without spending Momentum.",
                [
                    new DisciplinePrerequisite(Skill.Engineering, 4),
                    new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)
                ]
                ),
            new TalentModel(
                "I’m Giving It All She’s Got!",
                "You can keep a ship running on a fraction of its normal power levels, and always seem to be able to squeeze just a little more power out of the reserves or non-essential systems. Whenever someone attempts a task with a Power requirement aboard your ship while you are aboard, roll 1[D]; on an effect, reduce that Power requirement by 1, to a minimum of 0. In addition, when you succeed at the Power Management task, you restore Power equal to your Engineering score, rather than only 1; you may increase this amount by spending Momentum as normal.",
                [new DisciplinePrerequisite(Skill.Engineering, 4), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]
                ),
            new TalentModel(
                "Transporter Chief",
                "You’re well-versed in the operation of transporter systems and can often get them to function in extreme circumstances or to achieve outcomes that few others could manage. Such efforts are never without risk, given the delicacy of the technology. When you attempt a task to use, repair, or modify a transporter, you may add 2 to Threat to reduce the Difficulty of the task by 2, to a minimum of 0.",
                [new DisciplinePrerequisite(Skill.Engineering, 3), new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)]
                ),
            new TalentModel(
                "Computer Expertise",
                "Whenever you attempt a Task that involves the programming or study of a computer system, you may add a bonus d20 to your pool.",
                [new DisciplinePrerequisite(Skill.Science, 2), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Testing a Theory",
                "When you attempt a Task using Engineering or Science, you may roll one additional d20, so long as you succeeded at a previous Task covering the same scientific or technological field earlier in the same adventure.",
                [new VariableDisciplinePrerequisite(Skill.Science, Skill.Engineering, 2), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1, "Science"),
            new TalentModel(
                "Baffling Briefing",
                "When the character engages in a Social Conflict using deception, the character may use Science in place of Command so long as their technical knowledge is used to mislead their opponent. ",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new AttributePrerequisite(Attribute.Presence, 9)],
                1),
            new TalentModel(
                "Dedicated Focus X",
                "Choose a Focus your character has. When attempting a Task where that Focus applies, each d20 that generates 2 successes also generates  1 bonus Momentum. This Talent only applies to d20s in the character’s dice pool, and does not apply to d20s added due to equipment, starship assistance, or character assistance.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 4)],
                1),
            new TalentModel(
                "Expedition Expert",
                "Prior to participating in an away team mission, the character may prepare by conducting a research Task. If they succeed, Momentum may be spent to allow the character to substitute their Science Discipline in place of any other, during any Task to navigate or transverse difficult terrain during the mission. Each point of Momentum spent from the research Task in this way allows for one such substitution.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new AttributePrerequisite(Attribute.Fitness, 9)],
                1),
            new TalentModel(
                "Lab Rat",
                "The character prefers to spend most of their free time engaged in various side projects and experiments. Because of this, they are extremely familiar with the equipment and capabilities of the labs on board their ship. When attempting an Extended Task while using a laboratory, the character gains the Progression 1 Effect.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new DisciplinePrerequisite(Skill.Engineering, 3)],
                1),
            new TalentModel(
                "Mental Repository",
                "Using extensive mental conditioning, the character has access to memories with unprecedented clarity and accuracy. So long as the character takes time to focus their mind prior to attempting a Task – which takes 2 Intervals during a Timed Challenge – they reduce the Difficulty of the Task by 1 to a minimum of 1. In addition, if they succeed they gain a bonus Momentum which may only be spent on the Obtain Information Momentum spend.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new AttributePrerequisite(Attribute.Reason, 10)],
                1),
            new TalentModel(
                "Rapid Analysis",
                "Tasks attempted as part of a Timed Challenge using the Science Discipline takes the character 1 Time Interval instead of 2. The amount of time taken for any Task may not be reduced to less than 1 Interval.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new AttributePrerequisite(Attribute.Daring, 9)],
                1),
            new TalentModel(
                "Student of War",
                "The character has conducted extensive research into numerous kinds of conflict and has devoted their academic career to the study of war. While this knowledge may be purely theoretical, such information, when placed into the hands of more capable combatants, can be truly devastating. When the character provides assistance to a Combat Task, they may reroll their die.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 4), new DisciplinePrerequisite(Skill.Security, 3)],
                1),
            new TalentModel(
                "Temporal Mechanic",
                "Long study into the facets of temporal mechanics has given the character an intuitive understanding of the space-time continuum and the various phenomena that can distort it. Once per scene, when confronted with an anomaly that affects the flow of time and space, the character rolls 1[D] when attempting a Task relating to the phenomenon. The character generates bonus Momentum equal to the result, in addition to any Momentum generated from the Task result. If an Effect is rolled, the Gamemaster gains 1 Threat instead.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Science, 3), new FocusPrerequisite("Temporal Mechanics")],
                1),
            new TalentModel(
                "Theory Into Practice",
                "When you attempt a Task using Engineering or Science where you gain the additional d20 from the Testing a  Theory Talent, reduce the Difficulty of the Task by 1, to a minimum of 0.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3), new TalentPrerequisite("Testing a Theory")],
                1),
            new TalentModel(
                "Unconventional Thinking",
                "During any Challenge or Extended Task that uses the Scientific Method to adapt technology in which the character is participating, if the hypothesis being pursued is considered “Outside the Box” – the Difficulty of the Tasks are reduced by 1. It should be noted that Players are not aware of the fact they are pursuing an “Outside the Box” hypothesis under normal circumstances – it is up to the Gamemaster to ensure they receive the proper Difficulty reduction.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Science, 3), new AttributePrerequisite(Attribute.Insight, 9)],
                1),
            new TalentModel(
                "Walking Encyclopedia",
                "Once per session, when you attempt a Task, you may spend 2 Momentum (Immediate) in order to gain an additional Focus for the remainder of the session, due to your breadth of knowledge. However, any Task using that Focus increases in Complication range by 1, as you are not a true expert on that subject.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 2), new AttributePrerequisite(Attribute.Reason, 9)],
                1),
            new TalentModel(
                "Applied Research",
                "You’re a practical scientist, always looking to see how your knowledge can be put into practice. Once per scene, when you attempt a task which relates to information you received earlier that scene from an Obtain Information question, you may roll an additional d20.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 3)]),
            new TalentModel(
                "Did the Reading",
                "You absorb information quickly and know how to put it to good use. When you attempt a task, you may spend 1 Momentum (Immediate) to use Science on that task instead of the discipline you would normally use. In addition, you count as having an applicable focus for that task. Each time after the first in a single scene that you use this ability, the Momentum cost increases by 1: this is cumulative.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 4)]),
            new TalentModel(
                "Learn from Failure",
                "A true scientist learns as much from failure as from success. When you fail at a Science task, you may add 3 to Threat to create an advantage that represents knowledge or insights gained from the failure. The cost of this is reduced by 1 for each success you scored on the failed task.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 4)]),
            new TalentModel(
                "Rapid Hypothesis",
                "You are quick to devise a working theory about an unknown phenomenon’s nature, origin, or effect. Once per scene, when you ask two or more questions using Obtain Information, you may immediately create an advantage that represents your theoretical understanding of the subject of those questions.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Science, 5)]),
            new TalentModel(
                "Doctor’s Orders",
                "When you attempt a Task to coordinate others, or to coerce someone into taking or refraining from a specific course of action, you may use your Medicine Discipline instead of Command.",
                [new DisciplinePrerequisite(Skill.Medicine, 4), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Field Medicine",
                "When attempting a Medicine Task, you may ignore any increase in Difficulty for working without the proper tools or equipment.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "Medicine"),
            new TalentModel(
                "First Response",
                "Whenever you attempt the First Aid Task during combat, you gain a bonus d20. Further, you may always Succeed at a Cost, with each Complication you suffer adding +1 to the Difficulty of healing the patient’s Injury subsequently.",
                [new DisciplinePrerequisite(Skill.Medicine, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Quick Study",
                "When attempting a Task that will involve an unfamiliar medical procedure, or which is to treat an unfamiliar species, ignore any Difficulty increase stemming from your unfamiliarity.",
                [new DisciplinePrerequisite(Skill.Medicine, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Triage",
                "When you attempt a Task to identify specific injuries or illnesses, or to determine the severity of a patient’s condition, you may spend one Momentum (Repeatable) to diagnose one additional patient.",
                [new DisciplinePrerequisite(Skill.Medicine, 3), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1),
            new TalentModel(
                "Bedside Manner",
                "When the character succeeds at a Medicine Task to heal another’s Injury, the character may immediately remove a personal Complication from the patient, even if that Complication was unrelated to the treated Injury. In addition, whenever this character attempts a Reputation Check, they are considered to have one additional positive influence.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Command, 3)],
                1),
            new TalentModel(
                "Chief of Staff",
                "When using the Medicine Discipline to provide  assistance to another character attempting a Medicine Task, all characters providing assistance may reroll one d20 in their dice pool.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Command, 3)],
                1),
            new TalentModel(
                "Cyberneticist",
                "Whenever the character attempts a Task to work on, install, or remove a cybernetic device from a patient, they add a d20 to their dice pool. ",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Engineering, 3)],
                1),
            new TalentModel(
                "Fellowship Specialty",
                "Select a Focus. When you succeed at a Medicine Task where that Focus applies, the cost of the Create Advantage Momentum spend is reduced by 1, to a minimum of 1.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 4)],
                1),
            new TalentModel(
                "Field Medic",
                "Through experience and training, the stress of battle fades when there’s a patient in need. When attempting a Medicine Task while in the midst of combat, you may ignore the first Complication that would increase the Difficulty of this Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Security, 2)],
                1),
            new TalentModel(
                "Healing Hands",
                "When attempting the Control + Medicine Task to heal  Injury-related Complications, reduce the Difficulty by 1, to a minimum of 1.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new AttributePrerequisite(Attribute.Control, 9)],
                1),
            new TalentModel(
                "Heart, Body and Mind",
                "Whenever you Assist a character with the Recover Combat Task, you gain 1 bonus Momentum that can only be spent on the active character to recover Stress.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Command, 2)],
                1),
            new TalentModel(
                "I’m a Doctor, Not a Starship Captain!",
                "Once per scene, before attempting a Task using Command, a point of Determination may be spent to substitute the character’s Medicine Score in place of Command. This does not have to be linked to a Value.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new UntrainedDisciplinePrerequisite(Skill.Command)],
                1),
            new TalentModel(
                "I’m a Doctor, Not a Damn Pilot!",
                "Once per scene, before attempting a Task using Conn, a point of Determination may be spent to substitute the character’s Medicine Score in place of Conn. This does not have to be linked to a Value.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new UntrainedDisciplinePrerequisite(Skill.Conn)],
                1),
            new TalentModel(
                "I’m a Doctor, Not an Engineer!",
                "Once per scene, before attempting a Task using Engineering, a point of Determination may be spent to substitute the character’s Medicine Score in place of Engineering. This does not have to be linked to a Value.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new UntrainedDisciplinePrerequisite(Skill.Engineering)],
                1),
            new TalentModel(
                "I’m a Doctor, Not a Scientist!",
                "Once per scene, before attempting a Task using Science, a point of Determination may be spent to substitute the character’s Medicine Score in place of Science. This does not have to be linked to a Value.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new UntrainedDisciplinePrerequisite(Skill.Science)],
                1),
            new TalentModel(
                "I’m a Doctor, Not the Chief of Security!",
                "Once per scene, before attempting a Task using Security, a point of Determination may be spent to substitute the character’s Medicine Score in place of Security. This does not have to be linked to a Value.",
                [new SourcePrerequisite(Source.SciencesDivision), new DisciplinePrerequisite(Skill.Medicine, 3), new UntrainedDisciplinePrerequisite(Skill.Security)],
                1),
            new TalentModel(
                "Insightful Guidance",
                "Whenever you Assist a character, who is in a Social Conflict, using your knowledge of psychology or emotional states, that character is considered to have an Advantage in addition to the normal benefits provided by your Assist. ",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new DisciplinePrerequisite(Skill.Command, 2)],
                1),
            new TalentModel(
                "Practice Makes Perfect",
                "Once per scene, after the character has succeeded on a Medicine Task relating to the treatment of a patient, reduce the Difficulty of the next Medicine Task relating to that patient by 1.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new AttributePrerequisite(Attribute.Reason, 8)],
                1),
            new TalentModel(
                "Psychoanalyst",
                "When you use the Medicine Discipline during a Social Conflict you may increase the Complication range of your Task by a number of steps. For each step you may ask a single question as if you’d spent Momentum on Obtain Information. Any Complications generated from this Task results in the individual you are interacting with becoming offended or upset with being “analyzed.”",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3)],
                1),
            new TalentModel(
                "Surgery Savant",
                "When attempting a Medicine Task during an Extended Task relating to surgery, the character gains the Triumphant Effect.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 4)],
                1),
            new TalentModel(
                "Cutting-Edge Medicine",
                "You keep up to date with the latest medical publications and the latest advances in medical science, to ensure that there are no diseases you’re unprepared to face, and no treatments or medicines you’re unfamiliar with. Whenever you make a Medicine task with a Difficulty of 3 or higher, you may spend up to 3 Momentum (Immediate) to reduce the Difficulty by the number of Momentum spent, to a minimum Difficulty of 1. However, as these latest advances are often experimental, the complication range of the task increases by 1 for each Momentum spent.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 4)]),
            new TalentModel(
                "Diagnostic Expertise",
                "You focus on diagnosing the nature of an illness, injury, psychological problem, or other condition, because once the cause has been determined, finding the solution gets easier. When you succeed at a Medicine task to identify and diagnose the nature of a medical problem, you gain 1 bonus Momentum for every additional d20 you bought by spending Momentum, which may only be used to Obtain Information or Create Advantage.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 4)]),
            new TalentModel(
                "Don’t You Die on Me!",
                "The line between life and death is a thin one, and you’re good enough to keep a patient alive when lesser doctors would have pronounced them dead. When a character is killed, you may spend 1 Determination to make one attempt to revive them. If they were killed instantly by suffering two injuries, then this may only be attempted within that scene. If the character suffered a lethal injury and died because they didn’t receive medical treatment in time, this may be attempted before the end of the subsequent scene. This requires a Daring + Medicine task, with a Difficulty of 3. If successful, the character is brought back from the brink of death, though the injury / injuries that nearly killed them still require healing. Failure means that your efforts were unsuccessful and the character dies.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 5)]),
            new TalentModel(
                "Stimulant Shot",
                "You’ve got a few tricks and treatments that can get an injured patient back on their feet for a while. They are rough on the body, but they can be essential during a crisis. When you perform the First Aid task on an injured ally, you may get them back into the fighting right away without spending Momentum. In addition, the ally recovers Stress equal to twice your Medicine rating.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3)]),
            // Species
            new TalentModel(
                "Proud and Honorable",
                "Your personal integrity is unimpeachable, and you will not willingly break a promise made. Whenever you attempt a Task to resist being coerced into breaking a promise, betraying your allies, or otherwise acting dishonorably, you reduce the Difficulty by 1.",
                [new SpeciesPrerequisite(Species.Andorian, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Andorian"),
            new TalentModel(
                "The Ushaan",
                "You are experienced in the tradition of honor-dueling known as the Ushaan, having spilt much blood upon the ice. When you make a melee Attack, or are targeted by a melee Attack, and buy one or more d20s by adding to Threat, you may re-roll the dice pool for the Task. Further, you own an Ushaan-tor, a razor-sharp ice-miner’s tool used in these duels.",
                [new SpeciesPrerequisite(Species.Andorian, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Andorian"),
            new TalentModel(
                "Orb Experience",
                "You have received a vision from the Bajoran Prophets, through one of the Orbs. This rare experience, though confusing at first, has shaped your life and outlook. You have one additional Value, reflecting the insights you received from the experience. The first time this Value is Challenged, roll 1[D]; if an Effect is rolled, then some foretold element of the Orb Experience has come to pass, and the Value is not crossed out as it would normally be.",
                [new SpeciesPrerequisite(Species.Bajoran, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "Bajoran"),
            new TalentModel(
                "Strong Pagh",
                "You believe profoundly in the Prophets, and rely heavily upon that faith to see you through hardship. Whenever you attempt a Task to resist being coerced or threatened, you reduce the Difficulty of that Task by 1.",
                [new SpeciesPrerequisite(Species.Bajoran, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "Bajoran"),
            new TalentModel(
                "Empath",
                "You can sense the emotions of most living beings nearby, and can communicate telepathically with other empaths and telepaths, as well as those with whom you are extremely familiar. You cannot choose not to sense the emotions of those nearby, except for those who are resistant to telepathy. It may require effort and a Task to pick out the emotions of a specific individual in a crowd, or to block out the emotions of those nearby. Increase the Difficulty of this Task if the situation is stressful, if there are a lot of beings present, if the target has resistance to telepathy, and other relevant factors.",
                [new AnySpeciesPrerequisite(true, Species.Betazoid, Species.Mari, Species.Deltan, Species.Aenar), new NotSourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Betazoid/Mari/Deltan"),
            new TalentModel(
                "Empathy2e",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Esoteric"),
            new TalentModel(
                "Telepath",
                "You can sense the surface thoughts and emotions of most living beings nearby, and can communicate telepathically with other empaths and telepaths, as well as those with whom you are extremely familiar. Surface thoughts are whatever a creature is thinking about at that precise moment. The character cannot choose not to sense the emotions or read the surface thoughts of those nearby, except for those who are resistant to telepathy. It will require effort and a Task to pick out the emotions or thoughts of a specific individual in a crowd, to search a creature’s mind for specific thoughts or memories, or to block out the minds of those nearby. Unwilling targets may resist with an Opposed Task.",
                [new AnySpeciesPrerequisite(true, Species.Betazoid, Species.Aenar), new EraPrerequisite(Era.NextGeneration), new NotSourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Betazoid"),
            new TalentModel(
                "Telepathy2e",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Esoteric"),
            new TalentModel(
                "Cultural Flexibility",
                "Your people are friendly, patient, and inquisitive, and you exemplify these traits. You are at ease when meeting new cultures, and adapt to unfamiliar social structures easily. When you attempt a Task to learn about an unfamiliar culture, or to act in an appropriate manner when interacting with members of such a culture, you reduce the Difficulty by 1.",
                [new AnySpeciesPrerequisite(true, Species.Denobulan, Species.ElAurian), new EraPrerequisite(Era.Enterprise)],
                1,
                "Denobulan/El-Aurian"),
            new TalentModel(
                "Parent Figure",
                "You have a large family, with many children, nieces, and nephews, and you’ve learned how to coordinate even the most unruly and fractious of groups when necessary. When attempting or assisting a Task, and two or more other characters are involved in the Task, the first Complication generated on the Task — either by the character attempting the Task, or one of the assistants — may be ignored.",
                [new SpeciesPrerequisite(Species.Denobulan, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Denobulan"),
            new TalentModel(
                "Resolute",
                "You are indomitable, and unwilling to succumb to adversity. You increase your maximum Stress by 3.",
                [new SpeciesPrerequisite(Species.Human, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Human"),
            new TalentModel(
                "Spirit of Discovery",
                "You have the drive, spirit, and courage to voyage into the unknown. You may spend one Determination to add three points to the group Momentum pool. The normal conditions for spending Determination still apply.",
                [new SpeciesPrerequisite(Species.Human, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Human"),
            new TalentModel(
                "Incisive Scrutiny",
                "You have a knack for finding weak spots in arguments, theories, and machines alike to glean information from them, learning about things by how they respond to pressure against vulnerable points. When you succeed at a Task using Control or Insight, you gain one bonus Momentum, which may only be used for the Obtain Information Momentum Spend.",
                [new SpeciesPrerequisite(Species.Tellarite, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Tellarite"),
            new TalentModel(
                "Sturdy",
                "You have a blend of physical resilience and mental fortitude such that you’re difficult to subdue. You reduce the cost to resist being knocked prone by the Knockdown damage effect by one, to a minimum of 0, and gain +1 Resistance against all non-lethal attacks.",
                [new SpeciesPrerequisite(Species.Tellarite, false), new EraPrerequisite(Era.Enterprise), new NotSourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Tellarite"),
            new TalentModel(
                "Former Initiate",
                "You joined the Initiate Program, hoping to be chosen by the Symbiosis Commission to become Joined. As there are far more Initiates than there are Symbionts, you were one of the many who failed, but the quality of even a failed initiate is enough for Starfleet to recruit you. When you attempt a Task using Control or Reason, and spend Determination to buy a bonus d20 for that Task, you may re-roll your dice pool. Former Initiate cannot be taken if the character has the Joined Talent — they are mutually exclusive.",
                [new SpeciesPrerequisite(Species.Trill, false), new NotTalentPrerequisite("Joined"), new EraPrerequisite(Era.OriginalSeries)],
                1,
                "Trill"),
            new TalentModel(
                "Joined",
                "You have a symbiont, with lifetimes of memories to draw upon. Once per mission, you may declare that a former host had expertise in a relevant skill or field of study; you gain a single Focus for the remainder of the scene, as you draw upon those memories. Additionally, you gain a Trait with the name of the Symbiont; this reflects potential advantages of the Joining, the ability to perform rites and rituals to awaken past hosts’ memories, and the vulnerabilities inherent in the connection. Former Initiate cannot be taken if the character has the Joined Talent — they are mutually exclusive.",
                [new SpeciesPrerequisite(Species.Trill, false), new NotTalentPrerequisite("Former Initiate"), new EraPrerequisite(Era.OriginalSeries)],
                1,
                "Trill"),
            new TalentModel(
                "Kolinahr",
                "You have undergone the ritual journey to purge all emotion. You reduce the Difficulty of all Tasks to resist coercion, mental intrusion, pain, and other mental attacks by two.",
                [new SpeciesPrerequisite(Species.Vulcan, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Vulcan"),
            new TalentModel(
                "Mind-Meld",
                "You have undergone training in telepathic techniques that allow the melding of minds through physical contact. This will always require a Task with a Difficulty of at least 1, which can be opposed by an unwilling participant. If successful, you link minds with the participant, sharing thoughts and memories; Momentum may be spent to gain more information, or perform deeper telepathic exchanges. This link goes both ways, and it is a tiring and potentially hazardous process for you. Complications can result in pain, disorientation, or lingering emotional or behavioral difficulties.",
                [new SpeciesPrerequisite(Species.Vulcan, false), new EraPrerequisite(Era.Enterprise)],
                1,
                "Vulcan"),
            new TalentModel(
                "Nerve Pinch",
                "You have learned numerous techniques for the stimulation and control of nerve impulses — collectively called neuropressure. Some applications of neuropressure can be used to swiftly and non-lethally incapacitate assailants. The nerve pinch counts as a melee weapon with 1[D], Size 1H, and the Intense and Non-lethal qualities. You may use Science or Medicine instead of Security when attempting a nerve pinch Attack, and may increase damage by your Science or Medicine Discipline instead of Security.",
                [new SpeciesPrerequisite(Species.Vulcan, true), new EraPrerequisite(Era.Enterprise)],
                1,
                "Vulcan"),
            new TalentModel(
                "Above the Clouds",
                "While engaged in Social conflict in a lavish environment (or one of excess), you reduce the Difficulty of any Persuade Tasks by 1 to a minimum of 1.",
                [new SpeciesPrerequisite(Species.Ardanan, true), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Ardanan"),
            new TalentModel(
                "Zenite in the Soul",
                "Your ancestry is steeped in toil in the mines on Ardana’s surface and, you roll one additional d20 whenever using Engineering or Science in relation to geology, mining or  mine equipment.",
                [new SpeciesPrerequisite(Species.Ardanan, true), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Ardanan"),
            new TalentModel(
                "Meticulous Analysis",
                "When you encounter unidentified phenomena through sensors, you may immediately make a Swift Task, without the need to spend Momentum or an increase in Difficulty. This Task may only be used to attempt to analyze the preliminary data you have received using Reason + Science and a relevant Focus.",
                [new SpeciesPrerequisite(Species.Benzite, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Benzite"),
            new TalentModel(
                "All Fingers and Thumbs",
                "When you succeed at a Task using a computer console (including a bridge station), you gain one bonus Momentum. This bonus Momentum cannot be saved into the group pool.",
                [new SpeciesPrerequisite(Species.Benzite, false), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Benzite"),
            new TalentModel(
                "Warm Welcome",
                "A cheerful, outgoing personality is the perfect thing to put diplomatic guests at ease. Whenever assisting another character the Bolian may use their Presence Attribute instead of their own. Further, both the Bolian and the character being assisted may ignore any increases in Complication Range for the Task.",
                [new SpeciesPrerequisite(Species.Bolian, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Bolian"),
            new TalentModel(
                "Born Near a Warp Core",
                "Bolian traditions say that a child born near an active Warp Core has an improved, more positive, disposition. Optimism and an upbeat attitude certainly lends credence to this tradition, allowing the Bolian to weather misfortune. When they suffer a Complication from a Task, roll 1[D]; if the result is an Effect, the Complication is ignored. Once a Complication has been ignored in this way, the Bolian may not ignore another Complication for the remainder of the scene.",
                [new SpeciesPrerequisite(Species.Bolian, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Bolian"),
            new TalentModel(
                "Deltan Pheromones",
                "The character excretes a natural aphrodisiac pheromone. Whenever they attempt a Task using Presence to influence an attracted creature, they gain one bonus d20. However, they also increase their Complication Range  by 2, as the effect can be distracting or lead to unwanted consequences. This talent can be switched off, losing both the bonus and the drawback, by applying chemical suppressants.",
                [new SpeciesPrerequisite(Species.Deltan, false), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Deltan"),
            new TalentModel(
                "Visual Spectrum",
                "An Efrosian can see beyond what others think of as the visual spectrum, from some infra-red to ultra-violet light. Any Tasks in which detecting those parts of the spectrum is useful reduce in Difficulty by 1. Circumstances, such as low light levels, do not affect the Difficulty of Tasks, as long as those Tasks do not relate to perceiving minutiae of a subject.",
                [new SpeciesPrerequisite(Species.Efrosian, false), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Efrosian"),
            new TalentModel(
                "Oral Scholar",
                "Efrosians are taught and learn through oral practices or ‘by rote’.  Any Obtain Information Momentum spends that relate to their own knowledge using Reason or Insight may ask one additional question, for free, in addition to those bought with Momentum.",
                [new SpeciesPrerequisite(Species.Efrosian, true), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Efrosian"),
            new TalentModel(
                "To Battle!",
                "Whenever a Klingon buys additional dice for a melee attack using Threat, for each Threat added to the pool, you gain 1 bonus Momentum that can only be spent on Bonus Damage, increasing the damage of the attack by 1 per Momentum spent.",
                [new AnySpeciesPrerequisite(true, Species.Klingon, Species.KlingonQuchHa), new SourcePrerequisite(Source.BetaQuadrant, Source.KlingonCore)],
                1,
                "Klingon"),
            new TalentModel(
                "Brak’lul",
                "Various physiological redundancies mean that wounds that would kill other humanoid species don’t affect Klingons as badly. The character gains +2 Resistance against all Non-lethal attacks. In addition, whenever the Klingon is target of a First Aid Task, reduce the Difficulty of that Task by 1, to a minimum of 1.",
                [new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new SourcePrerequisite(Source.BetaQuadrant, Source.KlingonCore), new NotSourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Klingon"),
            new TalentModel(
                "R’uustai",
                "This Klingon has lit candles, spoken words to honor their parents, and given their house’s sash to another, joining in a fellowship with another person, and becoming members of the same house (the original house of either party). The R’uustai Talent grants a Klingon an additional Value, which must reflect their relationship with the ritual sibling. In addition, whenever the Klingon assists, or is assisted by another, the character offering assistance may re-roll their die.",
                [new AnySpeciesPrerequisite(true, Species.Klingon, Species.KlingonQuchHa), new SourcePrerequisite(Source.BetaQuadrant, Source.KlingonCore)],
                1,
                "Klingon"),
            new TalentModel(
                "Killer’s Instinct",
                "You have shed blood, and will not hesitate to do so again. So familiar are you with the intent to kill that you can even see it in others when you look them in the eyes. When you choose to make a lethal attack, you do not add to Threat for doing so. In addition, whenever an enemy you can see attempts to make a lethal attack against you, you may add 1 to Threat to increase the Difficulty of their attack by 1, as you react to their intent.",
                [new AnySpeciesPrerequisite(true, Species.Klingon, Species.KlingonQuchHa), new SourcePrerequisite(Source.KlingonCore, Source.Core2ndEdition)],
                1,
                "Klingon"),
            new TalentModel(
                "Warrior’s Spirit",
                "You are an exemplar of what it means to be a Klingon warrior, and you will not hesitate to demonstrate your prowess to any who challenge you. When you make a melee attack, or are targeted by a melee attack, and you buy one or more d20s by adding to Threat, you may re-roll the dice pool for the task. Further, you own either a mek’leth or a bat’leth, at your discretion, and do not have to pay an Opportunity Cost to acquire it.",
                [new AnySpeciesPrerequisite(true, Species.Klingon, Species.KlingonQuchHa), new SourcePrerequisite(Source.KlingonCore, Source.Core2ndEdition)],
                1,
                "Klingon"),
            new TalentModel(
                "Chelon Shell",
                "The hard shell extending over a Chelon’s body provides added protection from physical and radioactive threats. This natural armor gives the character a Resistance of 1. They may also ignore any Complications from radiation sources.",
                [new SpeciesPrerequisite(Species.Chelon, false), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Rigellian Chelon"),
            new TalentModel(
                "Toxic Claws",
                "In times of danger Chelons excrete a contact toxin onto their claws that can be used to debilitate foes. Their Unarmed Strike is replaced with a melee attack Claw Strike (Melee, 1[D], Piercing 1, Debilitating, Non-lethal).",
                [new SpeciesPrerequisite(Species.Chelon, false), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Rigellian Chelon"),
            new TalentModel(
                "Exosex",
                "The character possess a Z chromosome that strengthens their physical and survival instincts and abilities. Whenever attempting a Task using Fitness or Daring, roll 1 additional d20 and gain one bonus Momentum on such Tasks.",
                [new SpeciesPrerequisite(Species.Jelna, false), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Rigellian Jelna"),
            new TalentModel(
                "Industrious Mind",
                "The Jelna are naturally enterprising and industrious, and have an affinity for technological developments and industrial engineering. When succeeding an Engineering or Science Task relating to fixing or adapting technology, and spending 2 or more Momentum, a Jelna may add an Advantage related to that technology for free.",
                [new SpeciesPrerequisite(Species.Jelna, true), new EraPrerequisite(Era.OriginalSeries), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Rigellian Jelna"),
            new TalentModel(
                "Peaceful Existence",
                "Your upbringing in a peaceful society, one that promotes harmony and has an outright ban on weapons, has developed the Risian ability for peaceful resolutions. Whenever a Risian attempts a Task to dissuade another individual or group from resorting to conflict, they reduce the Difficulty of that Task by 1.",
                [new SpeciesPrerequisite(Species.Risian, true), new EraPrerequisite(Era.Enterprise), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Risian"),
            new TalentModel(
                "Open and Insightful",
                "Risian open, and often frank, discussion of problems and personal opinion enables conversation and understanding when working in a team. Whenever a Risian assists another character using Insight or Reason they may re-roll a single d20 in their dice pool. In addition, if the lead character succeeds in the Task using Insight or Reason, they gain 1 bonus Momentum.",
                [new SpeciesPrerequisite(Species.Risian, true), new EraPrerequisite(Era.Enterprise), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Risian"),
            new TalentModel(
                "Calm Under Pressure",
                "Arboreals possess an unwaveringly calm nature, allowing them to ignore the stress of a crisis. When attempting Tasks with Control to resist stress or mental affliction they may reroll one die in your pool.",
                [new SpeciesPrerequisite(Species.XindiArboreal, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Xindi-Arboreal"),
            new TalentModel(
                "A Mind for Design",
                "Xindi-Primates are natural engineers and scientists, pushing at the frontiers of design and construction. When following the Scientific Method, they may suggest an additional Focus, which they do not have to possess, as ‘The Good Way’. Every Task they attempt in an Extended Task related to the Scientific Method automatically gains the Piercing 1 effect.",
                [new SpeciesPrerequisite(Species.XindiPrimate, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Xindi-Primate"),
            new TalentModel(
                "Stun Resistance",
                "Reptillians are naturally resistant to energy weapons stun settings. They gain +1 Resistance against Non-lethal attacks from energy weapons. They may always Avoid an Injury from a Non-lethal attack with a cost of 1 Momentum (Immediate), even if they have already Avoided an Injury during the scene.",
                [new SpeciesPrerequisite(Species.XindiReptilian, false), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Xindi-Reptilian"),
            new TalentModel(
                "Protective Instinct",
                "Insectoids have a profound instinct to defend your eggs and their off-spring, and this transfers onto teams or groups with which they develop a close bond. Whenever an Insectoid attempts a Guard Task in combat, and confers the benefits to another Main Character, ignore the increase in Difficulty when attempting the Task.",
                [new SpeciesPrerequisite(Species.XindiInsectoid, false), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Xindi-Insectoid"),
            new TalentModel(
                "Tactical Voice",
                "In command positions, the speed of Zakdorn tactical calculations enables them to give concise orders to their crew. During combat, a Zakdorn leader may use the Direct Task one additional time per scene (so, twice per scene overall). Further, when they use the Swift Task Momentum Spend for an extra Task, the cost is reduced to 1 Momentum, so long as the second Task is the Assist or Direct Task.",
                [new SpeciesPrerequisite(Species.Zakdorn, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Zakdorn"),
            new TalentModel(
                "Master Strategist",
                "Zakdorn strategic sense is unparalleled in contemporary military theory. Whenever a Zakdorn attempts a Task to Create an Advantage related to strategy or tactics (as opposed to spending Momentum), reduce the Difficulty by 1.",
                [new SpeciesPrerequisite(Species.Zakdorn, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.BetaQuadrant)],
                1,
                "Zakdorn"),
            new TalentModel(
                "Morphogenic Matrix",
                " The character may spend 1 Momentum as a Minor Action once per Turn to assume a different form, gaining an additional Trait to reflect whatever form they have chosen, though they cannot yet mimic an individual, and they must return to a liquid state for a few hours of rest every sixteen hours. While in an alternate form, it is next to impossible (Difficulty 5) to discern the Changeling’s true nature, without separating some part of the Changeling’s substance. The character also has a Resistance of 4.",
                [new AnySpeciesPrerequisite(false, Species.Changeling, Species.ChangelingGamma), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.DS9)],
                1,
                "Changeling"),
            new TalentModel(
                "Morphogenic Mastery",
                "The Changeling may, when assuming an alternate form, assume the form of a specific individual, mimicking their appearance and personality sufficiently that even close friends may be unable to discern the truth. Further, the Changeling no longer needs to revert to a liquid state in order to rest.",
                [new AnySpeciesPrerequisite(false, Species.Changeling, Species.ChangelingGamma), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.DS9)],
                1,
                "Changeling"),
            new TalentModel(
                "Greed Is Eternal",
                "As guided by the Rules of Acquisition, a proper Ferengi seeks profit in every endeavor. When engaged in negotiations – including Social Conflict – that have the potential for the Ferengi to profit financially, they may add 1 point to Threat in order to re-roll their dice pool.",
                [new SpeciesPrerequisite(Species.Ferengi, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.DS9)],
                1,
                "Ferengi"),
            new TalentModel(
                "Never Place Friendship Above Profit",
                "Ferengi accept and tolerate self-serving behavior as a natural part of business. When the character assists someone else – including using the Direct Task or other methods of assistance – and one or more Complications occurs, the character may add 1 to Threat to avoid suffering any effect from those Complications personally.",
                [new SpeciesPrerequisite(Species.Ferengi, true), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.DS9)],
                1,
                "Ferengi"),
            new TalentModel(
                "Polyalloy Construction",
                "While appearing extremely lifelike – even simulating breathing, blinking, and other autonomic processes – a Soong-type android is not organic life. They are highly resistant to environmental conditions, reducing the Difficulty of Tasks to resist extremes of heat and cold by 2, and they are immune to the effects of suffocation, hard vacuum, starvation, and thirst. Further, their sturdy construction grants them Resistance 1. Further, while they can detect damage and dangerous conditions, they do not experience real pain, gaining +3 Resistance against non-lethal attacks, and being entirely immune to any penalties or hindrances caused by pain.",
                [new SpeciesPrerequisite(Species.Android, false), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.TNG)],
                1,
                "Soong-type Android"),
            new TalentModel(
                "Positronic Brain",
                "A Soong –type android is normally created with a positronic brain that allows it to process information made available to them considerably quicker than a Human. The character gains one automatic success on all Tasks using Reason, in addition to any generated by rolling.",
                [new SpeciesPrerequisite(Species.Android, false), new EraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.TNG)],
                1,
                "Soong-type Android"),
            new TalentModel(
                "Cold Shoulder",
                "Strong self-discipline and conservative cultural values prevent Arbazan from being susceptible to their baser desires. Any character attempting to use their physical attractiveness or seductive nature against an Arbazan during a Social Conflict increases their Difficulty by 1.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Arbazan, true)],
                1,
                "Arbazan"),
            new TalentModel(
                "The Protocol of Politics",
                "Arbazan are naturally adept at the subtleties of social protocol, and often come to rely on it heavily during social interactions. To many other species, the Arbazan’s focus on such rules and guidelines is often viewed as obsessive, but to the Arbazan, it is simply the natural way to engage in interactions. Whenever a character with this Talent attempts a test during Social Conflict, they may re-roll a d20 so long as they succeeded at an earlier Test relating to the recollection or research of appropriate social graces, protocols, or faux pas.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Arbazan, true)],
                1,
                "Arbazan"),
            new TalentModel(
                "Cool Under Pressure",
                "Demands of Arkarian society place strict requirements on social interactions. You are able to keep your outward expressions neutral, revealing as little as possible. Whenever you are engaged in a Social Conflict, you are considered to have an Advantage until you fail a Composure Test.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Arkarian, true)],
                1,
                "Arkarian"),
            new TalentModel(
                "Quick Recovery",
                "The increased bone density of the brow and nasal areas are also found throughout the rest of their physical frame and provide Arkarians with superior protection from blunt trauma. They gain 2 additional Resistance against any attack made with blunt weapons.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Arkarian, true)],
                1,
                "Arkarian"),
            new TalentModel(
                "Aerial Combat",
                "While most Aurelians avoid confrontation, they understand that sometimes it is necessary for survival. Some Aurelians have learned to take advantage of their natural flying ability. Characters with this Talent may use a Minor Action to move to any Zone within Long Range instead of Medium, and ignore any Difficulty increases associated with terrestrial terrain – however, they increase the Difficulty of any weather-related hazards by 1. Characters with this Talent are also considered to have the Advantage when making an attack against ground-based Targets.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Aurelian, false)],
                1,
                "Aurelian"),
            new TalentModel(
                "Keen Senses",
                "Aurelians are known for their keen vision, hearing, and directional sense. Characters with this Talent reduce the Difficulty due to Distance of Perception Tasks by 1.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Aurelian, true)],
                1,
                "Aurelian"),
            new TalentModel(
                "Disarming Nature",
                "Despite their reputation for being fierce warriors, Caitians are extremely sociable and adept at putting others at ease. Whenever you are engaged in a Social Conflict, you reduce the Difficulty of any Test to make your target relax or to trust you by 1.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Caitian, true)],
                1,
                "Caitian"),
            new TalentModel(
                "Prehensile Tail",
                "While most Caitians have some functional control over their tail, characters with this Talent have worked to increase their control over the appendage to the point of it becoming fully functional. This provides the character with the ability to hold and operate an additional piece of equipment, like an additional hand. In addition, the character gains a bonus d20 to any Fitness Test to maintain balance or to climb.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Caitian, false)],
                1,
                "Caitian"),
            new TalentModel(
                "Duty and Discipline",
                "When the character assists a superior, the superior gains a bonus Momentum.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Cardassian, true)],
                1,
                "Cardassian"),
            new TalentModel(
                "Suspicious by Nature",
                "When attempting to detect hidden enemies, traps or other forms of danger, the character may re-roll a die.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Cardassian, true)],
                1,
                "Cardassian"),
            new TalentModel(
                "Regimented Mind",
                "Whenever this character spends Momentum to Obtain Information, they reduce the Difficulty of their next Task by 1 so long as that Task in some way relates to the information gained.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Cardassian, true)],
                1,
                "Cardassian"),
            new TalentModel(
                "The Ends Justify the Means",
                "When the character challenges a Directive, they gain a bonus die – in addition to any other benefits.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Cardassian, true)],
                1,
                "Cardassian"),
            new TalentModel(
                "Multi-Tasking",
                "Edosians are capable, with extensive training and great effort, of compartmentalizing their thoughts and operating each arm completely independent of the others. Characters with this Talent may spend 3 Momentum to gain the benefit of an additional Senior Officer Role until the end of the current scene. This Talent may only be used once per episode.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Edosian, true)],
                1,
                "Edosian"),
            new TalentModel(
                "The Long View",
                "Due to their extremely long lifespans, Edosians come to understand and gain knowledge more extensively than most other individuals. When a character with this Talent uses a Milestone to exchange a Focus, they may do so twice instead of once.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Edosian, true)],
                1,
                "Edosian"),
            new TalentModel(
                "Every Man Has His Price",
                "The character gains a bonus die whenever engaged in Social Conflict where the opponent can be bribed, bought, or otherwise enticed by monetary gain.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.FerengiAlpha, true)],
                1,
                "Ferengi"),
            new TalentModel(
                "Hear All, Trust Nothing",
                "Increase the Difficulty of any Social Conflict to deceive the character by 1.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.FerengiAlpha, true)],
                1,
                "Ferengi"),
            new TalentModel(
                "Knowledge Equals Profit",
                "When the character spends Momentum to Obtain Information, an additional Momentum is added to the group’s Momentum Pool after all other Momentum spends are resolved.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.FerengiAlpha, true)],
                1,
                "Ferengi"),
            new TalentModel(
                "Communal",
                "Grazerites are deeply communal and work well in coordination with others. Whenever a character with this Talent is providing assistance to another, they increase the Focus range to generate 2 successes by 1.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Grazerite, true)],
                1,
                "Grazerite"),
            new TalentModel(
                "Horn-Sense",
                "A small minority of Grazerites are born with a genetic variance that causes their horns to be hollow. This gives them a highly sensitive organ that can detect subtle changes in air pressure, sound, and all manner of vibrations. When a character with this Talent attempts a Task that involves the detection or analysis of sound or vibrations of any kind, they may re-roll a d20.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Grazerite, false)],
                1,
                "Grazerite"),
            new TalentModel(
                "Contact Empathy",
                "Haliians possess minor empathic abilities which, without the canar focusing crystal, is limited to touch. Once you make contact with another character, you can sense the emotions of that individual – as well as communicate telepathically with other empaths or telepaths. You cannot choose to not sense the emotions of those you make contact with. It may require effort and a Task to gain information from beings that are resistant to forms of telepathy. Such information can most often be used as an Advantage during Social Conflicts.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Haliian, true)],
                1,
                Species[Species.Haliian]),
            new TalentModel(
                "Faceted Attention",
                "Characters with this Talent can suddenly divert their attention to other Tasks, leaving their current Task in whatever state it was in, and immediately begin work on the second. To many this may seem undisciplined and unfocused, but to characters with this Talent it is simply an effective way of completing several Tasks at once. Whenever this character is participating in a Challenge, they may choose to use this Talent and attempt two Tasks simultaneously. The attempt is made against the Task with the highest Difficulty, which is then attempted using the appropriate pool. Successes are then divided between the two Tasks. When attempting Tasks using this Talent – the Complication range is increased by one and any Complications rolled can be from either Task – as thematically appropriate.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Haliian, true)],
                1,
                "Haliian"),
            new TalentModel(
                "Deep Determination",
                "Ktarians have a well-earned reputation for becoming deeply committed to a particular goal – a single-minded determination to achieve success. When a character with this Talent succeeds at a Task where they could have spent a point of Determination, but choose not to, they may spend 3 Momentum to gain a point of Determination. This Talent may only be used once per Episode.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Ktarian, true)],
                1,
                "Ktarian"),
            new TalentModel(
                "Negotiate from Strength",
                "Ktarians are loath to enter into negotiations unless they feel they are at an advantage. When a Character with this Talent enters into a Social Conflict and attempts to use negotiation, they may gain the benefit of an Advantage twice – however, the Advantage must be used differently each time. This Talent may only be used once per scene.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Ktarian, true)],
                1,
                "Ktarian"),
            new TalentModel(
                "Hardened Hide",
                "Zaranite skin is extremely tough and capable of withstanding pressures, temperatures, and acidity levels that would prove lethal to other species. Characters with this Talent gain 2 natural Resistance.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Zaranite, false)],
                1,
                "Zaranite"),
            new TalentModel(
                "Multispectrum Vision",
                "Zaranites can see a broader spectrum of light than most humanoid species. Characters with this Talent gain a bonus Momentum on a Perception Task based on vision. This bonus Momentum may only be used on the Gain Information Momentum spend.",
                [new SourcePrerequisite(Source.AlphaQuadrant), new SpeciesPrerequisite(Species.Zaranite, false)],
                1,
                "Zaranite"),
            new TalentModel(
                "Absolute Conviction",
                "The Argrathi come from a culture where crime has been systematically eliminated and therefore they view themselves as the true arbiters of justice across the Gamma Quadrant. They view criminals with disdain, and they live to show others the true greatness of their beliefs. An Argrathi gains +1 to all rolls when dealing with someone they know to be a criminal or who engages in criminal behavior. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Argrathi, true)],
                1,
                "Argrathi"),
            new TalentModel(
                "Mind Games",
                "The Argrathi’s memory technology is used in more ways than just their penal system. From education to entertainment, the average Argrathi is exposed to the effects of this technology at a very young age and learns how to tell when their memory has been altered or when they are under the effect of mind-altering abilities or powers. An Argrathi receives a +1 bonus to all rolls when attempting to resist these effects or uncover whether they have been affected at all. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Argrathi, false)],
                1,
                "Argrathi"),
            new TalentModel(
                "Strength and Cunning",
                "While they are a warrior culture, the Dosi do not teach their children to solve every matter with only one aspect of their being. In order to thrive in Dosi culture, they must utilize every skill and asset they possess and must combine them in ways they never thought possible. A Dosi may use their Fitness Attribute in situations where they must use Insight, and their Presence Attribute when they need to use their Reason. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Dosi, true)],
                1,
                "Dosi"),
            new TalentModel(
                "Glorious Notoriety",
                "The Dosi’s culture has adapted itself to being able to look at an individual Dosi’s skin and being able to read their accomplishments before the other Dosi has even had a chance to open their mouth. The Dosi know other races are not as civilized as theirs and therefore they know how to radiate a sense of intimidation and respect to those who are around them, whether by flexing their muscles or by adding implied threats as they attempt to negotiate their deals. The Dosi reduces the Difficulty of all checks involving negotiations or diplomacy by 1. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Dosi, true)],
                1,
                "Dosi"),
            new TalentModel(
                "Genetic Mastery",
                "Research into the field of genetics has become the cornerstone of the Drai’s technology. Some families have begun experimenting on their own children in order to produce the most powerful heirs and offspring possible. The character must choose one attribute to be the focus of Genetic Mastery. Once an attribute is assigned to Genetic Mastery, the character reduces the Difficulty of all Tasks that involve that attribute by 1. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Drai, true)],
                1,
                "Drai"),
            new TalentModel(
                "Born Stalker",
                "The Drai consider the Hunt to be the most important thing they will ever do in their lives, and their entire culture revolves around it. Whether it is pursuing the Tosk or other prey, the Drai have structured the very way they teach their children to view the world to be from the mind-set of a hunter stalking their prey. This helps the Drai in every walk of life as they are able to approach each task with precision and careful attention rather than blindly rushing into things. Once per scene the Drai may ignore their Complications when determining the Difficulty for a Task. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Drai, false)],
                1,
                "Drai"),
            new TalentModel(
                "My Honor Is My Shield",
                "While it can be difficult to maintain a sterling reputation and in doing so lead to hardship and loss, there are times when pursuing a higher path can reap great benefits for the individual. It is the difficult road, but one that will ultimately lead towards fulfilling the needs of the many rather than the selfish desires of the one. As long as the character has behaved honourably throughout the scene, they may use their Presence Attribute for any declared Attacks. The character is also assumed to pass any challenges involving impugning their character in front of witnesses. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Karemma, true)],
                1,
                "Karemma"),
            new TalentModel(
                "Instant Appraisal",
                "A tricorder can tell someone what an object is composed of in only a few seconds but it is rumoured that the Karemma can do it in only one. Drawing upon past experience, the Karemma is able to instinctively identify the materials that make up an object that they interact with physically. In the event of dealing with unknown or exotic substances, they are able to identify familiar patterns within the material that can point the characters in the right direction while performing the Scientific Method and reduce the difficulty by 1. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Karemma, false)],
                1,
                "Karemma"),
            new TalentModel(
                "Into the Breach",
                "Life is not worth living to a Lurian if there is not some risk involved. Always willing to dare greater than others, the Lurian finds that the real thrill lurks just beyond the edge of danger and that is what they should strive for even if their comrades do not. The character gains an additional point of Momentum if they succeed at a task that requires extreme acts of bravery to overcome. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Lurian, true)],
                1,
                "Lurian"),
            new TalentModel(
                "Resistant Anatomy",
                "The Lurians are known for having one of the hardiest constitutions in the quadrant. Capable of taking a knife to one of their hearts and keep on fighting, the Lurians have evolved a musculature and cardiovascular system that rivals that of the Klingons. When mortally wounded or suffering under a Condition that affects their physiology, a Lurian can choose to ignore the effect for the remainder of the scene, after which they collapse from exhaustion and are incapacitated for a scene. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Lurian, true)],
                1,
                "Lurian"),
            new TalentModel(
                "Replicating Past Success",
                "When encountering scientific tasks that they have already successfully completed for this scene, the character may spend a point of Momentum to replicate the dice result from the previous challenge. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Paradan, true)],
                1,
                "Paradan"),
            new TalentModel(
                "Distracting Senses",
                "Paradans are infamous throughout the Gamma Quadrant for their pervasive odors, but some of them have been able to channel this portion of their physiology and use it as a weapon. A Paradan may spend their turn focusing on emitting obnoxious pheromones around them and increase the Difficulty towards attacking them in hand to hand combat by 1. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Paradan, false)],
                1,
                "Paradan"),
            new TalentModel(
                "The Truth of the Matter",
                "The Rakhari culture is peppered with thousands of stories and legends that are shared by the Rakhari with their children as they grow up. This has led to the Rakhari being capable storytellers, and a skilled Rakhari knows how to incorporate small snippets of the truth into any web of lies he starts to weave. The Rakhari gains a free point of Momentum when they successfully convince another sentient being of a lie. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Rakhari, true)],
                1,
                "Rakhari"),
            new TalentModel(
                "Disciplined Mind",
                "The brutal laws that the Rakhari government has passed over the years has kept the population under control but led to most Rakhari being too afraid to share their intimate thoughts in public. This has led to several Rakhari becoming particularly adept at not only shielding their emotions while around others but also being able to discern the true feelings of those they communicate with. The Rakhari is able to reduce any psychic damage they may suffer by 1 and they gain a free reroll on one die in their pool when attempting to determine lies. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Rakhari, true)],
                1,
                "Rakhari"),
            new TalentModel(
                "Agricultural Specialist",
                "When tasked with dealing with matters that relate to a planet’s biosphere or agriculture, a Skreeaan may always use their Insight or Control attributes, depending on which is higher. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Skreeaa, true)],
                1,
                "Skreeaa"),
            new TalentModel(
                "Strength Through Struggle",
                "Though some believe it is the Skreeaan’s history of being conquered that has made them expert laborers the truth is they are a tough and hardy people eager to throw off the reins of oppression. The fact that they are physically gifted when it comes to labor only means they are able to succeed easily where others struggle. When they succeed at performing a physically arduous Task they gain one bonus Momentum. This bonus Momentum cannot be saved into the group pool. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Skreeaa, true)],
                1,
                "Skreeaa"),
            new TalentModel(
                "At All Costs",
                "Though a small power in the Alpha Quadrant, the Son’a have not become one of the dominant powers in the Briar Patch by engaging only in half measures or pulling their punches. When a Son’a declares their attack action, they may add an additional point of Momentum as long as they are not dealing Non-lethal damage. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.SonA, true)],
                1,
                "Son’a"),
            new TalentModel(
                "Particle Engineering",
                "The Son’a are hedonists who embrace all the pleasures that life has to offer but that does not mean they are not well educated. A large portion of the Son’a’s scientific research is dedicated towards understanding the unique particles that cling to the atmosphere of their former homeworld. When dealing with subatomic particles and the effects of radiation, the Son’a may ignore the effects of any Condition for the scene and may roll an additional d20 when attempting to understand the nature of these effects. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.SonA, false)],
                1,
                "Son’a"),
            new TalentModel(
                "Survivor’s Luck",
                "For the Drai, the greatest hunts always come when their prey manages to continually outwit them and the Tosk are cunning adversaries. Some are given extra stores of information when they are created while others are able to pick up survival techniques as they try to escape from the Hunters. The Tosk adds 1 bonus Momentum to the pool for each adversary they are trying to escape in the scene to a maximum of 3. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Tosk, true)],
                1,
                "Tosk"),
            new TalentModel(
                "Last Breath",
                "The Tosk are designed to keep running no matter what, and refuse to allow themselves to be captured because they start to feel the effects of fatigue or exhaustion. A Tosk with this talent gains a free point of Momentum to their next action when attempting to escape while they are under the effects of a Complication. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Tosk, true)],
                1,
                "Tosk"),
            new TalentModel(
                "Come With Me",
                "Life can be difficult if you are competitive, and sometimes people can get angry over perceived slights very quickly. By staying jovial and attempting to lighten the mood, you are better able to reduce sources of conflict and bring people over to your side. You can reroll one die when attempting to use social skills to alter someone’s feelings regarding something you have done this scene. ",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Wadi, true)],
                1,
                "Wadi"),
            new TalentModel(
                "Life is a Game",
                "Life is meant to be enjoyed, and the more risk one puts into their life the sweeter the victory. A Wadi has a distinct ability to sense patterns when it comes to solving tasks, and the more involved they are with something the more competitive they get and the quicker they are at solving puzzles. When attempting to solve a task or a riddle that involves them becoming competitive they gain an additional point of Momentum.",
                [new SourcePrerequisite(Source.GammaQuadrant), new SpeciesPrerequisite(Species.Wadi, false)],
                1,
                "Wadi"),
            new TalentModel(
                "Favored by Fortune",
                "If the character is successful on a Task, the next Task performed during that scene gains one bonus Momentum if successful.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Ankari, true)],
                1,
                "Ankari"),
            new TalentModel(
                "Vibration Senses",
                "The character has learned to use their unique physiology to allow them to detect vibrations, enhancing their ability to see and hear, even in darkness. Characters with this Talent reduce the Difficulty of perception-related Tasks by 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Ankari, true)],
                1,
                "Ankari"),
            new TalentModel(
                "Maximized Efficiency",
                "When assisting another character, the Jye may re-roll their assist die. In addition, if the assist die generated one or more successes, the lead character gains a bonus Momentum if the Task is successful.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Jye, true)],
                1,
                "Jye"),
            new TalentModel(
                "Natural Coordinator",
                "When assisting, or being assisted, the character is always considered to have an applicable Focus for that Task. In addition, the character counts as having a Command of 4 for the purposes of learning Talents.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Jye, true)],
                1,
                "Jye"),
            new TalentModel(
                "Borg Implants",
                "A Liberated Borg character must select this Talent during character creation. When this Talent is chosen, pick one, two, or three Borg Implants. The character gains the benefits of those implants, but the Difficulty of Medicine Tasks performed on them increases by the number of implants they have. The character also increases the Complication range of all social interaction Tasks by the number of implants they have. An ordinary milestone may be used to remove one implant at a time, not the whole Talent; once all implants have been removed, this Talent can be swapped for another.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.LiberatedBorg, true)],
                1,
                "Liberated Borg"),
            new TalentModel(
                "Direct Neural Interface",
                "Having existed as an extension of one of the largest and most complex computer networks in the known Galaxy, Liberated Borg possess a natural affinity for computers and data processing equipment of all kinds, and are almost organic computers themselves. When the character attempts a Task that involves, or is assisted by, a computer (including the ship’s Computers system), the character gains a bonus d20 for their dice pool.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.LiberatedBorg, true)],
                1,
                "Liberated Borg"),
            new TalentModel(
                "Hologram Taskmaster",
                "In decades past, the Lokirrim designed and utilized holograms to perform countless tasks. The character’s ship’s Crew Support is increased by 1. In addition, the character’s ship gains the Photonic Crew Trait. This increase can only be applied to a ship once, regardless of the number of Main Characters who possess this Talent.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Lokirrim, true)],
                1,
                "Lokirrim"),
            new TalentModel(
                "Photonic Prosecutor",
                "The Lokirrim have a long history of interrogating rogue photonic individuals. When engaged in a Social Conflict with a hologram or other photonic character, this character is considered to have an Advantage.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Lokirrim, true)],
                1,
                "Lokirrim"),
            new TalentModel(
                "Passive Persuader",
                "During Social Conflict, the character reduces the Difficulty of all evidence and negotiation based Tasks but increases the Difficulty of intimidation Tasks by 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Mari, true)],
                1,
                "Mari"),
            new TalentModel(
                "Nomadic Heritage",
                "Generations of traversing the stars ingrained a natural affinity for navigation and positioning. The character may reroll a d20 during any Task associated with positioning, course determination, and other forms of navigation.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Monean, true)],
                1,
                "Monean"),
            new TalentModel(
                "Submariner",
                "Having lived underwater for centuries, the Moneans have long since developed a keen understanding of navigating underwater environments. The character reduces any Difficulty penalties to Conn Tasks while navigating or piloting underwater by 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Monean, true)],
                1,
                "Monean"),
            new TalentModel(
                "Quick Learner",
                "Ocampa possess keen minds and enjoy near-perfect memories, and they take to new situations and new challenges quickly. When a character with this talent attempts a Task which they have seen at least one ally perform during this mission, you may add an additional d20 to that Task. ",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Ocampa, true)],
                1,
                "Ocampa"),
            new TalentModel(
                "Telepath (Ocampa)",
                "The character can sense the surface thoughts and emotions of most living beings nearby, and can communicate telepathically with other empaths and telepaths, as well as those with whom they are extremely familiar. Surface thoughts are whatever a creature is thinking about at that precise moment. The character cannot choose not to sense the emotions or read the surface thoughts of those nearby, except for those who are resistant to telepathy. It will require effort and a Task to pick out the emotions or thoughts of a specific individual in a crowd, to search a creature’s mind for specific thoughts or memories, or to block out the minds of those nearby. Unwilling targets may resist with an Opposed Task.\nWhile all Ocampa are telepathic, their short lifespan and rapid development means that a young Ocampa character may not fully develop their abilities until later in life, so it is possible to choose the Talent after character creation. Unlike other telepathic/empathic species, the Ocampa have demonstrated the ability to develop even greater psychic abilities, including precognition, mental projection, telekinesis, and the ability to manipulate matter at a subatomic level.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Ocampa, true)],
                1,
                "Ocampa"),
            new TalentModel(
                "Born to Fight",
                "The character may reroll one d20 when making an attack. In addition, if an attack is successful, the character generates one point of bonus Momentum which may only be spent to re-roll the damage roll or to increase the total damage. Bonus Momentum may not be saved.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Pendari, true)],
                1,
                "Pendari"),
            new TalentModel(
                "Robust Physiology",
                "Various physiological redundancies mean that wounds that would kill other humanoid species don’t affect Pendari as much. The character gains +2 Resistance against all nonlethal attacks. In addition, whenever the Pendari is the target of a First Aid Task, reduce the Difficulty of that Task by 1, to a minimum of 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Pendari, true)],
                1,
                "Pendari"),
            new TalentModel(
                "Canonic Law",
                "A deep respect for and adherence to established laws provides the character with emotional assuredness. When spending Determination to bring one of their Values into play, the character may select two benefits instead of one. The circumstances of this Task and the Value being used must relate to the character’s belief and adherence to the laws of their people. This Talent may only be used once per mission, and it cannot be used when challenging the selected Value.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Sikarian, true)],
                1,
                "Sikarian"),
            new TalentModel(
                "Riveting Storyteller",
                "When engaged in a Social Conflict, if the character can tell a story as part of their interaction, they may reroll a d20.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Sikarian, true)],
                1,
                "Sikarian"),
            new TalentModel(
                "Well Regarded",
                "When engaged in a Social Conflict, the character increases the Difficulty of Tasks that target them by 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Sikarian, true)],
                1,
                "Sikarian"),
            new TalentModel(
                "Being of Many Talents",
                "The character has developed a degree of ability across a broad range of disciplines. When attempting a Task where more than one of the character’s Focuses apply, the character may reroll a d20.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Talaxian, true)],
                1,
                "Talaxian", false, new AliasModel("Being of Many Virtues", Source.Voyager)),
            new TalentModel(
                "Infectous Nature",
                "The character comes from a race of social beings that are outgoing, good-natured, and enjoy the company of others. This exuberance has the pleasant side effect of improving the attitude and outlooks of the people around them – regardless of whether those beings like it or not. When engaged in a Social Conflict, the character may spend 2 Momentum to improve the outlook and attitude of those around them. This provides one of two effects. The character is considered to have an Advantage in subsequent social interactions with the individual affected by this Talent. In addition, the character may choose to allow the individual to recover Stress equal to the character’s Command score.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Talaxian, true)],
                1,
                "Talaxian"),
            new TalentModel(
                "Widely Traveled",
                "Having traveled space for more of their adult life, the character has seen much and has picked up bits of knowledge and unusual skills along the way. Once per mission, the character may add 1 to Threat to gain an additional Focus for the remainder of that mission, representing a specific skill or field of knowledge the character possesses which is useful in the current situation.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Talaxian, true)],
                1,
                "Talaxian"),
            new TalentModel(
                "Deep Determination",
                "Turei have a well-earned reputation for becoming deeply committed to a particular goal – a single-minded determination to achieve success. When a Character with this Talent succeeds at a Task where they could have spent a point of Determination, but chose not to, they may spend 3 Momentum to gain a point of Determination. This Talent may only be used once per mission.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Turei, true)],
                1,
                "Turei"),
            new TalentModel(
                "Underdweller",
                "When attempting any Task involving navigating subspace realms, such as Underspace corridors, the character reduces the Difficulty of that Task by 1, to a minimum of 1.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Turei, true)],
                1,
                "Turei"),
            new TalentModel(
                "Thermal Regulation",
                "This species is capable of regulating their body temperatures such that they can survive in hostile environments with ease. Reduce the severity of any negative Trait dealing with temperature by 1. This can eliminate any ongoing damage the character would normally be required to suffer due to these Traits.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Zahl, true)],
                1,
                "Zahl"),
            new TalentModel(
                "Warm Welcome",
                "A cheerful, outgoing personality is the perfect thing to put diplomatic guests at ease. Whenever assisting another character, the Zahl may use the active character’s Presence Attribute instead of their own. Further, both the Zahl and the character being assisted may ignore any increases in Complication Range for the Task.",
                [new SourcePrerequisite(Source.DeltaQuadrant), new SpeciesPrerequisite(Species.Zahl, true)],
                1,
                "Zahl"),
            new TalentModel(
                "Expanded Program",
                "Your programming has been expanded considerably, with subroutines and databases covering a wide range of additional subjects and fields of expertise. You may select up to two additional Focuses.",
                [new SourcePrerequisite(Source.Voyager), new SpeciesPrerequisite(Species.Hologram, false)],
                1,
                "Hologram"),
            new TalentModel(
                "Mobile Emitter",
                "You have a device that allows you a degree of autonomy from fixed holoemitters. Most of these mobile emitters are bulky, awkward pieces of equipment with a limited amount of power, making them useful only for short periods and emergencies, but the technology is improving. While you have your mobile emitter, you can move freely in places that lack holo-emitters. However, Complications may reflect damage to or problems with the emitter.",
                [new SourcePrerequisite(Source.Voyager), new SpeciesPrerequisite(Species.Hologram, false)],
                1,
                "Hologram"),
            new TalentModel(
                "Cruel",
                "You have a tendency towards ruthlessness and cruelty, and the reputation to match, always seeking to undermine those you wish to destroy before you deal the final blow. When you attempt a Task to identify the weaknesses or flaws of an enemy, or matters they are particularly sensitive or protective about, you may reduce the Difficulty by 1. If the enemy has a trait which reflects this weakness (such as an advantage you’ve created, or a complication they’re suffering from), you may re-roll a single d20 on the next attack or persuasion Task you attempt against them.",
                [new SpeciesPrerequisite(Species.KlingonQuchHa, true), new NotEraPrerequisite(Era.NextGeneration), new SourcePrerequisite(Source.KlingonCore)],
                1,
                "Klingon (QuchHa’)"),
            new TalentModel(
                "Superior Ambition",
                "You believe that your cunning and insight give you an advantage over other Klingons, and your ambition is greater than theirs. When you spend Determination, you may add three to Threat in order to gain two benefits from spending Determination, instead of one.",
                [new SourcePrerequisite(Source.KlingonCore), new NotEraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.KlingonQuchHa, true)],
                1,
                "Klingon (QuchHa’)"),
            new TalentModel(
                "A Better Path",
                "Akaru value efficiency in all things, including when working on problems or tasks. Whenever you succeed at a task during an extended task, add 1[D] to your dice pool to determine Work completed.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.Akaru, true)],
                1,
                "Akaru"),
            new TalentModel(
                "Charming Demeanor",
                "Akaru are a robust and passionate people, and readily build relationships with others. Whenever you engage in a social interaction or social conflict with another character, you may re-roll a single d20 in your dice pool. In addition, if you succeed in that task, you gain 1 bonus Momentum.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.Akaru, true)],
                1,
                "Akaru"),
            new TalentModel(
                "Water Glassing",
                "A Cal-Mirran can learn to “glass” water on contact, i.e., harden it temporarily, similar to freezing, but without expansion or temperature change. Glassing can create tools or be used for defense. It is a skill that must be mastered, and requires concentration. Advanced glassers can harden anywhere from their body volume of water, to large swaths of ocean, but the larger the volume and the longer it is held, the greater the strain on the Cal-Mirran mind. Glassing requires a Fitness + Science task, with a Difficulty determined by the quantity of water being affected. After a successful use of this ability, the character is sluggish and will be unable to use this talent or change their own body’s state for the remainder of the scene.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.CalMirran, true)],
                1,
                "Cal-Mirran"),
            new TalentModel(
                "Time Refraction",
                "With training, Cal-Mirrans can absorb tachyon radiation and use it to refract space-time, bending their surroundings slightly into the future or past. The more radiation, the further the slide, but the greater the risk – too much refraction can result in severe physical or mental damage and a weakening of their crystalline matrix. By spending a point of Determination and attempting an Insight + Science task, the character can perceive a glimpse of the past or future as if they were in that location at that time. The Difficulty of this task is based on how far into the past or future the character is looking; a glimpse of up to a minute earlier or later is Difficulty 1, up to an hour is Difficulty 2, up to a day is Difficulty 3, and longer durations have a higher Difficulty at the gamemaster’s discretion. Success allows the character to ask one question, plus one extra question per Momentum spent, about events in that time and place. Glimpses of the future are subject to change, as future events are not fixed.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.CalMirran, true)],
                1,
                "Cal-Mirran"),
            new TalentModel(
                "That Wasn’t Me",
                "The Orions are known as one of the most untrustworthy species in the Galaxy next to the Ferengi, and yet people are always willing to do business with them or are continually tricked by them. This is due to the subtle dance of social interactions and the release of pheromones that make the Orion endearing to whom they are dealing with, and can be used to gain their trust. An Orion adds 1 bonus Momentum to their pool when they have successfully completed a task to win a target’s trust.",
                [new SourcePrerequisite(Source.ShackletonExpanse, Source.Core2ndEdition), new SpeciesPrerequisite(Species.Orion, true)],
                1,
                "Orion"),
            new TalentModel(
                "Criminal Understanding",
                "Orion culture is based around understanding the complicated meanings behind words and plans. They do not take things at face value but look to see the underlying scheme going on behind the scenes, whether it is noticing a word that was omitted from a contract agreement to understanding how a pickpocket slipped a watch off their victim’s wrist. When trying to understand a matter involving intrigue or guile, an Orion may roll an additional d20 when attempting to decipher the hidden meaning behind the action.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new SpeciesPrerequisite(Species.Orion, true)],
                1,
                "Orion"),
            new TalentModel(
                "Mental Imaging",
                "You can envision complicated technology and project the details forward, yielding results with the accuracy of real-world testing. Provided with a schematic or the time to inspect an unfamiliar device, you can quickly determine its use and any necessary repairs. This also makes you an excellent game player; imagine multiple choices and follow their consequences along branching paths to develop the best response. When you attempt a task involving Reason, you may re-roll one d20. In addition, when you succeed at a Reason-based task which is subject to time pressure, the Momentum cost to reduce the time taken is reduced by 1.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.Qofuari, true)],
                1,
                "Qofuari"),
            new TalentModel(
                "Nimble",
                "Your long, flexible body makes you an excellent swimmer. You can move rapidly and acrobatically on land. Maneuvering and climbing in cramped spaces tubes is easier for you than humanoids evolved for fully upright walking. When you attempt a Fitness test to maneuver through water, within a tight space, or when climbing, gain one additional d20 in your dice pool.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.Qofuari, true)],
                1,
                "Qofuari"),
            new TalentModel(
                "Silent Scream",
                "The VinShari’s bone collars allow them to attenuate their vocal cords to achieve harmonic resonance in a silent scream that can cause pain, unconsciousness, and death. Two or more VinShari harmonizing together can shatter bone. The silent scream can be used as a ranged weapon (2d, Area and Piercing 1 effects). Other VinShari with this talent may assist these attacks, and each VinShari providing assistance increases the Stress inflicted by 1[D].",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.VinShari, true)],
                1,
                "VinShari"),
            new TalentModel(
                "Vocal Gymnastics",
                "VinShari are among the best singers in the Shackleton Expanse, perhaps even the Beta Quadrant. They are also experts at ventriloquism and mimicking voices. A VinShari with this talent can mimic any voice they have heard, and most non-vocal sounds they hear, accurate to a degree where even a computer analysis cannot distinguish the mimicry from the real thing. When you attempt to distract or deceive someone using this mimicry, you may re-roll your entire dice pool.",
                [new SourcePrerequisite(Source.ShackletonExpanse), new EraPrerequisite(Era.NextGeneration), new SpeciesPrerequisite(Species.VinShari, true)],
                1,
                "VinShari"),
            new TalentModel(
                "Looking for a Fight",
                "Many members of the permanently calcified Lo’Kari faction will look for any excuse to start a fight with the sea-dwelling I’Qosa. During the first round of any combat against sea dwellers, the character may ignore the normal cost to Retain the Initiative.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.IQosa, true)],
                1,
                "I’Qosa"),
            new TalentModel(
                "Waters of Renewal",
                "The waters of I’Qosa nourish and restore the inhabitants of the planet. While in the waters of their homeworld, the character recovers 2 Stress at the start of each round, up to the character’s normal maximum Stress.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.IQosa, true)],
                1,
                "I’Qosa"),
            new TalentModel(
                "Zero-G Swimmer",
                "I’Qosa are experts at moving both in underwater and zero-gravity environments due to their natural aquatic habitat. The character receives a bonus d20 on any task related to swimming or zero-g maneuvering.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.IQosa, true)],
                1,
                "I’Qosa"),
            new TalentModel(
                "Campaign Fatigue",
                "The constant churn of the election cycle on Sigma Iotia II has made most Iotians experts at sniffing our liars and frauds. Whenever the character attempts a task to resist being deceived, they add a bonus d20 to their dice pool.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.Iotian, true)],
                1,
                "Iotian"),
            new TalentModel(
                "Imitative",
                "Iotians study and quickly adopt the technology of alien species. When the character attempts a task using Reason to discern the purpose of or to reverse-engineer a piece of alien technology, reduce the Difficulty by 1, to a minimum of 0.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.Iotian, true)],
                1,
                "Iotian"),
            new TalentModel(
                "Crystalline Telepathy",
                "Tholian exoskeletons can emit and detect specific forms of radiation capable of transmitting messages over short distances. This ability acts as a form of physical telepathy among the Tholian species, allowing them to communicate over limited distances.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.Tholian, true)],
                1,
                "Tholian"),
            new TalentModel(
                "Immune to Vacuum",
                "Some Tholians can spend extended periods of time exposed to vacuum without suffering any ill effects, allowing them, for instance, to scale the strands of Tholian webs without the protection of EV suits. This immunity usually only lasts a single scene before vacuum starts causing complications or injuries.",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.Tholian, true)],
                1,
                "Tholian"),
            new TalentModel(
                "Radiation Burst",
                "Some Tholians can channel radiation into intense bursts that act as a ranged weapon in combat (3[D], Vicious 1 damage effect).",
                [new SourcePrerequisite(Source.IdwYearFive), new SpeciesPrerequisite(Species.Tholian, true)],
                1,
                "Tholian"),
            new TalentModel(
                "Duplicate",
                "As long as you, the Player, are constantly eating from a large stash of food, once per Scene you may duplicate yourself. Photocopy your character sheet and hand it to another Player at the table. They too are now a tribble. Once everyone at the table, including the Gamemaster becomes a tribble, the session ends.",
                [new SourcePrerequisite(Source.TribblePlayerCharacter), new SpeciesPrerequisite(Species.Tribble, true)],
                1,
                "Tribble"),
            new TalentModel(
                "Soothe",
                "You may attempt to help a character recover Stress. To do this you must attempt to replicate the calming purr of a tribble for at least 30 seconds. If successful, the target character recovers 1 point of Stress, plus an additional point per Momentum spent.",
                [new SourcePrerequisite(Source.TribblePlayerCharacter), new SpeciesPrerequisite(Species.Tribble, true)],
                1,
                "Tribble"),
            new TalentModel(
                "Klingons",
                "Your Gamemaster must tell you if a Klingon character enters into Close range with you. Upon being told this, you must shriek loudly and shudder until you are told the character has backed away out of Close range. A Klingon character must attempt a Control + Command Task with a Difficulty of 3 when hearing this shriek, or you inflict 2 A of damage. You may attempt an Insight + Command Task to detect Klingons at further ranges.",
                [new SourcePrerequisite(Source.TribblePlayerCharacter), new SpeciesPrerequisite(Species.Tribble, true)],
                1,
                "Tribble"),
            new TalentModel(
                "Threat Ganglia",
                "Kelpiens have special organs on the back of their heads called ganglia. These organs do different things depending on what stage of life the Kelpien is in, as such, this talent grants different abilities based on the character’s Vahar’ai trait. Pre-Vahar’ai: When the gamemaster spends Threat to either add a complication, or to add dice to a pool or that directly affects the character, roll 1[D]; if an effect is rolled, add 1 Momentum to the pool. Post-Vahar’ai: The character gains the following attack: Ganglia Dart (Ranged, 2[D], Piercing 1). The character’s Security is added as normal to the attack’s Stress rating.",
                [new SourcePrerequisite(Source.DiscoveryS1S2, Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Kelpien, true)],
                1,
                "Kelpian", false, new AliasModel("Ganglia", Source.DiscoveryS1S2)),
            new TalentModel(
                "On All Fours",
                "Kelpiens are able to run at considerable speeds for short bursts when necessary. Whenever the character succeeds at a Sprint task, they generate 2 additional Momentum which may only be used to move additional zones.",
                [new SourcePrerequisite(Source.DiscoveryS1S2, Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Kelpien, true)],
                1,
                Species[Species.Kelpien]),
            new TalentModel(
                "Expert Quartermaster",
                "The Barzan have long had to make do with less, and this has taught them to be especially considerate of all resources at their command. When needing a rare element or device to accomplish an action, a Barzan may reroll a d20 in their task roll to determine if another element or device can be used in its stead. The Barzan are also aware of most of the alternate uses any piece of personal equipment they possess can do should the need arise, such as substituting a tricorder’s memory module to repair a terminal.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Barzan, true)],
                1,
                Species[Species.Barzan]),
            new TalentModel(
                "Unyielding Resolve",
                "The Barzan possess such great determination in accomplishing their tasks that they refuse to let any setback deter them. When a Barzan spends a point of Determination on a task, but the task fails, the character regains the spent point of Determination.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Barzan, true)],
                1,
                Species[Species.Barzan]),
            new TalentModel(
                "Born to a Task",
                "The Osnullus caste system is a relic from a bygone age but it still affects the futures of many of their species. Some Osnullus are born with advanced reflexes for working in space, while others have a hardier carapace to assist them with construction. Over time, an Osnullus can shift their bodies slightly to assist them with certain tasks. When this talent is chosen, the Osnullus may pick a discipline that they are gifted toward. Whenever the character attempts a task involving this talent, they may reroll one of their d20s.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Osnullus, true)],
                1,
                Species[Species.Osnullus]),
            new TalentModel(
                "Unreadable Face",
                "While their fellow Osnullus can tell what each other are thinking by looking at each other’s faces, it is more difficult for other species to do so. This natural trait gives them an advantage when it comes to treachery and deceit. The Osnullus may roll an additional d20 for the purposes of trying to mislead or lie to another species.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Osnullus, true)],
                1,
                Species[Species.Osnullus]),
            new TalentModel(
                "Discerning Scientific Mind",
                "Xahean culture allows them to discern scientific phenomena quickly and inspires them in how to replicate it. When a Xahean is attempting to perform an extended task to determine the purpose of a piece of technology, they may re-roll any number of [D] the first time they roll to determine progress.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Xahean, true)],
                1,
                Species[Species.Xahean]),
            new TalentModel(
                "Camouflage Field",
                "While most Xaheans can generate a limited camouflage field to obscure their presence, training and practice can heighten this ability further. The Xahean may spend 2 Momentum (Immediate) as a minor action to become virtually invisible, adding +2 to the Difficulty of all tasks to observe, locate, or target the Xahean. This effect ends when the Xahean makes an attack, takes a minor action to end the effect, or otherwise loses concentration. This ability is taxing to maintain, and each additional time during a scene it is used increases the Momentum cost by 1; this increase is cumulative.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Xahean, true)],
                1,
                Species[Species.Xahean]),
            new TalentModel(
                "Enhanced Metabolism",
                "Saurian biology allows them to process toxins at a much higher rate than other species. A Saurian is capable of recovering from the effects of a toxin in half the time as other species, and may reroll one d20 in any task to determine if they can resist the effects of toxic substances introduced to their body.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Saurian, true)],
                1,
                Species[Species.Saurian]),
            new TalentModel(
                "Hunter’s Senses",
                "Due to their natural gifted senses of smell and sight, a Saurian can detect minute pheromone signatures, and can see into the infrared portion of the EM spectrum. With practice, they can hone these senses into a superlative tracking skill. When a Saurian attempts to determine the presence of hidden creatures, or attempts a task to track a creature which has passed through an area within the last 24 hours, reduce the Difficulty by 2. If this is part of an extended task, then the Saurian also rolls +2[D] when determining progress on the Work track.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.Saurian, true)],
                1,
                Species[Species.Saurian]),
            new TalentModel(
                "Synthetic Physiology",
                "Some injuries suffered by organic beings require extensive augmentations and improvements of an individual’s body. Some of these improvements leave the Cybernetically Enhanced possessing physical abilities superior to their original capabilities, and allow them to achieve feats well beyond what they once could. The Cybernetically Enhanced increases their Resistance by 1 against non-lethal attacks. The Cybernetically Enhanced may also spend 2 Momentum (Immediate) to re-roll a single die for any task involving Fitness.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.CyberneticallyEnhanced, true)],
                1,
                "Cybernetically Enhanced"),
            new TalentModel(
                "Analytical Recall",
                "Some Cybernetically Enhanced find themselves able to recall information faster than they used to and are able to process crucial details to a greater degree. Three times per session, a Cybernetically Enhanced individual may ask the gamemaster for more information regarding data they have recorded or situations they have personally seen, as if they had spent a point of Momentum to Obtain Information.",
                [new SourcePrerequisite(Source.DiscoveryCampaign), new SpeciesPrerequisite(Species.CyberneticallyEnhanced, true)],
                1,
                "Cybernetically Enhanced"),
            new TalentModel(
                "Guile and Cunning",
                "Secrecy is as natural as breathing for you. When you attempt to remain hidden or for your actions to remain unnoticed, you may add 1 to Threat in order to increase the Difficulty of a task to detect you or discern the true nature of your actions.",
                [new SourcePrerequisite(Source.PicardS1, Source.Core2ndEdition), new SpeciesPrerequisite(Species.Romulan, true)],
                1,
                "Romulan"),
            new TalentModel(
                "Wary",
                "Danger can come from any quarter, and you will not be caught off-guard. When you attempt a task to notice or detect an enemy or hazard, you may reroll one d20.",
                [new SourcePrerequisite(Source.PicardS1, Source.Core2ndEdition), new SpeciesPrerequisite(Species.Romulan, true)],
                1,
                "Romulan"),
            new TalentModel(
                "Residual Strange Energies",
                "The Ancient Ones’ strange energies that have permeated the planet have morphed your genetics, giving you the ability to change objects into other things. Once per mission, you may turn one non-living, simple object into another. Both objects must be able to be held in your hand.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Apergosian, true)],
                1,
                "Apergosian"),
            new TalentModel(
                "Number Sense",
                "You have a mastery of what numbers mean, not just mathematically, but philosophically too. Whenever you attempt a task without using a computer that involves analyzing numbers, you may reduce the Difficulty by 1.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Apergosian, true)],
                1,
                "Apergosian"),
            new TalentModel(
                "Three-Dimensional Thinking",
                "You possess a knack for navigating which terrestrial species tend to lack, and can easily lend this grasp of maneuverability to starship piloting. When you attempt a task utilizing your Conn discipline, the complication range associated with that task is always considered to be one less (2 instead of 3, 0 instead of 1 and so on).",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Cetacean, true)],
                1,
                "Cetacean"),
            new TalentModel(
                "Song of the Ocean",
                "Your bio-sonar capabilities allow for communication across great distances. Even without technological assistance, you may freely communicate with any other species which possesses bio-sonar sensory communication, even across the vacuum of space, up to a distance of 100 kilometers.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Cetacean, true)],
                1,
                "Cetacean"),
            new TalentModel(
                "Thickened Carapace",
                "You have been bred to have an exoskeleton that can absorb tremendous force. This selective breeding process is typically used to create new warriors. Your Resistance is increased to 2.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Clicket, true)],
                1,
                "Clicket"),
            new TalentModel(
                "Communication Pheromones",
                "While all Clickets can communicate using clicks from their mouthparts, some have evolved a secondary ability to communicate using scent. These pheromones are subtle and usually require antennae structures for biological organisms to recognize. The Difficulty of tasks to understand this language is increased by 1 unless there is an organism with antennae performing the task.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Clicket, true)],
                1,
                "Clicket"),
            new TalentModel(
                "Enhanced Thrusters",
                "Many Exocomps have been known to create structural upgrades to themselves to help be better at the job they are assigned to. Often this can take the form of more efficient and powerful thrusters to increase their maneuverability and flight duration. You may reduce the Difficulty of tasks to avoid falling or floating debris by 1.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Exocomp, true)],
                1,
                "Exocomp"),
            new TalentModel(
                "Extra Power Supply",
                "Some Exocomps install an additional power supply in order to accomplish multiple tasks at the same time. You may ignore the opportunity cost of up to three pieces of equipment per scene.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Exocomp, true)],
                1,
                "Exocomp"),
            new TalentModel(
                "Carnivorous Reptilian Physiology",
                "You tower over most other humanoid species, and possess thick armored skin, dense muscles and bones, and razor-sharp teeth and talons. You have a Resistance of 2, and your unarmed attacks lose the Non-Lethal quality and gain Vicious 1 instead. Gorn characters must select this talent during character creation.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Gorn, true)],
                1,
                "Gorn"),
            new TalentModel(
                "Throw Anything",
                "When a Gorn with extreme might gets into a fight, anything can be a weapon as long as it isn’t too heavy or bolted down. Once per combat encounter, you can make the following attack if a sufficient-sized object is in your zone: Thrown Object: 3[D] + Security, Knockdown.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Gorn, true), new AttributePrerequisite(Attribute.Fitness, 10)],
                1,
                "Gorn"),
            new TalentModel(
                "Gorn Royal Bloodline",
                "The blood of the royal family runs through your veins. When dealing with social conflicts involving Gorn politics, you are considered to have the Gorn Royal Family advantage.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Gorn, true)],
                1,
                "Gorn"),
            new TalentModel(
                "Resolution-Bound",
                "From birth, you were taught the societal importance of The Resolution. You embrace the idea and use it as a guide for planning your life’s work. This dedication to your plan means you will do whatever it takes to ensure your legacy is fulfilled before The Resolution. Whenever you cite a value connected to your legacy and spend a point of Determination on Perfect Opportunity, you may also reroll one dice from that pool.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Kaelon, true)],
                1,
                "Kaelon"),
            new TalentModel(
                "Evolved Telebellum",
                "Over time, the telebellum of some Kaelons has become a much more powerful defense against psychic probes. In addition to being immune to telepathic and empathic reading, you know exactly who attempted to read you and where that person is located.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Kaelon, true)],
                1,
                "Kaelon"),
            new TalentModel(
                "Make It Go",
                "You are great at patching things up and fixing them regardless of the difficulties the solution may cause later. When attempting an Engineering task, you may increase the complication range by 1 or more. If you do, you may reduce the Difficulty of the task by 1, to a minimum of 1 for each complication range increase you make.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Pakled, true)],
                1,
                "Pakled"),
            new TalentModel(
                "Too Stubborn to Die",
                "Your body is capable of shrugging off even the most debilitating injuries. If you would be killed, you may spend 1 point of Determination to remain alive but injured.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Pakled, true)],
                1,
                "Pakled"),
            new TalentModel(
                "Learn From the Past",
                "Tamarians use stories from the past and mythology to teach lessons about the future. You are exceptionally adept at remembering the stories of your people’s past. When you succeed at a task to recall events you are familiar with, you generate 1 additional point of Momentum which must be spent on the Obtain Information Momentum spend.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Tamarian, true)],
                1,
                "Tamarian"),
            new TalentModel(
                "Storyteller",
                "Tamarian teachers use stories to pass on knowledge to younger children. Known as Storytellers, these Tamarians are experts at weaving body motions, words, and music into lessons that young generations will cherish and use all their lives. Once per mission, at the start of a scene with an away team, you may spend ten minutes telling your team a story from the past that is applicable to their current situation. When the story ends, you may roll 1[D] and add the result to the Momentum pool.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Tamarian, true)],
                1,
                "Tamarian"),
            new TalentModel(
                "Hyper Agile",
                "The Difficulty to hit the Kzinti in ranged combat is increased by 1.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Kzinti, false)],
                1,
                "Kzinti"),
            new TalentModel(
                "Pathfinder",
                "The Kzinti may reduce the Difficulty of tasks to navigate unknown regions of space with a ship it is piloting by 1. If they do, the complication range of the roll is increased by 1.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Kzinti, false)],
                1,
                "Kzinti"),
            new TalentModel(
                "Telepathy (Anabaj)",
                "The Anabaj can sense the surface thoughts and emotions of most living beings nearby and can communicate telepathically with other empaths and telepaths.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Anabaj, false)],
                1,
                "Anabaj"),
            new TalentModel(
                "Embed Egg",
                "As an action, a female Anabaj may embed its eggs in another humanoid’s throat. This action may only be performed if the humanoid is unconscious. The eggs require a Difficulty 3 Control + Medicine task to be removed safely.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Anabaj, false)],
                1,
                "Anabaj"),
            new TalentModel(
                "Alluring Vision",
                "The Anabaj looks like a humanoid species that the person observing it feels comforting. The observer may attempt a Difficulty 2 Presence + Command task to ignore this effect.",
                [new SourcePrerequisite(Source.LowerDecksCampaign), new SpeciesPrerequisite(Species.Anabaj, false)],
                1,
                "Anabaj"),
            new TalentModel(
                "Underwater Acrobat",
                "While maneuvering in underwater environments, an Aquan with this talent can use a minor action to move to any zone within long range instead of medium and ignore any Difficulty increases associated with underwater terrain.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Aquan, true)],
                1,
                "Aquan"),
            new TalentModel(
                "Aquatic Mutation",
                "The Aquans can transform specimens of most humanoid species into water breathers through surgically induced mutations. An Aquan with this talent can perform the necessary procedure on any humanoid character with a Difficulty 1 Reason + Medicine task, so long as they are able to access the appropriate medical facilities. The procedure takes several hours to complete and can be reversed if the subject is given the appropriate reversal formula.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Aquan, true), new DisciplinePrerequisite(Skill.Medicine, 3)],
                1,
                "Aquan"),
            new TalentModel(
                "Cat-Like Reflexes",
                "The feline nature of the Kzinti grants them heightened reflexes, agility, and balance. Reduce the Difficulty of any non-combat task that relies on precise body control and physical agility by 1 to a minimum of 0.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Kzinti, false)],
                1,
                "Kzinti"),
            new TalentModel(
                "Applied Force",
                "Kzinti are predators who instinctually know how to apply their size and strength in a fight. When making a melee attack, a character with this talent can use Fitness instead of Daring. In addition, add 1[D] to the Stress rating of unarmed attacks or 2[D] if the character’s Fitness is 11 or higher.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Kzinti, false)],
                1,
                "Kzinti"),
            new TalentModel(
                "Telepath (Kzinti)",
                "Some Kzinti have telepathic abilities, though they can be mentally taxing to use. A character with this talent can sense the surface thoughts and emotions of most living beings nearby. Surface thoughts are whatever a character is thinking or feeling at that precise moment. It will require effort and a task to search another character’s mind for specific information or memories. Unwilling targets can resist with an opposed task. If a Kzinti fails a task attempting to probe the mind of another character, the strain temporarily overwhelms them, and they cannot access their telepathic abilities for the remainder of the scene.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Kzinti, true)],
                1,
                "Kzinti"),
            new TalentModel(
                "Triple Threat",
                "The individual organisms that comprise a Pandronian are largely autonomous and can separate from one another. A character with this talent can spend 1 Momentum to cause a component organism to separate from the others and send the disassembled organism to a different location.\n\nIn this manner, the character can participate in scenes taking place in up to three different locations simultaneously, at a cost of 1 Momentum per component organism. Each individual component organism uses the character’s full game statistics, talents, and abilities. However, the character can attempt only one task per turn in combat, as usual. Each component organism does not get its own turn in combat. In non- combat situations or in scenes that don’t involve strict time limits, the component organisms can attempt tasks separately at the gamemaster’s discretion.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Pandronian, false)],
                1,
                "Pandronian"),
            new TalentModel(
                "Colony Creature",
                "Because the individual organisms that make up a colony creature are largely autonomous, it’s possible for one component organism to assist another component organism on a task. This ability can be used only once per scene.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Pandronian, false)],
                1,
                "Pandronian"),
            new TalentModel(
                "Toxic Familiarity",
                "The Phylosians’ advanced scientific capabilities, combined with their unique physiology, have made many members of their species experts at detecting and counteracting environmental toxins. Whenever a character with this talent attempts a task to diagnose a toxic substance or to develop a treatment or antidote to counteract a toxin’s effects, reduce the Difficulty of the task by 1 to a minimum of 0.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Phylosian, false)],
                1,
                "Phylosian"),
            new TalentModel(
                "Omnidirectional Vision",
                "Phylosians’ eyes rest on stalks that can be moved in any direction around their heads. This ability grants them a much wider range of vision than most humanoid species. Any time a character with this talent attempts a task to detect nearby activity using their eyesight, add one bonus d20 to the roll.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Phylosian, false)],
                1,
                "Phylosian"),
            new TalentModel(
                "Reconnaissance Flight",
                "Skorr have sharp senses that allow them to scout an area quickly from above. A character with this talent can spend 2 Momentum to take flight and conduct an aerial search that reveals any visible threats within long range. This talent relies on the ability of the character to gain sufficient altitude to get a bird’s-eye view of the terrain and does not work in enclosed spaces.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Skorr, false)],
                1,
                "Skorr"),
            new TalentModel(
                "Talons",
                "Though a peaceful and civilized species, the Skorr were once warlike and retain sharp beaks and talons that can be used as lethal weapons. Unarmed strikes by characters with this talent have the Vicious 1 Damage effect and Deadly quality.",
                [new SourcePrerequisite(Source.AnimatedSeries), new SpeciesPrerequisite(Species.Skorr, true)],
                1,
                "Skorr"),
            new TalentModel(
                "Acute Senses",
                "The Aenar have honed their senses to the point that they are able to respond to stimuli just as well as, if not superior to, those who possess the ability to see. When attempting a task to detect something which is hidden from conventional senses, or which would normally be difficult to perceive, the Aenar may re-roll one d20.",
                [new SourcePrerequisite(Source.FederationKlingonWar, Source.Core2ndEdition), new SpeciesPrerequisite(Species.Aenar, true)],
                1,
                "Aenar"),
            new TalentModel(
                "Chosen Speaker",
                "Among Aenar communities, leaders and mediators are chosen as and when the need arises, nominating an individual to serve as Speaker. You've been chosen for this role often, and are adept at using your senses and your telepathy to aid communication. When attempting a task to communicate telepathically with a willing being, you may re-roll 1d20.",
                [new SourcePrerequisite(Source.FederationKlingonWar, Source.Core2ndEdition), new SpeciesPrerequisite(Species.Aenar, true, false)],
                1,
                "Aenar"),
            new TalentModel(
                "Immense Self-Discipline",
                "Arcadians are renowned for their ability to maintain control of their emotions and are extraordinarily hard to goad into taking violent action. Any task to provoke, anger, or compel an Arcadian to take aggressive action increases in Difficulty by 2. However, an Arcadian must add 1 to Threat in order to make an attack against an enemy during combat.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Arcadian, true)],
                1,
                "Arcadian"),
            new TalentModel(
                "Rapid Data Assimilation",
                "The Arcadian’s genetic makeup allows them to absorb massive amounts of data and apply it quickly. When the Arcadian succeeds at a task as part of a timed challenge or timed task, the Momentum cost to reduce the number of Intervals taken is reduced by 1. Further, if the task is failed, the Arcadian may reduce the number of Intervals taken by 1 by adding 1 to Threat.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Arcadian, true)],
                1,
                "Arcadian"),
            new TalentModel(
                "Rapid Data Assimilation",
                "The Arcadian’s genetic makeup allows them to absorb massive amounts of data and apply it quickly. When the Arcadian succeeds at a task as part of a timed challenge or timed task, the Momentum cost to reduce the number of Intervals taken is reduced by 1. Further, if the task is failed, the Arcadian may reduce the number of Intervals taken by 1 by adding 1 to Threat.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Arcadian, false)],
                1,
                "Arcadian"),
            new TalentModel(
                "Powerful Frame",
                "Ariolo possess a dense musculature and powerful limbs that allow them to run for extended periods of time and allow them to lift heavy objects with ease. They receive one free d20 when attempting to perform a task involving physical labor.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Ariolo, true)],
                1,
                "Ariolo"),
            new TalentModel(
                "All in Due Time",
                "The passage of time is meaningless to the Ariolo, who believe that stressing over tense situations will only lead to making mistakes. The character may reduce the Difficulty of a task they attempt involving Presence or Control by 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Ariolo, true)],
                1,
                "Ariolo"),
            new TalentModel(
                "Verbal Warfare",
                "Engaging in debate is one of the highest forms of expression in Betelgeusian culture, and a Betelgeusian who deigns to engage someone in argument is considered to be giving them a great gift. During an opposed task in a social conflict, Betelgeusians gain 1 bonus Momentum so long as they succeed at their task.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Betelgeusian, true)],
                1,
                "Betelgeusian"),
            new TalentModel(
                "Strength of the Elders",
                "Betelgeusians are descended from predators who used speed and ferocity to overwhelm their prey. In modern times a Betelgeusian can enter a mental state where they strike their opponent viciously in order to defeat them quickly. A Betelgeusian may use Fitness + Security rather than Daring + Security to make melee attacks. In addition, they inflict +1[D] Stress with any successful melee attack.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Betelgeusian, false)],
                1,
                "Betelgeusian"),
            new TalentModel(
                "Intention Detector",
                "Years of weathering betrayal and manipulation by others has given the Coridanites a strong sense of knowing when they are being misled. The Coridanite may use the higher of their Insight or Presence during a task to determine if someone is lying or attempting to mislead them.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Coridanite, true)],
                1,
                "Coridanite"),
            new TalentModel(
                "Radiation Resistant Anatomy",
                "Coridanites hail from a world where dilithium and certain radioactive elements are common and their biology has compensated for high levels of particles in the atmosphere. When suffering Stress from radiation, halve the total Stress suffered (rounded down), to a minimum of 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Coridanite, false)],
                1,
                "Coridanite"),
            new TalentModel(
                "Thick Skin",
                "The insults and jabs of others mean little to Megarites, who have mastered the ability to take praise in their own achievements. If a Megarite is successful in a task against someone trying to manipulate them emotionally, they may ignore all subsequent attempts by their opponent for the remainder of the scene.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Megarite, true)],
                1,
                "Megarite"),
            new TalentModel(
                "Master of Aquatic Engineering",
                "The Megarites’ homeworld necessitated not only being able to build their settlements along the coasts but also being able to withstand devastating tidal waves and impacts by glaciers. This has allowed them to develop their aquatic engineering skills to the point they are praised by other species, leading to Megarites often being employed as consultants. When attempting a task involving aquatic engineering, the Megaritie may reroll a d20.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Megarite, true)],
                1,
                "Megarite"),



            // Unofficial
            new TalentModel(
                "Trained from Birth",
                "When you make a Security task, you ignore the 1st complication rolled. In addition, if you are making an opposed task using Security, you generate 1 Momentum for each complication your opponent suffers. Bonus Momentum may not be saved.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Talarian, false)],
                1,
                "Talarian"),
            new TalentModel(
                "Talarian Cruelty",
                "You are cruel & have a reputation to match it. When you attempt a Task to identify the weaknesses or flaws of an enemy you reduce Difficulty by 1. If the enemy has a trait which reflects this weakness, you may re-roll a single d20 on the next attack or persuasion Task you attempt vs them.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Talarian, false)],
                1,
                "Talarian"),
            new TalentModel(
                "The B'Nar",
                "A Talarian will perform The B'Nar when in mourning or cut off from other Talarians. After they have made the B'Nar for a length of time equivalient to their Fitness score, they immediately regain all Stress points. Also, making the B'Nar is so enheartening to a Talarian that they gain 1d20 to Control or Fitness rolls",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Talarian, false)],
                1,
                "Talarian"),
            new TalentModel(
                "Telepathic Interference",
                "Your skills at telepathy can interfere with the ability of others to read minds, send telepathic signals, or sense thoughts and emotions. As a Minor Action, you can shield the minds of others, preventing the detection of surface thoughts and emotions, as well as blocking telepathic communication. Attempts to push past your block is an Opposed Task. Additionally, you can assist other creatures in resisting having their mind read.",
                [new SourcePrerequisite(Source.ContinuingMissions), new NotSourcePrerequisite(Source.FederationKlingonWar), new SpeciesPrerequisite(Species.Aenar, true)],
                1,
                "Aenar"),
            new TalentModel(
                "Networked",
                "You are connected to either the Bynar master system or your ship’s mainframe. Provided the computer is in communication range and there is no interference, that computer can assist you on Tasks where its Communication, Computer, or Sensor Systems would apply to the Task.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Bynar, true)],
                1,
                "Bynar"),
            new TalentModel(
                "Paired",
                "You are genetically paired to another Bynar on the crew. This Bynar is a support character that does not count against your Crew Support for the mission. Once per scene, you can use their Disciplines on a Reason or Insight roll in place of your own.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Bynar, false)],
                1,
                "Bynar"),
            new TalentModel(
                "Unpaired",
                "Your genetic pair is dead or is otherwise unavailable, and can’t be replaced during your current mission or deployment. Mentally alone, you are compulsively driven to aid others. When you assist another character with a Task, one d20 related to that Task can be re- rolled.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Bynar, false)],
                1,
                "Bynar"),
            new TalentModel(
                "The Long View",
                "Due to their extremely long lifespans, El-Aurians come to understand and gain knowledge more extensively that most other individuals. When a character with this Talent uses a Milestone to exchange a Focus, they may do so twice instead of once.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.ElAurian, true)],
                1,
                "El-Aurian"),
            new TalentModel(
                "Temporal Awareness",
                "One hundred and fifty El-Aurian refugees who were aboard the SS Lakul in 2293 became caught in the Nexus. For them it was akin to “being inside joy”. Forty-Seven of these refugees were “yanked out” by the USS Enterprise-B, leaving a temporal “echo” of themselves behind within the Nexus that exists outside of all of time. These El-Aurians are still connected to their “echoes” granting them an awareness of manipulations made to the time-space continuum. Any alterations to the natural flow of time leaves the El-Aurian with this talent with a nagging “feeling” that something is just not right, or is fundamentally “off”. The Gamemaster secretly makes a Difficulty 0 Insight + Science Task check for the player. If the Task fails the player is oblivious to the changes. On one success, the El-Aurian knows something is wrong, but not exactly what it is. For each success past the first, the Gamemaster may give the player brief hints as the character begins to remember brief impulses of “how things should be”. Additionally, the player may spend a point of Momentum to remember a specific fact about the former timeline.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.ElAurian, true)],
                1,
                "El-Aurian"),
            new TalentModel(
                "Listener",
                "You know how to subtly use your empathic skills to discern not only what is being said but also what is being unsaid. This allows you to tell someone exactly what they needs to hear. When you attempt a Task to advise or convince someone into taking or refraining from a specific course of action, you may add a bonus d20",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.ElAurian, true)],
                1,
                "El-Aurian"),
            new TalentModel(
                "Wisdom of Years",
                "You have many decades if not several centuries of experiences to draw upon. You may have one additional Value and Focus, reflecting the insights you received from your long life",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.ElAurian, true)],
                1,
                "El-Aurian"),
            new TalentModel(
                "Mind for Information",
                "You have a gift for processing information and retaining it. When you attempt a Task to organize information or recall it, you may add a bonus d20 to your dice pool.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Yridian, true)],
                1,
                "Yridian"),
            new TalentModel(
                "Scavenger Instinct",
                "Your Yridian evolutionary ancestors were scavengers, which gives you an instinct for searching, as well as furtive skills such as spying, burglary, and smuggling. When you attempt a Task where non-detection or searching is an asset, and you add a d20 to your dice pool by adding to Threat, you may re-roll two d20s.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Yridian, false)],
                1,
                "Yridian"),
            new TalentModel(
                "Vow of Silence",
                "You are intensely loyal and have taken a vow of silence and will only speak to your direct superior. Whenever you attempt to resist efforts to make you speak or betray your employer’s trust, reduce the Difficulty of the Task by two.",
                [new SourcePrerequisite(Source.ContinuingMissions), new SpeciesPrerequisite(Species.Hupyrian, true)],
                1,
                "Hupyrian"),
            new TalentModel(
                "Dolbargy Healing Trance",
                "You have learned the technique of inducing a voluntary deep coma that simulates death. Entering the trance is a Control+Medicine Task. Choose a Difficulty of 1, 2, or 3. Success means that any attempt to detect your vital signs must increase the Difficulty of that task by an amount equal to the Difficulty you chose. While in this trance, you may listen but do nothing else. Gain a temporary Trait: Appears Dead that lasts until you wake up. To wake from the trance is a Control+Medicine Task at Difficulty 1.",
                [new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(true, Species.Hupyrian, Species.Ferengi)],
                1,
                "Hupyrian/Ferengi"),
            new TalentModel(
                "Extra Arms",
                "You know how to use your twin sets of arms with coordination and efficiency. On your turn, you can take an additional Minor Action, which can only be used for the Draw Item or Interact Minor Actions. Additionally, you add the Vicious 1 effect to your Unarmed Strike.",
                [new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(true, Species.Tzenkethi)],
                1,
                "Tzenkethi"),
            new TalentModel(
                "Technological Savvy",
                "You were taught at a young age about robotics and machinery. When you perform or assist with a Task where knowledge of robotics or machines would help, you may re- roll a d20.",
                [new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(true, Species.Tiburonian)],
                1,
                "Tiburonian"),
            new TalentModel(
                "Tiburonian Charm",
                "You are able to bring out the best in people with your natural charisma. If you assist someone with your Presence Attribute, if they succeed at the assisted Task, add an extra point of Momentum.",
                [new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(true, Species.Tiburonian)],
                1,
                "Tiburonian"),


            // Careers
            new TalentModel(
                "Untapped Potential",
                "The character is inexperienced, but talented and with a bright future in Starfleet. The character may not have or increase any Attribute above 11, or any Discipline above 4 while they have this Talent (and may have to adjust Attributes and Disciplines accordingly at the end of character creation). Whenever the character succeeds at a Task for which they bought one or more additional dice with either Momentum or Threat, they may roll 1[D]. The character receives bonus Momentum equal to the roll, and adds one point to Threat if an Effect is rolled. The character cannot gain any higher rank than lieutenant (junior grade) while they possess this Talent.",
                [new CareersPrerequisite(Career.Young)],
                1,
                "Career"),
            new TalentModel(
                "Veteran",
                "The character is wise and experienced, and draws upon inner reserves of willpower and determination in a more measured and considered way. Whenever the character spends a point of Determination, roll 1[D]. If an Effect is rolled, immediately regain that spent point of Determination. The character has a rank of at least Lieutenant Commander.",
                [new CareersPrerequisite(Career.Veteran)],
                1,
                "Career"),
            // Other
            new TalentModel(
                "Bold: Command",
                "Whenever you attempt a Task with Command, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Command"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Bold: Conn",
                "Whenever you attempt a Task with Conn, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Conn"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Bold: Engineering",
                "Whenever you attempt a Task with Engineering, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Engineering"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Bold: Security",
                "Whenever you attempt a Task with Security, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Security"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Bold: Science",
                "Whenever you attempt a Task with Science, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Science"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Bold: Medicine",
                "Whenever you attempt a Task with Medicine, and you buy one or more d20s by adding to Threat, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Cautious: Medicine"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Command",
                "Whenever you attempt a Task with Command, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Command"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Conn",
                "Whenever you attempt a Task with Conn, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Conn"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Engineering",
                "Whenever you attempt a Task with Engineering, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Engineering"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Security",
                "Whenever you attempt a Task with Security, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Security"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Science",
                "Whenever you attempt a Task with Science, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Science"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Cautious: Medicine",
                "Whenever you attempt a Task with Medicine, and you buy one or more d20s by spending Momentum, you may re-roll a single d20.",
                [new NotTalentPrerequisite("Bold: Medicine"), new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Command",
                "Whenever an ally attempts a Task using Command, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Conn",
                "Whenever an ally attempts a Task using Conn, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Engineering",
                "Whenever an ally attempts a Task using Engineering, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Security",
                "Whenever an ally attempts a Task using Security, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Science",
                "Whenever an ally attempts a Task using Science, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Collaboration: Medicine",
                "Whenever an ally attempts a Task using Medicine, you may spend one Momentum (Immediate) to allow them to use your score for that Discipline, and one of your Focuses.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Constantly Watching",
                "When you attempt a Task to detect danger or hidden enemies, reduce the Difficulty by 1.",
                [],
                1,
                "General"),
            new TalentModel(
                "Dauntless",
                "Whenever you attempt a Task to resist being intimidated or threatened, you may add a bonus d20 to your dice pool.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Personal Effects",
                "The character possesses some significant and uncommon item or device which is not part of Starfleet’s standard issue, but which is nevertheless useful for missions. The character may select one item with an Opportunity Cost of 2, or two items with an Opportunity Cost of 1 each. Neither items may have an Escalation Cost greater than 1.",
                [new MainCharacterPrerequisite()],
                10,
                "General"),
            new TalentModel(
                "Studious",
                "Whenever you spend one or more Momentum to Obtain Information, you may ask one additional question (in total, not per Momentum spent on Obtain Information).",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Technical Expertise",
                "Whenever you attempt a Task assisted by the ship’s Computers or Sensors, you may re-roll one d20 (which may be the ship’s die).",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Tough",
                "Whenever you Avoid an Injury, the cost is reduced by 1, to a minimum of 1.",
                [new SourcePrerequisite(Source.Core, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Augmented Ability (Control)",
                "You gain the Extraordinary Attribute 1 special rule for the Control Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Augmented Ability (Daring)",
                "You gain the Extraordinary Attribute 1 special rule for the Daring Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Augmented Ability (Fitness)",
                "You gain the Extraordinary Attribute 1 special rule for the Fitness Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Augmented Ability (Insight)",
                "You gain the Extraordinary Attribute 1 special rule for the Insight Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Augmented Ability (Presence)",
                "You gain the Extraordinary Attribute 1 special rule for the Presence Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Augmented Ability (Reason)",
                "You gain the Extraordinary Attribute 1 special rule for the Reason Attribute. When the character uses this ability, they increase their Complication Range by 2 for that Task.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Neural Interface",
                "The character has had a cybernetic device implanted directly into their brain, allowing them to interface with computers and similar technologies with their thoughts. Initiating or breaking the link between their minds and a computer system takes a Minor Action, and while they are connected they may reroll the d20 gained from using ship’s Systems. However, any time the ship suffers a Breach the character also suffers 3[D] of Stress.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Physical Enhancement",
                "The character has some portion of their body replaced by an advanced piece of bio-mechanical hardware. This device functions exactly like its organic counterpart; however, before attempting a Task, the Character may choose to take 3[D] Stress to add a single additional d20 to their dice pool. Any Injuries caused by this damage is resolved after the effects of the Task. Multiple dice may be bought in this way, but the damage is added together (so, buying two dice inflicts 6[D] damage, and buying 3 dice inflicts 9[D] damage). These dice count towards the normal limit of bonus d20s purchased.",
                [new SourcePrerequisite(Source.SciencesDivision)],
                1,
                "Enhancement"),
            new TalentModel(
                "Sensory Replacement",
                "Due to physical injury or irreparable birth defect, the character has been forced to adopt a cybernetic device that replaces one of their sensory functions – most commonly sight or hearing. The character gains the Artificial Sense Trait, which can be used normally. In addition, when the character is using the Obtain Information Momentum spend, they may ask questions or be given information not normally available with organic senses.",
                [new SourcePrerequisite(Source.SciencesDivision, Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Back-Up Plans",
                "You have plans and contingencies which are set into motion whenever something goes awry. Whenever you or an ally fails a task, you may add 1 point to the group’s Momentum pool.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Control, 9)],
                1,
                "General"),
            new TalentModel(
                "Calm and Logical",
                "You are a highly rational individual, with a disciplined mind that can set aside your feelings to view things as objectively as possible. You may still have to deal with those feelings later, however. When you would gain a trait or complication which represents a mood or emotional state, you may immediately remove that trait by adding 1 to Threat.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Reason, 11)],
                1,
                "General"),
            new TalentModel(
                "Close-Knit Crew",
                "You and your crew have bonded through shared adversity, and you all pull together when the situation demands. When a scene begins, if there are fewer points of Momentum in the group pool than there are characters in the scene who possess this talent, immediately add 1 point of Momentum to the group pool.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new MainCharacterPrerequisite()],
                1,
                "General"),
            new TalentModel(
                "Constant Presence",
                "You’re a regular fixture of away missions and other important work, relied upon by the senior staff for your expertise and judgement. Introducing this Supporting Character in subsequent adventures no longer costs Crew Support, and the Supporting Character gains 1 Determination the first time they are used in an adventure.",
                [new SourcePrerequisite(Source.PlayersGuide), new SupportingCharacterPrerequisite()],
                1,
                "General"),
            new TalentModel(
                "Extra Effort",
                "You can push yourself to extremes to succeed, but at a cost. When you attempt a task, you may reduce the Difficulty of the task by 1, to a minimum of 0. However, once the task is completed, you reduce your maximum Stress by 2 for the remainder of the current adventure (after which you can rest sufficiently to return your maximum Stress to its normal value).",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Fitness, 9)],
                1,
                "General"),
            new TalentModel(
                "Gut Feeling",
                "You’ve learned to trust your gut when something doesn’t feel right, and your instincts are rarely wrong. When the gamemaster spends one or more Threat to introduce reinforcements or to cause a Reversal, they must spend 2 additional Threat to do so (2 extra Threat in total, not per reinforcement).",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Insight, 11)],
                1,
                "General"),
            new TalentModel(
                "Indefatigable",
                "You don’t give up, and you don’t let failure deter you. When you fail a task, and attempt that task again during the same scene, reduce the Difficulty of the second attempt (and any subsequent attempts if you still fail) by 1.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Fitness, 11)],
                1,
                "General"),
            new TalentModel(
                "Methodical Planning",
                "You have a clear path to achieving your goals and objectives, and you have a thorough understanding of what you and your allies need to do at each step. When an ally attempts a task which benefits from an advantage or other trait you created based on your plans or strategy, you may assist that ally’s task even if you are not present. In combat, this assistance does not require you to use your task to assist that ally.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Reason, 9)],
                1,
                "General"),
            new TalentModel(
                "No Hesitation",
                "You know that responding quickly to dangerous situations can be vital, so you are always the first to act. At the start of any round in an action scene, you may add 1 to Threat to take the first turn, regardless of who would otherwise have acted first.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Daring, 9)],
                1,
                "General"),
            new TalentModel(
                "No Pain, No Gain",
                "You prefer to achieve your goal first, and then deal with the consequences felt along the way. When you fail a task (but not an opposed task) which used your Daring, you may always choose to succeed at a cost.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Daring, 11)],
                1,
                "General"),
            new TalentModel(
                "Quick Survey",
                "You have a way of getting a good impression of a situation with only a moment’s observation. At the start of a scene, you may immediately ask one question, as if you had spent one Momentum on the Obtain Information Momentum spend. The answer can only provide information that you could obtain with your own senses; you cannot gain information from equipment in so short a time.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Insight, 9)],
                1,
                "General"),
            new TalentModel(
                "Reassuring",
                "Your presence is a boon to your comrades, providing them with a little extra confidence when they need it most. When you succeed at a task using your Presence, you may spend Momentum to reassure your allies, so long as they are within communication range of you. It costs 1 Momentum (Repeatable) to reassure an ally, and this effect allows them to ignore a single complication rolled. This cannot be used to ignore complications from succeeding at cost.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Presence, 9)],
                1,
                "General"),
            new TalentModel(
                "Second Wind",
                "You can sometimes draw upon deep reserves of energy and resilience when the situation becomes desperate. You may spend a point of Determination to remove all the Stress you have accumulated. The normal requirements for spending a point of Determination still apply.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Self-Reliant",
                "While you understand the value of teamwork, you’re just as capable when you’re forced to rely on your own abilities. Whenever you succeed at a task where you did not purchase additional dice by spending Momentum or adding to Threat, you generate bonus Momentum equal to the task’s Difficulty. Bonus Momentum cannot be saved.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Control, 11)],
                1,
                "General"),
            new TalentModel(
                "Voice of Authority",
                "The tone of your voice and the clarity of your words conveys that you are in control, that you are someone who should be listened to. When you assist someone, and use your Presence to do so, you may add 2 to Threat to treat your assistance die as if it had rolled a 1 instead of rolling it.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new AttributePrerequisite(Attribute.Presence, 11)],
                1,
                "General"),
            new TalentModel(
                "Well-Informed",
                "You have contacts everywhere and you listen for news and rumors from far and wide. At the start of a scene, you may add 1 to Threat to ask the gamemaster two questions about the situation or location, as if you had spent Momentum on the Obtain Information spend. The answers you receive will be knowledge you’ve gained from your contacts and the news and rumors you’ve heard.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition)],
                1,
                "General"),
            new TalentModel(
                "Extra-Sensory Perception",
                "You have an ability to perceive things beyond the normal limits of humanoid senses, allowing you to gain knowledge of people, places, and objects beyond your ability to sense them conventionally. This is known as Extra-Sensory Perception, or ESP. It is not directly under your control, but instead tends to come in the form of accurate guesses, strong feelings, or flashes of insight. Such sensitivity often leaves you vulnerable to psychic dangers as well. At any point during play, you may ask the gamemaster for hints or insights about the current situation, and the gamemaster may similarly offer you information about the current situation that you would not normally be able to determine. Each hint adds 1 point to Threat, and you may always refuse to accept the hints offered.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new GMsDiscretionPrerequisite()],
                1,
                "Esoteric"),
            new TalentModel(
                "Psychokinesis",
                "You can manipulate and control objects using only the power of the mind, an ability referred to as psychokinesis or telekinesis. You may exert a psychic force upon an object within Close range equivalent to the force that you would normally be able to exert physically, though this takes concentration and cannot be applied suddenly or violently. Greater force may be applied but requires greater effort; you may spend 1 or more Momentum (Immediate) to increase the magnitude of the force you apply, with each Momentum spent counting as an additional person’s worth of force applied (that is, you can move or manipulate objects that would take two people to move or manipulate by spending 1 Momentum). Momentum (Immediate) may also be spent to increase the range: 1 Momentum to affect objects in Medium range, 2 to affect objects at Long range, and gamemaster’s discretion for distances beyond. To apply force violently instead, add 1 point to Threat to make a Control + Security task with a Difficulty of 2 to strike an opponent, inflicting 2+Security[D] Stress with the Knockdown effect (you may apply the Grapple or Shove melee combat options instead).",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new GMsDiscretionPrerequisite()],
                1,
                "Esoteric"),
            new TalentModel(
                "Telepathic Projection",
                "Your telepathic ability is more potent than most, and you are quite accustomed to projecting your thoughts into other minds. You can send your thoughts into the minds of other creatures – other than those immune to telepathy – even if those creatures are not telepathic themselves. You can “hear” their responses by reading their minds as normal. You are also capable of using this ability offensively, overwhelming a target’s mind with pain-inducing psychic noise. This requires a Presence + Security task with a Difficulty of 2 (increasing by 1 for each range category beyond Close), and inflicting [D] Stress equal to your Presence, with the Intense effect.",
                [new SourcePrerequisite(Source.PlayersGuide, Source.Core2ndEdition), new TalentPrerequisite("Telepath", "Telepath (Ocampa)", "Telepathy (Anabaj)"),  new GMsDiscretionPrerequisite()],
                1,
                "Esoteric"),
            new TalentModel(
                "Childhood Insight",
                "The character is young, but often spots details or reaches conclusions that adults might overlook. The character may not have or increase any attribute above 10, or any discipline above 3 while they have this talent (and may have to adjust attributes and disciplines accordingly at the end of character creation). Select a single discipline, which must be rated at least 2. Whenever you attempt a task using that discipline and buy one or more dice either by spending Momentum or adding to Threat, roll one [D] for each die you bought. You generate bonus Momentum equal to the total rolled on the [D] (bonus Momentum may not be saved). You add 1 to Threat for each effect rolled.",
                [new SourcePrerequisite(Source.PlayersGuide), new ChildOnlyPrerequisite(), new OnlyAtCharacterCreationPrerequisite()],
                1,
                "Career"),
            new TalentModel(
                "Menagerie",
                "When in your private lab, you automatically receive the advantage: Weapons and Monsters. Increase the complication range of any task by 2 when the advantage is active.",
                [new SourcePrerequisite(Source.DiscoveryS1S2), new GMsDiscretionPrerequisite()],
                1,
                "General"),
            new TalentModel(
                "An Answer for Everything",
                "You relish intense debate, where you can see your opponent’s argument unfold, then turn it back against them. When you succeed at a task as part of an extended task in a social conflict, you may reroll a number of [D] up to your Command score.",
                [new SourcePrerequisite(Source.FederationKlingonWar)],
                1,
                "General"),
            new TalentModel(
                "Combat Gunner",
                "You have trained to operate ground vehicles and mounted weapons. You may use your Conn instead of Security when making an attack with a weapon mounted on a ground vehicle.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Conn, 4), new DisciplinePrerequisite(Skill.Security, 3)],
                1,
                "General"),
            new TalentModel(
                "Defensive Training: Melee",
                "You are adept at staying out of harm’s way during a skirmish. Melee attacks that target you have their Difficulty increased by 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar)],
                1,
                "General"),
            new TalentModel(
                "Defensive Training: Ranged",
                "You are adept at staying out of harm’s way during a skirmish. Ranged attacks that target you have their Difficulty increased by 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar)],
                1,
                "General"),
            new TalentModel(
                "Demolitionist",
                "You are skilled in making, setting, and defusing explosive devices. Whenever you attempt an Engineering task to create, set, or to defuse an explosive device or whenever you make an attack with a weapon with the Grenade weapon quality, the first d20 you purchase is free. In addition, you can ignore the first complication on an Engineering task involving explosives once per scene.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Engineering, 5), new DisciplinePrerequisite(Skill.Security, 3)],
                1,
                "General"),
            new TalentModel(
                "Exploit Weakness",
                "You are trained in surprising your opponent and taking advantage of any weaknesses they have. When you attempt an attack against an unaware enemy, or an enemy suffering from a trait that represents weakness or vulnerability, the attack gains the Piercing 2 effect.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new AttributePrerequisite(Attribute.Insight, 10), new DisciplinePrerequisite(Skill.Security, 3)],
                1,
                "General"),
            new TalentModel(
                "Finesse Strikes",
                "You are graceful on the field of battle, often dancing around the enemy with relative ease. Once per combat encounter, you may reroll all the [D] for the Stress you inflict when you make a single successful melee attack.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Security, 4)],
                1,
                "General"),
            new TalentModel(
                "Focused Fire",
                "You are adept at focusing your attacks on the same point of an enemy to inflict massive damage in that area. When you make a successful ranged attack against an enemy that has already been shot this turn and choose to spend Momentum to increase the amount of Stress suffered, you may reroll up to 3[D].",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Security, 4)],
                1,
                "General"),
            new TalentModel(
                "Improvised Weapon Training",
                "You are able to turn the most innocuous items into weapons at a moment’s notice. Once per scene, you may use an item such as a rock, crystal, or shard of metal laying around into a melee weapon. This weapon deals 2[D] + Security damage and is removed at the end of the encounter.",
                [new SourcePrerequisite(Source.FederationKlingonWar)],
                1,
                "General"),
            new TalentModel(
                "Moving Target",
                "Your training in hit-and-move tactics allows you to confuse attackers as you run to take cover. When you take the Sprint task, the Difficulty of ranged attacks that target you is increased by 1 until your next turn.",
                [new SourcePrerequisite(Source.FederationKlingonWar)],
                1,
                "General"),
            new TalentModel(
                "Nimble (War)",
                "You are quick on your feet and know how to navigate obstacles around you. When attempting a task to move through difficult terrain or similar physical obstacles, you may reduce the Difficulty of the task by 2. If this reduces the Difficulty to 0, you may move over or around that obstacle as if it wasn’t there.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new AttributePrerequisite(Attribute.Fitness, 10)],
                1,
                "General"),
            new TalentModel(
                "Out of Harm's Way",
                "You are used to balancing the need to keep a patient still and the need to get them somewhere safer. When attempting to carry or restrain another person, you may use Medicine instead of Security, and you ignore the first complication rolled on any such tasks.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Security, 2), new DisciplinePrerequisite(Skill.Medicine, 3)],
                1,
                "General"),
            new TalentModel(
                "Reasoned Discourse",
                "You are precise and succinct with language, allowing you to convey facts and logical arguments effectively and quickly. When you need to communicate complicated information or argue with logic over emotion, reduce the Difficulty of the task by 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Command, 3)],
                1,
                "General"),
            new TalentModel(
                "Rousing Speaker",
                "You are accustomed to public speaking, stirring the emotions of your audience. When you attempt a task to convince or persuade others with a stirring speech, reduce the Difficulty of the task by 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new AttributePrerequisite(Attribute.Presence, 10)],
                1,
                "General"),
            new TalentModel(
                "Saboteur (War)",
                "You have a knack for breaking things. When attacking an object, structure, or stationary vehicle, you may use your Engineering score instead of Security. In addition, when inflicting Stress on such a target, you can spend 2 Momentum to change any challenge dice to an effect result, up to your Engineering score.",
                [
                    new SourcePrerequisite(Source.FederationKlingonWar),
                    new DisciplinePrerequisite(Skill.Engineering, 5),
                    new DisciplinePrerequisite(Skill.Security, 2)],
                1,
                "General"),
            new TalentModel(
                "Tracker",
                "You can follow even the faintest of tracks. When you attempt a task to track animals, people, or ground vehicles, the first d20 you buy is free. If the tracking was done as part of an extended task then the roll gains Progression 1.",
                [new SourcePrerequisite(Source.FederationKlingonWar), new DisciplinePrerequisite(Skill.Security, 3), new DisciplinePrerequisite(Skill.Conn, 2)],
                1,
                "General"),

            new TalentModel(
                "Durability",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition)],
                1,
                "Enhancement"),
            new TalentModel(
                "Open Book",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new SpeciesPrerequisite(Species.Betazoid, true)],
                1,
                "Betazoid"),
            new TalentModel(
                "Abrupt Insights",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new SpeciesPrerequisite(Species.Betazoid, true)],
                1,
                "Betazoid"),
            new TalentModel(
                "Pheromones",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new SpeciesPrerequisite(Species.Orion, true)],
                1,
                "Orion"),
            new TalentModel(
                "Asking the Right Questions",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new SpeciesPrerequisite(Species.Tellarite, true)],
                1,
                "Tellarite"),
            new TalentModel(
                "Get Down",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Security, 2)],
                1,
                "Security"),
            new TalentModel(
                "Piercing Salvo",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Security, 4)],
                1,
                "Security"),
            new TalentModel(
                "Precision Targeting",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Security, 3), new DisciplinePrerequisite(Skill.Conn, 3)],
                1,
                "Security"),
            new TalentModel(
                "Steady Hands",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Security, 3), new AttributePrerequisite(Attribute.Control, 9)],
                1,
                "Security"),
            new TalentModel(
                "Positive Reinforcement",
                "",
                [new SourcePrerequisite(Source.Core2ndEdition), new DisciplinePrerequisite(Skill.Medicine, 3), new AttributePrerequisite(Attribute.Presence, 9)],
                1,
                "Medicine"),

        ];

        private _starshipTalents: TalentModel[] = [
            // Starships
            new TalentModel(
                "Ablative Armor",
                "The vessel’s hull plating has an additional ablative layer that disintegrates slowly under extreme temperatures, such as those caused by energy weapons and torpedo blasts, dissipating the energy, and protecting the ship. This plating is replaced periodically. The ship’s Resistance is increased by 2.",
                [new StarshipPrerequisite(), new ServiceYearPrerequisite(2371), new SourcePrerequisite(Source.Core, Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Advanced Research Facilities",
                "The vessel is equipped with additional laboratories and long-term research facilities, which allow the crew to study phenomena over a protracted period, and thus generate a wealth of useful information. Whenever a character on board the ship attempts a Task to perform research, and they are assisted by the ship’s Computers + Science, the character gains one bonus Momentum, which must be used for the Obtain Information Momentum Spend.",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Science, 3), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Advanced Sensor Suites",
                "The vessel’s sensors are amongst the most sophisticated and advanced available in the fleet. Unless the ship’s Sensors have suffered one or more Breaches, whenever a character performs a Task assisted by the ship’s Sensors, they may reduce the Difficulty of the Task by one, to a minimum of 0.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Advanced Shields",
                "The vessel’s shields are state of the art, using developments that other cultures have not yet learned to overcome, or which simply provide greater protection for the same power expenditure. The ship’s maximum Shields are increased by 5.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Advanced Sickbay",
                "The ship’s medical ward or sickbay is well equipped, and larger than normal for a ship of this size. The ship gains the Advanced Medical Ward or Advanced Sickbay advantage, which applies to all tasks related to medicine and biology performed within the ward or sickbay. This advantage is lost if the ship’s Computers system is disabled.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship", false, new AliasModel("Advanced Medical Ward/Sickbay", Source.UtopiaPlanitia), new AliasModel("Advanced Medical Ward/Sickbay", Source.CaptainsLog), new AliasModel("Advanced Medical Ward", Source.KlingonCore)),
            new TalentModel(
                "Backup EPS Conduits",
                "The ship’s power conduits have additional redundancies, which can be activated to reroute power more easily in case of an emergency, keeping it from being lost when the ship is damaged. Whenever the ship would lose one or more Power because of suffering damage, roll [D] for each Power lost. Each Effect rolled prevents the loss of that point of Power.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Command Ship",
                "The ship has command and control systems allowing it to coordinate easily with allies during a crisis. When a character on the ship succeeds at a Direct Task to create an Advantage, they may always be assisted by the ship’s Communications + Command, and they may confer the Advantage to allied ships or away teams with whom the ship maintains a communications link.",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Command, 3), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Diplomatic Suites",
                "The ship has numerous high-quality staterooms for hosting VIPs, as well as briefing rooms and other facilities that allow the ship to serve as a neutral ground for diplomatic summits, trade negotiations, and similar functions. When hosting negotiations, members of the crew may be assisted by the ship’s Computers + Command or Structure + Command.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Electronic Warfare Systems",
                "The ship’s communications systems have been speciallydesigned to intercept and disrupt enemy communications in battle. Whenever a character on the ship succeeds at the Intercept or Signals Jamming Tasks, they may spend 2 Momentum to select one additional ship to target.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Emergency Medical Hologram",
                "The ship’s sickbay is equipped with holoemitters and a stateof-the-art holographic doctor, able to assist medical personnel during emergencies. The ship has one additional Supporting Character, an Emergency Medical Hologram, using the Attributes, Disciplines, and so forth as shown in the sidebar, which does not cost any Crew Support to introduce, and which does not automatically improve when introduced. This character cannot go into any location not equipped with holoemitters.",
                [new StarshipPrerequisite(), new NotCharacterTypePrerequisite(CharacterType.KlingonWarrior), new ServiceYearPrerequisite(2371), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Extensive Shuttlebays",
                "The vessel’s shuttlebays are large, well-supplied, and able to support a larger number of active shuttle missions simultaneously. The ship may have twice as many small craft active at any one time as it would normally allow, and it may carry up to two Scale 2 small craft.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Fast Targeting Systems",
                "The ship’s targeting systems can lock weapons on target much faster and more accurately than other ships of its class, giving it an edge in battle. The ship does not suffer the normal Difficulty increase for targeting a specific System on the enemy ship.",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Security, 3), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Improved Damage Control",
                "The ship has more efficient damage reporting systems, and better-trained teams of technicians, allowing the crew to respond more quickly to damage during a crisis. When a character takes the Damage Control Task aboard this ship, they may re-roll a single d20. If the repairs require an Extended Task, then the characters also gain Progression 1, adding +1 to Work done for each Effect rolled.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Improved Hull Integrity",
                "The ship’s hull has been reinforced to hold together better under stress and damage. The ship’s Resistance is increased by 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Improved Impulse Drive",
                "The ship’s Impulse drives are more powerful than on most ships, allowing the ship to accelerate much more quickly. When the flight controller succeeds at the Impulse, Attack Pattern, Evasive Action, or Ramming Speed Tasks, they may spend 2 Momentum to increase the Difficulty of attacks against the ship by 1 until the start of the flight controller’s next Turn, due to the ship’s rapid acceleration.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                2,
                "Starship"),
            new TalentModel(
                "Improved Power Systems",
                "The ship’s power systems are extremely efficient, allowing power to be redirected and rerouted from different systems very quickly. Whenever a character succeeds at a Power Management Task, the ship gains 2 Power per Momentum spent (Repeatable) instead of 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Improved Reaction Control System",
                "The ship’s maneuvering thrusters operate with greater precision, allowing the ship to adjust its course more carefully. Whenever a Task to move or maneuver the ship would increase in Difficulty because of obstacles or hazards, reduce the Difficulty by 1 (to a minimum of the Task’s normal Difficulty).",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Conn, 3), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Improved Shield Recharge",
                "The ship’s deflector shields have redundant capacitors and emitter arrays that allow the shields to be recharged and replenished much more efficiently. Whenever the Regenerate Shields Task is successful, the ship regains 3 points of Shields, plus 3 more for each Momentum spent (Repeatable), instead of the normal amount.",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Security, 3), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Improved Warp Drive",
                "The ship’s warp drive is more efficient, capitalizing on improved field dynamics, better control of antimatter flow rates, or some other advancement that allows the ship to expend less energy when travelling at warp. Whenever the ship spends power to go to warp, roll 1 for each Power spent; for each Effect rolled, that point of Power is not spent.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Modular Laboratories",
                "The ship has considerable numbers of empty, multi-purpose compartments that can be converted to laboratories as and when required. At the start of an adventure, the crew may decide how the modular laboratories are configured; this configuration counts as an Advantage which applies to work performed within the laboratories.",
                [new StarshipPrerequisite(), new DepartmentPrerequisite(Department.Science, 2), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Quantum Torpedoes",
                "The vessel has been equipped with the latest in ship-to-ship munitions: the quantum torpedoes. The ship has quantum torpedoes in addition to any other form of torpedo it carries.",
                [new StarshipPrerequisite(), new ServiceYearPrerequisite(2371), new NotSourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Rapid-Fire Torpedo Launcher",
                "The vessel’s torpedo launchers have been redesigned to allow the ship to fire multiple torpedoes much more quickly and accurately. Whenever the crew add 3 to Threat to fire a torpedo salvo, they may re-roll a single d20 on the attack, and any number of [D] on the damage roll.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Redundant Systems",
                "The ship has multiple additional redundancies that allow it to withstand severe damage more easily. Nominate a single System. When that system becomes Damaged or Disabled, the crew may choose to activate the backups as a Minor Action; if the System was Damaged, it is no longer Damaged. If it was Disabled, it becomes Damaged instead. A System’s backups may only be activated once per adventure, so subsequent damage will have the normal effect.",
                [new StarshipPrerequisite()],
                1,
                "Starship"),
            new TalentModel(
                "Rugged Design",
                "The ship is designed with the frontier in mind, with a durable construction and easy access to critical systems that allow repairs to be made easily. Reduce the Difficulty of all Tasks to repair the ship by 1, to a minimum of 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Saucer Separation",
                "The ship is designed so that the saucer section can be separated from the engineering section, to operate as two distinct ships. Each section has the same Systems, Departments, Talents, and weapons, but their Scale is one lower than the whole ship (recalculate anything derived from Scale), and each section only has half the Power (round down) that the ship had before separation. Further, if the ship has suffered any damage, ongoing effects of that damage apply equally to both sections. The saucer section, which contains the crew quarters and recreational areas, does not have the capacity to go to warp.",
                [new StarshipPrerequisite(), new AnyOfPrerequisite(new SpaceframePrerequisite(Spaceframe.Galaxy), new GMsDiscretionPrerequisite()), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Secondary Reactors",
                "The ship has additional impulse and fusion reactors, that allow the ship to generate far greater quantities of energy. Increase the ship’s normal Power capacity by 5.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.Core, Source.CaptainsLog)],
                99,
                "Starship"),
            new TalentModel(
                "Captain’s Yacht",
                "The vessel has a single additional support craft, normally mounted in a dedicated port under the saucer section of the ship. These craft, larger than most shuttles, are often used for diplomatic missions and special excursions by the commanding officer, and are often known as the Captain’s Yacht (though not always; some Intrepid-class vessels have a similar craft called an aeroshuttle). The ship has one additional Small Craft, which does not count against the number which may be active at any one time.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Command)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Command department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Conn)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Conn department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Security)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Security department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Engineering)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Engineering department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Science)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Science department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel (Medicine)",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters who are part of the Medicine department.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Personnel",
                "The ship gains two additional Crew Support, which may only be used to establish Supporting Characters.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "High-Power Tractor Beam",
                "The ship’s tractor beam systems channel far greater quantities of power and exert much more force on the target. The ship’s tractor beam has a strength two higher than normal. Further, the ship may spend Power whenever a target attempts to escape the tractor beam to increase its strength for that attempt; the strength increases by 1 for every two Power spent.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia, Source.CaptainsLog)],
                2,
                "Starship"),
            new TalentModel(
                "Independent Phaser Supply",
                "The ship’s phasers use an independent power supply, rather than drawing directly from the ship’s other power sources. Attacking with the ship’s phasers no longer has a Power Requirement. However, the ship may not spend additional Power to boost the effectiveness of an attack with the phasers.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.DiscoveryCampaign, Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Polarized Hull Plating",
                "The ship does not have deflector shielding, but rather is equipped with layers of hull plating that can be polarized to resist attack. This functions in the same way as Shields do, with one difference: the ship suffers a Breach if four or more damage is suffered after deductions for Resistance.",
                [new StarshipPrerequisite(), new MaxServiceYearPrerequisite(2199), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Grappler Cables",
                "This precursor to tractor beams uses sturdy cables and magnetic grapplers to grab on to objects and ships. This functions as a tractor beam, but if the target breaks free, roll 1[D] — on an Effect, the cables have been Damaged and cannot be used again until repaired.",
                [new StarshipPrerequisite(), new MaxServiceYearPrerequisite(2199), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "Photonic Torpedoes",
                "The vessel is equipped with photonic torpedoes instead of spatial torpedoes.",
                [new StarshipPrerequisite(), new MaxServiceYearPrerequisite(2199), new SourcePrerequisite(Source.CommandDivision)],
                1,
                "Starship"),
            new TalentModel(
                "Nuclear Warheads",
                "The vessel is equipped with nuclear warheads in addition to its spatial torpedoes.",
                [new StarshipPrerequisite(), new MaxServiceYearPrerequisite(2199), new SpaceframesPrerequisite([Spaceframe.Daedalus, Spaceframe.NX]), new SourcePrerequisite(Source.CommandDivision)],
                1,
                "Starship"),
            new TalentModel(
                "Specialized Crew (Command)",
                "Rare in Starfleet, a starship with a specialized crew has had personnel assigned to it primarily from a specific division. During an adventure, if the players wish to introduce supporting characters, they may not use more than half their ship’s Crew Support rating on characters from divisions outside of the ship’s specialty. An example of this is the Crossfield class that is specialized with the Science division and is Scale 4. This means that only two crew points could be used for supporting characters from the Command or Operations divisions, while the other two could be used only for the Science division.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.DiscoveryCampaign)],
                1,
                "Starship"),
            new TalentModel(
                "Specialized Crew (Operations)",
                "Rare in Starfleet, a starship with a specialized crew has had personnel assigned to it primarily from a specific division. During an adventure, if the players wish to introduce supporting characters, they may not use more than half their ship’s Crew Support rating on characters from divisions outside of the ship’s specialty. An example of this is the Crossfield class that is specialized with the Science division and is Scale 4. This means that only two crew points could be used for supporting characters from the Command or Operations divisions, while the other two could be used only for the Science division.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.DiscoveryCampaign)],
                1,
                "Starship"),
            new TalentModel(
                "Specialized Crew (Science)",
                "Rare in Starfleet, a starship with a specialized crew has had personnel assigned to it primarily from a specific division. During an adventure, if the players wish to introduce supporting characters, they may not use more than half their ship’s Crew Support rating on characters from divisions outside of the ship’s specialty. An example of this is the Crossfield class that is specialized with the Science division and is Scale 4. This means that only two crew points could be used for supporting characters from the Command or Operations divisions, while the other two could be used only for the Science division.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.DiscoveryCampaign)],
                1,
                "Starship"),
            new TalentModel(
                "Ablative Armor Generator",
                "The ship is fitted with a number of external replicators pre-set to materialize an outer layer of armor plating over the hull, reinforced with structural integrity fields that make it extraordinarily resilient. When the ship raises its Shields, it may deploy armor instead, by spending 3 Power. This increases the maximum Shields capacity by 5 and increases the ship’s Resistance by 3. While armor is deployed, the Modulate Shields and Regenerate Shields actions cannot be taken – the armor cannot be fine-tuned in those ways.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia), new CenturyPrerequisite(25)],
                1,
                "Starship"),
            new TalentModel(
                "Ablative Field Projector",
                "The ship’s shield emitters are combined with an ablative field projector that allows its graviton field to be shared with another target in Close range. These projectors charge the target’s shields while dissipating its own. Doing so requires a Difficulty 1 Control + Security task. On a success, your ship loses 1 Shield point and the target gains 1 Shield point. This process can be repeated any number of times by spending 1 Momentum for each swap.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(25)],
                1,
                "Starship"),
            new TalentModel(
                "Adaptable Energy Weapons",
                "The ship’s weapon delivery systems are enhanced by multiparticle emitters. These emitters allow for the ship’s energy weapon capabilities to be modified when fired. If desired, before an attack is rolled, the ship’s weapon’s Stress Rating is reduced by 1[D], but the officer making the attack roll may swap out any one Stress effect for another.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(24)],
                1,
                "Starship"),
            new TalentModel(
                "Advanced Emergency Crew Holograms",
                "The starship has the entirety of its interior spaces and some critical areas on its exterior outfitted with holoemitters, allowing the computer to project simulated personnel during emergencies. The ship has a number of holographic supporting characters (which should be pre-created) equal to half the ship’s Computers score, rounding up; their appearance and personality are determined when the ship is created. These can be activated or deactivated as a minor action, and they do not require any Crew Support to appear. They cannot operate away from the ship, and they do not improve when introduced in subsequent adventures.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new ServiceYearPrerequisite(2380)],
                1,
                "Starship"),
            new TalentModel(
                "Advanced Transporters",
                "The ship is outfitted with dozens of transporter emitter array pads, allowing targeting scanners to lock on to their targets and destination more easily. While accurate, this system is Power intensive. The Difficulty of all transporter tasks are decreased by 1. The Power requirement of all transporter tasks is increased by 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(24), new DepartmentPrerequisite(Department.Science, 4)],
                1,
                "Starship"),
            new TalentModel(
                "Annular Confinement Jacketing",
                "The ship’s energy weapon emitters create an annular confinement beam around its energy beams, allowing the weapons to fire short distances at warp speeds. The ship may make an attack with its energy weapons at Close range while at warp; however, the Difficulty for the attack is increased by 2.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia), new CenturyPrerequisite(22, 23)],
                1,
                "Starship"),
            new TalentModel(
                "Automated Defenses",
                "The ship’s weapons systems can automatically lock on to a target and fire. At the end of a combat round, if nobody fired a ship weapon, the ship may make an unassisted energy weapon attack using its Weapons + Security against a target. Momentum may be used and generated as normal for this attack.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(23), new DepartmentPrerequisite(Department.Security, 3)],
                1,
                "Starship"),
            new TalentModel(
                "Automated Return",
                "The ship’s computer is programmed to recognize a starbase, colony, or some other location as its home base. The shuttles on board have the same programming and recognize the ship as their home base. If the ship’s Computers system goes for 10 days without commands from the crew, it will automatically pilot the ship back to the home base at maximum impulse.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia), new CenturyPrerequisite(23)],
                1,
                "Starship"),
            new TalentModel(
                "Cloaked Mines",
                "The ship’s mines are equipped with state-of-the-art cloaking technology, making them almost impossible to detect. Mines that the ship places have the Hidden 2 Weapon Quality.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new DepartmentPrerequisite(Department.Security, 3)],
                1,
                "Starship"),
            new TalentModel(
                "Cloaking Device",
                "The vessel has a device that allows it to vanish from sensors. Operating the device requires a Control + Engineering task with a Difficulty of 2, assisted by the ship’s Engines + Security as this is a task from the tactical position. This task has a Power requirement of 3. If successful, the vessel gains the Cloaked trait. While cloaked, the vessel cannot attempt any attacks, nor can it be the target of an attack unless the attacker has found some way of detecting the cloaked vessel. While cloaked, a vessel’s shields are down. It requires a minor action to decloak a vessel.",
                [new StarshipPrerequisite(), new AnyOfPrerequisite(
                    new AllOfPrerequisite(new ServiceYearPrerequisite(2272), new SourcePrerequisite(Source.KlingonCore)),
                    new AllOfPrerequisite(new GMsDiscretionPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)))],
                1,
                "Starship"),
            new TalentModel(
                "Dedicated Subspace Transceiver Array",
                "A starship with this talent has a section of its hull that slides away where a long, tether-like subspace transceiver array can be deployed to enhance the vessel’s communication range and clarity, even at warp. Any tasks involving sending, receiving, or intercepting subspace or standard EM communications have their Difficulty reduced by 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Deluxe Galley",
                "The ship’s mess hall is equipped with top-of-the-line food preparation systems as well as vast stores of non- replicated food. Whenever the ship’s cook or chef uses their role ability while in the ship’s galley, they generate 1 additional Momentum. In addition, whenever a crew member meets with a guest of the ship in the galley, they gain the Fine Dining advantage, which comes into play with all Presence and Command tasks.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Dual Environment",
                "The ship is outfitted with redundant system rooms that can be filled with gases or liquids that allow crew members requiring different atmospheric conditions to work side by side with the rest of the crew. In addition, passages that can be filled with the necessary liquids or gases run parallel to all passages in the ship, allowing these crew members to move freely throughout. A character who is in a redundant system room may assist others in the connected system room as if they were in the same room.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Expanded Munitions",
                "The ship has been designed to defend itself from all manner of threats. As such, it has either additional energy delivery systems or extended storage for torpedoes or mines. The ship may add any one weapon to its profile. This talent may be taken multiple times, adding a different weapon each time. Any prerequisites for the weapon or its delivery system still apply.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
                999,
                "Starship"),
            new TalentModel(
                "Expansive Department",
                "This talent represents a highly-focused starship with many specialists in their field working closely together to perform tasks at peak efficiency. This talent must be taken for a starship to have a department score of 6 through application of a mission profile or through game events and player actions. Starbases do not need this talent to have a department above 5. All tasks that include this Expansive Department have a target number calculated as normal. Whenever the ship assists a task using this department, or performs a task on its own using this department, the ship may re-roll a d20.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
                1,
                "Starship"),
            new TalentModel(
                "High-Resolution Sensors",
                "The vessel’s sensors can gain large amounts of accurate data, though they are extremely sensitive. While the vessel is not in combat, any successful task that is assisted by the ship’s Sensors gains one bonus Momentum.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Multi-Vector Assault Mode",
                "Like the Saucer Separation talent, Multi-Vector Assault Mode changes the statistics of the ship as it splits apart into three distinct sections. Each section has the same systems and departments scores as the original fully integrated starship, but each individual section has only one third the power (divide original Power rating by 3, rounding down) that it originally hadd and each of the sections has a Scale 1 less than the original starship. Starships that wish to take this talent must also have the Redundant Systems (Propulsion) talent. All energy weapons’ Stress ratings for each section is one less due to the reduction in Scale.\nSeparating the starship into three sections (Command and two attack sections) requires a Control + Conn task with a Difficulty of 2, assisted by the ship’s Structure + Engineering. Reconnecting the separate sections requires the same task as separation, but done twice. Sections may not disconnect or reconnect if the Structure of any section of the ship, or the ship as a whole, has been damaged or disabled.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Point Defense System",
                "The ship is equipped with a system of small energy weapon emitters that operates independently from the main weapons systems. When a torpedo targets the ship, these emitters start firing in the direction it is traveling from, potentially destroying it before it impacts the shields or the ship’s hull. This system only works at subwarp speeds. The ship is considered to have Cover 2[D] against torpedo attacks.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new DepartmentPrerequisite(Department.Security, 3)],
                1,
                "Starship"),
            new TalentModel(
                "Regenerative Hull",
                "The ship’s hull is infused with reverse-engineered Borg nanite technology that seeks out and repairs the hull immediately when it is damaged, often preventing a breach before it can happen. The amount of Stress needed for the ship to sustain a breach is increased by 1.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(25)],
                1,
                "Starship"),
            new TalentModel(
                "Self-Replicating Mines",
                "The ship carries mines that are capable of replicating themselves over time, allowing for a more thorough spread filling the area they’re deployed in. The Difficulty of any task made to avoid the mines does not reduce when mines are detonated.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new ServiceYearPrerequisite(2371), new DepartmentPrerequisite(Department.Security, 4)],
                1,
                "Starship"),
            new TalentModel(
                "Siphoning Shields",
                "The vessel’s shield emitters are connected to a network of particle siphons that capture some of the energy released when hit by an energy weapon, channeling it back into the shields. When the ship is hit by an energy weapon, after Stress is rolled, roll 1[D] for each point of Shields lost, then regain a number of Shield points equal to the number of effects rolled.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Slim Sensor Silhouette",
                "Through a combination of advanced alloys, EM shielding, and electronic countermeasures, the starship is difficult to detect via electromagnetic radiation and subspace sensors. While not a true cloaking device, these vessels can sneak into star systems entirely undetected. Like a cloaking device, utilizing the EM shielding and ECM systems on board requires a Control + Engineering task with a Difficulty of 2. If this task is successful, the maximum Power rating of the ship is reduced by 2 to represent the power usage of the systems and “running silent,” and shields are deactivated. All tasks to detect the stealthy starship have their Difficulty increased by 1. There are no restrictions on weapons fire from the ship using this talent.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship"),
            new TalentModel(
                "Tachyon Detection Field",
                "The ship is equipped with a field generator that projects a cloud of tachyons around it. Activating the field generator requires a Control + Engineering task with a Difficulty of 2, assisted by the ship’s Sensors + Science, and has a Power requirement of 2. The field remains active until the ship moves. While the field is active, the ship is notified of any cloaked vessels that are within or pass into Close range. The ship may attack a cloaked target within the field, though the Difficulty for the attack is increased by 2.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(25), new DepartmentPrerequisite(Department.Science, 3)],
                1,
                "Starship"),
            new TalentModel(
                "Variable Geometry Warp Field",
                "An extension of the variable pitch warp nacelles seen on the Intrepid class and the warp vector technology found on many Vulcan-designed starships, a ship with a variable geometry warp field can adjust its subspace field in highly turbulent spacetime and can continue to provide propulsive force even then. These vessels provide the advantage of Variable Geometry Warp Field in any scene involving a disadvantage related to difficulties forming or maintaining a stable warp field.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog)],
                1,
                "Starship", false, new AliasModel("Variable Geometry Warp Drive", Source.CaptainsLog)),
            new TalentModel(
                "Versatile Tractor Beam",
                "The ship has exotic particle emitters integrated with its tractor beam system. With a few simple adjustments, the tractor beam can become even more useful against ships trapped within. When the tractor beam is activated, the operator may choose to add one of the following effects:\nDepleting: At the end of each round a target remains within the tractor beam, it loses 1 Shield.\nDraining: At the end of each round a target remains within the tractor beam, it loses 1 Power.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new CenturyPrerequisite(25)],
                1,
                "Starship"),
            new TalentModel(
                "Wormhole Relay System",
                "The ship has an additional sensor system outfitted with high-energy transceivers, verteron sensors, and neutrino sensors. These sensors, combined with field-generation devices, allow the ship to send and receive data streams through wormholes. The Difficulty of all Science tasks to send or receive data through a wormhole is reduced by 2 to a minimum of 0.",
                [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia, Source.CaptainsLog), new ServiceYearPrerequisite(2371)],
                1,
                "Starship"),



            new TalentModel(
                "Docking Capacity",
                "The station has additional ports and pylons that allow it to support a greater number of docked vessels as well as larger vessels than would normally be the case. The starbase has a number of docking ports equal to one-and-a-half times its Scale (rounding down), instead of half its Scale. The maximum Scale of any ship that may dock at the station is increased by 2.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                99,
                "Starbase"),
            new TalentModel(
                "Drydock",
                "A space station with this talent has facilities that can assist in construction or repair of starships, including the fabrication facilities for equipment, and limited refining capabilities for producing alloys from raw material. Space stations with this talent provide an advantage called Drydock that applies to all repairs and construction tasks involved with starships docked to it.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
                99,
                "Starbase"),
            new TalentModel(
                "Enhanced Defense Grid",
                "The station’s Shields are increased by an amount equal to half the station’s Scale.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                99,
                "Starbase"),
            new TalentModel(
                "Firebase",
                "The station is built to defend itself and surrounding space from attack and can unleash colossal firepower. Whenever a character makes an Attack with the station, they may use the Swift Task Momentum Spend for 1 Momentum instead of the normal 2, so long as their second Task is also an Attack.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starbase"),
            new TalentModel(
                "Repair Crews",
                "With additional personnel to support repair and maintenance work, the station may prioritize repairs to a number of ships equal to its Engineering Department.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starbase"),
            new TalentModel(
                "Self-Propelled",
                "All space stations have limited propulsive capabilities to adjust their orbit around a planetary body or move slowly through empty space to new positions. A space station with this talent has the ability to not only move through regular space, but to also move at warp speeds. The majority of space stations with this talent are self-propelled drydocks capable of assisting stranded starships or moving between star systems to where they are most needed. All Power requirements for tasks related to warp speeds are doubled to represent the bulk and mass of the station.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
                1,
                "Starbase"),
            new TalentModel(
                "Sturdy Construction",
                "When the station suffers damage, after Resistance, from an attack or hazard, it suffers a Breach if 8 or more damage is inflicted, rather than 5 or more as is normally the case.",
                [new StarbasePrerequisite(), new SourcePrerequisite(Source.CommandDivision, Source.UtopiaPlanitia)],
                1,
                "Starbase"),

            ];

    private _specialRules: TalentModel[] = [
        new TalentModel(
            "Additional Propulsion System",
            "The vessel includes an additional, non-standard form of propulsion, such as Transwarp or Quantum Slipstream Drive.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Aquarius Escort",
            "The Aquarius escort is a small starship, about the size of a Defiant-class ship, embedded in a docking slip at the aft of the Odyssey class. The Aquarius is an independent starship and can travel at warp, though its endurance is relatively limited and it is not designed to go on extended missions without frequent resupply. When deployed, the Aquarius can be an NPC ally starship or can be commanded by a player at the gamemaster's discretion. The Aquarius uses the stats of a Defiant-class starship, but cannot have a cloaking device. When docked, the Aquarius's power and defensive systems supplement that of the mothership, and so when deployed, the scale of the Odyssey-class ship (and all derived stats except for its number of talents) is reduced from 7 to 6.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Backpacking",
            "Norway-class vessels can tow cargo containers while at warp between their widely-spaced nacelles. The extra equipment and supplies this provides produces the advantage “We Have That!” in scenes where the gamemaster feels these extra supplies and parts could come in handy. While towing these cargo containers, all Conn tasks have their Difficulty and complication range increased by 1 to represent the difficulties in keeping the cargo containers secure. Failure on these tasks could be resolved by loss of the containers, or damage to the vessel.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Constitution Saucer Separation",
            "All Constitution-class vessels have the capability to detach their saucer section in an emergency to be used as a lifeboat. However, unlike the Saucer Separation talent, the Constitution class is unable to re-dock the detached saucer with the secondary hull outside of a drydock. Ship’s systems are halved (round down) for the saucer and the secondary hull when separated, the saucer is unable to enter warp speeds, and each section is considered a Scale 3 vessel. However the saucer is able to land on a planetary surface with extended landing legs that fold down from the ventral side of its hull. In the original series era, the saucer has both phasers and photon torpedoes, and the secondary hull has only phasers, but the opposite is true after the refit program of the 2270s.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Defiant Class Cloaking Device",
            "The ship has a cloaking device, allowing it to vanish from view. Activating the device is a Control + Engineering task with a Difficulty of 2, assisted by the ship’s Engines + Security, performed from the tactical position. Th task has a Power requirement of 3. If successful, the vessel gains the Cloaked trait. While cloaked, the vessel cannot attack, nor can it be the target of an attack unless the attacker has found some way of detecting the cloaked ship. While cloaked, the vessel’s shields are down. It takes a minor action to decloak. Due to incompatibilities between Romulan and Federation technology, and Federation unfamiliarity with cloaking technology, any task relating to using the cloaking device has a +1 complication range.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Do No Harm",
            "As the Olympic class is considered a non-combatant and its phaser system is seen as defensive only, any use of the ship’s phaser system outside of self-defense or as a tool automatically generates 1 Threat per scene. In addition, the characters on an Olympic-class vessel may, once per adventure, gain an extra d20 for a task involving convincing another group of the good intentions of Starfleet, the Federation, or the crew themselves due to the reputation of these hospital vessels.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Efficiency",
            "Daedalus-class vessels are constructed with simple systems that are easily maintained, and a highly adaptable modular construction beyond what most Starfleet vessels of even the 24th century use. These vessels may have up to five talents, rather than the three its Scale would normally permit.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Excelsior Saucer Separation",
            "All Excelsior-class vessels have the capability to detach their saucer section in an emergency to be used as a lifeboat. However, unlike the Saucer Separation talent, the Excelsior class is unable to re-dock the detached saucer with the secondary hull outside of a drydock. Ships’ systems are halved (round down) for the saucer and the secondary hull when separated, the saucer is unable to enter warp speeds, and each section is considered a Scale 4 vessel. However, the saucer is able to land on a planetary surface with extended landing legs down from the ventral side of its hull.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "EXEO Holographic Core",
            "The EXEO Holographic Core allows the ship to support a holographic life form as part of its crew. This supporting character can be from any discipline and does not count against the ship's crew support total. This holographic life form also has a primitive mobile emitter. The mobile emitter provides the EXEO with some EVA mobility, but it is not as advanced as the Doctor's 29th-centry emitter and will not function more than 100,000 kilometers away from the EXEO core itself. Unlike a standard EMH, the EXEO may improve.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Four-Nacelle Stability",
            "Constellation-class vessels can generate an incredibly stable warp field by using their two standby nacelles as warp field repeaters/stabilizers. Any task that involves the warp drive for movement, or while moving, may have its Difficulty reduced by a maximum of 1 by spending 2 Power.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Modular Cargo Pods",
            "The modular cargo pods of the Par’tok class transport can be replaced or removed at any rudimentary spacedock as long as other pods are available and service vehicles such as shuttlecraft can assist in tractoring new pods into place. Depending on the mission assigned to the Par’tok class vessel, the performance and traits of the vessel can drastically change.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.KlingonCore)],
            1,
            "Starship", true),
        new TalentModel(
            "Ploughshares to Swords",
            "Miranda-class vessels were originally designed to be vessels of war, and although the Starfleet Advanced Technologies Group redesigned and repurposed the vessel, aspects of the ship's martial pedigree show through. This spaceframe's phaser banks may be used as phaser cannons when at Close range, which increases their Stress rating by 1.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Expanded Connectivity",
            "Extensive user-interface reworking has been done throughout the ship. Due to this any Override actions taken, where an action is taken from a different station on the bridge, can be attempted with no penalty.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.TheseAreTheVoyages)],
            1,
            "Starship", true),
        new TalentModel(
            "Linked Fire Control",
            "The spaceframe gains an advantage \"Linked Fire Control\" that applies to fleet combat as determined by the gamemaster, reducing the complication range on weapons fire.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Modular Mission Bay",
            "A Pathfinder must take one talent from the list below. This talen counts against the ship's maximum number of talents, but the crew may exchange it for another on the list during a week-long layover at a Federation starbase. Advanced Research Facilities. Advanced Sickbay. Dedicated Personnel (Medicine). Dedicated Personnel (Science). Dedicated Personnel (Security). Diplomatic Suites. Extensive Shuttlebays. Improved Damage Control. Modular Laboratories.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Refracting Energy Shunt",
            "This starship can use its deflector array to temporarily absorb energy from a target vessel and channel that back into its own power reserves. Once per scene, the crew can spend 3 Momentum to reduce an enemy starship's Power by 3 and provide their own ship with 3 bonus Power, even exceeding the ship's maximum Power rating. This is executed on a Daring + Engineering task with a Difficulty of 3, and, depending on the result of the check, the gamemaster may create a complication related to the ship's Power or weapons systems.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Steamrunner Separation",
            "The small secondary hull can be jettisoned as a sizable emergency lifeboat. This secondary hull has limited impulse power and no capability for warp. The secondary hull has no talents or weapons, and uses the systems and departments of a Type-6 shuttle. Once detached, the primary hull is unable to enter warp and has all of its systems reduced by 2. Reattaching the secondary hull requires extensive work at a drydock facility.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Mission Pod",
            "Ships of this class have a mission pod. This mission pod provides two talents to the vessel that count toward the maximum normally allowed, but the entire mission pod (and all of its benefits) may be swapped out as if it were a single talent. If equipping a mission pod results in a talent being taken twice, a new talent may be chosen.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.UtopiaPlanitia)],
            1,
            "Starship", true),
        new TalentModel(
            "Stealth Systems",
            "Prior to the treaty with the Romulan Star Empire and gaining access to advanced cloaking devices, the Klingon Empire used stealth systems based on reverse-engineered Hur’Q technology left behind on Qo’noS after their departure. These stealth systems include adaptive chromatic plates on the outer hull to blend into the background in the near infrared to ultraviolet wavelengths, thermal buffers and heat sinks to reduce the emissions in the far infrared, and microscale wavelength guides to absorb incoming sensor beams and prevent returns. This equipment functions in a similar way to the Cloaking Device found on page 207 of The Klingon Empire core rulebook, except it is more difficult to use, requiring a Control + Engineering task with a Difficulty of 3 rather than 2, and a Power requirement of 5 instead of 3.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.DiscoveryCampaign)],
            1,
            "Starship", true),
        new TalentModel(
            "Monopole Warp Field",
            "A monopole warp field results from either tightly packed warp coils or through what is referred to as “warp rings” such as early Vulcan superluminal propulsion. These fields provide excellent straight-line warp acceleration, allowing vessels to outrun or escape from pursuers with ease. If an enemy wishes to pursue a vessel with this talent, they must spend at least 2 more Power than the vessel with the talent, rather than only one more. If both vessels have this talent, treat it as though it were a normal warp pursuit. Additionally, a vessel with this talent does not need to spend Power to enter warp.",
            [new StarshipPrerequisite(), new SourcePrerequisite(Source.DiscoveryCampaign)],
            1,
            "Starship", true),

        new TalentModel(
            "First into Battle",
            "When the Klingon Veteran makes a successful attack, they may spend 3 Momentum to assist another Klingon’s next attack with their Daring + Command.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran)],
            1,
            "Klingon", true),
        new TalentModel(
            "Precision Targeting (Klingon)",
            "When the character makes an attack that targets a specific system, he may reroll one d20 in his dice pool, and the attack gains the Piercing 1 damage effect",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new OfficerPrerequisite(), new DisciplinePrerequisite(Skill.Security, 3)],
            1,
            "Klingon", true),
        new TalentModel(
            "Cunning Negotiator",
            "Whenever the character attempts a Presence task to influence an opponent during a negotiation, they may re-roll one d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new OfficerPrerequisite(), new AttributePrerequisite(Attribute.Presence, 9)],
            1,
            "Klingon", true),
        new TalentModel(
            "Cutting Wit",
            "The character fights as much with words as with weapons. When in personal combat against an enemy who can understand them, they may use Presence instead of Daring to attack.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa, Species.Orion), new AttributePrerequisite(Attribute.Presence, 9)],
            1,
            "Klingon/Orion", true),
        new TalentModel(
            "Tactical Genius",
            "Once per scene, if the character succeeds at an Insight + Command task to assess their opponent, they may spend 2 Threat to allow all under their command to re-roll one d20 on their next task.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new OfficerPrerequisite()],
            1,
            "Klingon", true),
        new TalentModel(
            "Fleet Commander",
            "Commanding a vessel during a fleet action reduces the Difficulty of a task to grant a bonus to Korrd’s vessel or group by 1, to a minimum of 1. Aboard a vessel during a fleet action, the character may treat the vessel as having a Command department of 4+, regardless of the actual value.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran), new DisciplinePrerequisite(Skill.Command, 3)],
            1,
            "Klingon", true),
        new TalentModel(
            "Threatening 3 (Klingon)",
            "When the player characters encounter the Klingon character, add three Threat to the Threat pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Klingon, Species.KlingonQuchHa)],
            1,
            "Klingon", true),
        new TalentModel(
            "Free Advice Is Seldom Cheap",
            "Increase the Difficulty of all Social Conflict to persuade a Ferengi Merchant by 2. This Difficulty increase is removed as soon as the Ferengi is offered something in trade.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Ferengi, false)],
            1,
            "Ferengi", true),
        new TalentModel(
            "Keep Your Ears Open",
            "Whenever the character attempts a Task to detect danger or hidden enemies, or to listen in on someone’s conversation, reduce the Difficulty by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Ferengi, false)],
            1,
            "Ferengi", true),
        new TalentModel(
            "You Can’t Make a Deal If You’re Dead",
            "This Ferengi will never make a lethal attack. Further, whenever attempting a Task to make a deal or otherwise persuade an enemy who they have previously incapacitated, or an enemy who obviously outmatches them, they may add a bonus d20 to the roll.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Ferengi, false)],
            1,
            "Ferengi", true),
        new TalentModel(
            "Ambush",
            "When attacking an opponent who is unaware, the Romulan Officer may spend 2 Threat, to allow the Officer and all Romulans under their command to re-roll any number of d20s on their attack rolls.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc),new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman),  new OfficerPrerequisite()],
            1,
            "Romulan", true),
        new TalentModel(
            "Ruthless and Determined",
            "The character may spend 2 Threat to gain the effects of a point of Determination, rather than the normal 3.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman), new OfficerPrerequisite()],
            1,
            "Romulan", true),
        new TalentModel(
            "Supreme Authority",
            "Whenever a Romulan currently under the character's command attempts a Task to resist persuasion or intimidation, the character may spend 1 Threat to allow that Romulan to re-roll, even if they are not present in that scene.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran)],
            1,
            "Romulan", true),
        new TalentModel(
            "Supreme Authority (Cardassian)",
            "Whenever a Cardassian currently under the character's command attempts a Task to resist persuasion or intimidation, the character may spend 1 Threat to allow that Cardassian to re-roll, even if they are not present in that scene.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Cardassian), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran)],
            1,
            "Cardassian", true),
        new TalentModel(
            "Senatorial Presence",
            "Whenever one of the senator's subordinates attempts a Task to resist persuasion, intimidation, or interrogation, the senator may spend two Threat to allow that Romulan to roll as if they had the benefit of their assistance using Control + Command, even if they are not present in the scene.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan), new CareersPrerequisite(Career.Veteran, Career.Experienced), new SpecializationPrerequisite(Specialization.RomulanSenator)],
            1,
            "Romulan", true),
        new TalentModel(
            "Reman Bodyguard",
            "The senator has a Reman bodyguard who is completely devoted to their well-being. If attacked while in the presence of the bodyguard, the senator may use the bodyguard’s Fitness + Security for purposes of Stress, providing they are within Reach.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan), new SpecializationPrerequisite(Specialization.RomulanSenator)],
            1,
            "Romulan", true),
        new TalentModel(
            "Romulan Military Efficiency",
            "The character grants all Romulan NPCs under their command an additional Task each turn.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran, Career.Experienced)],
            1,
            "Romulan", true),
        new TalentModel(
            "Manipulation is Second Nature",
            "The character may attempt to Negotiate or Intimidate as an additional Task on their turn.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran, Career.Experienced)],
            1,
            "Romulan", true),
        new TalentModel(
            "I Anticipated Your Move",
            "Unless a Player Character has a higher Daring than the Romulan officer, the Romulan always acts before the first Player Character.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Romulan, Species.Reman), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran, Career.Experienced), new AttributePrerequisite(Attribute.Daring, 9)],
            1,
            "Romulan", true),
        new TalentModel(
            "Ambushes and Traps",
            "Whenever a Cardassian uses the Ready Task to ready a Ranged attack, that Ranged attack gains one bonus d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Cardassian)],
            1,
            "Cardassian", true),
        new TalentModel(
            "Loyal and Disciplined",
            "Whenever a Cardassian receives assistance from a superior on a Task, the Cardassian may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Cardassian)],
            1,
            "Cardassian", true),
        new TalentModel(
            "Expects Success",
            "Whenever a Cardassian uses the Direct or Assist Task to aid a subordinate, that Task may always Succeed at Cost.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Cardassian)],
            1,
            "Cardassian", true),
        new TalentModel(
            "Ruthless",
            "A Cardassian Officer may re-roll any d20s in their dice pool when making an attack against an enemy that was not aware of or prepared for an attack, or against an enemy that is defenseless.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Cardassian), new OfficerPrerequisite(), new CareersPrerequisite(Career.Veteran, Career.Experienced)],
            1,
            "Cardassian", true),
        new TalentModel(
            "No Quarter",
            "When commanding a boarding action and assisting the soldiers under their command by giving them orders, the character may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion), new SpecializationPrerequisite(Specialization.OrionPirate)],
            1,
            "Orion", true),
        new TalentModel(
            "Cutthroat Crew",
            "Whenever the Orion Pirates attempt a Task related to boarding a captured vessel, and they buy additional d20s with Threat, they may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion), new SpecializationPrerequisite(Specialization.OrionPirate)],
            1,
            "Orion", true),
        new TalentModel(
            "Vicious",
            "The character knows how to use cruelty to motivate others. When enforcing discipline using threats or violence and buying additional d20s with Threat, the character may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion), new SpecializationPrerequisite(Specialization.OrionPirate)],
            1,
            "Orion", true),
        new TalentModel(
            "A Little Bit Extra",
            "An Orion Science Officer is always on the lookout for something interesting, profitable, or valuable. Whenever performing a Task with Science, the Orion Scientist gains 1 bonus Momentum, that they can only spend on Obtain Information.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion), new DisciplinePrerequisite(Skill.Science, 3)],
            1,
            "Orion", true),
        new TalentModel(
            "Assess Odds",
            "The character knows when and where to apply their efforts for maximum payoff and how to best utilize their skills. Pick either Insight or Presence; when the character attempts a Task using that Attribute and don’t have an applicable Focus, each die that rolls a “2” scores two successes.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Potent Pheromones",
            "While at Close range, when attempting a Task to negotiate, persuade, or seduce a humanoid creature physically attracted to them, the character adds a bonus d20 to the roll.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new NotSourcePrerequisite(Source.Core2ndEdition), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Subservient",
            "Used to supplicating themselves to a higher authority (typically a female Orion slave master) the character will not willingly act against their superiors. Whenever they attempt a Task to resist being coerced into disobeying an order, betraying their allies, or otherwise acting against a directive, they reduce the Difficulty by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Pheromonal Thrall",
            "Thanks to years of conditioning, exposure to an Orion superior's pheromones, and careful manipulation by that slave master, the character gains an additional d20 when assisting their superior in Tasks where the superior spends Threat.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "False-Faced",
            "When deceiving others, the character reduces the difficulty by 1, to a minimum of zero.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Better Than You Know Yourself",
            "The character has honed their skill at reading others to an almost-psychic level. When using Insight + Command to do so, they roll an additional d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Provocative",
            "When performing a Task using Presence + Command, the character may spend a Threat to gain some small but useful secret from their target, whatever the Task’s result.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Orion)],
            1,
            "Orion", true),
        new TalentModel(
            "Devious and Untrustworthy",
            "If Yridians are involved, things may get treacherous. When a Yridian free agent first becomes involved in a Mission, roll 3[D]. For each point rolled, add one to the Threat pool. This effect may only apply once regardless of how many other Yridian free agents are encountered during the Mission.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Yridian)],
            1,
            "Yridian", true),
        new TalentModel(
            "Brute Force",
            "The character adds the Vicious 1 Effect to their Unarmed Strike, and removes the Non-lethal Quality.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Nausicaan, Species.JemHadar)],
            1,
            "Nausicaan/Jem'Hadar", true),
        new TalentModel(
            "Nausicaan Bloodlust",
            "When the character attempts a melee attack, and purchases one or more additional dice with Threat, they may re-roll any number of d20s.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Ruthless and Determined (Nausicaan)",
            "The character may spend 2 Threat to gain the effects of a point of Determination, rather than the normal 3.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new AnySpeciesPrerequisite(false, Species.Nausicaan), new CareersPrerequisite(Career.Veteran, Career.Experienced)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Bullying Demeanor",
            "When the Nausicaan attempts a Task to intimidate or frighten a creature they consider weaker and buy one or more d20s with Threat, they ignore any complications.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Lust for Violence",
            "When a Nausicaan attempts a Melee attack, and purchases one or more additional dice with Threat, the Nausicaan may re-roll any number of [D] from that attack",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Nausicaan Toughness",
            "The Nausicaan only suffers an injury after sustaining 6 damage instead of just 5.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Crippling Attack",
            "When the Nausicaan performs a Task using Security, they may spent 1 Threat to prevent their target from taking the Movement Minor Action.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Menacing",
            "When the Nausicaan enters a scene, immediately add a point to the Threat pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new AnySpeciesPrerequisite(false, Species.Nausicaan)],
            1,
            "Nausicaan", true),
        new TalentModel(
            "Bodyguard",
            "Whenever a Bodyguard attempts a Task to notice or detect an enemy or hazard, they may re-roll one d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Bodyguard)],
            1,
            "General", true),
        new TalentModel(
            "Accomplished Strategist",
            "The character is a skilled commander who learned the arts of warfare commanding ships in battle. Whenever they attempt a Task to formulate, execute, or explain a strategy, they may spend 1 Threat to re-roll his dice pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Admiral)],
            1,
            "General", true),
        new TalentModel(
            "Counter Ploy",
            "Whenever an enemy attempts a Task to create an Advantage representing some manner of strategy or tactic, the character may spend 1 Threat to increase the Difficulty by 1. Further, if this Task then fails, the character may immediately spend one additional Threat to create an Advantage of their own, representing their own stratagem.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Admiral)],
            1,
            "General", true),
        new TalentModel(
            "Sector Specialist",
            "The character is an expert in a specific sector of space. All Tasks involving the mapping of that sector, location of bodies, navigational hazards, etc. have their Difficulty reduced by 1. But this reliance on their own knowledge makes anything that is different from what they know often go unnoticed as they assume they know better, and the Complication range of these Tasks is increased by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist),
            new FocusPrerequisite("Astrometrics", "Stellar Cartography")],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Exploring Life",
            "A character that chooses this has an interest in Biology and Medicine, but no formal medical training. However, they have a great deal of knowledge about plant and animal species and how they may help or hinder a humanoid. Taking this increases the explorer’s Medicine Discipline by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist),
            new FocusPrerequisite("Biology", "Xenobiology", "Evolutionary Biology")],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Trailblazer",
            "The character has a wanderlust that drives them to be the first to see a new world, or be the first to explore a new sector of space. This can bring notoriety when they discover a new civilization or the remains of an ancient one, but the dangers of being on your own in the unknown mean many scientists risk their lives. A scientist with this choice may increase their Conn or Security Discipline by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist)],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Academic Explorer",
            "These scientists have been more formerly trained to accurately chart the unknown. Choosing this allows a Focus of one of the following: Stellar Cartography, Planetary Geography, or Geomorphology.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist)],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Hard Science",
            "The scientist gains a Focus based on a single scientific field of study, e.g. Astrophysics, Subspace Theory, Quantum Mechanics.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist),
            new FocusPrerequisite("Astrophysics", "Subspace Theory", "Physics", "Geology", "Quantum Mechanics", "Particle Physics", "Warp Theory"), new CareersPrerequisite(Career.Experienced, Career.Veteran)],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Research Lead",
            "The scientist has a broad background in the sciences and have honed their people skills to be able to lead other researchers in their projects. The professor does not gain a Focus; rather their Command Discipline is increased by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist), new CareersPrerequisite(Career.Experienced, Career.Veteran)],
            1,
            "General", true),
        new TalentModel(
            "Specialist Subject: Social Scientist",
            "A social scientist is trained in how intelligent beings interact with the world around them in fields such as Anthropology, Geography, and Linguistics. Like the Hard Science choice above, the choices in Focus should also have a specific world or culture attached to them, e.g. History of Andor, Vulcan Linguistics, or Tellarite Law.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Scientist, Specialization.StarfleetScientist),
            new FocusPrerequisite("Anthropology", "Geography", "Linguistics", "Sociology", "History"), new CareersPrerequisite(Career.Experienced, Career.Veteran)],
            1,
            "General", true),
        new TalentModel(
            "Armchair Analysis",
            "When the counselor uses their Insight to gain psychological information about someone with whom they are in dialogue, they can reroll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Counselor)],
            1,
            "General", true),
        new TalentModel(
            "Son'a Desperation",
            "Whenever a Son’a officer is below their maximum Stress, and buys additional d20s with Threat, the Son’a officer may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new SpecializationPrerequisite(Specialization.SonaCommandOfficer), new SpeciesPrerequisite(Species.SonA, false)],
            1,
            "Son'a", true),
        new TalentModel(
            "Son'a Authority",
            "Whenever a Son’a command officer uses the Direct or Assist Task to command a Tarlac, Ellora, or another Son’a under their command, the officer may roll 2d20 instead of 1d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new SpecializationPrerequisite(Specialization.SonaCommandOfficer), new SpeciesPrerequisite(Species.SonA, false)],
            1,
            "Son'a", true),
        new TalentModel(
            "Endure the Pain",
            "Reduce non-lethal damage against the Talarian by 2. This is unaffected by Piercing.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new SpecializationPrerequisite(Specialization.TalarianWarrior, Specialization.TalarianOfficer)],
            1,
            "Talarian", true),
        new TalentModel(
            "Sharing Victory",
            "When a Talarian succeeds in a Task, the next Talarian in the initiative order, if performing a Task, may re-roll a d20 in their pool at no cost.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new SpecializationPrerequisite(Specialization.TalarianWarrior, Specialization.TalarianOfficer)],
            1,
            "Talarian", true),
        new TalentModel(
            "Guerilla Maneuvers",
            "The Talarian Officer may Create an Advantage once per adventure for free, representing a pre-arranged strategy, such as a rigged explosion or ambush. Such an explosion is treated as (Ranged, 5[D] Area).",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SourcePrerequisite(Source.ContinuingMissions), new SpecializationPrerequisite(Specialization.TalarianOfficer)],
            1,
            "Talarian", true),
        new TalentModel(
            "Renowned Diplomat",
            "The character’s renown and reputation are such that his mere presence can serve as the groundwork for diplomatic talks. Once per scene, when a character is involved in a Social Conflict reflecting peace talks, negotiations, or some other diplomatic mission, they may re-roll a single d20 as long as the ambassador is present in the scene or was instrumental in establishing the talks.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.FederationAmbassador)],
            1,
            "General", true),
        new TalentModel(
            "Break the Ice",
            "The ambassador's manner breaks through formality in a way that sometimes puts other diplomats and negotiators ill-at-ease. It does open up talks in a way that proper etiquette and procedure often do not. When attempting a Task during a Social Conflict, the ambassador may choose to increase their Complication Range by 1, 2, or 3. If the Task succeeds, they gain bonus Momentum equal to the amount by which they increased her Complication range.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.FederationAmbassador)],
            1,
            "General", true),
        new TalentModel(
            "Diplomatic Expertise",
            "Whenever the ambassador attempts a Task within a Social Conflict and buys one or more additional dice, they may re-roll their dice pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.FederationAmbassador)],
            1,
            "General", true),
        new TalentModel(
            "Jurisprudence",
            "The JAG Officer is extremely well-versed in the theory and philosophy of law, and may re-roll one d20 on a Task that uses the character’s Reason and their Law Focus.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Jag)],
            1,
            "General", true),
        new TalentModel(
            "Proficiency: Courtroom Arguments",
            "When engaged in courtroom Tasks such as making a legal argument or cross-examining a witness the JAG officer may add one bonus d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Jag)],
            1,
            "General", true),
        new TalentModel(
            "Threatening 1",
            "The character is powerful and dangerous, with a vitality and drive that allows them to triumph where others might fail. The character begins each scene with 1 Threat, that may only be used to benefit themself, and which are not drawn from the general Threat pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.TzenkethiSoldier), new NotTalentPrerequisite("Threatening 2"), new NotTalentPrerequisite("Threatening 3")],
            1,
            "General", true),
        new TalentModel(
            "Threatening 2",
            "The character is powerful and dangerous, with a vitality and drive that allows them to triumph where others might fail. The character begins each scene with 2 Threat, that may only be used to benefit themself, and which are not drawn from the general Threat pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.TzenkethiSoldier), new NotTalentPrerequisite("Threatening 1"), new NotTalentPrerequisite("Threatening 3")],
            1,
            "General", true),
        new TalentModel(
            "Threatening 3",
            "The character is powerful and dangerous, with a vitality and drive that allows them to triumph where others might fail. The character begins each scene with 3 Threat, that may only be used to benefit themself, and which are not drawn from the general Threat pool.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Jag, Specialization.TzenkethiSoldier), new NotTalentPrerequisite("Threatening 1"), new NotTalentPrerequisite("Threatening 2")],
            1,
            "General", true),
        new TalentModel(
            "Fast Recovery 2",
            "The character recovers from stress and injury quickly. At the start of each of their Turns, the character regains 2 Stress, up to their normal maximum. If the character is Injured at the start of their turn, they may instead spend two Threat to remove that Injury.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.TzenkethiSoldier)],
            1,
            "General", true),
        new TalentModel(
            "Slippery",
            "The Smuggler is used to playing upon their essentially harmless nature to wriggle out of trouble. The Smuggler reduces all Difficulties when trying to convince authorities to let them go using Presence by 1 (to a minimum of 0).",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Smuggler)],
            1,
            "General", true),
        new TalentModel(
            "Proficiency: Concealing Contraband",
            "When engaged in Tasks associated with hiding contraband or evading scans the smuggler may add one bonus d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Smuggler)],
            1,
            "General", true),
        new TalentModel(
            "One with the Ship",
            "Whenever the Smuggler attempts a Task to pilot their ship, they may reduce the Difficulty by one, to a minimum of zero.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Smuggler), new DisciplinePrerequisite(Skill.Conn, 3)],
            1,
            "General", true),
        new TalentModel(
            "Considered Every Outcome",
            "The character is a keenly analytical commander, regarding every situation from myriad different angles and considering the advice of her senior staff before coming to a command decision. When they succeed at a Reason + Command Task, the character scores one additional Momentum than normal.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpecializationPrerequisite(Specialization.Captain), new AttributePrerequisite(Attribute.Reason, 4)],
            1,
            "General", true),
        new TalentModel(
            "Tough 1",
            "This adversary’s Resistance against melee attacks is increased by 1.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Pakled, false)],
            1,
            "General", true),
        new TalentModel(
            "Threatening (Pakled)",
            "When a Pakled adds dice to a pool by spending Threat, they may re-roll a single d20.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Pakled, false)],
            1,
            "Pakled", true),
        new TalentModel(
            "Klingon Friends",
            "Once per combat encounter, the character may add two Minor Klingon adversaries to the encounter without spending Threat.",
            [new CharacterStereotypePrerequisite(Stereotype.Npc), new SpeciesPrerequisite(Species.Pakled, false)],
            1,
            "Pakled", true),
    ];

    getTalents() {
        let result = [];
        this._talents.forEach(t => result.push(t));
        this._starshipTalents.forEach(t => result.push(t));
        return result;
    }


    getTalentViewModel(name: string, character?: Character) {
        let talent = this.getTalent(name);

        if (talent) {
            let rank = character?.hasTalent(talent.name)
                ? character?.talents[talent.name].rank + 1
                : 1;
            return ToViewModel(talent, rank, character?.type ?? CharacterType.Starfleet, character?.version ?? 1);
        } else {
            return null;
        }
    }

    getTalent(name: string) {
        let talent: TalentModel = null;

        for (let i = 0; i < this._talents.length; i++) {
            let t = this._talents[i];
            if (t.matches(name)) {
                talent = t;
                break;
            }
        }

        if (talent == null) {
            for (let i = 0; i < this._starshipTalents.length; i++) {
                let t = this._starshipTalents[i];
                if (t.matches(name)) {
                    talent = t;
                    break;
                }
            }
        }

        if (talent == null) {
            for (let i = 0; i < this._specialRules.length; i++) {
                let t = this._specialRules[i];
                if (t.matches(name)) {
                    talent = t;
                    break;
                }
            }
        }

        if (talent == null && name.indexOf(" [") >= 0) {
            let tempName = name.substring(0, name.indexOf(" ["));
            talent = this.getTalent(tempName);
        }

        // backward compatibility for a past spelling mistake
        if (talent === null && name === "Multi-Vector Assualt Mode") {
            talent = this.getTalent("Multi-Vector Assault Mode");
        } else if (talent === null && name === "Advanced Emergeny Crew Holograms") {
            talent = this.getTalent("Advanced Emergency Crew Holograms");
        } else if (talent === null && name === "High Resolution Sensors") {
            talent = this.getTalent("High-Resolution Sensors");
        }

        if (talent === null) {
            console.log("Failed to find talent " + name);
        }

        return talent;
    }

    getAllAvailableTalentsForCharacter(character: Character) {
        if (character.speciesStep?.species === Species.Klingon && !character.hasTalent("Brak’lul")
                && hasAnySource([Source.KlingonCore, Source.BetaQuadrant])) {
            return [this.getTalentViewModel("Brak’lul")];
        } else if (character.speciesStep?.species === Species.Changeling && !character.hasTalent("Morphogenic Matrix")) {
            return [this.getTalentViewModel("Morphogenic Matrix")];
        } else {
            let result = this._talents.filter(t => t.isPrerequisiteFulfilled(character)).map(t => {
                if (character.hasTalent(t.name)) {
                    let temp = character.talents[t.name];
                    if (temp != null && temp.rank < t.maxRank) {
                        return ToViewModel(t, temp.rank + 1, character.type, character.version);
                    } else {
                        return ToViewModel(t, 1, character.type, character.version);
                    }
                } else {
                    return ToViewModel(t, 1, character.type, character.version);
                }
            });

            if (character.stereotype === Stereotype.Npc) {
                let rules = this._specialRules.filter(t => t.isPrerequisiteFulfilled(character) && !character.hasTalent(t.name));
                rules.forEach(t => result.push(ToViewModel(t, 1, character.type, character.version)));
            }

            result.sort((a, b) => a.name.localeCompare(b.name));
            return result;
        }
    }

    getStarshipTalentModels(starship: Starship) {
        let talents = this._starshipTalents.filter(t => t.isPrerequisiteFulfilled(starship));
        return talents.sort((a, b) => a.localizedName.localeCompare(b.name));
    }

    getStarshipTalents(starship: Starship) {
        let talents: TalentViewModel[] = [];

        for (let i = 0; i < this._starshipTalents.length; i++) {
            let talent = this._starshipTalents[i];
            let include = talent.category === "Starship";

            if (include) {
                talent.prerequisites.forEach((p, i) => {
                    if (!p.isPrerequisiteFulfilled(starship)) {
                        include = false;
                    }
                });

                if (include) {
                    let rank =  1;
                    if (talent.maxRank > 1) {
                        let selections = starship.getTalentSelectionList().filter(t => t.talent.name === talent.name);
                        if (selections.length > 0) {
                            rank = selections[0].rank + 1;
                        }
                    }

                    talents.push(ToViewModel(talent, rank, starship.type, starship.version));
                }
            }
        }

        talents.sort((a, b) => a.name.localeCompare(b.name));

        return talents;
    }

    getSourceForTalent(name: string) {
        const talent = this.getTalent(name);
        return this.getSourceForTalentModel(talent);
    }

    getSourceForTalentModel(talent: TalentModel) {
        return talent.sources;
    }
}

export const TalentsHelper = new Talents();
