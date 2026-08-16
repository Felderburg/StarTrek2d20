import type { Station } from '../common/station';
import {
  CustomStationSpaceframeStep,
  StandardStationSpaceframeStep,
  StationMissionProfileStep,
} from '../common/station';
import { StationFrame } from '../helpers/stationFrame';
import {
  ADD_STATION_WEAPON,
  CREATE_STATION,
  DELETE_STATION_WEAPON,
  MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT,
  MODIFY_STATION_CUSTOM_FRAME_SYSTEM,
  SET_STATION_ADDITIONAL_TALENTS,
  SET_STATION_CUSTOM_SCALE,
  SET_STATION_FRAME,
  SET_STATION_FRAME_APPEARANCE,
  SET_STATION_MISSION_PROFILE,
  SET_STATION_MISSION_PROFILE_TALENT,
  SET_STATION_NAME,
  SET_STATION_TRAITS,
} from './stationActions';

interface StationState {
  station?: Station;
}

const withStation = (
  state: StationState,
  action: any,
  mutate: (s: Station, action: any) => void,
): StationState => {
  const s = state.station?.copy();
  if (s) {
    mutate(s, action);
  }
  return {
    ...state,
    station: s,
  };
};

const stationReducer = (
  state: StationState = { station: undefined },
  action,
) => {
  switch (action.type) {
    case CREATE_STATION: {
      const s = action.payload.station;
      console.log('Create a station');
      return {
        ...state,
        station: s.copy(),
      };
    }
    case SET_STATION_MISSION_PROFILE:
      return withStation(state, action, (s, action) => {
        const original = s.missionProfileStep;
        s.missionProfileStep = new StationMissionProfileStep(
          action.payload.missionProfile,
        );
        if (original?.type === s.missionProfileStep?.type) {
          s.missionProfileStep.talent = original?.talent?.copy();
        }
      });
    case SET_STATION_MISSION_PROFILE_TALENT:
      return withStation(state, action, (s, action) => {
        if (s.missionProfileStep) {
          s.missionProfileStep.talent = action.payload.talent;
        }
        for (let i = 0; i < s.additionalTalents.length;) {
          if (
            s.hasBaseTalent(s.additionalTalents[i].name) &&
            s.additionalTalents[i].talentModel.maxRank === 1
          ) {
            s.additionalTalents.splice(i, 1);
          } else {
            i++;
          }
        }
      });
    case SET_STATION_NAME:
      return withStation(state, action, (s, action) => {
        s.name = action.payload.name;
      });
    case SET_STATION_CUSTOM_SCALE:
      return withStation(state, action, (s, action) => {
        if (
          s.stationFrameStep == null ||
          !(s.stationFrameStep instanceof CustomStationSpaceframeStep)
        ) {
          s.stationFrameStep = new CustomStationSpaceframeStep();
        }
        s.stationFrameStep.scale = action.payload.scale;

        for (
          let i = s.sumDepartmentPoints;
          i > s.totalAvailableDepartmentPoints;
          i = s.sumDepartmentPoints
        ) {
          let maxValue = 0;
          let indexOfMax = 0;
          for (let j = 0; j < s.departments.length; j++) {
            if (s.departments[j] >= maxValue) {
              maxValue = s.departments[j];
              indexOfMax = j;
            }
          }
          s.stationFrameStep.departments[indexOfMax] -= 1;
        }
        for (
          let i = s.sumSystemPoints;
          i > s.totalAvailableSystemPoints;
          i = s.sumSystemPoints
        ) {
          let maxValue = 0;
          let indexOfMax = 0;
          for (let j = 0; j < s.systems.length; j++) {
            if (s.systems[j] >= maxValue) {
              maxValue = s.systems[j];
              indexOfMax = j;
            }
          }
          s.stationFrameStep.systems[indexOfMax] -= 1;
        }
        for (
          let i = s.additionalTalents.length;
          i > s.freeTalentSlots;
          i = s.additionalTalents.length
        ) {
          s.additionalTalents.splice(0, 1);
        }
      });
    case MODIFY_STATION_CUSTOM_FRAME_SYSTEM:
      return withStation(state, action, (s, action) => {
        if (
          s.stationFrameStep == null ||
          !(s.stationFrameStep instanceof CustomStationSpaceframeStep)
        ) {
          s.stationFrameStep = new CustomStationSpaceframeStep();
        }
        const system = action.payload.system;
        s.stationFrameStep.systems[system] += action.payload.delta;
        if (s.stationFrameStep.systems[system] > s.maxSystemValue) {
          s.stationFrameStep.systems[system] = s.maxSystemValue;
        }
      });
    case MODIFY_STATION_CUSTOM_FRAME_DEPARTMENT:
      return withStation(state, action, (s, action) => {
        if (
          s.stationFrameStep == null ||
          !(s.stationFrameStep instanceof CustomStationSpaceframeStep)
        ) {
          s.stationFrameStep = new CustomStationSpaceframeStep();
        }
        const department = action.payload.department;
        s.stationFrameStep.departments[department] += action.payload.delta;
        if (s.stationFrameStep.departments[department] > s.maxDepartmentValue) {
          s.stationFrameStep.departments[department] = s.maxDepartmentValue;
        }
      });
    case ADD_STATION_WEAPON:
      return withStation(state, action, (s, action) => {
        s.weapons.push(action.payload.weapon);
      });
    case DELETE_STATION_WEAPON:
      return withStation(state, action, (s, action) => {
        if (s.weapons.indexOf(action.payload.weapon) >= 0) {
          s.weapons.splice(s.weapons.indexOf(action.payload.weapon), 1);
        }
      });

    case SET_STATION_ADDITIONAL_TALENTS:
      return withStation(state, action, (s, action) => {
        s.additionalTalents =
          action.payload.talents?.map((t) => t.copy()) ?? [];
      });

    case SET_STATION_TRAITS:
      return withStation(state, action, (s, action) => {
        s.traits = action.payload.traits;
      });

    case SET_STATION_FRAME_APPEARANCE:
      return withStation(state, action, (s, action) => {
        if (s?.stationFrameStep?.type === StationFrame.Custom) {
          (s.stationFrameStep as CustomStationSpaceframeStep).appearance =
            action.payload.appearance;
        }
      });
    case SET_STATION_FRAME:
      return withStation(state, action, (s, action) => {
        if (action.payload.frame === StationFrame.Custom) {
          const scale = s.scale;
          s.stationFrameStep = CustomStationSpaceframeStep.create(scale);
        } else {
          const temp = new StandardStationSpaceframeStep(action.payload.frame);
          s.stationFrameStep = temp;
          const frameModel = temp.model;
          if (frameModel.missionProfiles?.length === 1) {
            s.missionProfileStep = new StationMissionProfileStep(
              temp.model.missionProfiles[0].profile,
            );
          } else {
            s.missionProfileStep = null;
          }
          s.weapons = [];
        }
        for (let i = 0; i < s.additionalTalents.length;) {
          if (
            s.hasBaseTalent(s.additionalTalents[i].name) &&
            s.additionalTalents[i].talentModel.maxRank === 1
          ) {
            s.additionalTalents.splice(i, 1);
          } else {
            i++;
          }
        }

        for (
          let i = s.additionalTalents.length;
          i > s.freeTalentSlots;
          i = s.additionalTalents.length
        ) {
          s.additionalTalents.splice(0, 1);
        }
      });

    default:
      return state;
  }
};

export default stationReducer;
