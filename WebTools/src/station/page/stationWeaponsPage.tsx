import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Header } from '../../components/header';
import { ModalControl } from '../../components/modal';
import type { Weapon } from '../../helpers/weapons';
import { store } from '../../state/store';
import {
  AddWeaponView,
  AddWeaponMode,
} from '../../starship/view/addWeaponView';
import { IconButton } from '../../components/iconButton';
import { useTranslation } from 'react-i18next';
import { PageIdentity } from '../../pages/pageIdentity';
import type { IStationPageProperties } from '../iStationPageProperties';
import { stationMapStateToProperties } from '../iStationPageProperties';
import { useNavigate } from 'react-router';
import { LcarsFrame } from '../../components/lcarsFrame';
import {
  addStationWeapon,
  deleteStationWeapon,
} from '../../state/stationActions';
import { StationBreadcrumbs } from '../view/stationBreadcrumbs';

const StationWeaponsPageBase: React.FC<IStationPageProperties> = ({
  station,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const renderWeapons = () => {
    if (station.weapons.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={4}>{t('Common.text.none')}</td>
          </tr>
        </tbody>
      );
    } else {
      return (
        <tbody>
          {station.weapons.map((w, i) => (
            <tr key={'weapon-' + i}>
              <td className="selection-header">{w.name}</td>
              <td>
                <p className="m-0">{w.dice}</p>
              </td>
              <td>
                <p className="m-0">{w.effectsAndQualitiesAsString}</p>
              </td>
              <td className="text-end">
                <IconButton
                  variant="danger"
                  onClick={() => {
                    confirmRemove(w);
                  }}
                  icon="trash"
                />
              </td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  const nextPage = () => {
    navigate('/station/final');
  };

  const closeModal = () => {
    ModalControl.hide();
  };

  const confirmRemove = (w: Weapon) => {
    ModalControl.show(
      undefined,
      () => closeModal(),
      confirmationContents(w),
      'Delete Weapon',
    );
  };

  const showModal = () => {
    ModalControl.show('lg', () => closeModal(), modalContents(), 'Add Weapon');
  };

  const modalContents = () => {
    return (
      <AddWeaponView
        onClose={() => closeModal()}
        addWeapon={(weapon) => store.dispatch(addStationWeapon(weapon))}
        version={station.version}
        mode={
          station.isMineLayer
            ? AddWeaponMode.IncludeMines
            : AddWeaponMode.NoMines
        }
      />
    );
  };

  const confirmationContents = (w: Weapon) => {
    return (
      <div>
        Are you sure you want to delete this weapon?
        <div className="mt-4 text-center">
          <Button
            size="sm"
            className="me-3"
            onClick={() => {
              closeModal();
            }}
          >
            {t('Common.button.cancel')}
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              deleteWeapon(w);
            }}
          >
            {t('Common.button.delete')}
          </Button>
        </div>
      </div>
    );
  };

  const deleteWeapon = (weapon: Weapon) => {
    store.dispatch(deleteStationWeapon(weapon));
    closeModal();
  };

  return (
    <LcarsFrame activePage={PageIdentity.StationWeapons}>
      <div id="app">
        <div className="page container ms-0">
          <StationBreadcrumbs
            pageIdentity={PageIdentity.StationWeapons}
            station={station}
          />
          <main>
            <Header>{t('Page.title.stationWeapons')}</Header>

            <div className="d-flex mb-3 mt-4 ">
              <p className="me-auto mb-0">
                This ship has the following weapons:
              </p>
              <div className="text-end">
                <IconButton
                  className="mt-0"
                  onClick={() => showModal()}
                  icon="plus-circle"
                  title="Add"
                />
              </div>
            </div>

            <table className="selection-list">
              <thead>
                <tr>
                  <th>{t('Weapon.common.name')}</th>
                  <th>
                    {t(
                      station.version === 1
                        ? 'Weapon.common.dice'
                        : 'Weapon.common.severity',
                    )}
                  </th>
                  <th>{t('Weapon.common.qualities')}</th>
                </tr>
              </thead>
              {renderWeapons()}
            </table>

            <div className="text-end mt-4">
              <Button onClick={() => nextPage()}>
                {t('Common.button.next')}
              </Button>
            </div>
          </main>
        </div>
      </div>
    </LcarsFrame>
  );
};

export const StationWeaponsPage = connect(stationMapStateToProperties)(
  StationWeaponsPageBase,
);
