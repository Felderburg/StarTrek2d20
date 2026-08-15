import React from 'react';
import { useTranslation } from 'react-i18next';
import store from '../../state/store';
import {
  CustomStationSpaceframeStep,
  StandardStationSpaceframeStep,
  Station,
} from '../../common/station';
import Eras from '../../helpers/eras';
import { CharacterTypeModel } from '../../common/characterType';
import { System } from '../../helpers/systems';
import { Department } from '../../helpers/department';
import MissionProfiles from '../../helpers/missionProfiles';

interface IStationProfileProperties {
  showProfile: boolean;
  close: () => void;
}

const StationProfileView: React.FC<IStationProfileProperties> = ({
  showProfile,
  close,
}) => {
  const { t } = useTranslation();
  const station = store.getState().station?.station as Station;
  const containerClass = showProfile
    ? 'sheet-container sheet-container-visible pe-3'
    : 'sheet-container sheet-container-hidden pe-3';
  const eraModel =
    station?.era != null ? Eras.instance.getEra(station?.era) : null;

  const talents = station?.talents
    .filter((t) => !t.talentModel.isSpecialRule(station.version))
    .map((t, i) => {
      return <div key={'talent-' + i}>{t.displayName}</div>;
    });

  const weapons = station
    ?.determineWeapons()
    ?.map((w, i) => <div key={'weapon-' + i}>{w.name}</div>);

  return (
    <div id="character-sheet">
      <div
        id="character-sheet"
        className={showProfile ? 'sheet-visible' : 'sheet-hidden'}
      >
        <div
          className="sheet-bg"
          id="sheet-bg"
          style={{ display: showProfile ? '' : 'none' }}
          onClick={() => close()}
        ></div>
        <div className={containerClass} id="sheet-container">
          <div className="row">
            <div className="col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.stationType')}
                </div>
                <div className="sheet-data">
                  {CharacterTypeModel.getByType(station?.type)?.localizedName}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.era')}
                </div>
                <div className="sheet-data">
                  {eraModel?.localizedName ?? ''}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.name')}
                </div>
                <div className="sheet-data">{station?.name ?? ''}</div>
              </div>

              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.spaceFrame')}
                </div>
                <div className="sheet-data">
                  {station?.stationFrameStep == null
                    ? ''
                    : station?.stationFrameStep instanceof
                        CustomStationSpaceframeStep
                      ? 'Custom'
                      : (
                          station.stationFrameStep as StandardStationSpaceframeStep
                        )?.model?.localizedName}
                </div>
              </div>

              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.scale')}
                </div>
                <div className="sheet-data">{station?.scale ?? 3}</div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase flex-shrink-0">
                  {t('Construct.other.traits')}
                </div>
                <div className="sheet-data">
                  {station?.allTraitsAsString ?? ''}
                </div>
              </div>

              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase">
                  {t('Construct.other.missionProfile')}
                </div>
                <div className="sheet-data">
                  {station?.missionProfileStep == null
                    ? ''
                    : MissionProfiles.instance.getStationMissionProfileByType(
                        station.missionProfileStep?.type,
                      ).localizedName}
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.comms')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Comms]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.computer')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Computer]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.engines')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Engines]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.sensors')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Sensors]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.structure')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Structure]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-purple text-uppercase">
                      {t('Construct.system.weapons')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.systems[System.Weapons]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.command')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Command]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.conn')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Conn]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.security')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Security]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.engineering')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Engineering]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.science')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Science]}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="sheet-panel d-flex mw-100">
                    <div className="sheet-label-orange text-uppercase">
                      {t('Construct.department.medicine')}
                    </div>
                    <div className="sheet-data text-center">
                      {station?.departments[Department.Medicine]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase flex-shrink-0">
                  {t('Construct.other.talents')}
                </div>
                <div className="sheet-data">{talents}</div>
              </div>
            </div>

            <div className="col-12 col-md-6 mb-2">
              <div className="sheet-panel d-flex">
                <div className="sheet-label-purple text-uppercase flex-shrink-0">
                  {t('Construct.other.weapons')}
                </div>
                <div className="sheet-data">{weapons}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationProfileView;
