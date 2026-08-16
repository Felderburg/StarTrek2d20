import ReactMarkdown from 'react-markdown';
import type { Character } from '../common/character';
import { Header } from './header';
import { useTranslation } from 'react-i18next';
import { Species } from '../helpers/speciesEnum';
import { InputFieldAndLabel } from '../common/inputFieldAndLabel';
import store from '../state/store';
import D20IconButton from '../solo/component/d20IconButton';
import { localizedFocus } from './focusHelper';
import { focusRandomTableWithHints } from '../solo/table/focusRandomTable';
import { setCharacterSpeciesAbilityFocus } from '../state/characterActions';
import type { Department } from '../helpers/department';
import { hasSource } from '../state/contextFunctions';
import { Source } from '../helpers/sources';
import { SpeciesAbilityChoiceView } from './speciesAbilityChoiceView';
import { BorgImplantSelectionView } from './borgImplantSelectionView';

interface ISpeciesAbilityProperties {
  character: Character;
  showInstruction?: boolean;
  skill?: Department;
}

export const SpeciesAbilityView: React.FC<ISpeciesAbilityProperties> = ({
  character,
  showInstruction,
  skill,
}) => {
  const { t } = useTranslation();

  const selectRandomFocus = (index: number) => {
    let done = false;
    while (!done) {
      const focus = localizedFocus(focusRandomTableWithHints(skill));
      if (character.focuses.indexOf(focus) < 0) {
        done = true;
        store.dispatch(setCharacterSpeciesAbilityFocus(focus, index));
      }
    }
  };

  const renderDenobulanFocuses = () => {
    return (
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <InputFieldAndLabel
            id="speciesFocus1"
            labelName={t('Construct.other.focus1')}
            value={character.speciesStep?.abilityOptions?.focuses[0] || ''}
            className="mt-1"
            onChange={(v) =>
              store.dispatch(setCharacterSpeciesAbilityFocus(v, 0))
            }
          />
          <div style={{ flexShrink: 0 }} className="mt-1">
            <D20IconButton onClick={() => selectRandomFocus(0)} />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <InputFieldAndLabel
            id="speciesFocus2"
            labelName={t('Construct.other.focus2')}
            value={character.speciesStep?.abilityOptions?.focuses[1] || ''}
            className="mt-1"
            onChange={(v) =>
              store.dispatch(setCharacterSpeciesAbilityFocus(v, 1))
            }
          />
          <div style={{ flexShrink: 0 }} className="mt-1">
            <D20IconButton onClick={() => selectRandomFocus(1)} />
          </div>
        </div>
      </div>
    );
  };

  if (character?.speciesStep?.ability) {
    return (
      <>
        <Header level={2}>{t('Construct.other.speciesAbility')}</Header>
        {showInstruction === false ? undefined : (
          <ReactMarkdown>{t('SpeciesAbilityView.instruction')}</ReactMarkdown>
        )}

        <Header level={3}>{character.speciesStep?.ability?.name}</Header>
        <ReactMarkdown>
          {character.speciesStep?.ability?.description}
        </ReactMarkdown>

        {character.speciesStep?.species === Species.Denobulan
          ? renderDenobulanFocuses()
          : undefined}
        {character.speciesStep?.species === Species.LiberatedBorg &&
        hasSource(Source.SpeciesSourcebook) ? (
          <BorgImplantSelectionView character={character} />
        ) : undefined}
        {character.speciesStep?.ability?.isChoiceRequired ? (
          <SpeciesAbilityChoiceView character={character} />
        ) : undefined}
      </>
    );
  } else {
    return undefined;
  }
};
