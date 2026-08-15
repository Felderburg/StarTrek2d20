import React, { lazy, Suspense, useEffect } from 'react';
import { Department } from '../helpers/department';
import { System } from '../helpers/systems';
import { Header } from '../components/header';
import { StatView } from '../components/StatView';
import { useTranslation } from 'react-i18next';
import { makeKey } from '../common/translationKey';
import { Station } from '../common/station';
import MissionProfiles from '../helpers/missionProfiles';
import { ExportToPdfButton } from '../components/exportToPdfButton';
import WeaponBlockView from './weaponBlockView';
import TalentsBlockView from './talentsBlockView';
import { VttSelectionDialog } from '../vtt/view/VttSelectionDialog';
import { Button } from 'react-bootstrap';

const OutlineImage = lazy(
  () =>
    import(
      /* webpackChunkName: 'spaceframeOutline' */ '../components/outlineImage'
    ),
);

const NBSP = '\u00A0';

interface IStationViewProperties {
  station: Station;
}

const StationView: React.FC<IStationViewProperties> = ({ station }) => {
  useEffect(() => {
    if (station.name) {
      document.title = station.name + ' - STAR TREK ADVENTURES';
    }
  });

  const renderShields = () => {
    const shield = station.shields;
    if (shield) {
      const iterator = [];
      const iterator2 = [];
      for (let i = 1; i <= Math.max(30, Math.ceil(shield / 10) * 10); i++) {
        if (i % 10 > 5 || i % 10 === 0) {
          iterator2.push(i);
        } else {
          iterator.push(i);
        }
      }

      const pills1 = iterator.map((i) => {
        if (i <= shield) {
          return <div className="empty-pill mb-2" key={'shield-' + i}></div>;
        } else {
          return (
            <div className="empty-pill solid mb-2" key={'shield-' + i}></div>
          );
        }
      });

      const pills2 = iterator2.map((i) => {
        if (i <= shield) {
          return <div className="empty-pill mb-2" key={'shield-' + i}></div>;
        } else {
          return (
            <div className="empty-pill solid mb-2" key={'shield-' + i}></div>
          );
        }
      });

      return (
        <div className="row row-cols-2">
          <div className="d-flex flex-wrap mt-3 mb-2">{pills1}</div>
          <div className="d-flex flex-wrap mt-3 mb-2">{pills2}</div>
        </div>
      );
    } else {
      return undefined;
    }
  };

  const renderWeapons = () => {
    return (
      <div>
        <WeaponBlockView construct={station} />
      </div>
    );
  };

  const { t } = useTranslation();

  const showVttExportDialog = () => {
    VttSelectionDialog.instance.show(station);
  };

  let name = '';
  if (station.name) {
    name = station.name;
  } else {
    name = t('ViewPage.unnamedStation');
  }

  let profile = undefined;
  if (station.missionProfileStep) {
    profile = MissionProfiles.instance.getStationMissionProfileByType(
      station.missionProfileStep.type,
    );
  }

  return (
    <main>
      <Header>{name}</Header>
      <div className="row" style={{ alignItems: 'baseline' }}>
        <div className="col-md-2 view-field-label pb-2">
          {t('Construct.other.missionProfile')}:
        </div>
        <div className="col-md-4 text-white">
          <div className="view-border-bottom pb-2">
            {profile?.localizedName ?? NBSP}
          </div>
        </div>
      </div>
      <div className="row" style={{ alignItems: 'baseline' }}>
        <div className="col-md-2 view-field-label pb-2">
          {t('Construct.other.traits')}:
        </div>
        <div className="col-md-10 text-white">
          <div className="view-border-bottom pb-2">
            {station.allTraitsAsString}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6 mt-4">
          <Header level={2}>{t('Construct.other.systems')}</Header>

          <div className="row row-cols-1 row-cols-md-3 mt-3">
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Comms]))}
              value={station.systems[System.Comms]}
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Engines]))}
              value={station.systems[System.Engines]}
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Structure]))}
              value={station.systems[System.Structure]}
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Computer]))}
              value={station.systems[System.Computer]}
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Sensors]))}
              value={station.systems[System.Sensors]}
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(makeKey('Construct.system.', System[System.Weapons]))}
              value={station.systems[System.Weapons]}
              className="col mb-2"
            />
          </div>

          <Header level={2} className="mt-4">
            {t('Construct.other.departments')}
          </Header>
          <div className="row row-cols-1 row-cols-md-3 mt-3">
            <StatView
              showZero={true}
              name={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Command],
                ),
              )}
              value={
                station.departments
                  ? station.departments[Department.Command]
                  : undefined
              }
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Security],
                ),
              )}
              value={
                station.departments
                  ? station.departments[Department.Security]
                  : undefined
              }
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Science],
                ),
              )}
              value={
                station.departments
                  ? station.departments[Department.Science]
                  : undefined
              }
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(
                makeKey('Construct.department.', Department[Department.Conn]),
              )}
              value={
                station.departments
                  ? station.departments[Department.Conn]
                  : undefined
              }
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Engineering],
                ),
              )}
              value={
                station.departments
                  ? station.departments[Department.Engineering]
                  : undefined
              }
              className="col mb-2"
            />
            <StatView
              showZero={true}
              name={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Medicine],
                ),
              )}
              value={
                station.departments
                  ? station.departments[Department.Medicine]
                  : undefined
              }
              className="col mb-2"
            />
          </div>

          <div className="mt-3">
            <Suspense
              fallback={
                <div className="mt-4 text-center">
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            >
              <OutlineImage starship={station} />
            </Suspense>

            <div className="row row-cols-1 row-cols-xl-3 mb-2">
              <StatView
                showZero={true}
                name={t('Construct.other.resistance')}
                value={station.resistance}
                className="col mb-2"
                colourClass="red"
              />
              <StatView
                showZero={true}
                name={t('Construct.other.scale')}
                value={station.scale}
                className="col mb-2"
                colourClass="red"
              />
              <StatView
                showZero={true}
                name={t('Construct.other.crew')}
                value={station.crewSupport}
                className="col mb-2"
                colourClass="red"
              />

              {station.version === 1 ? (
                <StatView
                  showZero={true}
                  name={t('Construct.other.power')}
                  value={station.power}
                  className="col mb-2"
                  colourClass="red"
                />
              ) : undefined}
              <StatView
                showZero={true}
                name={t('Construct.other.dockingPorts')}
                value={station.dockingPorts}
                className="col mb-2"
                colourClass="red"
              />
              <StatView
                showZero={true}
                name={t('Construct.other.dockingScale')}
                value={station.dockingScale}
                className="col mb-2"
                colourClass="red"
              />
            </div>
          </div>
          {renderWeapons()}
        </div>
        <div className="col-xl-6 mt-4">
          <Header level={2}>{t('Construct.other.shields')}</Header>
          {renderShields()}
          <TalentsBlockView construct={station} />
        </div>
      </div>
      (
      <div className="d-flex justify-content-between">
        <div className="button-container mt-5 mb-3">
          <ExportToPdfButton construct={station} />
          <Button
            size="sm"
            className="me-3"
            onClick={() => showVttExportDialog()}
          >
            {t('Common.button.exportVtt')}
          </Button>
        </div>
      </div>
      )
    </main>
  );
};

export default StationView;
