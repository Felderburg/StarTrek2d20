import { useTranslation } from 'react-i18next';
import { IStarshipProperties } from '../iStarshipProperties';
import { Header } from '../../components/header';
import { InputFieldAndLabel } from '../../common/inputFieldAndLabel';
import { BuildPoints } from '../model/buildPoints';
import store from '../../state/store';
import {
  changeStarshipSpaceframeClassName,
  changeStarshipSpaceframeDepartment,
  changeStarshipSpaceframeScale,
  changeStarshipSpaceframeServiceYear,
  changeStarshipSpaceframeSystem,
  setStarshipSpaceframeAppearance,
} from '../../state/starshipActions';
import PointAllocator from '../../helpers/pointAllocator';
import { allSystems, System } from '../../helpers/systems';
import { StatControl } from './statControl';
import { makeKey } from '../../common/translationKey';
import Markdown from 'react-markdown';
import { SpaceframeAppearanceModel } from '../../helpers/spaceframeAppearanceModel';
import {
  DropDownElement,
  DropDownSelect,
} from '../../components/dropDownInput';
import { SpaceframeAppearance } from '../../helpers/spaceframeAppearance';
import { Department, DepartmentsHelper } from '../../helpers/department';

class SystemValue {
  system: System;
  value: number;

  constructor(system: System, value: number) {
    this.system = system;
    this.value = value;
  }
}

const CustomSpaceframeView: React.FC<IStarshipProperties> = ({ starship }) => {
  const { t } = useTranslation();

  const setScale = (delta: number) => {
    let newScale = starship.scale + delta;
    let systems = [...starship.systems];
    let sum = starship.spaceframeModel?.sumSystemPoints ?? 0;
    let newTotalPoints = BuildPoints.systemPointsForType(
      starship.buildType,
      starship.spaceframeModel.serviceYear,
      starship.type,
      newScale,
      starship.version,
    );
    let systemDelta =
      newTotalPoints -
      BuildPoints.systemPointsForType(
        starship.buildType,
        starship.spaceframeModel.serviceYear,
        starship.type,
        starship.scale,
        starship.version,
      );
    store.dispatch(changeStarshipSpaceframeScale(delta));
    if (delta < 0 && sum > newTotalPoints) {
      let max = 0;
      let system = allSystems()[0];
      allSystems().forEach((s) => {
        if (systems[s] >= max) {
          max = systems[s];
          system = s;
        }
      });

      store.dispatch(changeStarshipSpaceframeSystem(systemDelta, system));
    }
  };

  const canIncreaseScale = () => {
    return starship.scale < 7;
  };

  const canDecreaseScale = () => {
    return starship.scale > 1;
  };

  const onChangeClassName = (className: string) => {
    store.dispatch(changeStarshipSpaceframeClassName(className));
  };

  const getCurrentSystemValuesSortedMaxToMin = () => {
    let result = [];
    allSystems().forEach((s) =>
      result.push(new SystemValue(s, starship.systems[s])),
    );
    return result.sort((v1: SystemValue, v2: SystemValue) => {
      if (v1.value === v2.value) {
        return v1.system - v2.system;
      } else {
        return v2.value - v1.value;
      }
    });
  };

  const setServiceYear = (serviceYear: string) => {
    let year = parseInt(serviceYear);
    let systems = getCurrentSystemValuesSortedMaxToMin();
    let newTotalPoints = BuildPoints.systemPointsForType(
      starship.buildType,
      year,
      starship.type,
      starship.scale,
      starship.version,
    );
    let systemDelta =
      newTotalPoints -
      BuildPoints.systemPointsForType(
        starship.buildType,
        starship.spaceframeModel.serviceYear,
        starship.type,
        starship.scale,
        starship.version,
      );

    store.dispatch(changeStarshipSpaceframeServiceYear(year));

    if (systemDelta !== 0) {
      let deltas = [0, 0, 0, 0, 0, 0];
      let sumOfDeltas = 0;
      for (let i = 0; i < 5; i++) {
        deltas[i] = systems[5].value - systems[i].value;
        sumOfDeltas += deltas[i];
      }

      if (systemDelta !== sumOfDeltas) {
        let distribution = PointAllocator.allocatePointsEvenly(
          systemDelta - sumOfDeltas,
        );
        for (let i = 0; i < distribution.length; i++) {
          deltas[i] += distribution[i];
        }
      }

      for (let i = 0; i < deltas.length; i++) {
        let system = systems[i].system;
        store.dispatch(changeStarshipSpaceframeSystem(deltas[i], system));
      }
    }
  };

  const getSystem = (system: System) => {
    let result = starship.getSystemValue(system);
    return result == null ? 0 : result;
  };

  const canIncreaseSystem = (system: System) => {
    return (
      (starship.spaceframeModel?.sumSystemPoints ?? 0) <
      starship.totalAvailableSystemPoints
    );
  };

  const canDecreaseSystem = (system: System) => {
    return getSystem(system) > 1;
  };

  const setSystem = (system: System, delta: number) => {
    store.dispatch(changeStarshipSpaceframeSystem(delta, system));
  };

  const sumTotalDepartments = () => {
    let total = 0;
    DepartmentsHelper.instance
      .getDepartments()
      .forEach((d) => (total += starship.departments[d]));
    return total;
  };

  const getDepartment = (department: Department) => {
    let result = starship.departments[department];
    return result == null ? 0 : result;
  };

  const setDepartment = (department: Department, delta: number) => {
    store.dispatch(changeStarshipSpaceframeDepartment(delta, department));
  };

  const canIncreaseDepartment = (department: Department) => {
    return (
      sumTotalDepartments() < starship.totalAvailableDepartmentPoints &&
      getDepartment(department) < 5
    );
  };

  const canDecreaseDepartment = (department: Department) => {
    return getDepartment(department) > 0;
  };

  const isAppearanceSupported = () => {
    return SpaceframeAppearanceModel.getAllAppearanceModels(
      starship.type,
      starship.era,
    )?.length;
  };

  const getAppearanceOptions = () => {
    let result = [new DropDownElement('', '')];
    result.push(
      ...SpaceframeAppearanceModel.getAllAppearanceModels(
        starship.type,
        starship.era,
      ).map((a) => new DropDownElement(a.id, a.localizedName)),
    );
    return result;
  };

  const onAppearanceChange = (value: number | string) => {
    if (value === '') {
      store.dispatch(setStarshipSpaceframeAppearance());
    } else {
      store.dispatch(
        setStarshipSpaceframeAppearance(value as SpaceframeAppearance),
      );
    }
  };

  if (
    starship.spaceframeStep?.model != null &&
    starship.spaceframeStep?.model?.isCustom
  ) {
    return (
      <>
        <section className="my-4 row row-cols-1 row-cols-lg-2">
          <div className="col mb-3">
            <Header level={2}>{t('Construct.other.scale')}</Header>

            <p>{t('StarshipPage.whatScale')}</p>

            <div className="stats-row pt-2">
              <StatControl
                statName={t('Construct.other.scale')}
                value={starship.scale}
                showIncrease={canIncreaseScale()}
                showDecrease={canDecreaseScale()}
                onIncrease={() => {
                  setScale(1);
                }}
                onDecrease={() => {
                  setScale(-1);
                }}
              />
            </div>
          </div>

          <div className="col mb-4">
            <Header level={2}>{t('StarshipPage.class')}</Header>

            <p>{t('StarshipPage.whatClass')}</p>

            <div className="d-sm-flex align-items-stretch">
              <label htmlFor="shipClassName" className="textinput-label">
                {t('StarshipPage.class')}
              </label>
              <input
                id="shipClassName"
                type="text"
                onChange={(ev) => onChangeClassName(ev.target.value)}
                value={starship.className}
              />
            </div>
          </div>

          <div className="col mb-4">
            <Header level={2}>{t('Construct.other.serviceDate')}</Header>
            <p>{t('StarshipPage.whatYear')}</p>
            <InputFieldAndLabel
              type="number"
              value={starship?.spaceframeModel?.serviceYear?.toString() || ''}
              onChange={(value) => setServiceYear(value)}
              max={starship.serviceYear}
              id="serviceYear"
              labelName={t('Construct.other.serviceDate')}
            />
          </div>

          {isAppearanceSupported() ? (
            <div className="col mb-4">
              <Header level={2}>{t('Construct.other.appearance')}</Header>

              <DropDownSelect
                items={getAppearanceOptions()}
                defaultValue={starship.spaceframeStep?.appearance ?? ''}
                onChange={onAppearanceChange}
              />
            </div>
          ) : undefined}
        </section>

        <section className="my-5">
          <Header level={2}>{t('Construct.other.systems')}</Header>

          <Markdown>
            {t('CustomSpaceframe.systems.instruction', {
              points: starship.totalAvailableSystemPoints,
            })}
          </Markdown>

          <div className="stats-row mt-4">
            <StatControl
              statName={t(makeKey('Construct.system.', System[System.Comms]))}
              value={getSystem(System.Comms)}
              showIncrease={canIncreaseSystem(System.Comms)}
              showDecrease={canDecreaseSystem(System.Comms)}
              onIncrease={() => {
                setSystem(System.Comms, 1);
              }}
              onDecrease={() => {
                setSystem(System.Comms, -1);
              }}
            />

            <StatControl
              statName={t(makeKey('Construct.system.', System[System.Engines]))}
              value={getSystem(System.Engines)}
              showIncrease={canIncreaseSystem(System.Engines)}
              showDecrease={canDecreaseSystem(System.Engines)}
              onIncrease={() => {
                setSystem(System.Engines, 1);
              }}
              onDecrease={() => {
                setSystem(System.Engines, -1);
              }}
            />

            <StatControl
              statName={t(
                makeKey('Construct.system.', System[System.Structure]),
              )}
              value={getSystem(System.Structure)}
              showIncrease={canIncreaseSystem(System.Structure)}
              showDecrease={canDecreaseSystem(System.Structure)}
              onIncrease={() => {
                setSystem(System.Structure, 1);
              }}
              onDecrease={() => {
                setSystem(System.Structure, -1);
              }}
            />
          </div>

          <div className="stats-row">
            <StatControl
              statName={t(
                makeKey('Construct.system.', System[System.Computer]),
              )}
              value={getSystem(System.Computer)}
              showIncrease={canIncreaseSystem(System.Computer)}
              showDecrease={canDecreaseSystem(System.Computer)}
              onIncrease={() => {
                setSystem(System.Computer, 1);
              }}
              onDecrease={() => {
                setSystem(System.Computer, -1);
              }}
            />

            <StatControl
              statName={t(makeKey('Construct.system.', System[System.Sensors]))}
              value={getSystem(System.Sensors)}
              showIncrease={canIncreaseSystem(System.Sensors)}
              showDecrease={canDecreaseSystem(System.Sensors)}
              onIncrease={() => {
                setSystem(System.Sensors, 1);
              }}
              onDecrease={() => {
                setSystem(System.Sensors, -1);
              }}
            />

            <StatControl
              statName={t(makeKey('Construct.system.', System[System.Weapons]))}
              value={getSystem(System.Weapons)}
              showIncrease={canIncreaseSystem(System.Weapons)}
              showDecrease={canDecreaseSystem(System.Weapons)}
              onIncrease={() => {
                setSystem(System.Weapons, 1);
              }}
              onDecrease={() => {
                setSystem(System.Weapons, -1);
              }}
            />
          </div>
        </section>

        <section className="my-5">
          <Header level={2}>{t('Construct.other.departments')}</Header>

          <Markdown>
            {t('CustomSpaceframe.departments.instruction', {
              points: starship.totalAvailableDepartmentPoints,
            })}
          </Markdown>

          <div className="stats-row mt-4">
            <StatControl
              statName={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Command],
                ),
              )}
              value={getDepartment(Department.Command)}
              showIncrease={canIncreaseDepartment(Department.Command)}
              showDecrease={canDecreaseDepartment(Department.Command)}
              onIncrease={() => {
                setDepartment(Department.Command, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Command, -1);
              }}
            />

            <StatControl
              statName={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Security],
                ),
              )}
              value={getDepartment(Department.Security)}
              showIncrease={canIncreaseDepartment(Department.Security)}
              showDecrease={canDecreaseDepartment(Department.Security)}
              onIncrease={() => {
                setDepartment(Department.Security, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Security, -1);
              }}
            />

            <StatControl
              statName={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Science],
                ),
              )}
              value={getDepartment(Department.Science)}
              showIncrease={canIncreaseDepartment(Department.Science)}
              showDecrease={canDecreaseDepartment(Department.Science)}
              onIncrease={() => {
                setDepartment(Department.Science, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Science, -1);
              }}
            />
          </div>

          <div className="stats-row">
            <StatControl
              statName={t(
                makeKey('Construct.department.', Department[Department.Conn]),
              )}
              value={getDepartment(Department.Conn)}
              showIncrease={canIncreaseDepartment(Department.Conn)}
              showDecrease={canDecreaseDepartment(Department.Conn)}
              onIncrease={() => {
                setDepartment(Department.Conn, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Conn, -1);
              }}
            />

            <StatControl
              statName={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Engineering],
                ),
              )}
              value={getDepartment(Department.Engineering)}
              showIncrease={canIncreaseDepartment(Department.Engineering)}
              showDecrease={canDecreaseDepartment(Department.Engineering)}
              onIncrease={() => {
                setDepartment(Department.Engineering, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Engineering, -1);
              }}
            />

            <StatControl
              statName={t(
                makeKey(
                  'Construct.department.',
                  Department[Department.Medicine],
                ),
              )}
              value={getDepartment(Department.Medicine)}
              showIncrease={canIncreaseDepartment(Department.Medicine)}
              showDecrease={canDecreaseDepartment(Department.Medicine)}
              onIncrease={() => {
                setDepartment(Department.Medicine, 1);
              }}
              onDecrease={() => {
                setDepartment(Department.Medicine, -1);
              }}
            />
          </div>
        </section>
      </>
    );
  } else {
    return undefined;
  }
};

export default CustomSpaceframeView;
