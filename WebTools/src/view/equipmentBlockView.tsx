import React from 'react';
import { Implant } from '../helpers/borgImplant';
import type { ICharacterPageProperties } from '../common/iCharacterPageProperties';

const EquipmentBlockView: React.FC<ICharacterPageProperties> = ({
  character,
}) => {
  if (character?.equipmentAndImplants) {
    return (
      <>
        {character?.equipmentAndImplants?.map((e, i) =>
          e instanceof Implant && character.version > 1 ? (
            <div
              className="text-white view-border-bottom py-2"
              key={'equipment-' + i}
            >
              {e.localizedName2e}
            </div>
          ) : (
            <div
              className="text-white view-border-bottom py-2"
              key={'equipment-' + i}
            >
              {e.localizedName}
            </div>
          ),
        )}
      </>
    );
  } else {
    return undefined;
  }
};

export default EquipmentBlockView;
