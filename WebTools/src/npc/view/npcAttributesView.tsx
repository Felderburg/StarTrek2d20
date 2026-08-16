import React, { useEffect, useState } from 'react';
import type { ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { useTranslation } from 'react-i18next';
import { Attribute, AttributesHelper } from '../../helpers/attributes';
import { store } from '../../state/store';
import { ValueView } from '../../components/valueView';
import { makeKey } from '../../common/translationKey';
import { setNpcCharacterAttributes } from '../../state/characterActions';
import { NpcTypes } from '../model/npcType';

export const NpcAttributesView: React.FC<ICharacterProperties> = ({
  character,
}) => {
  const { t } = useTranslation();
  const [selectedAttribute, setSelectedAttribute] = useState(undefined);

  useEffect(() => {
    if (
      !character.npcGenerationStep?.attributes?.filter((a) => a != null)?.length
    ) {
      const initialAttributes = NpcTypes.attributePoints(
        character.npcGenerationStep?.type,
      ).map((a) => a - 7);
      store.dispatch(setNpcCharacterAttributes(initialAttributes));
    }
  }, [
    character.npcGenerationStep?.attributes,
    character.npcGenerationStep?.type,
  ]);

  const selectAttributeValue = (index: Attribute) => {
    if (index > -1) {
      if (selectedAttribute === undefined) {
        setSelectedAttribute(index);
      } else {
        swapAttributeValues(selectedAttribute, index);
      }
    } else {
      setSelectedAttribute(undefined);
    }
  };

  const swapAttributeValues = (from: Attribute, to: Attribute) => {
    const attributes = [...character.npcGenerationStep?.attributes];
    const fromValue = attributes[from];
    const toValue = attributes[to];
    attributes[from] = toValue;
    attributes[to] = fromValue;

    store.dispatch(setNpcCharacterAttributes(attributes));
    setSelectedAttribute(undefined);
  };

  const attributes = AttributesHelper.getAllAttributes().map((a, i) => {
    const val = (character?.npcGenerationStep?.attributes[a] ?? 0) + 7;
    const isChecked = character.speciesStep?.attributes?.includes(a);

    return (
      <tr key={i}>
        <td className="selection-header">
          {t(makeKey('Construct.attribute.', Attribute[a]))}
        </td>
        <td>
          <ValueView
            index={a}
            value={val}
            onSelect={(index) => selectAttributeValue(index)}
            isSelected={selectedAttribute === a}
          />
        </td>
        <td className="text-center">{isChecked ? '+1' : '-'}</td>
        <td className="text-center">{val + (isChecked ? 1 : 0)}</td>
      </tr>
    );
  });

  return (
    <table className="selection-list">
      <colgroup>
        <col width="46%" />
        <col width="18%" />
        <col width="18%" />
        <col width="18%" />
      </colgroup>
      <thead>
        <tr>
          <td>{t('Construct.other.attribute')}</td>
          <td>{t('SupportingCharacter.numericalValue')}</td>
          <td className="text-center">
            {t('SupportingCharacter.speciesBonus')}
          </td>
          <td className="text-center">{t('Common.text.total')}</td>
        </tr>
      </thead>
      <tbody>{attributes}</tbody>
    </table>
  );
};
