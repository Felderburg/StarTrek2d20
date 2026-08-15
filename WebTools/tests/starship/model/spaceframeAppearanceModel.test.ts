import { test, expect, describe } from '@jest/globals';
import { SpaceframeAppearanceModel } from '../../../src/helpers/spaceframeAppearanceModel';
import { CharacterType } from '../../../src/common/characterType';
import { Era } from '../../../src/helpers/erasEnum';
import { ShipBuildType } from '../../../src/common/shipBuildType';

describe('testing spaceframe appearanace model', () => {
  test('should find shuttle models', () => {
    expect(
      SpaceframeAppearanceModel.getAllAppearanceModels(
        CharacterType.Starfleet,
        Era.NextGeneration,
        ShipBuildType.Shuttlecraft,
      ).length,
    ).toBeGreaterThan(0);
  });
});
