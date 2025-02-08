export enum Skill {
    Command,
    Conn,
    Engineering,
    Security,
    Science,
    Medicine
}

export class Skills {
    getSkills() {
        let skills: Skill[] = [];
        for (var s = 0; s <= Skill.Medicine; s++) {
            skills.push(s);
        }

        return skills;
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
}

export const SkillsHelper = new Skills();