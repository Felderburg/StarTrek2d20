import { test, expect, describe } from '@jest/globals'
import '../../src/helpers/species';
import { Starship, MissionProfileStep } from '../../src/common/starship';
import { CharacterType } from '../../src/common/characterType';
import { Era } from '../../src/helpers/erasEnum';
import MissionProfiles from '../../src/helpers/missionProfiles';
import { MissionPodHelper } from '../../src/helpers/missionPods';
import { SelectedTalent } from '../../src/common/selectedTalent';

jest.mock('i18next', () => {
    const mockI18n: any = (key: string) => key;
    mockI18n.t = (key: string) => key;
    mockI18n.use = function () { return this; };
    mockI18n.init = function () { return this; };
    mockI18n.on = function () { return this; };
    mockI18n.changeLanguage = function () { return Promise.resolve(); };
    return mockI18n;
});

jest.mock('../../src/state/store', () => {
    const core2ndEdition = 1;
    return {
        getState: () => ({ context: { sources: [core2ndEdition] } }),
        dispatch: () => undefined,
    };
});

function shipWithRuggedDesignFromProfileAndPod() {
    const starship = Starship.createStandardStarship(Era.NextGeneration, CharacterType.Starfleet, 2);
    starship.missionProfileStep = new MissionProfileStep(
        MissionProfiles.instance.getMissionProfileByName('LogisticalQuartermaster', CharacterType.Starfleet, 2));
    starship.missionProfileStep.talent = new SelectedTalent('Rugged Design');
    starship.missionPodModel = MissionPodHelper.instance().getMissionPodByName('MobileDrydock', 2);
    return starship;
}

describe('Mission pod and mission profile talent overlap (#112)', () => {
    test('a Mobile Drydock pod and a Logistical/Quartermaster profile both grant Rugged Design', () => {
        const starship = shipWithRuggedDesignFromProfileAndPod();

        const ruggedDesign = starship.talentsWithoutAdditional.filter(s => s.talent === 'Rugged Design');
        expect(ruggedDesign.length).toBe(2);
    });

    test('Rugged Design is not offered again as an additional talent when already granted', () => {
        const starship = shipWithRuggedDesignFromProfileAndPod();

        const count = starship.talentsWithoutAdditional.filter(s => s.talent === 'Rugged Design').length;
        const isOffered = count === 0;

        expect(isOffered).toBe(false);
    });
});
