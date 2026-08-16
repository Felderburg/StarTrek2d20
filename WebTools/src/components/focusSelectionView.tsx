import React from 'react';
import type { Character } from '../common/character';
import { InputFieldAndLabel } from '../common/inputFieldAndLabel';
import type { Department } from '../helpers/department';
import { D20IconButton } from '../solo/component/d20IconButton';
import { localizedFocus } from './focusHelper';
import {
  focusRandomTable,
  focusRandomTableWithHints,
} from '../solo/table/focusRandomTable';
import { useTranslation } from 'react-i18next';

interface IFocusSelectionProperties {
  character: Character;
  addFocus: (string) => void;
  value: string;
  randomFocusDepartment?: Department;
  suggestions?: string;
  hints?: string[];
  label?: string;
  id?: string;
}

export const FocusSelectionView: React.FC<IFocusSelectionProperties> = ({
  character,
  addFocus,
  randomFocusDepartment,
  suggestions,
  hints,
  label,
  value,
  id,
}) => {
  const { t } = useTranslation();

  id = id ?? 'focus';

  const selectRandomFocus = () => {
    let done = false;
    while (!done) {
      const focus =
        hints != null
          ? localizedFocus(
              focusRandomTableWithHints(randomFocusDepartment, hints),
            )
          : localizedFocus(focusRandomTable(randomFocusDepartment));
      if (character.focuses.indexOf(focus) < 0) {
        done = true;
        addFocus(focus);
      }
    }
  };

  if (label == null) {
    label = t('Construct.other.focus');
  }

  if (suggestions == null && hints?.length) {
    suggestions = hints.join(', ');
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <InputFieldAndLabel
          id={id}
          labelName={label}
          value={value || ''}
          className="mt-1"
          onChange={(v) => addFocus(v?.length ? v : undefined)}
        />
        <div style={{ flexShrink: 0 }} className="mt-1">
          <D20IconButton onClick={() => selectRandomFocus()} />
        </div>
      </div>
      {suggestions ? (
        <div className="py-1 text-white">
          <b>{t('Common.text.suggestions')}:</b> {suggestions}
        </div>
      ) : undefined}
    </>
  );
};
