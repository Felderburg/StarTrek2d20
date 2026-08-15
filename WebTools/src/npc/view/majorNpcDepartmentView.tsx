import { useTranslation } from 'react-i18next';
import {
  characterMapStateToProperties,
  ICharacterProperties,
} from '../../solo/page/soloCharacterProperties';
import { makeKey } from '../../common/translationKey';
import { StatControl } from '../../starship/view/statControl';
import { Department } from '../../helpers/department';
import store from '../../state/store';
import { setNpcCharacterDepartments } from '../../state/characterActions';
import { useEffect } from 'react';
import { NpcType, NpcTypes } from '../model/npcType';
import { connect } from 'react-redux';
import { Character } from '../../common/character';

const MajorNpcDepartmentView: React.FC<ICharacterProperties> = ({
  character,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (
      !character.npcGenerationStep?.departments?.filter((d) => d != null)
        ?.length
    ) {
      store.dispatch(
        setNpcCharacterDepartments(
          NpcTypes.departmentPoints(character.npcGenerationStep?.type, true),
        ),
      );
    }
  }, [
    character.npcGenerationStep?.departments,
    character.npcGenerationStep?.type,
  ]);

  const getDepartment = (department: Department) => {
    return character.departments[department];
  };
  const canIncreaseDepartment = (department: Department) => {
    let total = 0;
    const departments = character.npcGenerationStep?.departments;
    departments?.forEach((n) => (total += n));

    if (character.hasMaxedDepartment()) {
      return (
        total < NpcTypes.departmentPointCount(NpcType.Major) &&
        departments[department] < Character.ABSOLUTE_MAX_DEPARTMENT - 1
      );
    } else {
      return (
        total < NpcTypes.departmentPointCount(NpcType.Major) &&
        departments[department] < Character.ABSOLUTE_MAX_DEPARTMENT
      );
    }
  };

  const canDecreaseDepartment = (department: Department) => {
    return character.npcGenerationStep.departments[department] > 0;
  };

  const setDepartment = (department: Department, delta: number) => {
    let departments = [...character.npcGenerationStep?.departments];
    departments[department] = departments[department] + delta;
    store.dispatch(setNpcCharacterDepartments(departments));
  };

  return (
    <>
      <div className="stats-row mt-4">
        <StatControl
          statName={t(
            makeKey('Construct.discipline.', Department[Department.Command]),
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
              'Construct.discipline.',
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
            makeKey('Construct.discipline.', Department[Department.Medicine]),
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

      <div className="stats-row">
        <StatControl
          statName={t(
            makeKey('Construct.discipline.', Department[Department.Conn]),
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
            makeKey('Construct.discipline.', Department[Department.Security]),
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
            makeKey('Construct.discipline.', Department[Department.Science]),
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
    </>
  );
};

export default connect(characterMapStateToProperties)(MajorNpcDepartmentView);
