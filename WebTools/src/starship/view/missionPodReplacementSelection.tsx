import React from 'react';
import { useTranslation } from 'react-i18next';
import { Starship } from '../../common/starship';
import { SelectedTalent } from '../../common/selectedTalent';
import { RankedTalent } from '../../helpers/rankedTalent';
import SingleTalentSelectionList from '../../components/singleTalentSelectionList';
import { Header } from '../../components/header';
import { setStarshipMissionPod } from '../../state/starshipActions';
import store from '../../state/store';

interface IMissionPodReplacementSelectionProperties {
  starship: Starship;
}

const MissionPodReplacementSelection: React.FC<
  IMissionPodReplacementSelectionProperties
> = ({ starship }) => {
  const { t } = useTranslation();
  const overlaps = starship.getMissionPodOverlapTalents();
  const replacementPool = starship.getValidMissionPodReplacementTalents();

  if (starship.missionPodModel == null || overlaps.length === 0) {
    return null;
  }

  const setReplacement = (podIndex: number, talent?: SelectedTalent) => {
    const replacements = [...(starship.missionPodReplacements ?? [])];
    while (replacements.length <= podIndex) {
      replacements.push(undefined);
    }
    replacements[podIndex] = talent;
    store.dispatch(
      setStarshipMissionPod(starship.missionPodModel, replacements),
    );
  };

  return (
    <div className="mt-4">
      <Header level={2}>{t('MissionPodReplacement.title')}</Header>
      <p>{t('MissionPodReplacement.instruction')}</p>
      {overlaps.map((talent, i) => {
        const podIndex = starship.missionPodModel.talents.findIndex(
          (p) => p.name === talent.name,
        );
        return (
          <div
            key={starship.missionPodModel.id + '-replacement-' + i}
            className="mt-3"
          >
            <Header level={3}>
              {t('MissionPodReplacement.forTalent', { talent: talent.name })}
            </Header>
            <SingleTalentSelectionList
              talents={replacementPool.map(
                (r) => new RankedTalent(r, r.maxRank > 1 ? 1 : undefined),
              )}
              initialSelection={starship.missionPodReplacements?.[podIndex]}
              construct={starship}
              onSelection={(selected) => setReplacement(podIndex, selected)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MissionPodReplacementSelection;
