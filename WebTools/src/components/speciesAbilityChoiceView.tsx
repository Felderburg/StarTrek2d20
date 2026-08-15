import Markdown from 'react-markdown';
import { ICharacterPageProperties } from '../common/iCharacterPageProperties';
import { setCharacterSpeciesAbilityChoice } from '../state/characterActions';
import store from '../state/store';
import { CheckBox } from './checkBox';

export const SpeciesAbilityChoiceView: React.FC<ICharacterPageProperties> = ({
  character,
}) => {
  const choices = character.speciesStep?.ability?.choices?.map((c) => (
    <tr key={'choice-' + c}>
      <td>
        <CheckBox
          isChecked={character.speciesStep?.abilityOptions?.choice === c}
          onChanged={(_) => {
            if (character.speciesStep?.abilityOptions?.choice === c) {
              store.dispatch(setCharacterSpeciesAbilityChoice(undefined));
            } else {
              store.dispatch(setCharacterSpeciesAbilityChoice(c));
            }
          }}
          value={c}
        />
      </td>
      <td>
        <Markdown className="markdown-sm">
          {'**' +
            character.speciesStep?.ability?.getChoiceName(c) +
            '**: ' +
            character.speciesStep?.ability?.getChoiceDescription(c)}
        </Markdown>
      </td>
    </tr>
  ));

  return (
    <table className="selection-list">
      <tbody>{choices}</tbody>
    </table>
  );
};
