import React from 'react';
import type { TFunction } from 'i18next';
import { InputFieldAndLabel } from '../../common/inputFieldAndLabel';
import { Header } from '../../components/header';
import D20IconButton from '../../solo/component/d20IconButton';
import type { Character } from '../../common/character';

interface IFinalDetailsViewProperties {
  character: Character;
  t: TFunction;
  showRandomName: boolean;
  showPastime: boolean;
  showLineageAndHouse: boolean;
  showAdditionalTraits: boolean;
  onNameChanged: (value: string) => void;
  onPronounsChanged: (value: string) => void;
  onPasttimeChanged: (value: string) => void;
  onLineageChanged: (value: string) => void;
  onHouseChanged: (value: string) => void;
  onAdditionalTraitsChanged: (value: string) => void;
  onRandomName: () => void;
}

export class FinalDetailsView extends React.Component<
  IFinalDetailsViewProperties,
  {}
> {
  render() {
    const {
      character,
      t,
      showRandomName,
      showPastime,
      showLineageAndHouse,
      showAdditionalTraits,
    } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-md-6 mt-4">
          <Header level={2} className="mb-3">
            {t('Construct.other.name')}
          </Header>
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <InputFieldAndLabel
              labelName={t('Construct.other.name')}
              id="name"
              onChange={(value) => this.props.onNameChanged(value)}
              value={character.name ?? ''}
            />
            {showRandomName ? (
              <div style={{ flexShrink: 0 }} className="mt-1">
                <D20IconButton onClick={() => this.props.onRandomName()} />
              </div>
            ) : undefined}
          </div>

          <div className="mt-3">
            <InputFieldAndLabel
              labelName={t('Construct.other.pronouns')}
              id="pronouns"
              onChange={(value) => this.props.onPronounsChanged(value)}
              value={character.pronouns ?? ''}
            />
            <div className="text-white mt-1">
              <small>
                <b>{t('Common.text.suggestions')}: </b>{' '}
                <i>she/her, they/them, etc.</i>
              </small>
            </div>
          </div>

          {showLineageAndHouse ? (
            <div className="mt-3">
              <div className="mb-4">
                <InputFieldAndLabel
                  labelName={t('Construct.other.lineage')}
                  id="lineage"
                  onChange={(value) => this.props.onLineageChanged(value)}
                  value={character.lineage ?? ''}
                />
                <div className="text-white mt-1">
                  <small>
                    <b>Example: </b> <i>Daughter of Martok</i> or{' '}
                    <i>Child of Koloth</i>
                  </small>
                </div>
              </div>
              <div className="mb-4">
                <InputFieldAndLabel
                  labelName={t('Construct.other.house')}
                  id="house"
                  onChange={(value) => this.props.onHouseChanged(value)}
                  value={character.house ?? ''}
                />
                <div className="text-white mt-1">
                  <small>
                    <b>Example: </b> <i>House Duras</i> or <i>House Kor</i>
                  </small>
                </div>
              </div>
            </div>
          ) : undefined}
        </div>

        <div className="col-12 col-md-6 mt-4">
          {showPastime ? (
            <div>
              <Header level={2} className="mb-3">
                {t('Construct.other.pastimes')}
              </Header>
              <div className="mt-3">
                <InputFieldAndLabel
                  labelName={t('Construct.other.pastimes')}
                  id="pastimes"
                  onChange={(value) => this.props.onPasttimeChanged(value)}
                  value={character.pastime?.join(', ') ?? ''}
                />
                <div className="text-white mt-1">
                  <small>{t('FinishPage.pastime.instruction')}</small>
                </div>
              </div>
            </div>
          ) : undefined}

          {showAdditionalTraits ? (
            <div className="mt-3">
              <Header level={2} className="mb-3">
                {t('Construct.other.additionalTraits')}
              </Header>
              <div className="mt-3">
                <InputFieldAndLabel
                  labelName={t('Construct.other.traits')}
                  id="traits"
                  onChange={(value) =>
                    this.props.onAdditionalTraitsChanged(value)
                  }
                  value={character?.additionalTraits ?? ''}
                />
                <div className="text-white mt-1">
                  <small>{t('FinishPage.trait.instruction')}</small>
                </div>
              </div>
            </div>
          ) : undefined}
        </div>
      </div>
    );
  }
}
