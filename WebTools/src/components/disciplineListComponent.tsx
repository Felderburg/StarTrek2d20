import React from 'react';
import { Department, DepartmentsHelper } from '../helpers/department';
import DisciplineComponent from './disciplineComponent';

export interface IDisciplineController {
  isShown: (discipline: Department) => boolean;
  isEditable: (discipline: Department) => boolean;
  getValue: (discipline: Department) => number;
  canIncrease: (discipline: Department) => boolean;
  canDecrease: (discipline: Department) => boolean;
  onIncrease: (discipline: Department) => void;
  onDecrease: (discipline: Department) => void;
}

interface IDisciplineListControllerProperties {
  controller: IDisciplineController;
}

const DisciplineListComponent: React.FC<
  IDisciplineListControllerProperties
> = ({ controller }) => {
  const renderDiscipline = (discipline: Department) => {
    if (controller.isEditable(discipline)) {
      return (
        <DisciplineComponent
          discipline={discipline}
          onIncrease={() => {
            controller.onIncrease(discipline);
          }}
          onDecrease={() => {
            controller.onDecrease(discipline);
          }}
          value={controller.getValue(discipline)}
          showIncrease={controller.canIncrease(discipline)}
          showDecrease={controller.canDecrease(discipline)}
          key={'discipline-' + discipline}
        />
      );
    } else {
      return (
        <DisciplineComponent
          discipline={discipline}
          onIncrease={() => {}}
          onDecrease={() => {}}
          value={controller.getValue(discipline)}
          showIncrease={false}
          showDecrease={false}
          key={'discipline-' + discipline}
        />
      );
    }
  };

  return (
    <>
      {DepartmentsHelper.instance
        .getDepartments()
        .filter((d) => controller.isShown(d))
        .map((d) => renderDiscipline(d))}
    </>
  );
};

export default DisciplineListComponent;
