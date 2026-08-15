export enum Department {
  Command,
  Conn,
  Security,
  Engineering,
  Science,
  Medicine,
}

export class DepartmentsHelper {
  private static _instance: DepartmentsHelper;

  static get instance(): DepartmentsHelper {
    if (DepartmentsHelper._instance == null) {
      DepartmentsHelper._instance = new DepartmentsHelper();
    }
    return DepartmentsHelper._instance;
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
