import { test, expect, describe } from '@jest/globals';
import '../../src/helpers/species';
import {
  CustomStationSpaceframeStep,
  StandardStationSpaceframeStep,
  Station,
} from '../../src/common/station';
import { Stereotype } from '../../src/common/construct';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import { StationFrame } from '../../src/helpers/stationFrame';
import { StationFrameModel } from '../../src/helpers/stationFrameModel';
import PointAllocator from '../../src/helpers/pointAllocator';

jest.mock('i18next', () => {
  const mockI18n: any = (key: string) => key;
  mockI18n.t = (key: string) => key;
  mockI18n.use = function () {
    return this;
  };
  mockI18n.init = function () {
    return this;
  };
  mockI18n.on = function () {
    return this;
  };
  mockI18n.changeLanguage = function () {
    return Promise.resolve();
  };
  return mockI18n;
});

jest.mock('../../src/state/store', () => {
  const core2ndEdition = 1; // Source.Core2ndEdition
  return {
    getState: () => ({ context: { sources: [core2ndEdition] } }),
    dispatch: () => undefined,
  };
});

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

function createStation() {
  return Station.create(CharacterType.Starfleet, 2, Era.NextGeneration);
}

describe('Station creation (#82)', () => {
  test('creates a station with a custom frame step at the minimum scale', () => {
    const station = createStation();
    expect(station.stereotype).toBe(Stereotype.Station);
    expect(station.stationFrameStep).toBeInstanceOf(
      CustomStationSpaceframeStep,
    );
    expect(station.scale).toBe(CustomStationSpaceframeStep.MIN_SCALE);
    expect(station.version).toBe(2);
  });

  test('allocates the full system and department point totals evenly', () => {
    const station = createStation();
    expect(sum(station.systems)).toBe(station.totalAvailableSystemPoints);
    expect(sum(station.departments)).toBe(
      station.totalAvailableDepartmentPoints,
    );
    expect(station.systems).toEqual(
      PointAllocator.allocatePointsEvenly(station.totalAvailableSystemPoints),
    );
    expect(station.departments).toEqual(
      PointAllocator.allocatePointsEvenly(
        station.totalAvailableDepartmentPoints,
      ),
    );
  });

  test('copy() preserves the station data', () => {
    const station = createStation();
    station.name = 'Deep Space Nine';
    station.traits = ['Home Away from Home'];
    const copy = station.copy();
    expect(copy.name).toBe('Deep Space Nine');
    expect(copy.stereotype).toBe(Stereotype.Station);
    expect(copy.systems).toEqual(station.systems);
    expect(copy.departments).toEqual(station.departments);
    expect(copy.allTraits).toEqual([
      'Starfleet Station',
      'Home Away from Home',
    ]);
  });
});

describe('Station point totals (#82)', () => {
  test('system points grow with scale up to a 78 cap', () => {
    expect(Station.totalAvailableSystemPointsForScale(2)).toBe(38);
    expect(Station.totalAvailableSystemPointsForScale(3)).toBe(41);
    expect(Station.totalAvailableSystemPointsForScale(12)).toBe(68);
    expect(Station.totalAvailableSystemPointsForScale(16)).toBe(78);
    expect(Station.totalAvailableSystemPointsForScale(25)).toBe(78);
  });

  test('department points grow with scale up to a 30 cap', () => {
    expect(Station.totalAvailableDepartmentPointsForScale(3)).toBe(13);
    expect(Station.totalAvailableDepartmentPointsForScale(8)).toBe(13);
    expect(Station.totalAvailableDepartmentPointsForScale(12)).toBe(25);
    expect(Station.totalAvailableDepartmentPointsForScale(16)).toBe(30);
    expect(Station.totalAvailableDepartmentPointsForScale(25)).toBe(30);
  });

  test('maxSystemValue stays below the total available system points', () => {
    const station = createStation();
    expect(station.maxSystemValue).toBe(station.totalAvailableSystemPoints - 5);
  });

  test('allows departments above 5 only for stations above scale 12', () => {
    const small = createStation();
    expect(small.maxDepartmentValue).toBe(5);

    const large = createStation();
    large.stationFrameStep = new StandardStationSpaceframeStep(
      StationFrame.NarendraStationType,
    );
    expect(large.scale).toBe(13);
    expect(large.maxDepartmentValue).toBe(25);
  });
});

describe('Standard station frames (#82)', () => {
  test('Spacedock is a scale 16 frame with full points and talents', () => {
    const spacedock = StationFrameModel.getById(StationFrame.Spacedock);
    expect(spacedock).toBeDefined();
    expect(spacedock.scale).toBe(16);
    expect(sum(spacedock.systems)).toBe(
      Station.totalAvailableSystemPointsForScale(16),
    );
    expect(sum(spacedock.departments)).toBe(
      Station.totalAvailableDepartmentPointsForScale(16),
    );
    expect(spacedock.talents.some((t) => t.name === 'Command Ship')).toBe(true);
  });

  test('provides an International Space Station frame at scale 3', () => {
    const iss = StationFrameModel.getById(
      StationFrame.InternationalSpaceStation,
    );
    expect(iss).toBeDefined();
    expect(iss.scale).toBe(3);
  });
});

describe('Station traits and docking (#82)', () => {
  test('bases station traits on the character type', () => {
    expect(createStation().baseTraits).toEqual(['Starfleet Station']);
    const cardassian = Station.create(
      CharacterType.Cardassian,
      2,
      Era.NextGeneration,
    );
    expect(cardassian.baseTraits).toEqual(['Cardassian Station']);
  });

  test('computes docking ports and docking scale for large stations', () => {
    const station = createStation();
    expect(station.dockingPorts).toBe(0);

    station.stationFrameStep = new StandardStationSpaceframeStep(
      StationFrame.Spacedock,
    );
    expect(station.dockingPorts).toBe(9);
    expect(station.dockingScale).toBe(10);
  });
});
