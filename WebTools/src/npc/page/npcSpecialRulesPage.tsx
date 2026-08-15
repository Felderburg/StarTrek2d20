import { useTranslation } from 'react-i18next';
import {
  characterMapStateToProperties,
  ICharacterProperties,
} from '../../solo/page/soloCharacterProperties';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import LcarsFrame from '../../components/lcarsFrame';
import CharacterCreationBreadcrumbs from '../../components/characterCreationBreadcrumbs';
import { PageIdentity } from '../../pages/pageIdentity';
import { Header } from '../../components/header';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import MultiTalentSelectionView from '../../components/multiTalentSelectionView';
import Markdown from 'react-markdown';
import { makeKey } from '../../common/translationKey';
import { NpcType } from '../model/npcType';
import {
  TALENT_NAME_CUSTOM_TALENT,
  TalentsHelper,
} from '../../helpers/talents';
import { RankedTalent } from '../../helpers/rankedTalent';
import { SelectedTalent } from '../../common/selectedTalent';
import store from '../../state/store';
import { setNpcCharacterTalents } from '../../state/characterActions';
import { Dialog } from '../../components/dialog';
import { isMultiSelectionTalent } from '../../helpers/isMultiSelectionTalent';
import { determineSelectedTalentExtraErrors } from '../../common/selectedTalentExtraCheck';

class Range {
  readonly min: number;
  readonly max: number;

  constructor(min: number, max: number) {
    this.min = min;
    this.max = max;
  }
}

const NpcSpecialRulesPage: React.FC<ICharacterProperties> = ({ character }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ranges = [new Range(1, 2), new Range(2, 3), new Range(4, 4)];

  useEffect(() => {
    if (character == null) {
      navigate('/npc');
    }
  }, [character, navigate]);

  const onNext = () => {
    const numberOfTalents = ranges[character.npcGenerationStep?.type ?? 0];

    if (
      numberOfTalents.min > (character.npcGenerationStep?.talents?.length ?? 0)
    ) {
      Dialog.show(
        t('NpcSpecialRulesPage.error.talents', { count: numberOfTalents.min }),
      );
    } else {
      let message = undefined;
      for (
        let i = 0;
        i < character.npcGenerationStep?.talents?.length && message == null;
        i++
      ) {
        message = determineSelectedTalentExtraErrors(
          character.npcGenerationStep.talents[i],
        );
      }

      if (message) {
        Dialog.show(message);
      } else {
        navigate('/npc/final');
      }
    }
  };

  const updateSelectedTalent = (
    rankedTalent: RankedTalent,
    selection?: SelectedTalent,
  ) => {
    let temp = [...(character.npcGenerationStep?.talents ?? [])];
    if (selection == null) {
      if (rankedTalent.rank === undefined) {
        temp = temp.filter((t) => t.talent !== rankedTalent.name);
      } else {
        let count = 0;
        temp = temp.filter((t) => {
          let result =
            t.talent !== rankedTalent.name || count + 1 !== rankedTalent.rank;
          if (t.name === rankedTalent.name) {
            count++;
          }
          return result;
        });
      }
    } else {
      if (rankedTalent.rank === undefined) {
        temp = temp.filter((t) => t.talent !== rankedTalent.name);
        temp.push(selection);
      } else {
        let count = 0;
        let index = undefined;
        temp.forEach((t, i) => {
          if (
            t.talent === rankedTalent.name &&
            count + 1 === rankedTalent.rank
          ) {
            index = i;
          }
          if (t.talent === rankedTalent.name) {
            count++;
          }
        });

        if (index === undefined) {
          temp.push(selection);
        } else {
          temp[index] = selection;
        }
      }
    }
    const numberOfTalents = ranges[character.npcGenerationStep?.type ?? 0];
    if (temp.length > numberOfTalents.max) {
      temp.splice(0, temp.length - numberOfTalents.max);
    }
    store.dispatch(setNpcCharacterTalents(temp));
  };

  let talents = character
    ? TalentsHelper.getAllAvailableTalentsForNpc(character)
    : [];

  let rankedTalents = [];
  talents.forEach((t) => {
    if (t.maxRank > 1 || isMultiSelectionTalent(t)) {
      let count =
        character.npcGenerationStep?.talents?.filter((s) => s.talent === t.name)
          ?.length ?? 0;
      for (let i = 0; i < count + 1; i++) {
        rankedTalents.push(new RankedTalent(t, i + 1));
      }
    } else {
      rankedTalents.push(new RankedTalent(t));
    }
  });

  rankedTalents.sort((t1, t2) => {
    if (t1.name === t2.name) {
      return (t1.rank ?? 0) - (t2.rank ?? 0);
    } else if (t1.name === TALENT_NAME_CUSTOM_TALENT) {
      return 1;
    } else if (t2.name === TALENT_NAME_CUSTOM_TALENT) {
      return -1;
    } else {
      return t2.name > t1.name ? -1 : 1;
    }
  });

  return character ? (
    <LcarsFrame activePage={PageIdentity.NpcSpecialRules}>
      <div id="app">
        <div className="page container ms-0">
          <CharacterCreationBreadcrumbs
            character={character}
            pageIdentity={PageIdentity.NpcSpecialRules}
          />
          <main>
            <Header>{t('Page.title.npcTalents')}</Header>
            <Markdown>
              {t(
                makeKey(
                  'NpcSpecialRulesPage.instruction.',
                  NpcType[character.npcGenerationStep?.type],
                ),
              )}
            </Markdown>

            <MultiTalentSelectionView
              construct={character}
              talents={rankedTalents}
              selections={character.npcGenerationStep?.talents ?? []}
              onSelection={(r, t) => updateSelectedTalent(r, t)}
            />

            <div className="mt-4 text-end">
              <Button
                className="mt-4"
                onClick={() => {
                  onNext();
                }}
              >
                {t('Common.button.next')}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </LcarsFrame>
  ) : undefined;
};

export default connect(characterMapStateToProperties)(NpcSpecialRulesPage);
