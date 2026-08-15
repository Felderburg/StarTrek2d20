export enum Department {
  Command,
  Conn,
  Security,
  Engineering,
  Science,
  Medicine,
}

export class DepartmentsHelper {
  private static singleton: DepartmentsHelper;

  static get instance(): DepartmentsHelper {
    if (DepartmentsHelper.singleton == null) {
      DepartmentsHelper.singleton = new DepartmentsHelper();
    }
    return DepartmentsHelper.singleton;
  }

  getDepartments() {
    return [
      Department.Command,
      Department.Conn,
      Department.Security,
      Department.Engineering,
      Department.Science,
      Department.Medicine,
    ];
  }

  getDepartmentName(department: Department) {
    return Department[department];
  }

  getDepartmentByName(name: string): Department | undefined {
    for (const d of this.getDepartments()) {
      const department = Department[d];
      if (department.toLocaleLowerCase() === name.toLocaleLowerCase()) {
        return d;
      }
    }

    return undefined;
  }
}
