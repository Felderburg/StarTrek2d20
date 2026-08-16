import type { ICharacterPageProperties } from '../common/iCharacterPageProperties';
import { localizedFocus } from '../components/focusHelper';

export const FocusBlockView: React.FC<ICharacterPageProperties> = ({
  character,
}) => {
  if (character.focuses) {
    const result = character.focuses.map((f, i) => (
      <div className="text-white view-border-bottom py-2" key={'focus-' + i}>
        {localizedFocus(f)}
      </div>
    ));
    return <>{result}</>;
  } else {
    return undefined;
  }
};
