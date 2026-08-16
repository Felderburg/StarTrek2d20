import React, { useState } from 'react';
import { Navigation } from '../common/navigator';
import { PageIdentity } from './pageIdentity';
import type { EarlyOutlook, EarlyOutlookModel } from '../helpers/upbringings';
import { UpbringingsHelper } from '../helpers/upbringings';
import Button from 'react-bootstrap/Button';
import InstructionText from '../components/instructionText';
import CharacterCreationBreadcrumbs from '../components/characterCreationBreadcrumbs';
import store from '../state/store';
import { setCharacterEarlyOutlook } from '../state/characterActions';
import type { ICharacterProperties } from '../solo/page/soloCharacterProperties';
import { characterMapStateToProperties } from '../solo/page/soloCharacterProperties';
import { Header } from '../components/header';
import { useTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';
import { Department } from '../helpers/department';
import { Window } from '../common/window';
import { AttributesHelper } from '../helpers/attributes';
import {
  earlyOutlookAspirationRandomTable,
  earlyOutlookCasteRandomTable,
  earlyOutlookUpbringingRandomTable,
} from '../solo/table/earlyOutlookRandomTable';
import { connect } from 'react-redux';
import { Stereotype } from '../common/construct';
import { hasSource } from '../state/contextFunctions';
import { Source } from '../helpers/sources';
import { DisciplinesOrDepartments } from '../view/disciplinesOrDepartments';
import { isKlingonWarriorType } from '../helpers/klingonWarrior';
import { PageHistoryBasedPreviousButton } from '../components/pageHistoryBasedPreviousButton';

enum EarlyOutlookTab {
  Upbringings,
  Castes,
  Aspirations,
}

const EarlyOutlookPage: React.FC<ICharacterProperties> = ({ character }) => {
  const determineInitialTab = (outlook?: EarlyOutlook) => {
    if (outlook == null && !isKlingonWarriorType(character.type)) {
      return EarlyOutlookTab.Upbringings;
    } else if (outlook == null) {
      return EarlyOutlookTab.Castes;
    } else if (UpbringingsHelper.isAspiration(outlook)) {
      return EarlyOutlookTab.Aspirations;
    } else if (UpbringingsHelper.isCaste(outlook)) {
      return EarlyOutlookTab.Castes;
    } else {
      return EarlyOutlookTab.Upbringings;
    }
  };

  const { t } = useTranslation();
  const initialOutlook = character?.upbringingStep?.upbringing?.id;
  const [tab, setTab] = useState(determineInitialTab(initialOutlook));
  const [randomUpbringing, setRandomUpbringing] = useState(
    initialOutlook != null && UpbringingsHelper.isUpbringing(initialOutlook)
      ? initialOutlook
      : null,
  );
  const [randomAsperation, setRandomAsperation] = useState(
    initialOutlook != null && UpbringingsHelper.isAspiration(initialOutlook)
      ? initialOutlook
      : null,
  );
  const [randomCaste, setRandomCaste] = useState(
    initialOutlook != null && UpbringingsHelper.isCaste(initialOutlook)
      ? initialOutlook
      : null,
  );

  const selectOutlook = (outlook: EarlyOutlookModel) => {
    store.dispatch(setCharacterEarlyOutlook(outlook));
    if (character.stereotype === Stereotype.SoloCharacter) {
      Navigation.navigateToPage(PageIdentity.SoloEarlyOutlookDetails);
    } else {
      Navigation.navigateToPage(PageIdentity.UpbringingDetails);
    }
  };

  const renderTab = () => {
    switch (tab) {
      case EarlyOutlookTab.Upbringings:
        return renderUpbringingsTab();
      case EarlyOutlookTab.Aspirations:
        return renderAspirationsTab();
      case EarlyOutlookTab.Castes:
      default:
        return renderCastessTab();
    }
  };

  const toTableRow = (u, i) => {
    const disciplines = u.disciplines.map((d, i) => {
      return (
        <div key={i}>{t(makeKey('Construct.discipline.', Department[d]))}</div>
      );
    });

    if (Window.isCompact()) {
      return (
        <tr
          key={i}
          onClick={() => {
            selectOutlook(u);
          }}
        >
          <td className="selection-header">{u.localizedName}</td>
          <td>
            ACCEPT
            <br />
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeAcceptPlus2),
                ),
              )}{' '}
              +2
            </div>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeAcceptPlus1),
                ),
              )}{' '}
              +1
            </div>
            <br />
            REBEL
            <br />
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeRebelPlus2),
                ),
              )}{' '}
              +2
            </div>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeRebelPlus1),
                ),
              )}{' '}
              +1
            </div>
          </td>
          <td>{disciplines}</td>
        </tr>
      );
    } else {
      return (
        <tr key={i}>
          <td className="selection-header">{u.localizedName}</td>
          <td>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeAcceptPlus2),
                ),
              )}{' '}
              +2
            </div>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeAcceptPlus1),
                ),
              )}{' '}
              +1
            </div>
          </td>
          <td>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeRebelPlus2),
                ),
              )}{' '}
              +2
            </div>
            <div>
              {t(
                makeKey(
                  'Construct.attribute.',
                  AttributesHelper.getAttributeName(u.attributeRebelPlus1),
                ),
              )}{' '}
              +1
            </div>
          </td>
          <td>{disciplines}</td>
          <td className="text-end">
            <Button
              size="sm"
              onClick={() => {
                selectOutlook(u);
              }}
            >
              {t('Common.button.select')}
            </Button>
          </td>
        </tr>
      );
    }
  };

  const renderUpbringingsTab = () => {
    let settingsList = UpbringingsHelper.getUpbringings();
    if (randomUpbringing != null) {
      settingsList = [UpbringingsHelper.getUpbringing(randomUpbringing)];
    }
    const settingRows = settingsList.map((e, i) => toTableRow(e, i));

    return (
      <>
        <div className="my-4">
          <Button
            size="sm"
            className="me-3"
            onClick={() =>
              setRandomUpbringing(earlyOutlookUpbringingRandomTable())
            }
          >
            <>
              <img
                src="/static/img/d20.svg"
                style={{ height: '24px', aspectRatio: '1' }}
                className="me-1"
                alt={t('Common.button.random')}
              />{' '}
              {t('Common.button.random')}
            </>
          </Button>
          {randomUpbringing != null ? (
            <Button
              size="sm"
              className="me-3"
              onClick={() => setRandomUpbringing(null)}
            >
              {t('Common.button.showAll')}
            </Button>
          ) : undefined}
        </div>

        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>{t('Construct.other.attributes')}</b>
              </td>
              <td></td>
              <td>
                <b>
                  <DisciplinesOrDepartments character={character} />
                </b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{settingRows}</tbody>
        </table>

        <div className="mt-4 d-flex justify-content-end">
          <PageHistoryBasedPreviousButton />
        </div>
      </>
    );
  };

  const renderCastessTab = () => {
    let settingsList = UpbringingsHelper.getCastes();
    if (randomCaste != null) {
      settingsList = [UpbringingsHelper.getCaste(randomCaste)];
    }
    const settingRows = settingsList.map((e, i) => toTableRow(e, i));

    return (
      <>
        <div className="my-4">
          <Button
            className="btn btn-primary btn-sm me-3"
            onClick={() => setRandomCaste(earlyOutlookCasteRandomTable())}
          >
            <>
              <img
                src="/static/img/d20.svg"
                style={{ height: '24px', aspectRatio: '1' }}
                className="me-1"
                alt={t('Common.button.random')}
              />{' '}
              {t('Common.button.random')}
            </>
          </Button>
          {randomCaste != null ? (
            <Button
              className="btn btn-primary btn-sm me-3"
              onClick={() => setRandomCaste(null)}
            >
              {t('Common.button.showAll')}
            </Button>
          ) : undefined}
        </div>

        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>{t('Construct.other.attributes')}</b>
              </td>
              <td></td>
              <td>
                <b>
                  <DisciplinesOrDepartments character={character} />
                </b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{settingRows}</tbody>
        </table>

        <div className="mt-4 d-flex justify-content-end">
          <PageHistoryBasedPreviousButton />
        </div>
      </>
    );
  };

  const renderAspirationsTab = () => {
    let settingsList = UpbringingsHelper.getAspirations();
    if (randomAsperation != null) {
      settingsList = [UpbringingsHelper.getAspiration(randomAsperation)];
    }
    const settingRows = settingsList.map((e, i) => toTableRow(e, i));

    return (
      <>
        <div className="my-4">
          <Button
            size="sm"
            className="me-3"
            onClick={() =>
              setRandomAsperation(earlyOutlookAspirationRandomTable())
            }
          >
            <>
              <img
                src="/static/img/d20.svg"
                style={{ height: '24px', aspectRatio: '1' }}
                className="me-1"
                alt={t('Common.button.random')}
              />{' '}
              {t('Common.button.random')}
            </>
          </Button>
          {randomAsperation != null ? (
            <Button
              size="sm"
              className="me-3"
              onClick={() => setRandomAsperation(null)}
            >
              {t('Common.button.showAll')}
            </Button>
          ) : undefined}
        </div>

        <table className="selection-list">
          <thead>
            <tr>
              <td></td>
              <td>
                <b>{t('Construct.other.attributes')}</b>
              </td>
              <td></td>
              <td>
                <b>
                  <DisciplinesOrDepartments character={character} />
                </b>
              </td>
              <td></td>
            </tr>
          </thead>
          <tbody>{settingRows}</tbody>
        </table>

        <div className="mt-4 d-flex justify-content-end">
          <PageHistoryBasedPreviousButton />
        </div>
      </>
    );
  };

  return (
    <div className="page container ms-0">
      <CharacterCreationBreadcrumbs pageIdentity={PageIdentity.Upbringing} />
      <Header>{t('Page.title.soloEarlyOutlook')}</Header>

      <InstructionText
        text={
          isKlingonWarriorType(character.type)
            ? t('EarlyOutlookPage.instruction.klingon')
            : t('EarlyOutlookPage.instruction')
        }
      />

      <div
        className="btn-group w-100"
        role="group"
        aria-label="Early Outlook Types"
      >
        {character.stereotype === Stereotype.SoloCharacter ||
        !isKlingonWarriorType(character.type) ? (
          <button
            type="button"
            className={
              'btn btn-info btn-sm p-2 text-center ' +
              (tab === EarlyOutlookTab.Upbringings ? 'active' : '')
            }
            onClick={() => setTab(EarlyOutlookTab.Upbringings)}
          >
            {t('SoloEarlyOutlookPage.upbringings')}
          </button>
        ) : undefined}
        {character.stereotype === Stereotype.SoloCharacter ||
        isKlingonWarriorType(character.type) ? (
          <button
            type="button"
            className={
              'btn btn-info btn-sm p-2 text-center ' +
              (tab === EarlyOutlookTab.Castes ? 'active' : '')
            }
            onClick={() => setTab(EarlyOutlookTab.Castes)}
          >
            {t('SoloEarlyOutlookPage.castes')}
          </button>
        ) : undefined}
        {hasSource(Source.PlayersGuide) ? (
          <button
            type="button"
            className={
              'btn btn-info btn-sm p-2 text-center ' +
              (tab === EarlyOutlookTab.Aspirations ? 'active' : '')
            }
            onClick={() => setTab(EarlyOutlookTab.Aspirations)}
          >
            {t('SoloEarlyOutlookPage.aspirations')}
          </button>
        ) : undefined}
      </div>

      {renderTab()}
    </div>
  );
};

export default connect(characterMapStateToProperties)(EarlyOutlookPage);
