import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Eras, { EraModel, eraDefaultYear } from '../../helpers/eras';
import { Window } from '../../common/window';
import Button from 'react-bootstrap/Button';
import { navigateTo, Navigation } from '../../common/navigator';
import { PageIdentity } from '../../pages/pageIdentity';
import { setEra } from '../../state/contextActions';
import store from '../../state/store';
import {
  eraRandomTable,
  eraRandomTableForStarships,
} from '../table/eraRandomTable';
import { Stereotype } from '../../common/construct';
import {
  createStarship,
  setStarshipServiceYear,
} from '../../state/starshipActions';
import { Starship } from '../../common/starship';
import { Header } from '../../components/header';
import { Era } from '../../helpers/erasEnum';

interface ISoloEraSelectionPage {
  stereotype: Stereotype;
}

const SoloEraSelectionPage: React.FC<ISoloEraSelectionPage> = ({
  stereotype,
}) => {
  const { t } = useTranslation();
  const [randomEra, setRandomEra] = useState(null);

  const eraSelected = (era: Era) => {
    store.dispatch(setEra(era));
    if (stereotype === Stereotype.SoloStarship) {
      const starship = store.getState().starship?.starship;
      const serviceYear = eraDefaultYear(era);
      if (
        starship?.serviceYear != null &&
        starship?.serviceYear !== serviceYear
      ) {
        const newStarship = Starship.createSoloStarship(era);
        newStarship.serviceYear = serviceYear;
        store.dispatch(createStarship(newStarship));
      } else {
        store.dispatch(setStarshipServiceYear(eraDefaultYear(era)));
      }
      Navigation.navigateToPage(PageIdentity.SoloStarshipSpaceframe);
    } else {
      Navigation.navigateToPage(PageIdentity.SoloSpecies);
    }
  };

  const toTableRow = (e: EraModel, i: number) => {
    return (
      <tr
        key={i}
        onClick={() => {
          if (Window.isCompact()) eraSelected(e.id);
        }}
      >
        <td className="selection-header">{e.localizedName}</td>
        <td className="text-end">
          <Button
            size="sm"
            onClick={() => {
              eraSelected(e.id);
            }}
          >
            {t('Common.button.select')}
          </Button>
        </td>
      </tr>
    );
  };

  const eras =
    randomEra != null
      ? toTableRow(Eras.instance.getEra(randomEra), 0)
      : stereotype === Stereotype.SoloStarship
        ? Eras.instance.getEras().map((e, i) => toTableRow(e, i))
        : Eras.instance.getBasicEras().map((e, i) => toTableRow(e, i));

  return (
    <div className="page container ms-0">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a
              href="/index.html"
              onClick={(e) => navigateTo(e, PageIdentity.Home)}
            >
              {t('Page.title.home')}
            </a>
          </li>
          <li className="breadcrumb-item">
            <a
              href="/index.html"
              onClick={(e) => navigateTo(e, PageIdentity.SourceSelection)}
            >
              {t('Page.title.sourceSelection')}
            </a>
          </li>
          <li className="breadcrumb-item">
            <a
              href="/index.html"
              onClick={(e) => navigateTo(e, PageIdentity.SoloConstructType)}
            >
              {t('Page.title.soloConstructType')}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {t('Page.title.era')}
          </li>
        </ol>
      </nav>

      <Header>{t('Page.title.era')}</Header>
      <p className="mt-3">{t('SoloEraSelectionPage.instruction')}</p>
      <div className="my-4">
        <Button
          size="sm"
          className="me-3"
          onClick={() =>
            setRandomEra(
              stereotype === Stereotype.SoloStarship
                ? eraRandomTableForStarships()
                : eraRandomTable(),
            )
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
        {randomEra != null ? (
          <Button size="sm" className="me-3" onClick={() => setRandomEra(null)}>
            {t('Common.button.showAll')}
          </Button>
        ) : undefined}
      </div>
      <table className="selection-list">
        <tbody>{eras}</tbody>
      </table>
    </div>
  );
};

export default SoloEraSelectionPage;
