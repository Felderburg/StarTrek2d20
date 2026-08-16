import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from '../../common/navigator';
import Button from 'react-bootstrap/Button';
import { Header } from '../../components/header';
import { ModalControl } from '../../components/modal';
import type { Weapon } from '../../helpers/weapons';
import {
  addStarshipWeapon,
  deleteStarshipWeapon,
  nextStarshipWorkflowStep,
} from '../../state/starshipActions';
import { store } from '../../state/store';
import { AddWeaponView, AddWeaponMode } from '../view/addWeaponView';
import { ShipBuildingBreadcrumbs } from '../view/shipBuildingBreadcrumbs';
import { IconButton } from '../../components/iconButton';
import { useTranslation } from 'react-i18next';
import { PageIdentity } from '../../pages/pageIdentity';
import type { IStarshipProperties } from '../iStarshipProperties';
import { Stereotype } from '../../common/construct';

const StarshipWeaponsPagePropertiesBase: React.FC<IStarshipProperties> = ({
  starship,
}) => {
  const { t } = useTranslation();

  const renderWeapons = () => {
    if (starship.weapons.length === 0) {
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
          {starship.weapons.map((w, i) => (
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
    store.dispatch(nextStarshipWorkflowStep());
    if (
      starship.stereotype === Stereotype.SimpleStarship ||
      starship.isSmallCraft
    ) {
      Navigation.navigateToPage(PageIdentity.FinalStarshipDetails);
    } else {
      Navigation.navigateToPage(PageIdentity.MissionProfileSelection);
    }
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
        serviceYear={starship.serviceYear}
        addWeapon={(weapon) => store.dispatch(addStarshipWeapon(weapon))}
        version={starship.version}
        mode={
          starship.isMineLayer
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
    store.dispatch(deleteStarshipWeapon(weapon));
    closeModal();
  };

  return (
    <div className="page container ms-0">
      <ShipBuildingBreadcrumbs />
      <Header>Ship Weapons</Header>

      <div className="d-flex mb-3 mt-4 ">
        <p className="me-auto mb-0">This ship has the following weapons:</p>
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
                starship.version === 1
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
        <Button onClick={() => nextPage()}>{t('Common.button.next')}</Button>
      </div>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    starship: state.starship.starship,
  };
}

export const StarshipWeaponsPageProperties = connect(mapStateToProps)(
  StarshipWeaponsPagePropertiesBase,
);
