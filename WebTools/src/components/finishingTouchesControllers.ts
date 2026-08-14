import { Character } from "../common/character";
import { Attribute } from "../helpers/attributes";
import { Department } from "../helpers/department";
import { StepContext, modifyCharacterAttribute, modifyCharacterDiscipline } from "../state/characterActions";
import store from "../state/store";
import { IAttributeController } from "./attributeController";
import { IDisciplineController } from "./disciplineListComponent";

export class FinishingTouchesAttributeController implements IAttributeController {
    readonly character: Character;
    readonly count: number;

    constructor(character: Character, count: number = 2) {
        this.character = character;
        this.count = count;
    }

    isShown(attribute: Attribute) {
        return true;
    }
    isEditable(attribute: Attribute): boolean {
        return true;
    }
    getValue(attribute: Attribute): number {
        return this.character.attributes[attribute];
    }
    getDeltaValue(attribute: Attribute): number|undefined {
        return undefined;
    }
    canIncrease(attribute: Attribute): boolean {
        return this.character.canRaiseAttributeValue(this.getValue(attribute))
            && (this.character.finishingStep?.attributes.length < this.count)
            && (this.character.finishingStep?.attributes.filter(a => a === attribute).length < (this.count - 1));
    }
    canDecrease(attribute: Attribute): boolean {
        return this.character.finishingStep?.attributes.includes(attribute);
    }
    onIncrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.FinishingTouches, true));
    }
    onDecrease(attribute: Attribute): void {
        store.dispatch(modifyCharacterAttribute(attribute, StepContext.FinishingTouches, false));
    }
    get instructions() {
        return []
    }
}

export class FinishingTouchesDisciplineController implements IDisciplineController {

    readonly character: Character;
    readonly count: number;

    constructor(character: Character, count: number = 2) {
        this.character = character;
        this.count = count;
    }

    isShown(discipline: Department) {
        return true;
    }
    isEditable(discipline: Department): boolean {
        return true;
    }
    getValue(discipline: Department): number {
        return this.character.departments[discipline];
    }
    canIncrease(discipline: Department): boolean {
        return this.character.canRaiseDepartmentValue(this.getValue(discipline))
            && (this.character.finishingStep?.disciplines.length < this.count)
            && (this.character.finishingStep?.disciplines.filter(d => d === discipline).length < (this.count - 1));
    }
    canDecrease(discipline: Department): boolean {
        return this.character.finishingStep?.disciplines.includes(discipline);
    }
    onIncrease(discipline: Department): void {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.FinishingTouches, true));
    }
    onDecrease(discipline: Department): void {
        store.dispatch(modifyCharacterDiscipline(discipline, StepContext.FinishingTouches, false));
    }
}


