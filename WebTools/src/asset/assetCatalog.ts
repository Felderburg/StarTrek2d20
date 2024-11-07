import { Rank } from "../helpers/ranks";
import { Spaceframe } from "../helpers/spaceframeEnum";
import { Asset, AssetAbility, AssetStat } from "./asset";
import { AssetType } from "./assetType";

export const characterAssets = [
    new Asset(AssetType.Character, "Lieutenant James T. Kirk",
        [new AssetStat(10, 1), new AssetStat(13, 3), new AssetStat(12, 3), new AssetStat(10, 2), new AssetStat(12, 3)],
        Rank.Lieutenant, new AssetAbility("Weapon Speciality", "Ships assigned to the same point of interest increase their Military Power by 1.")),
    new Asset(AssetType.Character, "Doctor Joseph M'Benga",
        [new AssetStat(15, 4), new AssetStat(8, 1), new AssetStat(10, 2), new AssetStat(10, 2), new AssetStat(12, 3)]),
    new Asset(AssetType.Character, "MACO Squad Leader",
        [new AssetStat(10, 2), new AssetStat(15, 4), new AssetStat(4, 4), new AssetStat(8, 1), new AssetStat(10, 2)], undefined,
        new AssetAbility("Notes", "Other characters treat their Military Power as Primary in addition to any other Primary Powers they already have.")),
    new Asset(AssetType.Character, "Carol Marcus",
        [new AssetStat(10, 2), new AssetStat(8, 1), new AssetStat(12, 2), new AssetStat(14, 4), new AssetStat(9, 1)],
        undefined, new AssetAbility("Genesis Thesis", "If a character would be Missing in Action, they are instead Seriously Injured.")),
    new Asset(AssetType.Character, "Janet Wallace",
        [new AssetStat(14, 4), new AssetStat(7, 1), new AssetStat(11, 1), new AssetStat(13, 3), new AssetStat(11, 2)]),
    new Asset(AssetType.Character, "Ensign J.T. Esteban",
        [new AssetStat(8, 1), new AssetStat(12, 3), new AssetStat(15, 3), new AssetStat(14, 4), new AssetStat(10, 2)],
        Rank.Ensign),
    new Asset(AssetType.Character, "Lieutenant Lawrence Styles",
        [new AssetStat(8, 1), new AssetStat(13, 2), new AssetStat(12, 2), new AssetStat(8, 1), new AssetStat(12, 2)],
        Rank.Lieutenant, new AssetAbility("Need For Speed", "Ship assets assigned with Styles may choose to treat their Personal Power as Primary instead of the Primary Power they typically have.")),
    new Asset(AssetType.Character, "Consul St. John Talbot",
        [new AssetStat(12, 2), new AssetStat(11, 3), new AssetStat(12, 3), new AssetStat(8, 1), new AssetStat(14, 3)]),
    new Asset(AssetType.Character, "Ambassador Robert Fox",
        [new AssetStat(11, 1), new AssetStat(10, 2), new AssetStat(12, 2), new AssetStat(10, 2), new AssetStat(14, 3)],
        undefined, new AssetAbility("Notes", "If assigned with a Ship asset, Fox may use his Social Power in place of his Military Power.")),
    new Asset(AssetType.Character, "Doctor Leonard McCoy",
        [new AssetStat(16, 5), new AssetStat(10, 2), new AssetStat(11, 2), new AssetStat(14, 4), new AssetStat(11, 2)]),
    new Asset(AssetType.Character, "Lieutenant Montgomery Scott",
        [new AssetStat(10, 2), new AssetStat(11, 2), new AssetStat(13, 2), new AssetStat(14, 3), new AssetStat(12, 2)],
        Rank.Lieutenant, new AssetAbility("Notes", "If a ship would be Heavily Damaged, it has Only Minor Damage instead.")),
    new Asset(AssetType.Character, "Captain Matt Decker",
        [new AssetStat(12, 2), new AssetStat(14, 3), new AssetStat(12, 3), new AssetStat(10, 2), new AssetStat(15, 5)],
        Rank.Captain),
    new Asset(AssetType.Character, "Admiral Terral",
        [new AssetStat(11, 1), new AssetStat(10, 2), new AssetStat(14, 2), new AssetStat(15, 5), new AssetStat(16, 4)],
        Rank.Admiral),
    new Asset(AssetType.Character, "Admiral Shukar",
        [new AssetStat(8, 1), new AssetStat(14, 4), new AssetStat(13, 3), new AssetStat(10, 1), new AssetStat(16, 5)],
        Rank.Admiral),
    new Asset(AssetType.Character, "Commodore James Kormack",
        [new AssetStat(12, 1), new AssetStat(11, 3), new AssetStat(13, 3), new AssetStat(10, 1), new AssetStat(16, 5)],
        Rank.Commodore),
    new Asset(AssetType.Character, "Commodore Robert April",
        [new AssetStat(10, 1), new AssetStat(12, 2), new AssetStat(12, 2), new AssetStat(10, 1), new AssetStat(17, 5)],
        Rank.Commodore),
    new Asset(AssetType.Character, "Vice Admiral Cornwell",
        [new AssetStat(13, 3), new AssetStat(11, 2), new AssetStat(11, 3), new AssetStat(9, 1), new AssetStat(13, 3)],
        Rank.ViceAdmiral,
        new AssetAbility("Noble Sacrifice",
            "If a Ship asset would be Beyond Recovery, you may choose to lose Vice Admiral Cornwell instead. If you do, treat the ship as Heavily Damaged..")),
    new Asset(AssetType.Character, "Administrator Nancy Hedford",
        [new AssetStat(12, 2), new AssetStat(9, 2), new AssetStat(9, 1), new AssetStat(9, 1), new AssetStat(12, 2)],
        Rank.Administrator,
        new AssetAbility("Notes",
            "The first time a Tactical point of interest would escalate, it doesn’t, and Nancy Hedford cannot be used on the next campaign turn.")),
    new Asset(AssetType.Character, "Sarek",
        [new AssetStat(10, 2), new AssetStat(11, 2), new AssetStat(17, 5), new AssetStat(14, 3), new AssetStat(15, 5)]),
    new Asset(AssetType.Character, "Operative Leland",
        [new AssetStat(8, 3), new AssetStat(10, 3), new AssetStat(12, 2), new AssetStat(10, 1), new AssetStat(11, 2)],
        undefined, new AssetAbility("Notes", "Reduce the Difficulty of Personal Conflicts by 1 to a minimum of 1."))
];

export const starshipAssets = [

    new Asset(AssetType.Ship, "USS Thunderbird",
            [new AssetStat(9, 2), new AssetStat(8, 2), new AssetStat(11, 3), new AssetStat(13, 3), new AssetStat(10, 2)],
            Spaceframe.Walker,
            new AssetAbility("Advanced Sensors", "The Difficulty of Science problems is reduced by 1 to a minimum of 1.")),

    new Asset(AssetType.Ship, "USS Laika",
            [new AssetStat(10, 2), new AssetStat(9, 3), new AssetStat(8, 2), new AssetStat(12, 3), new AssetStat(9, 2)],
            Spaceframe.Shepard,
            new AssetAbility("Rugged Design", "If this ship would be heavily damaged, it is treated as having Only Minor Damage instead.")),

    new Asset(AssetType.Ship, "USS Olds",
            [new AssetStat(10, 2), new AssetStat(7, 1), new AssetStat(10, 2), new AssetStat(12, 3), new AssetStat(9, 2)],
            Spaceframe.Cardenas),

    new Asset(AssetType.Ship, "USS Jervis",
            [new AssetStat(8, 1), new AssetStat(12, 4), new AssetStat(13, 3), new AssetStat(10, 3), new AssetStat(9, 2)],
            Spaceframe.Cardenas),

    new Asset(AssetType.Ship, "USS Negrelli",
            [new AssetStat(9, 2), new AssetStat(11, 3), new AssetStat(10, 2), new AssetStat(11, 3), new AssetStat(9, 2)],
            Spaceframe.Hoover,
            new AssetAbility("Improve Hull", "If this ship rolls on the ship loss table, roll 2 dice and take the highest.")),

    new Asset(AssetType.Ship, "USS Raskova",
            [new AssetStat(8, 2), new AssetStat(14, 5), new AssetStat(9, 3), new AssetStat(9, 2), new AssetStat(9, 2)],
            Spaceframe.Malachowski),

    new Asset(AssetType.Ship, "USS Rickenbacker",
            [new AssetStat(12, 4), new AssetStat(8, 2), new AssetStat(12, 3), new AssetStat(9, 2), new AssetStat(9, 2)],
            Spaceframe.Engle,
            new AssetAbility("Advanced Sickbay", "If a character would be seriously injured, they are treated as though nothing happened.")),

    new Asset(AssetType.Ship, "USS Fletcher",
            [new AssetStat(8, 1), new AssetStat(10, 3), new AssetStat(10, 2), new AssetStat(10, 3), new AssetStat(12, 4)],
            Spaceframe.Nimitz,
            new AssetAbility("Command Ship", "The Difficulty of Social problems is reduced by 1 to a minimum of 1.")),

    new Asset(AssetType.Ship, "USS Dove's Dream",
            [new AssetStat(14, 5), new AssetStat(7, 1), new AssetStat(7, 1), new AssetStat(12, 4), new AssetStat(10, 2)],
            Spaceframe.Hiawatha),

    new Asset(AssetType.Ship, "USS Cygnus",
            [new AssetStat(7, 1), new AssetStat(8, 2), new AssetStat(15, 5), new AssetStat(11, 3), new AssetStat(10, 2)],
            Spaceframe.ScoutType,
            new AssetAbility("Notes", "When assigned to an Exploration point of interest, treat this ship’s Science Power as 12/4.")),

    new Asset(AssetType.Ship, "USS Merimac",
            [new AssetStat(10, 2), new AssetStat(11, 2), new AssetStat(13, 2), new AssetStat(14, 3), new AssetStat(12, 2)],
            Spaceframe.Constitution),

    new Asset(AssetType.Ship, "USS Kae Nemoto",
            [new AssetStat(12, 2), new AssetStat(8, 1), new AssetStat(11, 3), new AssetStat(15, 5), new AssetStat(11, 2)],
            Spaceframe.Oberth,
            new AssetAbility("Notes", "If this ship would be Heavily Damaged, it is instead Beyond Recovery.")),

    new Asset(AssetType.Ship, "USS Crossfield",
            [new AssetStat(10, 2), new AssetStat(11, 2), new AssetStat(10, 2), new AssetStat(12, 4), new AssetStat(9, 2)],
            Spaceframe.Crossfield),

    new Asset(AssetType.Ship, "USS Wallaby",
            [new AssetStat(9, 2), new AssetStat(10, 4), new AssetStat(12, 2), new AssetStat(9, 2), new AssetStat(9, 2)],
            Spaceframe.IntrepidType),

    new Asset(AssetType.Ship, "USS San Juan",
            [new AssetStat(10, 3), new AssetStat(9, 2), new AssetStat(10, 2), new AssetStat(11, 3), new AssetStat(9, 2)],
            Spaceframe.Daedalus,
            new AssetAbility("Advanced Sickbay", "If a character would be seriously injured, they are treated as though nothing happened.")),

    new Asset(AssetType.Ship, "USS Montana",
            [new AssetStat(10, 2), new AssetStat(12, 3), new AssetStat(12, 4), new AssetStat(10, 2), new AssetStat(10, 3)],
            Spaceframe.Archer),

    new Asset(AssetType.Ship, "USS Republic",
            [new AssetStat(10, 2), new AssetStat(10, 2), new AssetStat(11, 3), new AssetStat(12, 3), new AssetStat(10, 3)],
            Spaceframe.Constitution),

    new Asset(AssetType.Ship, "USS Antares",
            [new AssetStat(11, 2), new AssetStat(8, 2), new AssetStat(9, 2), new AssetStat(11, 3), new AssetStat(10, 2)],
            Spaceframe.Antares,
            new AssetAbility("Notes", "When assigned to a Routine point of interest, treat all Powers as Primary.")),

    new Asset(AssetType.Ship, "Classified",
            [new AssetStat(9, 2), new AssetStat(12, 4), new AssetStat(11, 3), new AssetStat(11, 4), new AssetStat(10, 3)],
            Spaceframe.HouYi),

    new Asset(AssetType.Ship, "Classified",
            [new AssetStat(11, 2), new AssetStat(10, 3), new AssetStat(12, 5), new AssetStat(9, 2), new AssetStat(12, 4)],
            Spaceframe.Shiva,
            new AssetAbility("Cloaking Device", "The Difficulty of Military problems is reduced by 1 to a minimum of 1."))
];

export const resourceAssets = [

    new Asset(AssetType.Resource, "Federation Diplomatic Pressure",
            [new AssetStat(), new AssetStat(10, 1), new AssetStat(), new AssetStat(), new AssetStat(12, 3)]),

    new Asset(AssetType.Resource, "Federation Military Supplies",
            [new AssetStat(), new AssetStat(12, 4), new AssetStat(), new AssetStat(9, 1), new AssetStat()]),

    new Asset(AssetType.Resource, "Cunning Ploy",
            [new AssetStat(), new AssetStat(13, 4), new AssetStat(14, 5), new AssetStat(12, 3), new AssetStat()]),

    new Asset(AssetType.Resource, "Local Resistance Group",
            [new AssetStat(), new AssetStat(12, 3), new AssetStat(), new AssetStat(), new AssetStat()],
            undefined,
            new AssetAbility("Notes", "If committed to a Tactical point of interest, the Intensity does not increase on a failure.")),

    new Asset(AssetType.Resource, "Diplomatic Aid from Allies",
            [new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(13, 3)]),

    new Asset(AssetType.Resource, "Allied Military Expedition",
            [new AssetStat(), new AssetStat(14, 5), new AssetStat(), new AssetStat(), new AssetStat()]),

    new Asset(AssetType.Resource, "Prototype Technology",
            [new AssetStat(), new AssetStat(12, 2), new AssetStat(), new AssetStat(12, 2), new AssetStat()],
            undefined,
            new AssetAbility("Notes", "At the end of the turn, 3 Progression points may be spent to add +1 to the Science or Military Power of a ship.")),

    new Asset(AssetType.Resource, "Secret Operations Team",
            [new AssetStat(), new AssetStat(13, 2), new AssetStat(13, 3), new AssetStat(), new AssetStat()]),

    new Asset(AssetType.Resource, "Criminal Contacts",
            [new AssetStat(), new AssetStat(12, 3), new AssetStat(13, 3), new AssetStat(), new AssetStat()],
            undefined,
            new AssetAbility("Notes", "Receive 1 less Progression point this turn.")),

    new Asset(AssetType.Resource, "Cutting Edge Scientific Theory",
            [new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(13, 3), new AssetStat()]),

    new Asset(AssetType.Resource, "Enterprising Freelancer",
            [new AssetStat(10, 2), new AssetStat(), new AssetStat(12, 3), new AssetStat(), new AssetStat(11, 2)]),

    new Asset(AssetType.Resource, "Federation Stockpiles",
            [new AssetStat(14, 4), new AssetStat(12, 3), new AssetStat(), new AssetStat(), new AssetStat()]),

    new Asset(AssetType.Resource, "Unexpected Local Hero",
            [new AssetStat(), new AssetStat(13, 3), new AssetStat(13, 3), new AssetStat(), new AssetStat(11, 2)],
            undefined,
            new AssetAbility("Notes", "You may prevent a Loss roll to a Character asset at the same point of interest.")),

    new Asset(AssetType.Resource, "Federation Agents",
            [new AssetStat(), new AssetStat(), new AssetStat(13, 3), new AssetStat(), new AssetStat(13, 3)]),

    new Asset(AssetType.Resource, "Retired Federation Ship",
            [new AssetStat(13, 3), new AssetStat(12, 2), new AssetStat(), new AssetStat(), new AssetStat()]),

    new Asset(AssetType.Resource, "Federation Diplomatic Talent",
            [new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(14, 4)]),

    new Asset(AssetType.Resource, "Federation Supply Chain",
            [new AssetStat(13, 3), new AssetStat(12, 2), new AssetStat(), new AssetStat(), new AssetStat()]),

    new Asset(AssetType.Resource, "Federation Diplomatic Maneuvers",
            [new AssetStat(11,2), new AssetStat(), new AssetStat(), new AssetStat(), new AssetStat(13, 3)]),

    new Asset(AssetType.Resource, "Surprising Crew Member",
            [new AssetStat(), new AssetStat(), new AssetStat(13, 3), new AssetStat(13, 3), new AssetStat()]),

    new Asset(AssetType.Resource, "Celebrated Officer Out of Retirement for One Last Mission",
            [new AssetStat(11, 2), new AssetStat(14, 5), new AssetStat(11, 2), new AssetStat(14, 4), new AssetStat(14, 5)])
]