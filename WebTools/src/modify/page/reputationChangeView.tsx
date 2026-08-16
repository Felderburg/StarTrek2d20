import Markdown from 'react-markdown';
import { Header } from '../../components/header';
import type { ICharacterProperties } from '../../solo/page/soloCharacterProperties';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Dialog } from '../../components/dialog';
import store from '../../state/store';
import { NumericValueChangeView } from './numericValueChangeView';
import { modifyCharacterReputation } from '../../state/characterActions';

interface IReputationChangeViewProperties extends ICharacterProperties {
  onNextStep: () => void;
  onPreviousStep: () => void;
}

export const ReputationChangeView: React.FC<
  IReputationChangeViewProperties
> = ({ character, onNextStep, onPreviousStep }) => {
  const { t } = useTranslation();
  const [changeAmount, setChangeAmount] = useState<number>(0);

  const applyModification = () => {
    if (changeAmount === 0) {
      Dialog.show('Please increment or derement your reputation.');
    } else {
      store.dispatch(modifyCharacterReputation(changeAmount));
      onNextStep();
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 mt-4">
          <Header level={2}>{t('ModificationType.name.reputation')}</Header>
          <Markdown className="mt-4">
            {t('ReputationChangePage.instruction')}
          </Markdown>

          <NumericValueChangeView
            value={character.reputation + changeAmount}
            deltaValue={changeAmount}
            showIncrease={character.reputation < 5 && changeAmount <= 0}
            showDecrease={character.reputation > 0 && changeAmount >= 0}
            onDecrease={() => setChangeAmount(Math.max(-1, changeAmount - 1))}
            onIncrease={() => setChangeAmount(Math.min(1, changeAmount + 1))}
            label={t('ModificationType.name.reputation')}
          />
        </div>
      </div>

      <div className="mt-5 d-flex justify-content-between">
        <Button size="sm" onClick={() => onPreviousStep()}>
          {t('Common.button.previous')}
        </Button>
        <Button size="sm" onClick={() => applyModification()}>
          {t('Common.button.finish')}
        </Button>
      </div>
    </>
  );
};
