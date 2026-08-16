import { CHALLENGE_DICE_NOTATION } from '../common/challengeDiceNotation';
import type { ICharacterPageProperties } from '../common/iCharacterPageProperties';
import { BorgImplants } from '../helpers/borgImplant';
import { CheckBox } from './checkBox';
import { store } from '../state/store';
import {
  addCharacterBorgImplantSpeciesOption,
  removeCharacterBorgImplantSpeciesOption,
} from '../state/characterActions';
import Markdown from 'react-markdown';

export const BorgImplantSelectionView: React.FC<ICharacterPageProperties> = ({
  character,
}) => {
  const implants = BorgImplants.instance.implants.map((implant) => {
    const description =
      character.version === 1
        ? implant.localizedDescription
        : implant.localizedDescription2e;
    return (
      <tr key={'implant-' + implant.type}>
        <td>
          <CheckBox
            isChecked={
              character.speciesStep?.abilityOptions?.implants?.includes(
                implant.type,
              ) ?? false
            }
            onChanged={(_) => {
              if (
                character.speciesStep?.abilityOptions?.implants?.includes(
                  implant.type,
                )
              ) {
                store.dispatch(
                  removeCharacterBorgImplantSpeciesOption(implant.type),
                );
              } else {
                store.dispatch(
                  addCharacterBorgImplantSpeciesOption(implant.type),
                );
              }
            }}
            value={implant.name}
          />
        </td>
        <td>
          <div className="selection-header-small">
            <strong>
              {character.version === 1
                ? implant.localizedName
                : implant.localizedName2e}
            </strong>
          </div>
          {description.includes(CHALLENGE_DICE_NOTATION) ? (
            <div>replaceDiceWithArrowhead(implant.description)</div>
          ) : (
            <div>
              <Markdown className="markdown-sm">{description}</Markdown>
            </div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <table className="selection-list">
      <tbody>{implants}</tbody>
    </table>
  );
};
