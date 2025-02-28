export enum Department {
    Command,
    Conn,
    Security,
    Engineering,
    Science,
    Medicine
}

export enum Skill {
    Command,
    Conn,
    Security,
    Engineering,
    Science,
    Medicine
}

export class DepartmentsHelper {

    private static _instance: DepartmentsHelper;

    static get instance() : DepartmentsHelper {
        if (DepartmentsHelper._instance == null) {
            DepartmentsHelper._instance = new DepartmentsHelper();
        }
        return DepartmentsHelper._instance;
    }

    getSkills() {
        let skills: Skill[] = [];
        for (var s = 0; s <= Skill.Medicine; s++) {
            skills.push(s);
        }

        return skills;
    }

    getDepartments() {
        return [ Department.Command, Department.Conn, Department.Security,
            Department.Engineering, Department.Science, Department.Medicine];
    }

    getSkillName(skill: Skill) {
        return Skill[skill];
    }

    getSkillByName(name: string): Skill|undefined {
        for (var i = 0; i <= Skill.Medicine; i++) {
            const skill = Skill[i];
            if (skill.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                return i as Skill;
            }
        }

        return undefined;
    }

    getDepartmentByName(name: string): Department|undefined {

        for (let d of this.getDepartments()) {
            const department = Department[d];
            if (department.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                return d;
            }
        }

        return undefined;
    }
}
