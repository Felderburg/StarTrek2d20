import { CharacterType } from "../../common/characterType";
import { D20 } from "../../common/die";
import { MissionProfileStep, ServiceRecordStep, Starship } from "../../common/starship";
import RegistryNumber from "../../components/registryNumberGenerator";
import { Era } from "../../helpers/erasEnum";
import { MissionPodHelper } from "../../helpers/missionPods";
import MissionProfiles from "../../helpers/missionProfiles";
import { SpaceframeHelper } from "../../helpers/spaceframes";
import { allSystems } from "../../helpers/systems";
import { TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM, TALENT_NAME_DEDICATED_PERSONNEL, TALENT_NAME_EXPANDED_MUNITIONS, TALENT_NAME_EXPANSIVE_DEPARTMENT, TALENT_NAME_REDUNDANT_SYSTEMS, TalentsHelper } from "../../helpers/talents";
import { isSecondEdition } from "../../state/contextFunctions";
import { randomStarshipEvent } from "./randomStarshipEvent";
import { RandomStarshipCharacterType } from "./randomStarshipCharacterType";
import { ServiceRecord, ServiceRecordList } from "./serviceRecord";
import { StarshipRandomNameTable } from "./starshipNameTable";
import { SelectedTalent } from "../../common/selectedTalent";
import { BuildPoints } from "./buildPoints";
import { ShipBuildType } from "../../common/shipBuildType";
import PointAllocator from "../../helpers/pointAllocator";
import { SpaceframeModel } from "../../helpers/spaceframeModel";
import { DepartmentsHelper } from "../../helpers/department";
import { PropulsionSystemModel } from "../../helpers/propulsionSystem";

export interface IStarshipConfiguration {
    era: Era;
    campaignYear: number;
    type: RandomStarshipCharacterType;
}

const convertStarshipType = (type: RandomStarshipCharacterType) => {
    switch (type) {
        case RandomStarshipCharacterType.Romulan:
            return CharacterType.Romulan;
        case RandomStarshipCharacterType.Klingon:
            return CharacterType.KlingonWarrior;
        case RandomStarshipCharacterType.Civilian:
            return CharacterType.Civilian;
        case RandomStarshipCharacterType.Starfleet:
        default:
            return CharacterType.Starfleet;
    }
}

const determinePrefix = (starship: Starship) => {
    if (starship.type === CharacterType.Starfleet) {
        return "USS ";
    } else if (starship.type === CharacterType.KlingonWarrior) {
        return "IKS ";
    } else if (starship.type === CharacterType.Romulan) {
        return "IRW ";
    } else if (starship.type === CharacterType.Civilian && starship.spaceframeModel?.type !== CharacterType.KlingonWarrior) {
        return "SS ";
    } else {
        return "";
    }
}

const customClassNames: {[id: number] : string[]} = {
    [CharacterType.Romulan]: [
        "Alocala",
        "Amarcan",
        "Amosarr",
        "Aye Mosaram",
        "Baydron",
        "Caladan",
        "Comilius",
        "D'delitham",
        "D'dredar",
        "Delitham",
        "Delon Vastam","Deresus",
        "D'gerok",
        "D'Kazanak",
        "Draconarius",
        "D'renet",
        "D'retex",
        "D'ridren",
        "D'sera",
        "D'seren",
        "D'tavan",
        "D'theros",
        "D'valek",
        "D'vanga",
        "D'vas",
        "D'viret",
        "D'virin",
        "D'Vorix",
        "Dhelan",
        "Ferrax",
        "Galan Stelri",
        "Ganum",
        "Golgaroth",
        "Graffler",
        "Hathos",
        "Horos",
        "Ivarix",
        "Kelkarrum",
        "Khnial",
        "Klivai Vang'radai",
        "Lanora",
        "Llaihr",
        "Llaiir'Dhael",
        "Mandukam",
        "Meret",
        "Mogai ~ Norexan",
        "Moorabbin",
        "Morlasam Cl'vangas",
        "Morlasasi Stelam",
        "Mularr",
        "Narvasam'al",
        "Nei'hrr",
        "Nelvek",
        "Nir'at",
        "N'renix",
        "Ocala Sindari",
        "Phaeros",
        "Praex",
        "Prelar",
        "Ralaaram Ocala",
        "Ralek",
        "Ranajmar",
        "Ras Lovah",
        "R'daran",
        "R'derex",
        "Re'ravsam",
        "Reemea",
        "Revastal",
        "R'tan",
        "Sehin Morlatta",
        "Serex",
        "Sethen",
        "Shirekral",
        "Stelai'deletham",
        "S'ten Vastam",
        "T'varo",
        "S'ten Talasam",
        "Takaan",
        "Takara Morlatta",
        "Talas Mosarum",
        "Temar Vastaram",
        "Temar Vastari",
        "Thalan",
        "Theron",
        "Tirethi",
        "T'kairin",
        "T'kassan",
        "T'korex",
        "T'rasus",
        "T'varo",
        "Ustalam Stelas",
        "Vadak",
        "Vadaso Stelri",
        "Vas Hatham",
        "Vas Hatham (scout)",
        "Vas'deletham",
        "Vas'kalabam",
        "Vas'maklaram",
        "Vas'rosvlai",
        "Vastagor Lattam",
        "Vastagor Vastarum",
        "Vastam Cl'vangas",
        "Vastari Sanalam",
        "Vasteme",
        "Veles",
        "Venator",
        "Ventarix",
        "Veranal",
        "Vercaal",
        "Verelan Vastarum",
        "Vereleus",
        "Vespin",
        "Vidian",
        "Vithrel",
        "V'geren",
        "V'gurin",
        "V'tana",
        "V'tir"
    ]
}


export const starshipGenerator = (config: IStarshipConfiguration) => {

    const shuffle = (array: number[]) => {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }


    let result = Starship.createStandardStarship(config.era, convertStarshipType(config.type), isSecondEdition() ? 2 : 1);

    result.serviceYear = config.campaignYear;
    const frames = SpaceframeHelper.instance().getSpaceframes(result, false)
        .filter(s => result.type === CharacterType.Civilian ? true : (!s.isCivilian && !s.isSmallCraft));

    if (frames?.length) {
        result.spaceframeModel = frames[Math.floor(Math.random() * frames.length)];
    } else {
        const scales = [3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6];
        const scale = scales[Math.floor(Math.random() * scales.length)];

        result.spaceframeModel = SpaceframeModel.createCustomSpaceframe(convertStarshipType(config.type), result.serviceYear,
            shuffle(PointAllocator.allocatePointsRandomly(
                BuildPoints.systemPointsForType(ShipBuildType.Starship, result.serviceYear, convertStarshipType(config.type), scale, result.version))),
            shuffle(PointAllocator.allocatePointsEvenly(BuildPoints.departmentPointsForType(ShipBuildType.Starship))));
        result.spaceframeModel.name = "Classified/Unknown";
        if (customClassNames[result.type]?.length) {
            const names = customClassNames[result.type];
            result.spaceframeModel.name = names[Math.floor(Math.random() * names.length)] + " Class";
        }
        if (config.type === RandomStarshipCharacterType.Romulan) {
            result.spaceframeModel.attacks = [
                "Disruptor Cannons",
                "Plasma Torpedoes",
                "Tractor Beam"
            ]
        } else if (config.type === RandomStarshipCharacterType.Klingon) {
            result.spaceframeModel.attacks = [
                "Disruptor Banks",
                "Photon Torpedoes",
                "Tractor Beam"
            ]
        } else {
            result.spaceframeModel.attacks = [
                "Phaser Banks",
                "Photon Torpedoes",
                "Tractor Beam"
            ]
        }
    }

    const missionProfiles = MissionProfiles.instance.getMissionProfiles(result);

    if (missionProfiles?.length) {
        result.missionProfileStep = new MissionProfileStep(missionProfiles[Math.floor(Math.random() * missionProfiles.length)]);

        const missionProfileTalents = result.missionProfileStep?.type?.talents?.filter(
            t => result.spaceframeModel == null || result.spaceframeModel.talents.map(t => t.name).indexOf(t.name) < 0);
        if (missionProfileTalents?.length) {
            let talent = missionProfileTalents[Math.floor(Math.random() * missionProfileTalents.length)];
            result.missionProfileStep.talent = new SelectedTalent(talent.name);
        }
    }

    if (result.spaceframeModel?.isMissionPodAvailable) {
        let pods = MissionPodHelper.instance().getMissionPods(result);
        if (pods?.length) {
            result.missionPodModel = pods[Math.floor(Math.random() * pods.length)];
        }
    }

    for (let i = 0; i < result.numberOfRefits; i++) {
        let systems = allSystems().filter(s => result.getSystemValue(s) < 12);
        result.refits.push(systems[Math.floor(Math.random() * systems.length)]);
    }

    for (let i = 0; i < result.freeTalentSlots; i++) {
        if (i === 0 && (result.type === CharacterType.Romulan || (result.type === CharacterType.KlingonWarrior && result.serviceYear > 2300))) {
            let talent = TalentsHelper.getTalent("Cloaking Device");
            result.additionalTalents.push(new SelectedTalent(talent.name));
        } else {
            const talents = TalentsHelper.getStarshipOrStationTalents(result);
            if (talents?.length) {
                let model = talents[Math.floor(Math.random() * talents.length)];
                let talent = new SelectedTalent(model.name);
                if (talent.name === TALENT_NAME_DEDICATED_PERSONNEL || talent.name === TALENT_NAME_EXPANSIVE_DEPARTMENT) {
                    let departments = DepartmentsHelper.instance.getDepartments();
                    talent.department = departments[Math.floor(Math.random() * departments.length)];
                } else if (talent.name === TALENT_NAME_REDUNDANT_SYSTEMS) {
                    let systems = allSystems();
                    talent.system = systems[Math.floor(Math.random() * systems.length)];
                } else if (talent.name === TALENT_NAME_EXPANDED_MUNITIONS) {

                } else if (talent.name === TALENT_NAME_ADDITIONAL_PROPULSION_SYSTEM) {
                    let systems = PropulsionSystemModel.types;
                    talent.selection = systems[Math.floor(Math.random() * systems.length)].type;
                }
                result.additionalTalents.push(talent);
            }
        }
    }

    if (result.version > 1) {
        if (result.type === CharacterType.Starfleet && D20.roll() > 12) {

            const records = ServiceRecordList.instance.records;
            let record = records[Math.floor(Math.random() * records.length)];

            if (record.type !== ServiceRecord.AgingRelic || result.serviceYear - result.spaceframeModel.serviceYear > 20) {
                result.serviceRecordStep = new ServiceRecordStep(record);
                if (record.type === ServiceRecord.SurvivorOfX) {
                    result.serviceRecordStep.selection = randomStarshipEvent(result.spaceframeModel, result.serviceYear);
                }
                result.serviceRecordStep.specialRule = TalentsHelper.getTalent(record.specialRule);
            }
        }
    }

    if (result.type === CharacterType.Starfleet) {
        result.registry = RegistryNumber.generate(result.serviceYear, result.type, result.spaceframeModel);
    }
    result.name = determinePrefix(result)
        + StarshipRandomNameTable(config.era, config.type, result.spaceframeModel?.type, result.spaceframeModel?.id);

    return result;
}