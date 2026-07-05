import { CharacterType } from "../../common/characterType";
import { D20 } from "../../common/die";
import { MissionProfileStep, ServiceRecordStep, SimpleStats, Starship } from "../../common/starship";
import RegistryNumber from "../../components/registryNumberGenerator";
import { Era } from "../../helpers/erasEnum";
import { MissionPodHelper } from "../../helpers/missionPods";
import MissionProfiles from "../../helpers/missionProfiles";
import { SpaceframeHelper } from "../../helpers/spaceframes";
import { allSystems } from "../../helpers/systems";
import { TalentsHelper } from "../../helpers/talents";
import { isSecondEdition } from "../../state/contextFunctions";
import { randomStarshipEvent } from "./randomStarshipEvent";
import { RandomStarshipCharacterType } from "./randomStarshipCharacterType";
import { ServiceRecord, ServiceRecordList } from "./serviceRecord";
import { StarshipRandomNameTable } from "./starshipNameTable";
import { SelectedTalent } from "../../common/selectedTalent";
import { BuildPoints } from "./buildPoints";
import { ShipBuildType } from "../../common/shipBuildType";
import PointAllocator from "../../helpers/pointAllocator";
import { Spaceframe } from "../../helpers/spaceframeEnum";
import { SpaceframeModel } from "../../helpers/spaceframeModel";
import StarshipWeaponRegistry from "../../helpers/weapons";

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

export const starshipGenerator = (config: IStarshipConfiguration) => {

    const shuffle = (array: number[]) => {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

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
                BuildPoints.systemPointsForType(ShipBuildType.Starship, result.serviceYear, convertStarshipType(config.type), scale))),
            shuffle(PointAllocator.allocatePointsEvenly(BuildPoints.departmentPointsForType(ShipBuildType.Starship))));
        result.spaceframeModel.name = "Classified/Unknown";
        if (config.type === RandomStarshipCharacterType.Romulan) {
            result.spaceframeModel.attacks = [
                "Disruptor Cannons",
                "Plasma Torpedoes",
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
        const talents = TalentsHelper.getStarshipOrStationTalents(result);
        if (talents?.length) {
            let model = talents[Math.floor(Math.random() * talents.length)];
            result.additionalTalents.push(new SelectedTalent(model.name));
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