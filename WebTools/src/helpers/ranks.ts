﻿import {Career} from './careerEnum';
import {Role} from './roles';
import {Era} from './eras';
import {Source} from './sources';
import {Track} from './trackEnum';
import {AlliedMilitaryDetails, Character, CharacterRank } from '../common/character';
import { CharacterType } from '../common/characterType';
import { AlliedMilitaryType } from './alliedMilitary';
import { AllOfPrerequisite, AnyOfPrerequisite, CareersPrerequisite, CharacterTypePrerequisite, EnlistedPrerequisite, AnyEraPrerequisite, IConstructPrerequisite, NotPrerequisite, OfficerPrerequisite, SourcePrerequisite, KlingonPrerequisite } from './prerequisite';
import store from '../state/store';
import { makeKey } from '../common/translationKey';
import i18next from 'i18next';

export enum Rank {
    // Core
    Captain,
    Commander,
    LtCommander,
    Lieutenant,
    LieutenantJG,
    Ensign,
    MasterChiefPettyOfficer,
    MasterChiefSpecialist,
    SeniorChiefPettyOfficer,
    SeniorChiefSpecialist,
    ChiefPettyOfficer,
    ChiefSpecialist,
    PettyOfficer1stClass,
    PettyOfficer2ndClass,
    PettyOfficer3rdClass,
    Specialist1stClass,
    Specialist2ndClass,
    Specialist3rdClass,
    Yeoman1stClass,
    Yeoman2ndClass,
    Yeoman3rdClass,
    Crewman1stClass,
    Crewman2ndClass,
    Crewman3rdClass,

    // Command
    RearAdmiral,
    RearAdmiralLower,
    RearAdmiralUpper,
    ViceAdmiral,
    Admiral,
    FleetAdmiral,
    Commodore,
    FleetCaptain,

    Civilian,

    // KlingonCore
    Sergeant,
    Corporal,
    Bekk,

    // Player's Guide
    Colonel,
    Brigadier,
    General,

    MajorGeneral,
    LieutenantGeneral,
    LieutenantColonel,
    Major,
    FirstLieutenant,
    SecondLieutenant,
    MasterSergeant,
    StaffSergeant,
    Private,

    SubCommander,
    SubLieutenant,
    Centurion,
    Uhlan,

    GrandGul,
    Legate,
    Jagul,
    Gul,
    Dal,
    Glinn,
    Gil,
    Garresh,

    Trooper,

    Administrator,
    FleetCommander,

    CadetFourthClass,
    CadetThirdClass,
    CadetSecondClass,
    CadetFirstClass,

    // not specified
    DaiMon,
    Adhar,
    LorC,
    LorBB,
    LorAA,
    None
}


class AlliedMilitaryPrerequisite implements IConstructPrerequisite<Character> {

    private types: AlliedMilitaryType[];

    constructor(...alliedMilitary: AlliedMilitaryType[]) {
        this.types = alliedMilitary;
    }

    isPrerequisiteFulfilled(character: Character) {
        return character.type === CharacterType.AlliedMilitary
            && character.typeDetails
            &&  this.types.indexOf((character.typeDetails as AlliedMilitaryDetails)?.alliedMilitary?.type) >= 0;
    }
    describe(): string {
        return "";
    }
}

class NoCareerEventsPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(character: Character) {
        return character.careerEvents == null ||  character.careerEvents.length === 0;
    }

    describe(): string {
        return "";
    }
}

class HasCareerEventsPrerequisite implements IConstructPrerequisite<Character> {

    isPrerequisiteFulfilled(character: Character) {
        return character.careerEvents != null && character.careerEvents.length > 0;
    }

    describe(): string {
        return "";
    }
}


class TrackPrerequisite implements IConstructPrerequisite<Character> {
    private _track: Track;

    constructor(track: Track) {
        this._track = track;
    }

    isPrerequisiteFulfilled(character: Character) {
        return this._track === character.educationStep?.track;
    }

    describe(): string {
        return "";
    }
}

class NotTrackPrerequisite implements IConstructPrerequisite<Character> {
    private _track: Track;

    constructor(track: Track) {
        this._track = track;
    }

    isPrerequisiteFulfilled(character: Character) {
        return this._track !== character.educationStep?.track;
    }
    describe(): string {
        return "";
    }
}

class RolesPrerequisite implements IConstructPrerequisite<Character> {
    private _roles: Role[];
    private noRoleAllowed: boolean;

    constructor(roles: Role[], noRoleAllowed: boolean = false) {
        this._roles = roles;
        this.noRoleAllowed = noRoleAllowed;
    }

    isPrerequisiteFulfilled(character: Character) {
        if (character.role == null) {
            return this.noRoleAllowed;
        } else {
            return (this._roles.indexOf(character.role) > -1) || (character.secondaryRole != null && this._roles.indexOf(character.secondaryRole) >= 0);
        }
    }
    describe(): string {
        return "";
    }
}

class NotRolesPrerequisite implements IConstructPrerequisite<Character> {
    private _roles: Role[];

    constructor(roles: Role[]) {
        this._roles = roles;
    }

    isPrerequisiteFulfilled(character: Character) {
        return character.role == null ||
            (this._roles.indexOf(character.role) < 0 && (character.secondaryRole == null || this._roles.indexOf(character.secondaryRole) < 0));
    }

    describe(): string {
        return "";
    }
}

class NotEraPrerequisite implements IConstructPrerequisite<Character> {
    private _era: Era;

    constructor(era: Era) {
        this._era = era;
    }

    isPrerequisiteFulfilled(character: Character) {
        return store.getState().context.era !== this._era;
    }
    describe(): string {
        return "";
    }
}

export class RankModel {
    id: Rank|null;
    name: string;
    level: string;
    prerequisites: IConstructPrerequisite<Character>[];
    abbreviation?: string;

    constructor(id: Rank|null, name: string, level: string, prerequisites: IConstructPrerequisite<Character>[], abbreviation?: string) {
        this.id = id;
        this.level = level;
        this.abbreviation = abbreviation;
        this.name = name;
        this.prerequisites = prerequisites;
    }

    get isEnlisted() {
        return this.prerequisites.filter(p => p instanceof EnlistedPrerequisite).length > 0;
    }

    get levelValue() {
        if (this.level.length > 1) {
            return parseInt(this.level.substring(1));
        } else {
            return 0;
        }
    }

    get localizedName() {
        let key = makeKey("Rank.", Rank[this.id], ".name");
        let result = i18next.t(key);
        return key === result ? this.name : result;
    }

    get localizedAbbreviation() {
        let key = makeKey("Rank.", Rank[this.id], ".abbrev");
        let result = i18next.t(key);
        return key === result ? this.abbreviation : result;
    }
}

export class RanksHelper {

    private static _instance: RanksHelper;

    static instance(): RanksHelper {
        if (RanksHelper._instance == null) {
            RanksHelper._instance = new RanksHelper();
        }
        return RanksHelper._instance;
    }

    private _ranks: RankModel[] = [
        new RankModel(
            Rank.Captain,
            "Captain", "O6",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new NotRolesPrerequisite([Role.Admiral]),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.Starfleet, CharacterType.KlingonWarrior),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.AndorianImperialGuard, AlliedMilitaryType.TalarianMilitia)
                )
            ],
            "Capt."),
        new RankModel(
            Rank.Commander,
            "Commander", "O5",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new NotRolesPrerequisite([Role.Admiral]),
                new NotPrerequisite(new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco, AlliedMilitaryType.CardassianUnion))
            ],
            "Cmdr."),
        new RankModel(
            Rank.LtCommander,
            "Lieutenant Commander", "O4",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new NotRolesPrerequisite([Role.Admiral, Role.CommandingOfficer]),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.Starfleet),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.TalarianMilitia)
                )
            ],
            "LCdr."),
        new RankModel(
            Rank.Lieutenant,
            "Lieutenant", "O3",
            [
                new OfficerPrerequisite(),
                new NotRolesPrerequisite([Role.Admiral, Role.CommandingOfficer]),
                new AnyOfPrerequisite(
                    new AllOfPrerequisite(
                        new CharacterTypePrerequisite(CharacterType.Starfleet),
                        new CareersPrerequisite(Career.Experienced)
                    ),
                    new CharacterTypePrerequisite(CharacterType.KlingonWarrior),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.KlingonDefenceForce, AlliedMilitaryType.RomulanStarEmpire,
                        AlliedMilitaryType.AndorianImperialGuard, AlliedMilitaryType.VulcanHighCommand, AlliedMilitaryType.BajoranMilitia,
                        AlliedMilitaryType.TalarianMilitia)),
            ],
            "Lt."),
        new RankModel(
            Rank.LieutenantJG,
            "Lieutenant (Junior Grade)", "O2",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new NotRolesPrerequisite([Role.Admiral, Role.CommandingOfficer]),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.Starfleet),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.TalarianMilitia)
                )
            ],
            "Lt. (J.G.)"),
        new RankModel(
            Rank.Ensign,
            "Ensign", "O1",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new NotRolesPrerequisite([Role.ExecutiveOfficer, Role.ChiefMedicalOfficer, Role.ChiefOfSecurity, Role.ChiefEngineer, Role.CommandingOfficer]),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.Starfleet, CharacterType.KlingonWarrior),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.KlingonDefenceForce, AlliedMilitaryType.TalarianMilitia)),
            ],
            "Ens."),
        new RankModel(
            Rank.MasterChiefPettyOfficer,
            "Master Chief Petty Officer", "E9",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "MCPO"),
        new RankModel(
            Rank.MasterChiefSpecialist,
            "Master Chief Specialist", "E9",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "MCSP"),
        new RankModel(
            Rank.SeniorChiefPettyOfficer,
            "Senior Chief Petty Officer", "E8",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "SCPO"),
        new RankModel(
            Rank.SeniorChiefSpecialist,
            "Senior Chief Specialist", "E8",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "SCSP"),
        new RankModel(
            Rank.ChiefPettyOfficer,
            "Chief Petty Officer", "E7",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Chief"),
        new RankModel(
            Rank.ChiefSpecialist,
            "Chief Specialist", "E7",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Experienced, Career.Veteran),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "Chief"),
        new RankModel(
            Rank.PettyOfficer1stClass,
            "Petty Officer 1st Class", "E6",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "P.O."),
        new RankModel(
            Rank.PettyOfficer2ndClass,
            "Petty Officer 2nd Class", "E5",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "P.O."),
        new RankModel(
            Rank.PettyOfficer3rdClass,
            "Petty Officer 3rd Class", "E4",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "P.O."),
        new RankModel(
            Rank.Specialist1stClass,
            "Specialist 1st Class", "E3",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "SP"),
        new RankModel(
            Rank.Specialist2ndClass,
            "Specialist 2nd Class", "E2",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "SP"),
        new RankModel(
            Rank.Specialist3rdClass,
            "Specialist 3rd Class", "E1",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "SP"),
        new RankModel(
            Rank.Yeoman1stClass,
            "Yeoman 1st Class", "E2",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "Yeo"),
        new RankModel(
            Rank.Yeoman2ndClass,
            "Yeoman 2nd Class", "E2",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "Yeo"),
        new RankModel(
            Rank.Yeoman3rdClass,
            "Yeoman 3rd Class", "E2",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet),
                new SourcePrerequisite(Source.Core)
            ],
            "Yeo"),
        new RankModel(
            Rank.Crewman1stClass,
            "Crewman 1st Class", "E3",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Crew."),
        new RankModel(
            Rank.Crewman2ndClass,
            "Crewman 2nd Class", "E2",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Crew."),
        new RankModel(
            Rank.Crewman3rdClass,
            "Crewman 3rd Class", "E1",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Crew."),
        new RankModel(
            Rank.FleetAdmiral,
            "Fleet Admiral", "O11",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new SourcePrerequisite(Source.CommandDivision),
                new RolesPrerequisite([Role.Admiral]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Adm."),
        new RankModel(
            Rank.Admiral,
            "Admiral", "O10",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.Admiral]),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.Starfleet),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire)
                )
            ],
            "Adm."),
        new RankModel(
            Rank.ViceAdmiral,
            "Vice-Admiral", "O9",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.Admiral]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Adm."),
        new RankModel(
            Rank.RearAdmiral,
            "Rear Admiral", "O8",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new NotEraPrerequisite(Era.NextGeneration),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.Admiral]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Adm."),
        new RankModel(
            Rank.RearAdmiralLower,
            "Rear Admiral, Lower Half",  "O7",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new AnyEraPrerequisite(Era.NextGeneration, Era.PicardProdigy, Era.Discovery32),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.Admiral]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "RAdm."),
        new RankModel(
            Rank.RearAdmiralUpper,
            "Rear Admiral, Upper Half", "O8",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new AnyEraPrerequisite(Era.NextGeneration, Era.PicardProdigy, Era.Discovery32),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.Admiral]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "RAdm"),
        new RankModel(
            Rank.Commodore,
            "Commodore", "O7",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new SourcePrerequisite(Source.CommandDivision, Source.PlayersGuide),
                new RolesPrerequisite([Role.CommandingOfficer]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Comm"),
        new RankModel(
            Rank.FleetCaptain,
            "Fleet Captain",  "O7",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.CommandDivision),
                new RolesPrerequisite([Role.CommandingOfficer]),
                new CharacterTypePrerequisite(CharacterType.Starfleet)
            ],
            "Fl. Capt."),
        new RankModel(
            Rank.Civilian,
            "Civilian", "",
            [
                new AnyOfPrerequisite(new RolesPrerequisite([Role.DiplomaticAttache]), new TrackPrerequisite(Track.Laborer))
            ]),
        new RankModel(
            Rank.Sergeant,
            "Sergeant (bu')", "E5",
            [
                new EnlistedPrerequisite(),
                new NotTrackPrerequisite(Track.Laborer),
                new KlingonPrerequisite(),
            ],
            "bu'"),
        new RankModel(
            Rank.Corporal,
            "Corporal (Da')", "E4",
            [
                new EnlistedPrerequisite(),
                new NotTrackPrerequisite(Track.Laborer),
                new KlingonPrerequisite()
            ],
            "Da'"),
        new RankModel(
            Rank.Bekk,
            "Bekk (beq)", "E1",
            [
                new EnlistedPrerequisite(),
                new NotTrackPrerequisite(Track.Laborer),
                new KlingonPrerequisite()
            ],
            "beq"),
        new RankModel(
            Rank.General,
            "General", "O10",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AnyOfPrerequisite(
                    new CharacterTypePrerequisite(CharacterType.KlingonWarrior),
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco, AlliedMilitaryType.BajoranMilitia,
                        AlliedMilitaryType.AndorianImperialGuard,
                        AlliedMilitaryType.RomulanStarEmpire,
                        AlliedMilitaryType.KlingonDefenceForce)
                )
            ],
            "Gen."),
        new RankModel(
            Rank.LieutenantGeneral,
            "Lieutenant General", "O9",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Lt.Gen."),
        new RankModel(
            Rank.MajorGeneral,
            "Major General", "O8",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Maj.Gen."),
        new RankModel(
            Rank.Brigadier,
            "Brigadier", "O7",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new KlingonPrerequisite(),
            ],
            "Brig."),
        new RankModel(
            Rank.Colonel,
            "Colonel", "O6",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Veteran),
                new SourcePrerequisite(Source.PlayersGuide),
                new AnyOfPrerequisite(
                    new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco, AlliedMilitaryType.BajoranMilitia,
                        AlliedMilitaryType.RomulanStarEmpire, AlliedMilitaryType.KlingonDefenceForce),
                    new CharacterTypePrerequisite(CharacterType.KlingonWarrior)
                )
            ],
            "Col"),
        new RankModel(
            Rank.LieutenantColonel,
            "Lieutenant Colonel", "O5",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Lt.Col."),
        new RankModel(
            Rank.Major,
            "Major", "O4",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco, AlliedMilitaryType.BajoranMilitia,
                    AlliedMilitaryType.RomulanStarEmpire, AlliedMilitaryType.VulcanHighCommand)
            ],
            "Maj."),
        new RankModel(
            Rank.Captain,
            "Captain", "O3",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco, AlliedMilitaryType.BajoranMilitia)
            ],
            "Capt."),
        new RankModel(
            Rank.Lieutenant,
            "Lieutenant", "O2",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.BajoranMilitia)
            ],
            "Lt."),
        new RankModel(
            Rank.FirstLieutenant,
            "First Lieutenant", "O2",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "1st.Lt."),
        new RankModel(
            Rank.SecondLieutenant,
            "Second Lieutenant", "O1",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "2nd.Lt."),
        new RankModel(
            Rank.MasterSergeant,
            "Master Sergeant", "E8",
            [
                new EnlistedPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Sgt."),
        new RankModel(
            Rank.Sergeant,
            "Sergeant", "E5",
            [
                new EnlistedPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Sgt."),
        new RankModel(
            Rank.Corporal,
            "Corporal", "E4",
            [
                new EnlistedPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Cpl."),
        new RankModel(
            Rank.Private,
            "Private", "E1",
            [
                new SourcePrerequisite(Source.PlayersGuide),
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.Maco)
            ],
            "Pvt."),

        // Cardassian Ranks
        new RankModel(
            Rank.GrandGul,
            "Grand Gul", "O10",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Legate,
            "Legate", "O8",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Jagul,
            "Jagul", "O6",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Gul,
            "Gul", "O5",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ],
            "Gul"),
        new RankModel(
            Rank.Dal,
            "Dal / Dalin", "O3",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Glinn,
            "Glinn / Gil", "O2",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Young, Career.Experienced),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Gil,
            "Gil", "O1",
            [
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Young),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Gil,
            "Gil", "E5",
            [
                new EnlistedPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),
        new RankModel(
            Rank.Garresh,
            "Garresh / Gorr", "E1",
            [
                new EnlistedPrerequisite(),
                new CareersPrerequisite(Career.Young),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.CardassianUnion)
            ]),

        new RankModel(
            Rank.Trooper,
            "Trooper", "E1",
            [
                new EnlistedPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.AndorianImperialGuard)
            ]),

        // Romulan Star Empire
        new RankModel(
            Rank.SubCommander,
            "Sub-Commander", "O4",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire, AlliedMilitaryType.VulcanHighCommand)
            ]),
        new RankModel(
            Rank.SubLieutenant,
            "Sub-Lieutenant", "O2",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire, AlliedMilitaryType.VulcanHighCommand)
            ]),
        new RankModel(
            Rank.Centurion, // Junior officer
            "Centurion", "O1",
            [
                new SourcePrerequisite(Source.PlayersGuide),
                new OfficerPrerequisite(),
                new CareersPrerequisite(Career.Young),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire)
            ]),
        new RankModel(
            Rank.Centurion, // Enlisted
            "Centurion", "E4",
            [
                new SourcePrerequisite(Source.PlayersGuide),
                new EnlistedPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire)
            ]),
        new RankModel(
            Rank.Uhlan,
            "Uhlan", "E1",
            [
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Young),
                new EnlistedPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.RomulanStarEmpire)
            ]),

        // Vulcan High Command
        new RankModel(
            Rank.Administrator,
            "Administrator", "O10",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.VulcanHighCommand)
            ]),
        new RankModel(
            Rank.FleetCommander,
            "Fleet Commander", "O6",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CareersPrerequisite(Career.Veteran),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.VulcanHighCommand)
            ]),


        // Cadets
        new RankModel(
            Rank.CadetFirstClass, // fourth-year cadet
            "Cadet, first class", "C4",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CharacterTypePrerequisite(CharacterType.Cadet),
                new HasCareerEventsPrerequisite(),
            ],
            "Cdt."),
        new RankModel(
            Rank.CadetSecondClass, // third-year cadet
            "Cadet, second class", "C3",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CharacterTypePrerequisite(CharacterType.Cadet),
                new HasCareerEventsPrerequisite(),
            ],
            "Cdt."),
        new RankModel(
            Rank.CadetThirdClass, // second-year cadet
            "Cadet, third class", "C2",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CharacterTypePrerequisite(CharacterType.Cadet),
                new NoCareerEventsPrerequisite(),
            ],
            "Cdt."),
        new RankModel(
            Rank.CadetFourthClass,  // first year cadet
            "Cadet, fourth class", "C1",
            [
                new OfficerPrerequisite(),
                new SourcePrerequisite(Source.PlayersGuide),
                new CharacterTypePrerequisite(CharacterType.Cadet),
                new NoCareerEventsPrerequisite(),
            ],
            "Cdt."),

        new RankModel(
            Rank.DaiMon,
            "DaiMon", "O5",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.FerengiMilitary)
            ],
            "DaiMon"),
        new RankModel(
            Rank.Adhar,
            "Adhar", "O5",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.SonACommand)
            ],
            "Adhar"),
        new RankModel(
            Rank.Adhar,
            "Subadhar", "O4",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.SonACommand)
            ],
            "Subadhar"),
        new RankModel(
            Rank.LorAA,
            "Lor-AA", "O5",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.TzenkethiCoalition)
            ],
            "Lor-AA"),
        new RankModel(
            Rank.LorBB,
            "Lor-BB", "O4",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.TzenkethiCoalition)
            ],
            "Lor-BB"),
        new RankModel(
            Rank.LorC,
            "Lor-C", "O3",
            [
                new OfficerPrerequisite(),
                new AlliedMilitaryPrerequisite(AlliedMilitaryType.TzenkethiCoalition)
            ],
            "Lor-C"),
        ];

    getRanks(character: Character, ignorePrerequisites?: boolean) {
        return !ignorePrerequisites ? this._ranks.filter(r => r.prerequisites.every(p => p.isPrerequisiteFulfilled(character))) : [...this._ranks];
    }

    getRanksByType(type: CharacterType, version: number) {
        let ranks = [];
        switch (type) {
            case CharacterType.Starfleet:
                ranks = [ Rank.FleetAdmiral, Rank.Admiral, Rank.ViceAdmiral, Rank.RearAdmiral, Rank.Commodore, Rank.Captain,
                    Rank.Commander, Rank.LtCommander, Rank.Lieutenant, Rank.LieutenantJG, Rank.Ensign,
                    Rank.MasterChiefPettyOfficer,  Rank.SeniorChiefPettyOfficer, Rank.ChiefPettyOfficer, Rank.PettyOfficer1stClass,
                    Rank.PettyOfficer2ndClass, Rank.PettyOfficer3rdClass, Rank.Crewman1stClass, Rank.Crewman2ndClass,
                    Rank.Crewman3rdClass, Rank.CadetFirstClass, Rank.CadetSecondClass, Rank.CadetThirdClass,
                    Rank.CadetFourthClass]
                break;
            case CharacterType.KlingonWarrior:
                ranks = [ Rank.General, Rank.Brigadier, Rank.Colonel, Rank.Captain, Rank.Commander, Rank.Lieutenant,
                    Rank.Ensign, Rank.Sergeant, Rank.Corporal, Rank.Bekk ];
                break;
            case CharacterType.Romulan:
                ranks = [ Rank.General, Rank.Admiral, Rank.Colonel, Rank.Commander, Rank.Major, Rank.SubCommander, Rank.SubLieutenant,
                    Rank.Centurion, Rank.Uhlan ];
                break;
            case CharacterType.Cardassian:
                ranks = [ Rank.GrandGul, Rank.Legate, Rank.Jagul, Rank.Gul, Rank.Dal, Rank.Glinn, Rank.Gil,
                    Rank.Garresh ];
                break;
            case CharacterType.Ferengi:
                ranks = [ Rank.DaiMon ];
                break;
            case CharacterType.Cadet:
                ranks = [ Rank.CadetFirstClass, Rank.CadetSecondClass, Rank.CadetThirdClass, Rank.CadetFourthClass ];
                break;
        }
        return ranks.map(r => this.getRank(r))
    }

    getSortedRanks(character: Character, ignorePrerequisites?: boolean) {
        let result = this.getRanks(character, ignorePrerequisites);

        result.sort((r1, r2) => {
            return r2.levelValue - r1.levelValue;
        });

        return result;
    }

    getRank(rank: Rank) {
        let ranks = this._ranks.filter(r => r.id === rank);
        return ranks?.length ? ranks[0] : null;
    }

    getRankByName(name: string) {
        for (const rank in this._ranks) {
            const r = this._ranks[rank];
            if (r.name === name) {
                return r;
            }
        }

        return null;
    }

    getRankByRankName(name: string): Rank|undefined {
        for (const rank in this._ranks) {
            const r = this._ranks[rank];
            if (Rank[r.id] === name) {
                return r.id;
            }
        }

        return undefined;
    }

    applyRank(character: Character, rank: Rank) {
        const r = this.getRank(rank);
        character.rank = new CharacterRank(r.name, r.id);
    }

    getAdmiralRanks() {
        return [this.getRank(Rank.Admiral), this.getRank(Rank.ViceAdmiral), this.getRank(Rank.RearAdmiral)];
    }
}

export const getNameAndShortRankOf = (character: Character) => {
    if (character.rank) {
        let rank = (character.rank.id != null) ? RanksHelper.instance().getRank(character.rank.id) : RanksHelper.instance().getRankByName(character.rank?.name);
        let abbreviation = (rank && rank.localizedAbbreviation) ? rank.localizedAbbreviation : "";
        return abbreviation + " " + character.name;
    } else {
        return character.name;
    }
}

